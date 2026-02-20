import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { serverService } from '@/lib/services/server.service';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const servers = await serverService.getTrending();

    return NextResponse.json(servers);
  } catch (error: any) {
    console.error('Error fetching trending servers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
