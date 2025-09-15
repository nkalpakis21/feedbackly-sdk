# API Integration Guide

This guide explains how to configure the Feedbackly SDK to work with your local development API or production API.

## Environment Variables

The SDK automatically detects the environment and chooses the appropriate API endpoint based on the following:

### Development Mode Detection

The SDK considers itself in development mode when:
- `NODE_ENV === 'development'` (Node.js environment)
- Running on `localhost`, `127.0.0.1`, or any hostname containing `local`
- Using demo/test API keys
- URL contains `?feedbackly-dev=true`

### API URL Selection

The SDK will use the local API (`http://localhost:3000`) when:
- In development mode AND
- `USE_LOCAL_API=true` environment variable is set OR
- URL contains `?feedbackly-local=true`

Otherwise, it defaults to the production API (`https://api.feedbackly.com`).

## Configuration Options

### Option 1: Environment Variables (Recommended)

Set the `USE_LOCAL_API` environment variable:

```bash
# For local development
export USE_LOCAL_API=true

# For production
export USE_LOCAL_API=false
# or simply don't set it
```

### Option 2: URL Parameters

Add `?feedbackly-local=true` to your page URL:

```
http://localhost:3000/your-page?feedbackly-local=true
```

### Option 3: Explicit Configuration

You can always override the API URL explicitly:

```javascript
const feedbackly = new Feedbackly({
  apiKey: 'your-api-key',
  websiteId: 'your-website-id',
  apiUrl: 'http://localhost:3000', // Explicitly set local API
  // ... other config
});
```

## Examples

### Local Development Setup

```bash
# Set environment variable
export USE_LOCAL_API=true

# Start your local API server
cd admin-portal
npm run dev

# In another terminal, start your app with the widget
cd your-app
npm start
```

### Production Setup

```bash
# Don't set USE_LOCAL_API or set it to false
export USE_LOCAL_API=false

# Deploy your app
npm run build
npm start
```

### Testing with URL Parameters

```javascript
// Visit your page with the local API flag
window.location.href = 'http://localhost:3000/your-page?feedbackly-local=true';
```

## API Endpoints

The SDK expects these endpoints to be available:

- `POST /api/feedback` - Submit feedback
- `POST /api/events` - Track events
- `GET /api/widget/config/{websiteId}` - Get widget configuration

## Troubleshooting

### Widget not connecting to local API

1. Check that `USE_LOCAL_API=true` is set
2. Verify your local API server is running on port 3000
3. Check browser console for CORS errors
4. Ensure the API endpoints are properly set up

### Widget using wrong API URL

1. Check environment variables
2. Verify URL parameters
3. Check explicit configuration in your code
4. Look at the browser console for the detected API URL

### CORS Issues

Make sure your local API server allows requests from your frontend domain. The API routes should include proper CORS headers.
