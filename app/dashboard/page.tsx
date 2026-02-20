'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { serverAPI, authAPI } from '@/lib/api-endpoints';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Link from 'next/link';

interface Guild {
  id: string;
  name: string;
  icon?: string;
  isListed: boolean;
}

interface Server {
  _id: string;
  guildId: string;
  name: string;
  icon?: string;
  description: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * Dashboard Page
 * Protected page for authenticated users
 * View and manage their servers
 */
export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [myServers, setMyServers] = useState<Server[]>([]);
  const [activeTab, setActiveTab] = useState<'servers' | 'add'>('servers');
  const [fetchingGuilds, setFetchingGuilds] = useState(false);
  const [formData, setFormData] = useState({
    guildId: '',
    description: '',
    tags: '',
    inviteLink: '',
  });

  // Check authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch user's servers and guilds
  useEffect(() => {
    if (user) {
      fetchServersAndGuilds();
    }
  }, [user]);

  const fetchServersAndGuilds = async () => {
    try {
      const [serversRes, guildsRes] = await Promise.all([
        serverAPI.getMyServers(),
        authAPI.getGuilds(),
      ]);

      const serverGuildIds = new Set(serversRes.data.map((s: Server) => s.guildId));
      const guildsWithStatus = (guildsRes.data || []).map((g: Guild) => ({
        ...g,
        isListed: serverGuildIds.has(g.id),
      }));

      setMyServers(serversRes.data);
      setGuilds(guildsWithStatus);
    } catch (error) {
      console.error('Failed to fetch servers/guilds:', error);
    }
  };

  const handleRegisterServer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.guildId || !formData.description || !formData.inviteLink) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const selectedGuild = guilds.find((g) => g.id === formData.guildId);
      if (!selectedGuild) return;

      await serverAPI.registerServer({
        guildId: formData.guildId,
        name: selectedGuild.name,
        description: formData.description,
        icon: selectedGuild.icon,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        inviteLink: formData.inviteLink,
      });

      alert('Server registered successfully! It will appear after moderation.');
      setFormData({
        guildId: '',
        description: '',
        tags: '',
        inviteLink: '',
      });
      setActiveTab('servers');
      fetchServersAndGuilds();
    } catch (error) {
      console.error('Failed to register:', error);
      alert('Failed to register server. Please try again.');
    }
  };

  const handleDeleteServer = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      await serverAPI.deleteServer(id);
      fetchServersAndGuilds();
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete server');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, <strong>{user.username}</strong>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('servers')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'servers'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            My Servers ({myServers.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'add'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Register Server
          </button>
        </div>

        {/* My Servers Tab */}
        {activeTab === 'servers' && (
          <div>
            {myServers.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
                <p className="text-slate-600 mb-4">You haven't registered any servers yet</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Register Your First Server
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {myServers.map((server) => (
                  <div key={server._id} className="bg-white rounded-lg p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{server.name}</h3>
                        <p className="text-sm text-slate-600">{server.description}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          server.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : server.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {server.status}
                      </span>
                    </div>

                    {server.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {server.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/server/${server._id}`}
                        className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDeleteServer(server._id)}
                        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Register Server Tab */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <form onSubmit={handleRegisterServer} className="max-w-xl space-y-6">
              {/* Server Select */}
              <div>
                <label className="block text-sm font-bold mb-2">Select Server *</label>
                <select
                  value={formData.guildId}
                  onChange={(e) => setFormData({ ...formData, guildId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Choose a server...</option>
                  {guilds
                    .filter((g) => !g.isListed)
                    .map((guild) => (
                      <option key={guild.id} value={guild.id}>
                        {guild.name}
                      </option>
                    ))}
                </select>
                {guilds.filter((g) => !g.isListed).length === 0 && (
                  <p className="text-sm text-slate-600 mt-2">
                    All your servers are already listed. Join a Discord server and come back!
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your server in a few sentences..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-bold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. gaming, chill, roleplay"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
                <p className="text-xs text-slate-600 mt-1">Max 10 tags</p>
              </div>

              {/* Invite Link */}
              <div>
                <label className="block text-sm font-bold mb-2">Invite Link *</label>
                <input
                  type="url"
                  value={formData.inviteLink}
                  onChange={(e) => setFormData({ ...formData, inviteLink: e.target.value })}
                  placeholder="https://discord.gg/..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
              >
                Register Server
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
