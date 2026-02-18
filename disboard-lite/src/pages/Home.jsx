import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServerCard } from '../components/ui/ServerCard';
import { getTrendingServers, getRecentServers } from '../services/api';

const CATEGORIES = [
    { name: 'Technology', icon: 'devices', href: '#' },
    { name: 'Education', icon: 'school', href: '#' },
    { name: 'Entertainment', icon: 'theater_comedy', href: '#' },
    { name: 'Business', icon: 'work', href: '#' },
    { name: 'Lifestyle', icon: 'self_improvement', href: '#' },
    { name: 'Art & Design', icon: 'palette', href: '#' },
];

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingRes, recentRes] = await Promise.all([
                    getTrendingServers(),
                    getRecentServers()
                ]);
                setTrending(trendingRes.data);
                setRecent(recentRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-20 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        Over 5,000 Communities
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        Find your <span className="text-primary">community</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of curated Discord servers tailored to your interests, professional growth, and lifestyle.
                    </p>

                    {/* Premium Search Bar */}
                    <div className="relative max-w-2xl mx-auto mt-12 group">
                        <div className="flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-all focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30">
                            <div className="pl-4 text-slate-400">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input type="text" className="flex-1 border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium px-4" placeholder="Search by interest, topic or keyword..." />
                            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Search
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Popular:</span>
                            <a href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">#AI-Models</a>
                            <a href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">#SaaS-Founders</a>
                            <a href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">#Crypto-Signals</a>
                            <a href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">#Gaming-Clans</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Servers Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trending Servers</h2>
                        <p className="text-slate-500 mt-2">The most active communities right now.</p>
                    </div>
                    <Link to="/search?sort=trending" className="flex items-center gap-1 text-primary font-bold hover:underline">
                        View all
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading servers...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trending.length > 0 ? trending.map(server => (
                            <ServerCard key={server._id} server={{ ...server, id: server._id }} />
                        )) : (
                            <div className="col-span-full text-center text-slate-500">No trending servers yet. Be the first!</div>
                        )}
                    </div>
                )}
            </section>

            {/* Recently Bumped Section (New) */}
            <section className="max-w-7xl mx-auto px-6 py-16 bg-slate-50/50 rounded-3xl">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Recently Bumped</h2>
                        <p className="text-slate-500 mt-2">Freshly updated servers.</p>
                    </div>
                    <Link to="/search?sort=recent" className="flex items-center gap-1 text-primary font-bold hover:underline">
                        View all
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading servers...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recent.length > 0 ? recent.map(server => (
                            <ServerCard key={server._id} server={{ ...server, id: server._id }} />
                        )) : (
                            <div className="col-span-full text-center text-slate-500">No servers found.</div>
                        )}
                    </div>
                )}
            </section>

            {/* Category Grid Section */}
            <section className="bg-white py-24 px-6 border-y border-slate-100">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore by Category</h2>
                    <p className="text-slate-500 mt-3 max-w-xl mx-auto text-lg leading-relaxed">Find exactly what you're looking for by browsing our curated collections.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <a key={i} href={cat.href} className="group flex flex-col items-center p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
                            </div>
                            <span className="font-bold text-slate-900">{cat.name}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Find your people in three easy steps</h2>
                        <p className="text-slate-500 mt-4 text-lg">We've built the most comprehensive directory to make community discovery seamless and fun.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
                        {[
                            { id: '01', title: 'Search & Filter', desc: 'Use our powerful search to filter through thousands of servers by tags, size, or specific interests.' },
                            { id: '02', title: 'Explore Stats', desc: 'Check member counts, activity levels, and community rules before you join to ensure it\'s a good fit.' },
                            { id: '03', title: 'Join & Connect', desc: 'Click a single button to join the server and start chatting with like-minded individuals instantly.' }
                        ].map((step) => (
                            <div key={step.id} className="relative group">
                                <div className="absolute -top-12 left-0 text-[120px] font-black text-primary/5 select-none leading-none group-hover:text-primary/10 transition-colors">{step.id}</div>
                                <div className="relative z-10 pt-4">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="bg-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/40">
                    <div className="absolute top-0 right-0 p-8 text-white/10 opacity-50">
                        <span className="material-symbols-outlined text-[300px] leading-none">diversity_3</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to join your next <br /> favorite community?</h2>
                        <p className="text-primary-foreground/80 text-white/80 text-lg mb-10 max-w-xl mx-auto">Discover the power of human connection on Discord. Start exploring today for free.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-black rounded-2xl hover:bg-slate-50 transition-all shadow-xl">Get Started Free</button>
                            <button className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">Submit Your Server</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
