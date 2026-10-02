import { en, id } from "./translations";

export type Language = "id" | "en";

export type TranslationVars = Record<string, string | number>;

const dictionaries: Record<Language, unknown> = { id, en };

function lookup(language: Language, key: string): unknown {
  return key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionaries[language]);
}

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

/**
 * Resolves a dot-path key in the active language, falling back to Indonesian and
 * finally to the key itself, then interpolates `{placeholders}`.
 */
export function translate(language: Language, key: string, vars?: TranslationVars): string {
  const primary = lookup(language, key);
  if (typeof primary === "string") return interpolate(primary, vars);

  const fallback = lookup("id", key);
  if (typeof fallback === "string") return interpolate(fallback, vars);

  return key;
}

/** Resolves a key whose value is a list of strings (e.g. article section titles). */
export function translateList(language: Language, key: string): string[] {
  const primary = lookup(language, key);
  if (Array.isArray(primary)) return primary as string[];

  const fallback = lookup("id", key);
  return Array.isArray(fallback) ? (fallback as string[]) : [];
}
