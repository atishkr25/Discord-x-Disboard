import { NextRequest, NextResponse } from 'next/server';
import { discordOAuthCallback } from '@/lib/oauth';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    return await discordOAuthCallback(code);
  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
