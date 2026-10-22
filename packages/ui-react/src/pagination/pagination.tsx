export interface PaginationProps {
  current: number;
  total: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages = getVisiblePages(current, total);
  return (
    <nav data-brkta-pagination="" aria-label="Pagination">
      <button data-brkta-pagination-item="" data-disabled={current <= 1 ? 'true' : undefined}
        disabled={current <= 1} onClick={() => onPageChange?.(current - 1)} aria-label="Previous">‹</button>
      {pages.map((p, i) => (
        <button key={i} data-brkta-pagination-item="" data-active={p === current ? 'true' : undefined}
          disabled={p === -1} data-disabled={p === -1 ? 'true' : undefined}
          onClick={() => p > 0 && onPageChange?.(p)}
        >{p === -1 ? '…' : p}</button>
      ))}
      <button data-brkta-pagination-item="" data-disabled={current >= total ? 'true' : undefined}
        disabled={current >= total} onClick={() => onPageChange?.(current + 1)} aria-label="Next">›</button>
    </nav>
  );
}

function getVisiblePages(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: number[] = [1];
  if (current > 3) pages.push(-1);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push(-1);
  pages.push(total);
  return pages;
}
