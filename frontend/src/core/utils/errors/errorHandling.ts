export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR'
} as const;

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function handleError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError('An unknown error occurred');
}

export function createNetworkError(message: string = 'Network error occurred'): AppError {
  return new AppError(message, errorCodes.NETWORK_ERROR, 503);
}

export function createValidationError(message: string): AppError {
  return new AppError(message, errorCodes.VALIDATION_ERROR, 400);
}

export function createAuthError(message: string = 'Authentication failed'): AppError {
  return new AppError(message, errorCodes.AUTH_ERROR, 401);
}

export function createNotFoundError(message: string = 'Resource not found'): AppError {
  return new AppError(message, errorCodes.NOT_FOUND, 404);
}
