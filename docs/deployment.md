# Deployment Guide

This guide provides instructions for deploying the My Base Mini App to production environments.

## Deployment Options

The application can be deployed to various platforms:

1. **Vercel** (Recommended)
2. **Netlify**
3. **AWS Amplify**
4. **Self-hosted Node.js server**

## Preparing for Deployment

Before deploying, ensure you have:

1. Built and tested the application locally
2. Set up all required environment variables
3. Updated the configuration files with production values

## Deployment to Vercel

### Prerequisites

- A Vercel account
- The Vercel CLI (optional)

### Deployment Steps

#### Option 1: Using the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Set the framework preset to "Next.js"
   - Configure environment variables
6. Click "Deploy"

#### Option 2: Using the Vercel CLI

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Log in to Vercel:

```bash
vercel login
```

3. Deploy the application:

```bash
vercel
```

4. For production deployment:

```bash
vercel --prod
```

### Environment Variables

Set the following environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_BASE_URL`: The production URL of your application
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `LOG_LEVEL`: Set to "info" for production
- `NEXT_PUBLIC_BASE_RPC_URL`: Production RPC URL for the Base blockchain

## Deployment to Netlify

### Prerequisites

- A Netlify account
- The Netlify CLI (optional)

### Deployment Steps

#### Option 1: Using the Netlify Dashboard

1. Push your code to a Git repository
2. Log in to your Netlify account
3. Click "New site from Git"
4. Select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Configure environment variables
7. Click "Deploy site"

#### Option 2: Using the Netlify CLI

1. Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Log in to Netlify:

```bash
netlify login
```

3. Initialize your project:

```bash
netlify init
```

4. Deploy the application:

```bash
netlify deploy
```

5. For production deployment:

```bash
netlify deploy --prod
```

### Environment Variables

Set the environment variables in the Netlify dashboard under Site settings > Build & deploy > Environment.

## Deployment to AWS Amplify

### Prerequisites

- An AWS account
- The AWS Amplify CLI

### Deployment Steps

1. Install the AWS Amplify CLI:

```bash
npm install -g @aws-amplify/cli
```

2. Configure the AWS Amplify CLI:

```bash
amplify configure
```

3. Initialize your project:

```bash
amplify init
```

4. Add hosting:

```bash
amplify add hosting
```

5. Deploy the application:

```bash
amplify publish
```

### Environment Variables

Set the environment variables in the AWS Amplify Console under App settings > Environment variables.

## Self-hosted Deployment

### Prerequisites

- A server with Node.js installed
- A process manager like PM2

### Deployment Steps

1. Build the application:

```bash
npm run build
```

2. Set up environment variables on your server

3. Start the application with PM2:

```bash
pm2 start npm --name "base-mini-app" -- start
```

4. Set up a reverse proxy (Nginx or Apache) to forward requests to your Node.js application

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Steps

After deploying the application:

1. **Update Farcaster Configuration**: Update the URLs in `public/.well-known/farcaster.json` to use your production URL
2. **Verify Environment Variables**: Ensure all environment variables are correctly set
3. **Test the Application**: Verify that all features work correctly in the production environment
4. **Set Up Monitoring**: Configure monitoring and alerting for your application

## Continuous Deployment

For continuous deployment:

1. **Vercel and Netlify**: Automatically deploy when changes are pushed to the main branch
2. **AWS Amplify**: Configure automatic deployments from your Git repository
3. **Self-hosted**: Set up a CI/CD pipeline using GitHub Actions, GitLab CI, or Jenkins

## Troubleshooting

### Common Deployment Issues

#### "Build Failed" Error

Check the build logs for specific errors. Common issues include:

- Missing dependencies
- TypeScript errors
- Environment variable issues

#### "Application Error" in Production

Check the server logs for errors. Ensure all environment variables are correctly set.

#### Farcaster Frames Not Working

Verify that the URLs in `public/.well-known/farcaster.json` are correctly set to your production URL.

## Security Considerations

1. **Environment Variables**: Never commit sensitive environment variables to your repository
2. **API Keys**: Rotate API keys regularly
3. **HTTPS**: Ensure your application is served over HTTPS
4. **Content Security Policy**: Configure appropriate CSP headers

## Performance Optimization

1. **Caching**: Configure caching headers for static assets
2. **CDN**: Use a CDN for static assets
3. **Image Optimization**: Use Next.js Image component for optimized images
4. **Analytics**: Set up analytics to monitor performance

