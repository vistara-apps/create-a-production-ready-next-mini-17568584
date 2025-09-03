# My Base Mini App

A production-ready Next.js Base mini app using OnchainKit MiniKit.

## Features

- ✅ Next.js with App Router
- ✅ TypeScript for type safety
- ✅ OnchainKit integration for blockchain functionality
- ✅ MiniKit for Farcaster Frames
- ✅ Wallet connection with Wagmi
- ✅ Tailwind CSS for styling
- ✅ API routes for backend functionality
- ✅ Comprehensive error handling
- ✅ Structured logging
- ✅ Environment configuration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vistara-apps/create-a-production-ready-next-mini-17568584.git
cd create-a-production-ready-next-mini-17568584
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file with your values.

4. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Documentation

- [API Documentation](./docs/api.md)
- [Webhook Documentation](./docs/webhook.md)
- [Technical Specifications](./docs/technical-specs.md)
- [Environment Setup](./docs/environment-setup.md)
- [Deployment Guide](./docs/deployment.md)

## Project Structure

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

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code issues

## Deployment

See the [Deployment Guide](./docs/deployment.md) for detailed instructions on deploying the application to various platforms.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [OnchainKit](https://onchainkit.xyz/)
- [Farcaster](https://farcaster.xyz/)
- [Base](https://base.org/)
- [Tailwind CSS](https://tailwindcss.com/)

