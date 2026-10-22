/**
 * Matching a file against an `accept` list, the way `<input accept>` reads it.
 *
 * The file dialog applies `accept` itself, but a drop does not: whatever the user drags arrives. This
 * is the one matcher both the upload card and the dashboard drop zones use, so the two never
 * disagree about what a surface takes.
 */

/** Why a file offered to an upload surface was turned away. */
export type FileRejectionReason = 'type' | 'size' | 'count';

export interface FileRejection {
  name: string;
  reason: FileRejectionReason;
}

/**
 * MIME types for extensions whose files often arrive with an empty `type`.
 *
 * Windows reports no type for HEIC/HEIF, and some drag sources report none at all. Only the types an
 * upload surface in this product accepts are listed; an unknown extension stays unknown.
 */
const EXTENSION_TYPES: Readonly<Record<string, string>> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
  pdf: 'application/pdf',
  txt: 'text/plain',
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

/** The accept list as lower-case tokens. Blank entries are dropped. */
export function parseAccept(accept: string | null | undefined): string[] {
  return (accept ?? '')
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter((token) => token.length > 0);
}

/** The lower-case extension of a file name, without the dot, or '' when it has none. */
export function fileExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot > 0 && dot < name.length - 1 ? name.slice(dot + 1).toLowerCase() : '';
}

/**
 * The file's MIME type, lower-cased and without parameters. When the browser reported none, the type
 * is inferred from a known extension, so a HEIC from Windows still matches `image/*`.
 */
export function effectiveFileType(file: { name: string; type: string }): string {
  const reported = (file.type ?? '').split(';')[0].trim().toLowerCase();
  return reported || EXTENSION_TYPES[fileExtension(file.name)] || '';
}

/**
 * Whether a file satisfies an accept list.
 *
 * - An empty or missing list accepts everything, as `<input>` does.
 * - `.ext` tokens compare the file name's ending, case-insensitively.
 * - `type/*` tokens compare the MIME family.
 * - Anything else is an exact MIME type.
 */
export function matchesAccept(
  file: { name: string; type: string },
  accept: string | null | undefined,
): boolean {
  const tokens = parseAccept(accept);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = effectiveFileType(file);
  return tokens.some((token) => {
    if (token.startsWith('.')) return token.length > 1 && name.endsWith(token);
    if (!type) return false;
    if (token === '*/*' || token === '*') return true;
    if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}
