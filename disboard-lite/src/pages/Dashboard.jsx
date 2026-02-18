import React, { useState } from 'react';
import { ServerCard } from '../components/ui/ServerCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import AddServerModal from '../components/modals/AddServerModal';
import { useServerData } from '../hooks/useServerData';

export default function Dashboard() {
    const { myServers, discordGuilds, loading, refreshData } = useServerData();
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState(null);
    const [error, setError] = useState('');

    const handleSyncDiscord = () => {
        const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
        if (!clientId) {
            console.error("VITE_DISCORD_CLIENT_ID is missing");
            return;
        }
        // Allow user to select any guild to add the bot
        const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;
        window.open(url, 'discord_auth', 'width=600,height=800');
    };

    // Handle OAuth Popup Communication
    React.useEffect(() => {
        // 1. If we are the popup (redirected here after auth), notify opener and close
        if (window.opener && window.opener !== window) {
            window.opener.postMessage({ type: 'DISCORD_AUTH_SUCCESS' }, window.location.origin);
            window.close();
            return;
        }

        // 2. If we are the main window, listen for success message
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data.type === 'DISCORD_AUTH_SUCCESS') {
                refreshData();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [refreshData]);

    const handleAddServer = (guild) => {
        // Check if already registered
        const isRegistered = myServers.find(s => s.guildId === guild.id);
        if (isRegistered) {
            setError('This server is already registered!');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setSelectedGuild(guild);
        setShowAddModal(true);
        setError('');
    };

    if (loading) return <LoadingSpinner text="Loading dashboard..." />;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen font-display">
            <h1 className="text-3xl font-black text-slate-900 mb-2">My Dashboard</h1>
            <p className="text-slate-500 mb-10">Manage your servers and view analytics.</p>

            {/* My Listed Servers */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">dns</span>
                    <h2 className="text-xl font-bold text-slate-800">My Listed Servers</h2>
                </div>

                {myServers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myServers.map(server => (
                            <ServerCard key={server._id} server={{ ...server, id: server._id }} />
                        ))}
                    </div>
                ) : (
                    <div className="p-10 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center">
                        <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-400">
                            <span className="material-symbols-outlined text-3xl">add_server</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">No servers listed yet</h3>
                        <p className="text-slate-400 max-w-sm mx-auto mb-6">Add your Discord server to start gaining members and growing your community.</p>
                        <button onClick={handleSyncDiscord} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                            <span className="material-symbols-outlined">sync</span>
                            Sync with Discord
                        </button>
                    </div>
                )}
            </section>

            {/* Add New Server */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-emerald-500">add_circle</span>
                    <h2 className="text-xl font-bold text-slate-800">Available to Add</h2>
                </div>

                <p className="mb-6 text-slate-500 text-sm bg-blue-50 text-blue-700 p-3 rounded-xl inline-block border border-blue-100">
                    <span className="font-bold">Note:</span> Only servers where you have <b>Manage Server</b> or <b>Admin</b> permissions are shown.
                </p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 font-bold border border-red-100">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {discordGuilds.length > 0 ? discordGuilds.map(guild => {
                        const isRegistered = myServers.some(s => s.guildId === guild.id);
                        return (
                            <div key={guild.id}
                                className={`group relative p-4 rounded-xl border transition-all duration-200 ${isRegistered ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer'}`}
                                onClick={() => !isRegistered && handleAddServer(guild)}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    {guild.icon ? (
                                        <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} className="w-12 h-12 rounded-xl shadow-sm group-hover:shadow-md transition-all" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                                            {guild.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <div className="font-bold text-slate-800 truncate text-sm">{guild.name}</div>
                                        <div className="text-xs text-slate-400 font-mono mt-0.5">ID: {guild.id.slice(0, 8)}...</div>
                                    </div>
                                </div>
                                <div className={`text-xs font-bold uppercase tracking-wider text-center py-2 rounded-lg ${isRegistered ? 'bg-slate-200 text-slate-500' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'}`}>
                                    {isRegistered ? 'Already Listed' : 'Add Server'}
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 border-dashed text-center">
                            <p className="text-slate-500 italic mb-4">No eligible servers found. Make sure you are an Admin!</p>
                            <button onClick={handleSyncDiscord} className="text-primary font-bold hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Add Bot to a Server
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Add Server Modal */}
            <AddServerModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                selectedGuild={selectedGuild}
                onSuccess={refreshData}
            />
        </div>
    );
}
