'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import ServerCard from '@/components/ServerCard';
import { serverAPI } from '@/lib/api-endpoints';

interface Server {
  _id: string;
  guildId: string;
  name: string;
  description: string;
  icon?: string;
  memberCount: number;
  tags: string[];
  bumpAt: string;
}

/**
 * Browse Page
 * Paginated list of all approved servers
 */
export default function Browse() {
  const [servers, setServers] = useState<Server[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        const { data } = await serverAPI.getServers(page, 12);
        setServers(data.servers);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Failed to fetch servers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [page]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Browse Servers</h1>
          <p className="text-slate-600">Discover amazing Discord communities</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-48 animate-pulse" />
            ))}
          </div>
        ) : servers.length === 0 ? (
          <p className="text-center text-slate-500 py-12">No servers found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {servers.map((server) => (
                <ServerCard key={server._id} {...server} id={server._id} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"
              >
                Previous
              </button>
              <span className="font-medium">Page {page}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
                className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary/90"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
