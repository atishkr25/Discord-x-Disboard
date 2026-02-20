import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { serverService } from '@/lib/services/server.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const server = await serverService.findById(params.id);

    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    return NextResponse.json(server);
  } catch (error: any) {
    console.error('Error fetching server:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user: any = require('@/lib/auth').requireAuth(req);
    await connectDB();

    const body = await req.json();

    const server = await serverService.findById(params.id);
    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    if (server.ownerId.toString() !== user.id) {
      return NextResponse.json({ error: 'Unauthorized: You do not own this server' }, { status: 403 });
    }

    const updatedServer = await serverService.update(params.id, body);

    return NextResponse.json(updatedServer);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating server:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user: any = require('@/lib/auth').requireAuth(req);
    await connectDB();

    const server = await serverService.findById(params.id);
    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    if (server.ownerId.toString() !== user.id) {
      return NextResponse.json({ error: 'Unauthorized: You do not own this server' }, { status: 403 });
    }

    await serverService.delete(params.id);

    return NextResponse.json({ message: 'Server deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error deleting server:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
