/**
 * Authentication utilities and hooks
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from './api-endpoints';

export interface User {
  _id: string;
  discordId: string;
  username: string;
  email?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

// Global cache for auth requests to prevent concurrent duplicates
let authPromise: Promise<{ user: User } | null> | null = null;
let cachedUser: User | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to check if user is authenticated
 * Returns user if authenticated, null otherwise
 * Uses global cache to prevent duplicate concurrent requests
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser && Date.now() - cacheTimestamp > CACHE_DURATION);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // If cache is still valid, use it
      if (cachedUser && Date.now() - cacheTimestamp < CACHE_DURATION) {
        if (isMounted) {
          setUser(cachedUser);
          setLoading(false);
        }
        return;
      }

      // If a request is already pending, wait for it
      if (authPromise) {
        try {
          const result = await authPromise;
          if (isMounted) {
            setUser(result?.user || null);
            setLoading(false);
          }
        } catch (error) {
          if (isMounted) {
            setUser(null);
            setLoading(false);
          }
        }
        return;
      }

      // Otherwise, make a new request
      authPromise = (async () => {
        try {
          const { data } = await authAPI.getMe();
          cachedUser = data.user;
          cacheTimestamp = Date.now();
          if (isMounted) {
            setUser(data.user);
          }
          return data;
        } catch (error: any) {
          // 401 is expected when not logged in, not an error
          if (error.response?.status === 401) {
            cachedUser = null;
            cacheTimestamp = Date.now();
            if (isMounted) {
              setUser(null);
            }
            return null;
          }
          // Log other errors but don't crash
          console.error('Auth check failed:', error.message);
          cachedUser = null;
          if (isMounted) {
            setUser(null);
          }
          return null;
        } finally {
          if (isMounted) {
            setLoading(false);
          }
          authPromise = null;
        }
      })();

      try {
        await authPromise;
      } catch {
        // Error already handled above
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      await authAPI.logout();
      cachedUser = null;
      cacheTimestamp = 0;
      setUser(null);
      authPromise = null;
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if logout fails
      cachedUser = null;
      setUser(null);
    }
  };

  return { user, loading, logout };
}

/**
 * Redirects to Discord OAuth login
 */
export function loginWithDiscord() {
  const redirectUri = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/discord`;
  window.location.href = redirectUri;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}
