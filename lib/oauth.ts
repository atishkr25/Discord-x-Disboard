import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000';

export async function discordOAuthCallback(code: string) {
  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${CLIENT_URL}/api/auth/discord/callback`,
        scope: 'identify%20email%20guilds'
      }).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error);
    }

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const discordUser = await userResponse.json();

    // Connect to DB
    await connectDB();

    // Find or create user
    let user = await User.findOne({ discordId: discordUser.id });

    if (!user) {
      user = new User({
        discordId: discordUser.id,
        username: discordUser.username,
        avatar: discordUser.avatar,
        email: discordUser.email,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        role: 'user'
      });
    } else {
      user.accessToken = tokenData.access_token;
      user.refreshToken = tokenData.refresh_token;
      user.username = discordUser.username;
      user.avatar = discordUser.avatar;
    }

    await user.save();

    // Create JWT
    const jwtToken = jwt.sign(
      { id: user._id.toString(), discordId: user.discordId, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with redirect
    const response = NextResponse.redirect(`${CLIENT_URL}/dashboard`);
    response.cookies.set('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('OAuth error:', error);
    throw error;
  }
}
