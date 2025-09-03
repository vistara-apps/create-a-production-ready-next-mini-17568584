'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import { formatAddress } from './lib/utils';

export default function Home() {
  const { setFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Set frame ready for Farcaster integration
    setFrameReady();
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setFrameReady]);

  // Handle error state for demonstration
  const handleErrorClick = () => {
    setError(new Error('This is a demonstration error. Click "Try again" to dismiss.'));
  };

  // Handle retry for error demonstration
  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header title="My Base Mini App" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingState message="Loading application..." />
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Base Mini App</h1>
            
            <p className="text-gray-300 mb-8">
              This is a production-ready Next.js application using OnchainKit and MiniKit.
              Connect your wallet to get started.
            </p>
            
            {error && (
              <ErrorMessage 
                title="Error Demonstration" 
                message={error.message} 
                retry={handleRetry} 
              />
            )}
            
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
              
              {isConnected && address ? (
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="font-medium">Connected Address:</span>{' '}
                    <code className="bg-gray-700 px-2 py-1 rounded text-green-400">
                      {formatAddress(address, 8, 6)}
                    </code>
                  </p>
                  <p className="text-gray-400 text-sm">
                    You're now connected to the Base network.
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">
                  Please connect your wallet using the button in the header.
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-2 text-gray-300">
                  <li>✅ Next.js with App Router</li>
                  <li>✅ OnchainKit Integration</li>
                  <li>✅ MiniKit for Farcaster</li>
                  <li>✅ Wallet Connection</li>
                  <li>✅ TypeScript Support</li>
                  <li>✅ Tailwind CSS Styling</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-4">
                  <button
                    onClick={handleErrorClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Demonstrate Error Handling
                  </button>
                  
                  <a
                    href="/api/webhook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
                  >
                    View Webhook Endpoint
                  </a>
                  
                  <a
                    href="https://docs.base.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
                  >
                    Base Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
