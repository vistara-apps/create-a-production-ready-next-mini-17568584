import { logger } from './logger';

/**
 * Custom error types for the application
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
}

/**
 * HTTP status codes mapped to error types
 */
export const ERROR_STATUS_CODES: Record<ErrorType, number> = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.INTERNAL]: 500,
  [ErrorType.EXTERNAL_SERVICE]: 502,
  [ErrorType.RATE_LIMIT]: 429,
};

/**
 * Custom application error class
 */
export class AppError extends Error {
  type: ErrorType;
  statusCode: number;
  details?: Record<string, any>;
  
  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = ERROR_STATUS_CODES[type];
    this.details = details;
    
    // Log the error when it's created
    logger.error(`${type}: ${message}`, { details });
  }
  
  /**
   * Convert the error to a JSON object for API responses
   */
  toJSON() {
    return {
      error: {
        type: this.type,
        message: this.message,
        ...(this.details ? { details: this.details } : {}),
      },
    };
  }
}

/**
 * Create a validation error
 */
export function createValidationError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.VALIDATION, details);
}

/**
 * Create an authentication error
 */
export function createAuthenticationError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.AUTHENTICATION, details);
}

/**
 * Create an authorization error
 */
export function createAuthorizationError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.AUTHORIZATION, details);
}

/**
 * Create a not found error
 */
export function createNotFoundError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.NOT_FOUND, details);
}

/**
 * Create an internal error
 */
export function createInternalError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.INTERNAL, details);
}

/**
 * Create an external service error
 */
export function createExternalServiceError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.EXTERNAL_SERVICE, details);
}

/**
 * Create a rate limit error
 */
export function createRateLimitError(message: string, details?: Record<string, any>): AppError {
  return new AppError(message, ErrorType.RATE_LIMIT, details);
}

/**
 * Global error handler for API routes
 */
export function handleApiError(error: unknown): { statusCode: number; body: any } {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: error.toJSON(),
    };
  }
  
  // Handle unexpected errors
  logger.error('Unexpected error', { error });
  
  return {
    statusCode: 500,
    body: {
      error: {
        type: ErrorType.INTERNAL,
        message: 'An unexpected error occurred',
      },
    },
  };
}

