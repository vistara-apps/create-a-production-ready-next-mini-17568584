# Environment Setup Guide

This guide explains how to set up the development environment for the My Base Mini App.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vistara-apps/create-a-production-ready-next-mini-17568584.git
cd create-a-production-ready-next-mini-17568584
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory based on the `.env.example` file:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file and fill in the required values:

```
# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# Logging
LOG_LEVEL=debug

# Blockchain RPC URLs
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_TESTNET_RPC_URL=https://goerli.base.org
```

#### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BASE_URL` | The base URL of the application | Yes |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | API key for OnchainKit | Yes |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | No (defaults to info) |
| `NEXT_PUBLIC_BASE_RPC_URL` | RPC URL for the Base blockchain | Yes |

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Workflow

### Code Structure

The application follows the Next.js App Router structure:

- `app/`: Contains pages, components, and API routes
- `public/`: Contains static assets
- `docs/`: Contains documentation

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code issues

### Testing Farcaster Frames Locally

To test Farcaster Frames locally, you'll need to:

1. Use a tool like ngrok to expose your local server:

```bash
ngrok http 3000
```

2. Update the `NEXT_PUBLIC_BASE_URL` in your `.env.local` to the ngrok URL:

```
NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok.io
```

3. Update the URLs in `public/.well-known/farcaster.json` to use the ngrok URL.

### Working with OnchainKit

To use OnchainKit features:

1. Obtain an API key from the OnchainKit website
2. Add the API key to your `.env.local` file
3. Use the provided hooks and components in your application

## Troubleshooting

### Common Issues

#### "Cannot find module '@coinbase/onchainkit'"

This error occurs when dependencies are not installed correctly. Try:

```bash
npm install
```

#### "API key not configured"

Ensure you have set the `NEXT_PUBLIC_ONCHAINKIT_API_KEY` in your `.env.local` file.

#### "Failed to connect to wallet"

This can happen if the RPC URL is incorrect or if there are network issues. Check your `NEXT_PUBLIC_BASE_RPC_URL` setting.

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [OnchainKit documentation](https://docs.onchainkit.xyz/)
2. Check the [Next.js documentation](https://nextjs.org/docs)
3. Open an issue on the GitHub repository

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OnchainKit Documentation](https://docs.onchainkit.xyz/)
- [Farcaster Frames Documentation](https://docs.farcaster.xyz/reference/frames/spec)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

