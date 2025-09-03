'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header title="My Base Mini App" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About My Base Mini App</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-300 mb-4">
              My Base Mini App is a production-ready Next.js application built for the Base blockchain ecosystem.
              It integrates with OnchainKit and MiniKit to provide a seamless experience for users interacting
              with blockchain technology.
            </p>
            <p className="text-gray-300">
              This application demonstrates best practices for building decentralized applications (dApps)
              with modern web technologies.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <ul className="space-y-2 text-gray-300">
              <li><span className="font-medium">Next.js:</span> React framework with server-side rendering</li>
              <li><span className="font-medium">TypeScript:</span> Type-safe JavaScript</li>
              <li><span className="font-medium">OnchainKit:</span> Blockchain integration toolkit</li>
              <li><span className="font-medium">MiniKit:</span> Farcaster Frames integration</li>
              <li><span className="font-medium">Wagmi:</span> React hooks for Ethereum</li>
              <li><span className="font-medium">Tailwind CSS:</span> Utility-first CSS framework</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li><span className="font-medium">Wallet Connection:</span> Connect your Ethereum wallet</li>
              <li><span className="font-medium">Farcaster Integration:</span> Interact with Farcaster Frames</li>
              <li><span className="font-medium">API Routes:</span> Backend functionality with Next.js API routes</li>
              <li><span className="font-medium">Error Handling:</span> Comprehensive error handling</li>
              <li><span className="font-medium">Responsive Design:</span> Works on all device sizes</li>
            </ul>
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

