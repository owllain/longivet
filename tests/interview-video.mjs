import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('La entrevista muestra una portada y no carga el reproductor antes de un clic', () => {
  const source = fs.readFileSync('src/components/sections/interview-video.tsx', 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const compiled = { exports: {} };
  new Function('module', 'exports', 'require', outputText)(compiled, compiled.exports, createRequire(import.meta.url));
  const html = renderToStaticMarkup(React.createElement(compiled.exports.InterviewVideo));
  assert.doesNotMatch(html, /<iframe|<video|<audio/);
  assert.match(html, /<button[^>]*aria-label="Reproducir entrevista/);
  assert.match(html, /thumbnail\/video\/x9u4q44/);
});
