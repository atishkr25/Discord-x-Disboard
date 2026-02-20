'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ServerCard from '@/components/ServerCard';
import { serverAPI } from '@/lib/api-endpoints';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

const POPULAR_TAGS = [
  'gaming',
  'community',
  'tech',
  'music',
  'art',
  'roleplay',
  'anime',
  'study',
  'business',
  'creative',
];

/**
 * Search Page
 * Search servers by tag
 */
export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag') || '';
  const [tag, setTag] = useState(initialTag);
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTag: string) => {
    if (!searchTag.trim()) {
      setServers([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await serverAPI.searchByTag(searchTag);
      setServers(data);
    } catch (error) {
      console.error('Failed to search:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTag) {
      handleSearch(initialTag);
    }
  }, [initialTag]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Servers</h1>

          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by tag..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(tag)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Popular Tags */}
        {servers.length === 0 && !loading && (
          <div className="mb-12">
            <h2 className="text-lg font-bold mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTag(t);
                    handleSearch(t);
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-primary hover:text-primary transition"
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-48 animate-pulse" />
            ))}
          </div>
        ) : servers.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            {tag ? 'No servers found with that tag' : 'Search for a tag to get started'}
          </p>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-6">
              Found {servers.length} server{servers.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servers.map((server) => (
                <ServerCard key={server._id} {...server} id={server._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
