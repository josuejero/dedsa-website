import {
  LargestContentfulPaint,
  LayoutShift,
  MetricName,
  PerformanceMetric,
} from './types';

const thresholds = {
  FCP: [1800, 3000],
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  FID: [100, 300],
  TTFB: [800, 1800],
};

function getRating(
  name: MetricName,
  value: number
): PerformanceMetric['rating'] {
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

export function measureCLS(): Promise<PerformanceMetric> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByType('layout-shift') as LayoutShift[];
      const entry = entries.pop();
      if (entry) {
        observer.disconnect();
        resolve({
          name: 'CLS',
          value: entry.value,
          rating: getRating('CLS', entry.value),
        });
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  });
}

export function measureLCP(): Promise<PerformanceMetric> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByType(
        'largest-contentful-paint'
      ) as LargestContentfulPaint[];
      const entry = entries.pop();
      if (entry) {
        observer.disconnect();
        resolve({
          name: 'LCP',
          value: entry.startTime,
          rating: getRating('LCP', entry.startTime),
        });
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  });
}

export function measureFID(): Promise<PerformanceMetric> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByType(
        'first-input'
      ) as PerformanceEventTiming[];
      const entry = entries.pop();
      if (entry) {
        observer.disconnect();
        const delay = entry.processingStart - entry.startTime;
        resolve({
          name: 'FID',
          value: delay,
          rating: getRating('FID', delay),
        });
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  });
}

export async function gatherMetrics(): Promise<PerformanceMetric[]> {
  if (typeof window === 'undefined') return [];

  const metrics: PerformanceMetric[] = [];

  try {
    const [cls, lcp, fid] = await Promise.all([
      measureCLS(),
      measureLCP(),
      measureFID(),
    ]);

    metrics.push(cls, lcp, fid);

    if (process.env.NODE_ENV === 'development') {
      console.table(metrics);
    }
  } catch (error) {
    console.error('Error measuring performance:', error);
  }

  return metrics;
}
