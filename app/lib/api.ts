import { logger } from './logger';
import { retry } from './utils';
import {
  createExternalServiceError,
  createValidationError,
  createNotFoundError,
} from './error';

/**
 * Base API client for making HTTP requests
 */
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  
  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }
  
  /**
   * Make a GET request
   */
  async get<T>(
    path: string,
    options: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
      cache?: RequestCache;
    } = {}
  ): Promise<T> {
    const { params, headers, cache } = options;
    const url = this.buildUrl(path, params);
    
    return this.request<T>('GET', url, undefined, headers, cache);
  }
  
  /**
   * Make a POST request
   */
  async post<T>(
    path: string,
    data?: any,
    options: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const { params, headers } = options;
    const url = this.buildUrl(path, params);
    
    return this.request<T>('POST', url, data, headers);
  }
  
  /**
   * Make a PUT request
   */
  async put<T>(
    path: string,
    data?: any,
    options: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const { params, headers } = options;
    const url = this.buildUrl(path, params);
    
    return this.request<T>('PUT', url, data, headers);
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T>(
    path: string,
    options: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const { params, headers } = options;
    const url = this.buildUrl(path, params);
    
    return this.request<T>('DELETE', url, undefined, headers);
  }
  
  /**
   * Make a PATCH request
   */
  async patch<T>(
    path: string,
    data?: any,
    options: {
      params?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const { params, headers } = options;
    const url = this.buildUrl(path, params);
    
    return this.request<T>('PATCH', url, data, headers);
  }
  
  /**
   * Build a URL with query parameters
   */
  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }
  
  /**
   * Make an HTTP request with retry logic
   */
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    headers?: Record<string, string>,
    cache?: RequestCache
  ): Promise<T> {
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
    
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      cache,
    };
    
    if (data !== undefined) {
      requestOptions.body = JSON.stringify(data);
    }
    
    try {
      const response = await retry(
        async () => {
          const res = await fetch(url, requestOptions);
          
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            
            // Handle different error status codes
            switch (res.status) {
              case 400:
                throw createValidationError('Bad request', errorData);
              case 404:
                throw createNotFoundError('Resource not found', errorData);
              default:
                throw createExternalServiceError(
                  `API request failed with status ${res.status}`,
                  { status: res.status, ...errorData }
                );
            }
          }
          
          return res;
        },
        {
          maxRetries: 3,
          onRetry: (error, attempt) => {
            logger.warn(`API request retry ${attempt}`, {
              url,
              method,
              error: error.message,
            });
          },
        }
      );
      
      // For 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }
      
      return response.json();
    } catch (error) {
      logger.error('API request failed', {
        url,
        method,
        error,
      });
      
      throw error;
    }
  }
}

/**
 * Create an API client instance for the Farcaster API
 */
export const farcasterApi = new ApiClient('https://api.farcaster.xyz/v1');

/**
 * Create an API client instance for the Base blockchain API
 */
export const baseApi = new ApiClient('https://api.base.org/v1');

/**
 * Export the ApiClient class for creating custom API clients
 */
export default ApiClient;

