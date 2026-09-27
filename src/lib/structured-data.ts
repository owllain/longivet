/** Escapa el delimitador HTML sin cambiar los valores del JSON. */
export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
