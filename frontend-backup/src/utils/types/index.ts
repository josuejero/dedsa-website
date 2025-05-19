// frontend/src/utils/types/index.ts

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Performance metrics types
export type MetricName = 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB';

export interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export interface LargestContentfulPaint extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
  size: number;
  id: string;
  url: string;
  element?: Element;
}

export interface PerformanceMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// GraphQL error types
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface FormattedError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
}
