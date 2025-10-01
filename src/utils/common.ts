export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function throttle<P>(wait: number, cb: (...args: P[]) => unknown) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: P[]) => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      void cb(...args);
      timeoutId = undefined;
    }, wait);
  };
}
