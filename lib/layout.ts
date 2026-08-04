/**
 * Chunk a flat index into explicit rows of a 12-column grid.
 *
 * The film and photo lists are authored as deliberate pairs — a wide piece
 * beside a tall one, a big one beside a detail — and each pair is meant to sit
 * on its own line with air left over. Letting CSS grid auto-place would fill
 * that air with whatever came next and flatten the whole thing back into a
 * uniform grid, so rows are cut here instead and rendered one at a time.
 *
 * A row closes as soon as the next item would push it past 12 columns.
 */
export function toRows<T extends { span: number }>(items: T[], columns = 12): T[][] {
  const rows: T[][] = [];
  let row: T[] = [];
  let used = 0;

  for (const item of items) {
    if (row.length > 0 && used + item.span > columns) {
      rows.push(row);
      row = [];
      used = 0;
    }
    row.push(item);
    used += item.span;
  }

  if (row.length > 0) rows.push(row);
  return rows;
}

/** Tailwind can't see a computed class name, so the spans are spelled out. */
export const SPAN_CLASS: Record<number, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};
