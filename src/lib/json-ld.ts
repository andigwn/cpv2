/**
 * Serialises structured data for an inline JSON-LD script tag.
 *
 * JSON.stringify on its own is not safe here. A value containing the literal sequence
 * "</script>" would close the tag early and everything after it would be parsed as
 * HTML, which turns any content field (job description, brand name, address, or an
 * env-driven URL) into a stored-XSS vector the moment it contains markup.
 *
 * Escaping "<", ">", "&" and the JavaScript line separators as JSON unicode escapes
 * keeps the payload valid JSON while making an early tag close impossible. JSON only
 * contains those characters inside string values, and \u003c is a legal encoding there.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
