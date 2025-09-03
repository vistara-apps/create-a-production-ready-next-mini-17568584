'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Docs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header title="My Base Mini App" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-300 mb-4">
              Welcome to the My Base Mini App documentation. This guide will help you understand
              how to use the application and its features.
            </p>
            <p className="text-gray-300">
              To get started, connect your wallet using the button in the header. Once connected,
              you'll be able to interact with the Base blockchain.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
              <p className="text-gray-300 mb-4">
                The application provides several API endpoints for integration with external services.
              </p>
              <h3 className="text-lg font-medium mb-2">Webhook Endpoint</h3>
              <p className="text-gray-300 mb-2">
                <code className="bg-gray-700 px-2 py-1 rounded">/api/webhook</code>
              </p>
              <p className="text-gray-300 mb-4">
                Used for Farcaster Frame interactions. Accepts POST requests with frame data.
              </p>
              <h3 className="text-lg font-medium mb-2">OG Image Generator</h3>
              <p className="text-gray-300 mb-2">
                <code className="bg-gray-700 px-2 py-1 rounded">/api/og</code>
              </p>
              <p className="text-gray-300">
                Generates dynamic Open Graph images for Farcaster frames.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Farcaster Integration</h2>
              <p className="text-gray-300 mb-4">
                The application integrates with Farcaster Frames using MiniKit.
              </p>
              <h3 className="text-lg font-medium mb-2">Frame Configuration</h3>
              <p className="text-gray-300 mb-4">
                The frame configuration is located in <code className="bg-gray-700 px-2 py-1 rounded">public/.well-known/farcaster.json</code>.
              </p>
              <h3 className="text-lg font-medium mb-2">Frame Ready</h3>
              <p className="text-gray-300">
                The application calls <code className="bg-gray-700 px-2 py-1 rounded">setFrameReady()</code> to initialize Farcaster integration.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <p className="text-gray-300 mb-4">
              The application requires several environment variables to function properly.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-left">Variable</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4"><code className="bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_BASE_URL</code></td>
                    <td className="py-2 px-4">The base URL of the application</td>
                    <td className="py-2 px-4">Yes</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4"><code className="bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_ONCHAINKIT_API_KEY</code></td>
                    <td className="py-2 px-4">API key for OnchainKit</td>
                    <td className="py-2 px-4">Yes</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4"><code className="bg-gray-700 px-2 py-1 rounded">LOG_LEVEL</code></td>
                    <td className="py-2 px-4">Logging level (debug, info, warn, error)</td>
                    <td className="py-2 px-4">No</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4"><code className="bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_BASE_RPC_URL</code></td>
                    <td className="py-2 px-4">RPC URL for the Base blockchain</td>
                    <td className="py-2 px-4">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

