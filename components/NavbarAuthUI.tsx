'use client';

import { useAuth, loginWithDiscord } from '@/lib/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavbarAuthUI() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Only render after mount to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />;
  }

  if (loading) {
    return <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition"
        >
          Dashboard
        </Link>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          {user.avatar && (
            <img
              src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-slate-700">{user.username}</span>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="ml-2 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={loginWithDiscord}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
    >
      <span>Discord Login</span>
    </button>
  );
}
