import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

function loadTs(path) {
  const result = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const compiled = { exports: {} };
  new Function('module', 'exports', result.outputText)(compiled, compiled.exports);
  return compiled.exports;
}
const { validatePreference, validateAppointment, buildAppointmentMessage } = loadTs('src/lib/booking.ts');
const { serializeStructuredData } = loadTs('src/lib/structured-data.ts');
const { estadoHorario } = loadTs('src/lib/horario.ts');
const { buildWhatsAppUrl } = loadTs('src/lib/site.ts');
const now = new Date('2026-09-25T18:00:00Z');

test('Rechaza fechas imposibles, horas alteradas y datos fuera del formulario', () => {
  const valid = { tutor: 'Ana', pet: 'Miko', zone: 'Cartago', consent: 'on' };
  assert.equal(validateAppointment(valid, now), '');
  for (const extra of [
    { date: '2026-02-31' }, { date: '<script>' }, { time: '99:12' },
    { service: 'Servicio inventado' }, { alternateTime: 'Inyectado' },
    { tutor: 'Ana\nCita confirmada' }, { pet: 'Miko\u202E' },
    { notes: 'x'.repeat(1201) }, { tutor: { malicious: true } }, { consent: '' },
  ]) assert.notEqual(validateAppointment({ ...valid, ...extra }, now), '');
  assert.equal(validateAppointment({ ...valid, notes: 'Primera línea\nSegunda línea' }, now), '');
});

test('El texto malicioso no cambia el destino ni los parámetros de WhatsApp', () => {
  const payload = '</script><script>alert(1)</script>&phone=999&text=otro#fragmento';
  const message = buildAppointmentMessage({ tutor: 'Ana', pet: payload, zone: 'Cartago', notes: payload });
  const url = new URL(buildWhatsAppUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/50671399239');
  assert.deepEqual([...url.searchParams.keys()], ['text']);
  assert.equal(url.hash, '');
  assert.equal(url.searchParams.get('text'), message);
});

test('Los datos estructurados no permiten cerrar el script con contenido HTML', () => {
  const value = { text: '</script><script>alert(1)</script>', name: 'María & José' };
  const serialized = serializeStructuredData(value);
  assert.doesNotMatch(serialized, /</);
  assert.deepEqual(JSON.parse(serialized), value);
});

test('Las cabeceras bloquean marcos externos y conservan la entrevista autorizada', async () => {
  const config = loadTs('next.config.ts').default;
  const rules = await config.headers();
  const headers = Object.fromEntries(rules[0].headers.map(({ key, value }) => [key, value]));
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.match(headers['Content-Security-Policy'], /frame-ancestors 'none'/);
  assert.match(headers['Content-Security-Policy'], /object-src 'none'/);
  assert.match(headers['Content-Security-Policy'], /frame-src https:\/\/www.dailymotion.com/);
  assert.equal(config.poweredByHeader, false);
});

test('La solicitud permite omitir servicio, fecha y hora', () => {
  assert.equal(validatePreference('', '', now), '');
  const message = buildAppointmentMessage({ tutor: 'Ana', pet: 'Paco', zone: 'Cartago' });
  assert.match(message, /Servicio: Por definir con la doctora/);
  assert.doesNotMatch(message, /undefined|LV-|confirmada/);
  const url = new URL(buildWhatsAppUrl(message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/50671399239');
  assert.equal(url.searchParams.get('text'), message);
});
test('El sábado permite solicitar las 15:30, pero no después del cierre', () => {
  assert.equal(validatePreference('2026-09-26', '15:30', now), '');
  assert.notEqual(validatePreference('2026-09-26', '16:00', now), '');
  assert.notEqual(validatePreference('2026-09-26', '08:30', now), '');
});
test('No se ofrecen domingos, fechas pasadas ni horas que ya pasaron', () => {
  assert.notEqual(validatePreference('2026-09-27', '10:00', now), '');
  assert.notEqual(validatePreference('2026-09-24', '', now), '');
  assert.notEqual(validatePreference('2026-09-25', '11:00', now), '');
  assert.equal(validatePreference('2026-09-25', '13:00', now), '');
});
test('El mensaje conserva alternativas y caracteres especiales', () => {
  const message = buildAppointmentMessage({ tutor: 'María & José', pet: 'Chichí', zone: 'El Guarco', alternateTime: 'Noche', alternateDays: 'Fin de semana', date: '2026-09-26', time: '15:30', notes: 'Movilidad y sueño' });
  assert.match(message, /26\/09\/2026/);
  assert.match(message, /Alternativa horaria: Noche/);
  assert.match(message, /Días alternativos: Fin de semana/);
  assert.equal(new URL(buildWhatsAppUrl(message)).searchParams.get('text'), message);
});
test('El indicador respeta el sábado hasta las 16:00 y cierra el domingo', () => {
  assert.equal(estadoHorario(new Date('2026-09-26T21:59:00Z')).abierto, true);
  assert.equal(estadoHorario(new Date('2026-09-26T22:00:00Z')).abierto, false);
  const sunday = estadoHorario(new Date('2026-09-27T16:00:00Z'));
  assert.equal(sunday.modo, 'cerrado');
  assert.doesNotMatch(JSON.stringify(sunday), /guardia|urgencia/i);
});
