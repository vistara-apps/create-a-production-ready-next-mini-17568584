# Webhook Documentation

This document provides detailed information about the webhook endpoint used for Farcaster Frame interactions in the My Base Mini App.

## Overview

The webhook endpoint is a crucial component of the Farcaster Frames integration. It receives user interactions from Farcaster and returns the appropriate frame response.

## Endpoint Details

**URL**: `/api/webhook`

**Method**: `POST`

**Content-Type**: `application/json`

## Request Format

The webhook endpoint expects a POST request with a JSON body in the Farcaster Frame format:

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

### Key Fields

- `untrustedData.fid`: The Farcaster ID of the user interacting with the frame
- `untrustedData.buttonIndex`: The index of the button that was clicked (1-4)
- `untrustedData.inputText`: Text input from the user (if applicable)
- `trustedData.messageBytes`: The signed message bytes for verification

## Response Format

The webhook returns an HTML response with the appropriate frame metadata:

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

## Button Actions

The webhook handles different button actions:

1. **Primary Action (Button 1)**:
   - Returns a frame with "Continue" and "Go Back" buttons
   - Image shows the primary action state

2. **Secondary Action (Button 2)**:
   - Returns a frame with a "Start Over" button
   - Image shows the secondary action state

3. **Tertiary Action (Button 3)**:
   - Returns a frame with a "Start Over" button
   - Image shows the tertiary action state

4. **Quaternary Action (Button 4)**:
   - Returns a frame with a "Start Over" button
   - Image shows the quaternary action state

5. **Default Action (No button or initial load)**:
   - Returns a frame with all four action buttons
   - Image shows the default state

## Error Handling

The webhook implements robust error handling:

- **Invalid Frame Message**: Returns a 400 Bad Request response
- **Server Error**: Returns a 500 Internal Server Error response

All errors are logged for monitoring and debugging purposes.

## Security Considerations

The webhook implements several security measures:

1. **Message Verification**: Verifies the authenticity of the frame message using the Farcaster protocol
2. **Input Validation**: Validates all input parameters before processing
3. **Error Logging**: Logs all errors for security monitoring

## Testing the Webhook

You can test the webhook using tools like cURL or Postman:

```bash
curl -X POST https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Debugging

For debugging webhook issues, check the application logs. The webhook logs all interactions and errors with relevant context information.

