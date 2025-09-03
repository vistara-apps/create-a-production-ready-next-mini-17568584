import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { logger } from '@/app/lib/logger';

/**
 * Webhook endpoint for Farcaster Frame interactions
 * This endpoint handles frame actions from Farcaster and returns appropriate responses
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body
    const body: FrameRequest = await req.json();
    
    // Validate and process the frame message
    const { isValid, message } = await getFrameMessage(body);
    
    if (!isValid || !message) {
      logger.warn('Invalid frame message received', { body });
      return NextResponse.json({ error: 'Invalid frame message' }, { status: 400 });
    }
    
    // Log the frame interaction
    logger.info('Frame interaction received', { 
      fid: message.fid,
      buttonIndex: message.button,
      frameUrl: message.url
    });
    
    // Process different button actions
    switch (message.button) {
      case 1:
        return handlePrimaryAction(message);
      case 2:
        return handleSecondaryAction(message);
      case 3:
        return handleTertiaryAction(message);
      case 4:
        return handleQuaternaryAction(message);
      default:
        return handleDefaultAction(message);
    }
  } catch (error) {
    logger.error('Error processing webhook', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Handle the primary button action (button index 1)
 */
function handlePrimaryAction(message: any) {
  const html = getFrameHtmlResponse({
    buttons: [
      {
        label: 'Continue',
      },
      {
        label: 'Go Back',
      }
    ],
    image: {
      src: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/og?action=primary&fid=${message.fid}`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/webhook`,
  });
  
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * Handle the secondary button action (button index 2)
 */
function handleSecondaryAction(message: any) {
  const html = getFrameHtmlResponse({
    buttons: [
      {
        label: 'Start Over',
      }
    ],
    image: {
      src: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/og?action=secondary&fid=${message.fid}`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/webhook`,
  });
  
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * Handle the tertiary button action (button index 3)
 */
function handleTertiaryAction(message: any) {
  const html = getFrameHtmlResponse({
    buttons: [
      {
        label: 'Start Over',
      }
    ],
    image: {
      src: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/og?action=tertiary&fid=${message.fid}`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/webhook`,
  });
  
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * Handle the quaternary button action (button index 4)
 */
function handleQuaternaryAction(message: any) {
  const html = getFrameHtmlResponse({
    buttons: [
      {
        label: 'Start Over',
      }
    ],
    image: {
      src: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/og?action=quaternary&fid=${message.fid}`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/webhook`,
  });
  
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * Handle the default action when no specific button is pressed
 */
function handleDefaultAction(message: any) {
  const html = getFrameHtmlResponse({
    buttons: [
      {
        label: 'Action 1',
      },
      {
        label: 'Action 2',
      },
      {
        label: 'Action 3',
      },
      {
        label: 'Action 4',
      }
    ],
    image: {
      src: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/og?action=default&fid=${message.fid}`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://miniappprodverify1-6cwj-mbhbdmp01-vistara.vercel.app'}/api/webhook`,
  });
  
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

