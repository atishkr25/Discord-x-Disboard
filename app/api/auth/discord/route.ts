import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/discord/callback`;
  const SCOPE = 'identify email guilds';

  const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize');
  discordAuthUrl.searchParams.append('client_id', CLIENT_ID!);
  discordAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  discordAuthUrl.searchParams.append('response_type', 'code');
  discordAuthUrl.searchParams.append('scope', SCOPE);

  return NextResponse.redirect(discordAuthUrl.toString());
}
