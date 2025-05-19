// frontend/src/hooks/types/index.ts
import { ValidationResult } from '@/utils/types';
import { ChangeEvent } from 'react';

// useInfiniteScroll types
export interface UseInfiniteScrollProps {
  threshold?: number;
  onLoadMore: () => Promise<void>;
}

// useForm types
export interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => ValidationResult;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

// useKeyboardShortcut types
export type KeyHandler = (event: KeyboardEvent) => void;
export type KeyMap = Record<string, KeyHandler>;

export interface ShortcutOptions {
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

// useNewsletterSubscription types
export type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseNewsletterSubscriptionReturn {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  status: SubscriptionStatus;
  errorMessage: string;
  subscribe: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}
