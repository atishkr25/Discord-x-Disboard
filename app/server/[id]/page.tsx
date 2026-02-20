'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { serverAPI } from '@/lib/api-endpoints';
import { formatMemberCount, timeAgo } from '@/lib/utils';
import Link from 'next/link';

interface Server {
  _id: string;
  guildId: string;
  name: string;
  description: string;
  icon?: string;
  memberCount: number;
  tags: string[];
  bumpAt: string;
  inviteLink: string;
  ownerId: {
    username: string;
  };
  createdAt: string;
}

/**
 * Server Detail Page
 * Shows full server information
 */
export default function ServerDetail() {
  const params = useParams();
  const id = params.id as string;
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const { data } = await serverAPI.getServer(id);
        setServer(data);
      } catch (error) {
        console.error('Failed to fetch server:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="bg-white rounded-lg p-8 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
          <div className="h-32 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  if (!server) {
    return (
      <div className="container py-12 text-center">
        <p className="text-slate-500">Server not found</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container">
        <Link href="/browse" className="text-primary font-medium mb-6 inline-block hover:underline">
          ← Back to Browse
        </Link>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary" />

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  {server.icon ? (
                    <Image
                      src={server.icon}
                      alt={server.name}
                      width={80}
                      height={80}
                      className="rounded-lg border-2 border-slate-200 -mt-12"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-200 rounded-lg -mt-12 border-2 border-white flex items-center justify-center font-bold text-2xl">
                      {server.name.charAt(0)}
                    </div>
                  )}
                  <div className="-mt-2">
                    <h1 className="text-4xl font-bold">{server.name}</h1>
                    <p className="text-slate-600">By {server.ownerId.username}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Members</p>
                    <p className="text-2xl font-bold">{formatMemberCount(server.memberCount)}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Last Bump</p>
                    <p className="text-lg font-bold">{timeAgo(server.bumpAt)}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Created</p>
                    <p className="text-lg font-bold">{timeAgo(server.createdAt)}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {server.description}
                  </p>
                </div>

                {/* Tags */}
                {server.tags.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {server.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/search?tag=${tag}`}
                          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-primary hover:text-white transition"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="w-full md:w-80">
                <div className="bg-slate-50 rounded-lg p-6 sticky top-20">
                  <a
                    href={server.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition text-center mb-4"
                  >
                    Join Server
                  </a>
                  <button className="w-full py-3 px-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition">
                    ♥ Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
