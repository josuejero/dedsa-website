// src/core/types/hooks/index.ts

// useForm types
export interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => ValidationResult;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// useInfiniteScroll types
export interface UseInfiniteScrollProps {
  threshold?: number;
  onLoadMore: () => Promise<void>;
}

// useNewsletterSubscription types
export type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';
