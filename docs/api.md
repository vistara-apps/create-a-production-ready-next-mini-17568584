# API Documentation

This document provides comprehensive documentation for the API endpoints available in the My Base Mini App.

## Base URL

All API endpoints are relative to the base URL:

```
https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app
```

## Authentication

Currently, the API endpoints do not require authentication. However, future versions may implement authentication mechanisms.

## API Endpoints

### Webhook Endpoint

The webhook endpoint is used for Farcaster Frame interactions.

**URL**: `/api/webhook`

**Method**: `POST`

**Request Body**:

```json
{
  "untrustedData": {
    "fid": 123456,
    "url": "https://example.com/frame",
    "messageHash": "0x...",
    "timestamp": 1234567890,
    "network": 1,
    "buttonIndex": 1,
    "inputText": "",
    "castId": {
      "fid": 123456,
      "hash": "0x..."
    }
  },
  "trustedData": {
    "messageBytes": "0x..."
  }
}
```

**Response**:

Returns an HTML response with the next frame to display.

**Example Response**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/api/og?action=primary&fid=123456" />
  <meta property="fc:frame:button:1" content="Continue" />
  <meta property="fc:frame:button:2" content="Go Back" />
  <meta property="fc:frame:post_url" content="https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/api/webhook" />
</head>
<body>
  <!-- Frame content -->
</body>
</html>
```

**Error Responses**:

- `400 Bad Request`: Invalid frame message
- `500 Internal Server Error`: Server error processing the request

### OG Image Generator

Generates dynamic Open Graph images for Farcaster frames.

**URL**: `/api/og`

**Method**: `GET`

**Query Parameters**:

- `action` (optional): The action type to generate an image for (default, primary, secondary, tertiary, quaternary)
- `fid` (optional): The Farcaster ID of the user

**Response**:

Returns a PNG image with the appropriate content based on the action.

**Example Usage**:

```
https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/api/og?action=primary&fid=123456
```

## Error Handling

All API endpoints follow a consistent error handling pattern:

- `400 Bad Request`: Invalid input or parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

Error responses are returned in the following format:

```json
{
  "error": {
    "type": "ERROR_TYPE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details (optional)
    }
  }
}
```

## Rate Limiting

Currently, there are no rate limits implemented. However, future versions may include rate limiting to prevent abuse.

## Versioning

The current API version is v1. Future versions will be available at `/api/v2/`, etc.

## Support

For API support, please contact the development team at support@example.com.

