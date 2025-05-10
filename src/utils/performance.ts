type MetricName = 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB';

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface LargestContentfulPaint extends PerformanceEntry {
  element: Element;
  id: string;
  url: string;
  loadTime: number;
  size: number;
  startTime: number;
}
