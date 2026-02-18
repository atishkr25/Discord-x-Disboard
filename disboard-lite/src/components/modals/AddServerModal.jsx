import React, { useState } from 'react';
import { createServer } from '../../services/api';

export default function AddServerModal({ isOpen, onClose, selectedGuild, onSuccess }) {
    const [formData, setFormData] = useState({ description: '', category: 'Community', tags: '', inviteLink: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !selectedGuild) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const payload = {
                guildId: selectedGuild.id,
                name: selectedGuild.name,
                icon: selectedGuild.icon ? `https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png` : '',
                banner: selectedGuild.banner ? `https://cdn.discordapp.com/banners/${selectedGuild.id}/${selectedGuild.banner}.png` : '',
                memberCount: selectedGuild.approximate_member_count || 0,
                ...formData
            };

            await createServer(payload);
            setSuccess('Server registered successfully!');
            setTimeout(() => {
                onSuccess();
                onClose();
                setSuccess('');
                setFormData({ description: '', category: 'Community', tags: '', inviteLink: '' });
            }, 1500);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message.includes('Bot must be added')) {
                    setError('Bot is not in this server. Please invite it first!');
                } else {
                    setError(err.response.data.message);
                }
            } else {
                setError('Failed to register server.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const inviteBot = () => {
        const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
        if (!clientId) {
            console.error("VITE_DISCORD_CLIENT_ID is missing in .env");
            setError("Configuration error: Missing Client ID");
            return;
        }
        const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands&guild_id=${selectedGuild.id}&disable_guild_select=true`;
        window.open(url, '_blank', 'width=500,height=800');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Add "{selectedGuild.name}"</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm flex flex-col gap-2 border border-red-100 shadow-sm">
                            <div className="flex items-center gap-2 font-bold">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                {error}
                            </div>
                            {error.includes('invite it') && (
                                <button onClick={inviteBot} className="self-start text-xs bg-red-600 text-white px-3 py-2 rounded-lg font-bold hover:bg-red-700 shadow-sm hover:shadow transition-all">
                                    Invite Bot to Server
                                </button>
                            )}
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 text-sm flex items-center gap-2 font-bold border border-emerald-100">
                            <span className="material-symbols-outlined">check_circle</span>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea
                                required
                                className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium resize-none"
                                rows="3"
                                placeholder="What is your server about? Convince people to join!"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 pl-3 pr-10 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold bg-white appearance-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Community</option>
                                        <option>Gaming</option>
                                        <option>Technology</option>
                                        <option>Education</option>
                                        <option>Music</option>
                                        <option>Art & Design</option>
                                        <option>Anime</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                                    placeholder="chill, gaming"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Permanent Invite Link</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                                <input
                                    type="url"
                                    required
                                    className="w-full p-3 pl-10 rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                                    placeholder="https://discord.gg/..."
                                    value={formData.inviteLink}
                                    onChange={e => setFormData({ ...formData, inviteLink: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end gap-3 border-t border-slate-100 mt-6">
                            <button type="button" onClick={onClose} disabled={isSubmitting} className="px-5 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:translate-y-0 text-sm">
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                        Add Server
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
