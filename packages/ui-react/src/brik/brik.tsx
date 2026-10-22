import type { SVGProps } from "react";
import {
  BRIK_VIEW_BOX,
  brikCellClass,
  brikParts,
  brikSleepMarks,
  type BrikCell,
  type BrikState,
} from "@brkta/ui-core/brik/brik-contract";

export interface BrikProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Pose / animation loop. Defaults to `idle`. */
  state?: BrikState;
  /** Accessible name. Omit for decorative use. */
  label?: string;
}

function Cells({ cells }: { cells: readonly BrikCell[] }) {
  return (
    <>
      {cells.map((cell) => (
        <rect
          key={`${cell.x}:${cell.y}:${cell.tone}`}
          className={brikCellClass(cell)}
          x={cell.x}
          y={cell.y}
          width={cell.width}
          height={cell.height}
        />
      ))}
    </>
  );
}

/** Brik, the BRKTA companion. Pure SVG + CSS; no runtime motion library. */
export function Brik({
  state = "idle",
  label,
  className = "",
  ...props
}: BrikProps) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const, focusable: "false" as const };

  return (
    <svg
      data-brkta-brik=""
      data-state={state}
      viewBox={BRIK_VIEW_BOX}
      shapeRendering="crispEdges"
      className={className}
      {...a11y}
      {...props}
    >
      <g className="brkta-brik-all">
        <g className="brkta-brik-body">
          <Cells cells={brikParts.body} />
          <g className="brkta-brik-face">
            <g className="brkta-brik-eyes">
              <Cells cells={brikParts.eyes} />
            </g>
            <g className="brkta-brik-lids">
              <Cells cells={brikParts.lids} />
            </g>
            <Cells cells={brikParts.cheeks} />
            <g className="brkta-brik-smile">
              <Cells cells={brikParts.smile} />
            </g>
            <g className="brkta-brik-mouth">
              <Cells cells={brikParts.mouth} />
            </g>
          </g>
          <Cells cells={brikParts.legs} />
        </g>
        <g className="brkta-brik-arm">
          <Cells cells={brikParts.arm} />
        </g>
        <g className="brkta-brik-sleep">
          {brikSleepMarks.map((mark) => (
            <text key={mark.x} className="brkta-brik-z" x={mark.x} y={mark.y}>
              z
            </text>
          ))}
        </g>
        <g className="brkta-brik-confetti">
          <Cells cells={brikParts.confetti} />
        </g>
      </g>
    </svg>
  );
}
