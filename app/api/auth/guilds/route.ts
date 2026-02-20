import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { discordService } from '@/lib/services/discord.service';
import { serverService } from '@/lib/services/server.service';

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    await connectDB();

    const guilds = await discordService.getUserGuilds(user.id);

    // Check which guilds are already listed
    const guildIds = guilds.map((g: any) => g.id);
    const existingServers = await serverService.findAll({ guildId: { $in: guildIds } });
    const existingGuildIds = new Set(existingServers.map(s => s.guildId));

    const result = guilds.map((g: any) => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
      permissions: g.permissions,
      isListed: existingGuildIds.has(g.id)
    }));

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching guilds:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
