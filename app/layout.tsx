import { Providers } from './providers';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Base Mini App</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}