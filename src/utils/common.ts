export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debounce(wait: number, cb: (...args: unknown[]) => unknown) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      cb();
      timeoutId = undefined;
    }, wait);
  };
}
