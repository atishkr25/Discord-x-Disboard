import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { serverService } from '@/lib/services/server.service';
import { discordService } from '@/lib/services/discord.service';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    let query: any = { status: 'approved' };

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (search) {
      query.$text = { $search: search };
    }

    const servers = await serverService.findAll(query, { bumpAt: -1 }, limit, skip);
    const total = await (require('@/lib/db/models').Server as any).countDocuments(query);

    return NextResponse.json({
      servers,
      hasMore: skip + limit < total,
      page,
      total
    });
  } catch (error: any) {
    console.error('Error fetching servers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    await connectDB();

    const body = await req.json();
    const { guildId, name, description, category, tags, inviteLink, icon, banner, memberCount, onlineCount } = body;

    // Validate required fields
    if (!guildId || !name || !description || !category || !inviteLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if server already exists
    const existing = await serverService.findAll({ guildId });
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Server already registered' }, { status: 409 });
    }

    // Verify bot is in guild
    const isBotInGuild = await discordService.checkBotInGuild(guildId);
    if (!isBotInGuild) {
      const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=8&guild_id=${guildId}`;
      return NextResponse.json({
        error: 'Bot must be added to the server before registration',
        code: 'BOT_MISSING',
        inviteUrl
      }, { status: 400 });
    }

    const savedServer = await serverService.create({
      guildId,
      name,
      description,
      category,
      tags: typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags || [],
      inviteLink,
      icon,
      banner,
      ownerId: user.id,
      memberCount: memberCount || 0,
      onlineCount: onlineCount || 0,
      status: 'pending',
      bumpAt: new Date(0)
    } as any);

    return NextResponse.json(savedServer, { status: 201 });
  } catch (error: any) {
    console.error('Error creating server:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
