'use client';

import { useState, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { parseEther } from 'viem';
import { logger } from '@/app/lib/logger';

/**
 * Transaction status enum
 */
export enum TransactionStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Transaction result interface
 */
interface TransactionResult {
  status: TransactionStatus;
  hash: string | null;
  error: Error | null;
}

/**
 * Custom hook for managing blockchain transactions
 * This hook provides a way to send transactions and track their status
 */
export function useTransactions() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [transactions, setTransactions] = useState<Record<string, TransactionResult>>({});
  
  /**
   * Send a transaction to the blockchain
   */
  const sendTransaction = useCallback(
    async (
      to: string,
      value: string,
      data: string = '0x',
      options: {
        gasLimit?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {}
    ) => {
      if (!isConnected || !walletClient || !address) {
        throw new Error('Wallet not connected');
      }
      
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      try {
        setTransactions((prev) => ({
          ...prev,
          [id]: {
            status: TransactionStatus.PENDING,
            hash: null,
            error: null,
          },
        }));
        
        const hash = await walletClient.sendTransaction({
          to,
          value: parseEther(value),
          data,
          account: address,
          ...options,
        });
        
        logger.info('Transaction sent', { hash, to, value });
        
        setTransactions((prev) => ({
          ...prev,
          [id]: {
            status: TransactionStatus.SUCCESS,
            hash,
            error: null,
          },
        }));
        
        return { id, hash };
      } catch (error) {
        logger.error('Transaction failed', { error, to, value });
        
        const err = error instanceof Error ? error : new Error('Unknown error occurred');
        
        setTransactions((prev) => ({
          ...prev,
          [id]: {
            status: TransactionStatus.ERROR,
            hash: null,
            error: err,
          },
        }));
        
        throw err;
      }
    },
    [isConnected, walletClient, address]
  );
  
  /**
   * Clear a transaction from the state
   */
  const clearTransaction = useCallback((id: string) => {
    setTransactions((prev) => {
      const newTransactions = { ...prev };
      delete newTransactions[id];
      return newTransactions;
    });
  }, []);
  
  /**
   * Clear all transactions from the state
   */
  const clearAllTransactions = useCallback(() => {
    setTransactions({});
  }, []);
  
  return {
    transactions,
    sendTransaction,
    clearTransaction,
    clearAllTransactions,
  };
}

export default useTransactions;

