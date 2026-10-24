import { vi } from 'vitest';

type Callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

/** Faux IntersectionObserver : capture le callback et permet de le déclencher à la main. */
export class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);

  private readonly callback: Callback;
  readonly options?: IntersectionObserverInit;

  constructor(callback: Callback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    FakeIntersectionObserver.instances.push(this);
  }

  trigger(entries: Array<{ target: Element; isIntersecting: boolean; intersectionRatio?: number }>): void {
    const full = entries.map((e) => ({ intersectionRatio: e.isIntersecting ? 1 : 0, ...e })) as IntersectionObserverEntry[];
    this.callback(full, this as unknown as IntersectionObserver);
  }
}

export function installFakeIntersectionObserver(): void {
  FakeIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
}
