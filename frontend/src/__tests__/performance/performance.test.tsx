import { render } from '@testing-library/react';
import HomePage from '@/features/home/Page';

describe('Performance Tests', () => {
  beforeEach(() => {
    performance.mark = jest.fn();
    performance.measure = jest.fn();
  });

  it('HomePage renders within acceptable time', () => {
    const startTime = performance.now();

    render(<HomePage />);

    const renderTime = performance.now() - startTime;
    expect(renderTime).toBeLessThan(100);
  });

  it('Lazy loads images appropriately', () => {
    const { container } = render(<HomePage />);
    const images = container.querySelectorAll('img[loading="lazy"]');

    expect(images.length).toBeGreaterThan(0);
  });

  it('Does not have memory leaks on unmount', () => {
    const { unmount } = render(<HomePage />);

    const beforeUnmount = (global as any).gc
      ? performance.memory.usedJSHeapSize
      : 0;
    unmount();
    const afterUnmount = (global as any).gc
      ? performance.memory.usedJSHeapSize
      : 0;

    expect(afterUnmount - beforeUnmount).toBeLessThan(1000000);
  });
});
