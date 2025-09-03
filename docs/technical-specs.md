# Technical Specifications

This document outlines the technical specifications for the My Base Mini App, a production-ready Next.js application using OnchainKit and MiniKit.

## Architecture Overview

The application follows a modern web architecture with the following key components:

1. **Frontend**: Next.js with App Router
2. **Blockchain Integration**: OnchainKit and MiniKit
3. **Styling**: Tailwind CSS
4. **Type Safety**: TypeScript
5. **API Routes**: Next.js API routes for backend functionality

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.3 | React framework with server-side rendering |
| React | 18.x | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| OnchainKit | 0.38.19 | Blockchain integration toolkit |
| MiniKit | (part of OnchainKit) | Farcaster Frames integration |
| Wagmi | 2.14.11 | React hooks for Ethereum |
| Viem | 2.27.2 | TypeScript interface for Ethereum |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | 8.x | Code linting |
| Prettier | 3.5.3 | Code formatting |
| PostCSS | 8.x | CSS processing |
| Autoprefixer | 10.4.0 | CSS vendor prefixing |

## Application Structure

```
/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── og/             # OG image generation
│   │   └── webhook/        # Farcaster webhook
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and services
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Context providers
├── docs/                   # Documentation
├── public/                 # Static assets
│   ├── .well-known/        # Well-known files
│   │   └── farcaster.json  # Farcaster configuration
│   └── manifest.json       # Web app manifest
├── .env.example            # Environment variables example
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Features

### 1. Blockchain Integration

The application integrates with the Base blockchain using OnchainKit and Wagmi:

- **Wallet Connection**: Users can connect their Ethereum wallets
- **Transaction Handling**: Support for sending and receiving transactions
- **Chain Configuration**: Configured for the Base blockchain

### 2. Farcaster Frames Integration

The application supports Farcaster Frames using MiniKit:

- **Frame Ready**: Calls `setFrameReady()` to initialize Farcaster integration
- **Webhook Endpoint**: Handles frame interactions via `/api/webhook`
- **Dynamic OG Images**: Generates dynamic images for frames via `/api/og`

### 3. API Routes

The application includes the following API routes:

- **Webhook**: `/api/webhook` for Farcaster Frame interactions
- **OG Image**: `/api/og` for dynamic Open Graph image generation

### 4. Error Handling

The application implements comprehensive error handling:

- **Custom Error Types**: Different error types for various scenarios
- **Error Logging**: Structured logging for errors
- **User-Friendly Messages**: Displays appropriate error messages to users

### 5. Logging

The application uses a custom logging system:

- **Log Levels**: Support for debug, info, warn, and error levels
- **Structured Logging**: JSON-formatted logs with metadata
- **Environment-Aware**: Different logging behavior in development and production

## Performance Considerations

The application is optimized for performance:

- **Server-Side Rendering**: Uses Next.js SSR for improved initial load time
- **Code Splitting**: Automatic code splitting for optimized loading
- **Image Optimization**: Next.js image optimization for efficient delivery
- **Caching**: Implements appropriate caching strategies

## Security Considerations

The application implements several security measures:

- **Input Validation**: Validates all user inputs
- **Error Handling**: Prevents leaking sensitive information in errors
- **Environment Variables**: Sensitive configuration stored in environment variables
- **Content Security Policy**: Implements appropriate CSP headers

## Deployment Requirements

### Environment Variables

The application requires the following environment variables:

- `NEXT_PUBLIC_BASE_URL`: The base URL of the application
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API key for OnchainKit
- `LOG_LEVEL`: Logging level (debug, info, warn, error)
- `NEXT_PUBLIC_BASE_RPC_URL`: RPC URL for the Base blockchain

### Hosting Requirements

The application can be deployed to any platform that supports Next.js applications, such as:

- Vercel
- Netlify
- AWS Amplify
- Self-hosted Node.js server

### Build Process

To build the application for production:

```bash
npm run build
```

This generates an optimized production build in the `.next` directory.

## Integration Points

The application integrates with the following external services:

1. **Base Blockchain**: For wallet connection and transactions
2. **Farcaster**: For frame interactions
3. **OnchainKit API**: For blockchain data and services

## Future Enhancements

Potential future enhancements include:

1. **Authentication**: User authentication and authorization
2. **Database Integration**: Persistent storage for user data
3. **Analytics**: User behavior tracking and analytics
4. **Notifications**: Push notifications for important events
5. **Localization**: Support for multiple languages

