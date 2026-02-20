'use client';

import { useEffect, useState } from 'react';
import ServerCard from '@/components/ServerCard';
import { serverAPI } from '@/lib/api-endpoints';
import { Zap, TrendingUp } from 'lucide-react';
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
}

/**
 * Home Page
 * Shows trending and recently bumped servers
 */
export default function Home() {
  const [trending, setTrending] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await serverAPI.getTrending();
        setTrending(data);
      } catch (error) {
        console.error('Failed to fetch trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Next Discord Community
            </h1>
            <p className="text-lg text-slate-200 mb-8">
              Browse thousands of Discord servers, or list your own to grow your community.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/browse"
                className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition"
              >
                Browse Servers
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                List Your Server
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-primary" size={28} />
            <h2 className="text-3xl font-bold">Trending Servers</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-lg h-48 animate-pulse" />
              ))}
            </div>
          ) : trending.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No servers found yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map((server) => (
                <ServerCard key={server._id} {...server} id={server._id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose DiscServer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Easy Discovery',
                desc: 'Find servers tailored to your interests with powerful search and filtering.',
              },
              {
                icon: '⚡',
                title: 'Bump System',
                desc: 'Keep your server visible with our 2-hour bump system.',
              },
              {
                icon: '🎯',
                title: 'Targeted Growth',
                desc: 'Use tags to reach the exact audience you\'re looking for.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
