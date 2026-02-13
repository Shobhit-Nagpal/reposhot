export function capitalize(str: string): string {
  if (str.length === 0) {
    return '';
  }

  if (str.length === 1) {
    return str.toUpperCase();
  }

  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

export function isNil<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

export function isNotNil<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function range(start: number, end: number): number[] {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function groupBy<T, K extends PropertyKey>(
  arr: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function pick<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

export function omit<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete (result as Record<PropertyKey, unknown>)[key];
  }
  return result;
}
