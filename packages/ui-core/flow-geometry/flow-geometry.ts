export type Point = { x: number; y: number };
export type FlowTreeRect = { left: number; top: number; right: number; bottom: number };

export const CORNER_RADIUS = 30;
export const LIMB_SLOTS = 46;
export const MAX_DEPTH = 4;
export const CLEARANCE = 12;

export function roundedPath(points: Point[], radius: number): string {
  const filtered = points.filter(
    (point, index) =>
      index === 0 ||
      Math.hypot(point.x - points[index - 1].x, point.y - points[index - 1].y) >
        0.5,
  );
  if (filtered.length < 2) return "";

  const format = (value: number) => value.toFixed(4);
  let d = "M " + format(filtered[0].x) + " " + format(filtered[0].y);

  for (let index = 1; index < filtered.length - 1; index += 1) {
    const previous = filtered[index - 1];
    const corner = filtered[index];
    const next = filtered[index + 1];
    const incoming = Math.hypot(corner.x - previous.x, corner.y - previous.y);
    const outgoing = Math.hypot(next.x - corner.x, next.y - corner.y);
    const curve = Math.min(radius, incoming / 2, outgoing / 2);
    const entry = {
      x: corner.x + ((previous.x - corner.x) / incoming) * curve,
      y: corner.y + ((previous.y - corner.y) / incoming) * curve,
    };
    const exit = {
      x: corner.x + ((next.x - corner.x) / outgoing) * curve,
      y: corner.y + ((next.y - corner.y) / outgoing) * curve,
    };
    d +=
      " L " +
      format(entry.x) +
      " " +
      format(entry.y) +
      " Q " +
      format(corner.x) +
      " " +
      format(corner.y) +
      " " +
      format(exit.x) +
      " " +
      format(exit.y);
  }

  const last = filtered[filtered.length - 1];
  return d + " L " + format(last.x) + " " + format(last.y);
}

export interface FlowTreeGeometryOptions {
  width: number;
  height: number;
  stemX: number;
  blocked?: readonly FlowTreeRect[];
  compact?: boolean;
  narrow?: boolean;
  /** Optional dashboard-only branch origin; omitted to preserve the website silhouette. */
  branchOriginY?: number;
  minimumLimbLength?: number;
  firstRunRatio?: number;
  bottomRoom?: number;
}

export interface FlowTreeGeometry {
  viewBox: string;
  stemPath: string;
  limbPaths: string[];
  stemEndY: number;
}

function inside(point: Point, rect: FlowTreeRect): boolean {
  return (
    point.x > rect.left &&
    point.x < rect.right &&
    point.y > rect.top &&
    point.y < rect.bottom
  );
}

/* Deterministic, so the silhouette never reshuffles between measures. */
function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createFlowTreeGeometry({
  width,
  height,
  stemX,
  blocked = [],
  compact = false,
  narrow = false,
  branchOriginY,
  minimumLimbLength = narrow ? 5 : compact ? 6 : 8,
  firstRunRatio = narrow ? 0.27 : compact ? 0.3 : 0.34,
  bottomRoom = narrow ? 18 : compact ? 14 : 10,
}: FlowTreeGeometryOptions): FlowTreeGeometry {
  const safeWidth = Math.max(width, 1);
  const safeHeight = Math.max(height, 1);
  const stemEndY = Math.min(safeHeight * 0.36, 130);
  const rootBaseOffset = -22;
  const mainOriginY = branchOriginY ?? stemEndY;
  const rootOriginY = branchOriginY ?? stemEndY + rootBaseOffset;
  const edgeOrigin = stemX === 0 && branchOriginY === 0;
  const floor = safeHeight - bottomRoom;
  const random = makeRandom(20260215);
  const limbPaths: string[] = [];

  const grow = (
    x: number,
    y: number,
    angle: number,
    length: number,
    depth: number,
    minDrop = 2,
  ) => {
    if (limbPaths.length >= LIMB_SLOTS || length < minimumLimbLength) return;

    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    if (
      endY < y + minDrop ||
      endY > floor ||
      endX < (edgeOrigin ? 0 : 6) ||
      endX > safeWidth - 6
    ) {
      return;
    }

    const bow = (random() - 0.5) * 0.4;
    const cx = x + Math.cos(angle + bow) * length * 0.55;
    const cy = y + Math.sin(angle + bow) * length * 0.55;

    /* Test the curve itself, matching the website's collision behavior. */
    for (let index = 0; index <= 20; index += 1) {
      const t = index / 20;
      const inverse = 1 - t;
      const point = {
        x: inverse * inverse * x + 2 * inverse * t * cx + t * t * endX,
        y: inverse * inverse * y + 2 * inverse * t * cy + t * t * endY,
      };
      if (blocked.some((rect) => inside(point, rect))) return;
    }

    limbPaths.push(
      `M ${x.toFixed(2)} ${y.toFixed(2)}` +
        ` Q ${cx.toFixed(2)} ${cy.toFixed(2)}` +
        ` ${endX.toFixed(2)} ${endY.toFixed(2)}`,
    );

    if (depth >= MAX_DEPTH) return;
    const spread = 0.34 + random() * 0.22;
    grow(endX, endY, angle - spread, length * 0.72, depth + 1, minDrop);
    grow(endX, endY, angle + spread, length * 0.7, depth + 1, minDrop);
  };

  const heightRunBudget = (floor - stemEndY) * firstRunRatio;
  const mobileDimensionBudget = Math.min(safeWidth, safeHeight) * 0.22;
  const mobileWidthBudget = (safeWidth - stemX - 6) / Math.sin(1.25);
  const firstRun = compact
    ? Math.max(
        minimumLimbLength,
        Math.min(heightRunBudget, mobileDimensionBudget, mobileWidthBudget),
      )
    : heightRunBudget;

  grow(stemX, mainOriginY, Math.PI / 2, firstRun, 0);

  [
    { at: -22, lean: 0.62, run: 1.0, lift: -8 },
    { at: -13, lean: 0.95, run: 0.92, lift: -12 },
    { at: -4, lean: 1.25, run: 0.82, lift: -16 },
  ].forEach((root) => {
    grow(
      stemX,
      rootOriginY + root.at - rootBaseOffset,
      Math.PI / 2 - root.lean,
      firstRun * root.run,
      0,
      root.lift,
    );
  });

  return {
    viewBox: `0 0 ${safeWidth} ${safeHeight}`,
    stemPath: roundedPath(
      [
        { x: stemX, y: 0 },
        { x: stemX, y: stemEndY },
      ],
      CORNER_RADIUS,
    ),
    limbPaths,
    stemEndY,
  };
}
