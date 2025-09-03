import { Providers } from './providers';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Base Mini App',
  description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
  applicationName: 'My Base Mini App',
  authors: [{ name: 'Vistara Apps' }],
  keywords: ['base', 'blockchain', 'web3', 'dapp', 'farcaster', 'minikit', 'onchainkit'],
  creator: 'Vistara Apps',
  publisher: 'Vistara Apps',
  metadataBase: new URL('https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app',
    title: 'My Base Mini App',
    description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
    siteName: 'My Base Mini App',
    images: [
      {
        url: 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Base Mini App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Base Mini App',
    description: 'A production-ready Next.js Base mini app using OnchainKit MiniKit',
    images: ['https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
