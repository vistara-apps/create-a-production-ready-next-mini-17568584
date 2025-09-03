'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import Link from 'next/link';

/**
 * Header component props
 */
interface HeaderProps {
  title?: string;
}

/**
 * Header component for the application
 * Displays the app title and wallet connection button
 */
export default function Header({ title = 'My Base Mini App' }: HeaderProps) {
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
            {title}
          </Link>
          
          <nav className="hidden md:flex ml-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link 
              href="/docs" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Docs
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}

