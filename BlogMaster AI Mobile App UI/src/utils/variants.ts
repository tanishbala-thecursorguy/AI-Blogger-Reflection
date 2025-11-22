// Helper functions for generating and managing multiple variants

export interface Variant<T> {
  id: number;
  content: T;
  selected: boolean;
}

export function createVariants<T>(items: T[]): Variant<T>[] {
  return items.map((item, index) => ({
    id: index,
    content: item,
    selected: index === 0, // First variant selected by default
  }));
}

export function selectVariant<T>(variants: Variant<T>[], id: number): Variant<T>[] {
  return variants.map(v => ({
    ...v,
    selected: v.id === id,
  }));
}

export function getSelectedVariant<T>(variants: Variant<T>[]): T | null {
  const selected = variants.find(v => v.selected);
  return selected ? selected.content : (variants[0]?.content || null);
}

