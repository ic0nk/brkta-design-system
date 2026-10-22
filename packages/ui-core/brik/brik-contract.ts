// Framework-neutral Brik contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract.
//
// Brik is the BRKTA companion: the two brackets of the logo as a body, with a
// pixel face between them. The drawing is shared data so every framework
// renders the exact same character; brik.css owns colour and motion.

export const brikStates = [
  "idle",
  "look",
  "wave",
  "peek",
  "sleep",
  "think",
  "party",
  "oops",
] as const;

export type BrikState = (typeof brikStates)[number];

export interface BrikContract {
  /** Which pose / animation loop to show. Defaults to `idle`. */
  state: BrikState;
  /** Accessible name. Omit for decorative use (the SVG is then aria-hidden). */
  label?: string;
}

export type BrikTone = "ink" | "accent" | "highlight";
export type BrikRole = "eye" | "cheek" | "bit";

export interface BrikCell {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly tone: BrikTone;
  readonly role?: BrikRole;
}

/** One grid cell is 4 SVG units; the character sits on a 16 x 16 grid. */
export const BRIK_CELL = 4;
export const BRIK_VIEW_BOX = "-20 -24 104 92";

const cell = (
  column: number,
  row: number,
  columns: number,
  rows: number,
  tone: BrikTone = "ink",
  role?: BrikRole,
): BrikCell => ({
  x: column * BRIK_CELL,
  y: row * BRIK_CELL,
  width: columns * BRIK_CELL,
  height: rows * BRIK_CELL,
  tone,
  ...(role ? { role } : {}),
});

export const brikParts = {
  /** The two brackets. */
  body: [
    cell(0, 1, 2, 14),
    cell(2, 1, 3, 2),
    cell(2, 13, 3, 2),
    cell(14, 1, 2, 14),
    cell(11, 1, 3, 2),
    cell(11, 13, 3, 2),
  ],
  eyes: [
    cell(5, 5, 2, 3, "ink", "eye"),
    cell(9, 5, 2, 3, "ink", "eye"),
    cell(5, 5, 1, 1, "highlight"),
    cell(9, 5, 1, 1, "highlight"),
  ],
  lids: [cell(5, 7, 2, 1), cell(9, 7, 2, 1)],
  cheeks: [
    cell(3, 9, 2, 1, "accent", "cheek"),
    cell(11, 9, 2, 1, "accent", "cheek"),
  ],
  smile: [cell(6, 10, 1, 1), cell(7, 11, 2, 1), cell(9, 10, 1, 1)],
  mouth: [cell(7, 10, 2, 2)],
  legs: [cell(1, 15, 3, 1), cell(12, 15, 3, 1)],
  arm: [cell(16, 7, 1, 1), cell(17, 6, 1, 1), cell(18, 4, 2, 2, "accent")],
  confetti: [
    cell(-3, 3, 1, 1, "accent", "bit"),
    cell(19, 2, 1, 1, "accent", "bit"),
    cell(-2, -2, 1, 1, "accent", "bit"),
    cell(18, -3, 1, 1, "accent", "bit"),
    cell(7, -4, 1, 1, "accent", "bit"),
    cell(-4, 9, 1, 1, "accent", "bit"),
    cell(20, 8, 1, 1, "accent", "bit"),
  ],
} as const satisfies Record<string, readonly BrikCell[]>;

/** Positions of the three "z" glyphs shown while Brik sleeps. */
export const brikSleepMarks = [
  { x: 62, y: 2 },
  { x: 70, y: -8 },
  { x: 78, y: -18 },
] as const;

/** Class for one cell: tone colour plus an optional role hook for motion. */
export function brikCellClass(cell: BrikCell): string {
  return cell.role
    ? `brkta-brik-${cell.tone} brkta-brik-${cell.role}`
    : `brkta-brik-${cell.tone}`;
}
