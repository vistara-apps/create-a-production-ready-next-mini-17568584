import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { logger } from '@/app/lib/logger';

export const runtime = 'edge';

/**
 * API route for generating dynamic Open Graph images for Farcaster frames
 * This endpoint generates different images based on the action parameter
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'default';
    const fid = searchParams.get('fid') || 'unknown';
    
    logger.info('Generating OG image', { action, fid });
    
    // Define colors based on action
    let bgColor = '#000000';
    let textColor = '#FFFFFF';
    let title = 'My Base Mini App';
    let subtitle = 'Welcome to our application!';
    
    switch (action) {
      case 'primary':
        bgColor = '#3B82F6';
        title = 'Primary Action';
        subtitle = 'You selected the primary action';
        break;
      case 'secondary':
        bgColor = '#10B981';
        title = 'Secondary Action';
        subtitle = 'You selected the secondary action';
        break;
      case 'tertiary':
        bgColor = '#F59E0B';
        title = 'Tertiary Action';
        subtitle = 'You selected the tertiary action';
        break;
      case 'quaternary':
        bgColor = '#EF4444';
        title = 'Quaternary Action';
        subtitle = 'You selected the quaternary action';
        break;
      default:
        title = 'My Base Mini App';
        subtitle = 'Select an action to continue';
        break;
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            color: textColor,
            padding: '40px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, marginBottom: 40 }}>
            {subtitle}
          </div>
          {fid !== 'unknown' && (
            <div style={{ fontSize: 20, opacity: 0.8 }}>
              User FID: {fid}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    logger.error('Error generating OG image', { error });
    
    // Return a fallback image on error
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            padding: '40px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
            Error
          </div>
          <div style={{ fontSize: 30 }}>
            Failed to generate image
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}

