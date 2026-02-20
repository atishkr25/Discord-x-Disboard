import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { serverService } from '@/lib/services/server.service';

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    await connectDB();

    const servers = await serverService.findByOwner(user.id);

    return NextResponse.json(servers);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching my servers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
