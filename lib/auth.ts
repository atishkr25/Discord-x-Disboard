import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  discordId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(req: NextRequest): UserPayload | null {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAuth(req: NextRequest): UserPayload {
  const user = verifyToken(req);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
