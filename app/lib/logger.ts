/**
 * Logger utility for consistent logging throughout the application
 * Uses console in development and can be extended to use external logging services in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level: LogLevel;
  timestamp: boolean;
  prefix?: string;
}

const DEFAULT_OPTIONS: LoggerOptions = {
  level: 'info',
  timestamp: true,
};

// Determine if we're in a production environment
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Get the current timestamp in ISO format
 */
const getTimestamp = (): string => new Date().toISOString();

/**
 * Format a log message with optional timestamp and prefix
 */
const formatMessage = (message: string, options: LoggerOptions): string => {
  let formattedMessage = '';
  
  if (options.timestamp) {
    formattedMessage += `[${getTimestamp()}] `;
  }
  
  if (options.prefix) {
    formattedMessage += `[${options.prefix}] `;
  }
  
  formattedMessage += message;
  return formattedMessage;
};

/**
 * Log levels priority (higher number = higher priority)
 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Check if a log level should be displayed based on the configured level
 */
const shouldLog = (messageLevel: LogLevel, configuredLevel: LogLevel): boolean => {
  return LOG_LEVEL_PRIORITY[messageLevel] >= LOG_LEVEL_PRIORITY[configuredLevel];
};

/**
 * Logger implementation
 */
class Logger {
  private options: LoggerOptions;
  
  constructor(options: Partial<LoggerOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }
  
  /**
   * Log a debug message
   */
  debug(message: string, meta?: Record<string, any>): void {
    if (!shouldLog('debug', this.options.level)) return;
    
    const formattedMessage = formatMessage(message, this.options);
    
    if (isProduction) {
      // In production, you might want to use a proper logging service
      // This is a placeholder for integration with services like Datadog, LogRocket, etc.
      console.debug(formattedMessage, meta);
    } else {
      console.debug(formattedMessage, meta);
    }
  }
  
  /**
   * Log an info message
   */
  info(message: string, meta?: Record<string, any>): void {
    if (!shouldLog('info', this.options.level)) return;
    
    const formattedMessage = formatMessage(message, this.options);
    
    if (isProduction) {
      // In production, you might want to use a proper logging service
      console.info(formattedMessage, meta);
    } else {
      console.info(formattedMessage, meta);
    }
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, meta?: Record<string, any>): void {
    if (!shouldLog('warn', this.options.level)) return;
    
    const formattedMessage = formatMessage(message, this.options);
    
    if (isProduction) {
      // In production, you might want to use a proper logging service
      console.warn(formattedMessage, meta);
    } else {
      console.warn(formattedMessage, meta);
    }
  }
  
  /**
   * Log an error message
   */
  error(message: string, meta?: Record<string, any>): void {
    if (!shouldLog('error', this.options.level)) return;
    
    const formattedMessage = formatMessage(message, this.options);
    
    if (isProduction) {
      // In production, you might want to use a proper logging service
      console.error(formattedMessage, meta);
    } else {
      console.error(formattedMessage, meta);
    }
  }
  
  /**
   * Create a child logger with a specific prefix
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: this.options.prefix 
        ? `${this.options.prefix}:${prefix}`
        : prefix,
    });
  }
}

// Export a singleton instance of the logger
export const logger = new Logger({
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
});

// Export the Logger class for creating custom loggers
export default Logger;

