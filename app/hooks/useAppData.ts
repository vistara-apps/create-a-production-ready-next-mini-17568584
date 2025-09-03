'use client';

import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/app/lib/logger';
import { retry } from '@/app/lib/utils';

/**
 * Interface for app data
 */
interface AppData {
  isLoading: boolean;
  error: Error | null;
  data: any | null;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for managing application data
 * This hook provides a generic way to fetch and manage data with loading and error states
 */
export function useAppData(
  fetchFn: () => Promise<any>,
  options: {
    initialData?: any;
    autoFetch?: boolean;
    retryCount?: number;
    dependencies?: any[];
  } = {}
): AppData {
  const {
    initialData = null,
    autoFetch = true,
    retryCount = 3,
    dependencies = [],
  } = options;
  
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any | null>(initialData);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await retry(fetchFn, {
        maxRetries: retryCount,
        onRetry: (error, attempt) => {
          logger.warn(`Data fetch retry ${attempt}`, { error: error.message });
        },
      });
      
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      logger.error('Failed to fetch app data', { error });
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, retryCount]);
  
  const refresh = useCallback(async () => {
    return fetchData();
  }, [fetchData]);
  
  useEffect(() => {
    if (autoFetch) {
      fetchData().catch((error) => {
        logger.error('Error in useAppData effect', { error });
      });
    }
  }, [...dependencies, fetchData]);
  
  return {
    isLoading,
    error,
    data,
    refresh,
  };
}

export default useAppData;

