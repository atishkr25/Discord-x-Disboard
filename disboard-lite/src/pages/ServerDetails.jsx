import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BrowseServerCard } from '../components/ui/BrowseServerCard';

// Mock Data
const SERVER_DATA = {
    id: "1",
    name: "Aether Community",
    description: "The ultimate sanctuary for developers, creators, and digital nomads.",
    longDescription: (
        <>
            <p className="mb-4">Welcome to Aether Community! We are a high-engagement hub dedicated to providing developers and gamers with a place to collaborate, share projects, and find teammates. Founded in 2021, we have grown from a small group of friends into a global ecosystem of creative minds.</p>
            <p className="mb-4">Whether you're looking for code reviews, gaming tournaments, or just a place to hang out after work, Aether has something for everyone. Our members range from industry professionals to students just starting their journey.</p>
            <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What we offer:</h4>
            <ul className="list-disc pl-5 space-y-2">
                <li>Weekly <strong>"Show & Tell"</strong> sessions for developers.</li>
                <li>Daily voice channel activities and listening parties.</li>
                <li>Verified roles for experienced professionals.</li>
                <li>Exclusive partnership perks and early access to indie games.</li>
            </ul>
        </>
    ),
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvU7cwf-lqnZKZGPYrkVFM2wjIH13BQ4tRaAJrI-OIQ1kSYgoCjjZfbOHg7JF4YPKq62Mx3EkvcII1a8iUArNnUA29lDKppL7pk3WB6FOE9CQF1Lp0twCxd8UaT8Z27kAmrOz1cU_1L8_R2zWtjBarithGl-9rc7xhd_so23mTwze_BqSecr-5tgjJBy49mcLElGhveSs1alPH07pYgvMgxN8iV5NMzxnA6RtJa184jLatoFGrQ4UwW_o5f2SBUfe7AqBcCzfhnI",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDtMWdt5Tqng2UfNcZWpbRVvutRQXMvtOdjsWVVwIoHPNjU9aOD_Hq4eri5V4UEsAxf31sPozVm8w-xr0W3knHWR-HQdRUTguA1cwC2WMP4KZ6Ouv34f8hqs_SPH9aIzSSt2dPknNSjOanRVCY7RikfcV-o2pX3BoXQlbcq406SNNL471ARDHz8z5GtM6eIo_qPY6Tda8YMrI9kG3kPjBiHP7u3uOZsD3wUG6-_BC7eOIRAEUaSLCJ7iiZF8fObZdPh_QLZWKj764",
    verified: true,
    tags: ["Gaming", "Coding", "Music", "Creative"],
    stats: {
        online: "4,218",
        members: "24,591",
        created: "Feb 12, 2021",
        language: "English"
    },
    owner: {
        name: "AetherAdmin#0001",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9tvS2qp3htypCHLxQgZqLHwihuJvZCE3IA2rZkgcK0jM7a6eVEzdJECiivoflwhWg6y5mMb93rpaih88ofNXJN3yeL-lBw0OzX-zDrxHOffcRz5fP9f1TZTAT9_-ozwOrfHV3fw1WYfnTidPooigiIn0H7-BJ84GPRvmtZGn9fm9fHAtms6fIjmU46kUzC7qUkEc9OUCWRQrioD3DZoJTfXyxWARwPyXEayYayljY4O_vOhMxXiIT3YcCJDagj-KLnR7S2o3-xnQ"
    }
};

const SIMILAR_SERVERS = [
    {
        id: 1,
        name: "Titan Esports",
        description: "Join the competitive gaming scene and compete in weekly tournaments.",
        members: "8.2k",
        online: "450",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0OwQDYzctjB3rdz0X0er-KxT3ykM0sLOBPkapvgByZeFqljjHTWaJc-g74mHE0FlTzVX2XJ81oGPe7jVtbbbOI72NogITZFM00cYTUYilW3MHLMkIXQ1dqwQGdFQImPfy4IjEfc0TDdxNOS496E7R0r14DU6WosYvVRPMpkJ9kSiOeFX385LIhVF9-E4crGibZA9_vlTiw8AVNujGBEvIRsCPscdXM6ypT382IvCVWEsc1HLkNCcAZUXHjX6px7GVi1ELh1vCRHs",
        gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
        tags: ["Gaming", "Esports"]
    },
    {
        id: 2,
        name: "Dev Lounge",
        description: "A quiet place for coffee and code. Weekly peer-to-peer mentorship.",
        members: "3.1k",
        online: "892",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBCcUb-IAGUXp2p_d0HIXhNsKAozQXXL8rjQkAW7busCWoJXiqrdtt0BoenOynCSZNLiQZ_OU_szPeqRGbmsu_-CRtAvuDPcUySrOtkmEceO3wa01SJfW-9E65gc7SYUSW91EN3j8N2dCS9Ros81RqxFeY_QBSkv6rEchWPbCXNgbErxOEKY83l7yGJ3L4unnScORRWwQSApP1qw7Z9rlNr1Xe1KEVWm14TXW6VSjhnXLMJiAeNeXO_utfOMnqSwXCAFHz2Hg4ChM",
        gradient: "bg-gradient-to-r from-blue-400 to-cyan-500",
        tags: ["Coding", "Chat"]
    },
    {
        id: 3,
        name: "Retro Tech",
        description: "Celebrating the hardware of yesteryear. Buy, sell, and trade retro tech.",
        members: "1.5k",
        online: "214",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1HrBSfTGBvzBLaoDBRJb51dx4YGy9mopIq_c10aAbS9jD4KLmoZZCDPqanhsWzzBpXdl93OEEZhwL-f4KhIpw3Oat3ha74iLKfI6rJBVvZG_lAQuqGSp1WbZeP_NzoZQM4O0IE2zQXNaSCQjwclp3WIr8oWpGnYpsh30mNKWvbIuaf7cEIWQnhtYHXIw7M8cntxThK-q5TBYNh4SsAZevEoDJEyV9aIhAUQAvwdDy56Npd_7W3tOUd5tk9_rVKTVn2FkCQR2QrRc",
        gradient: "bg-gradient-to-r from-rose-400 to-orange-400",
        tags: ["Tech", "Retro"]
    }
];

export default function ServerDetails() {
    const { id: _id } = useParams();
    // In a real app, use id to fetch/select server
    const server = SERVER_DATA;

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-10 py-6">
            {/* Banner Section */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] lg:aspect-[4/1] shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={server.banner} alt="Server Banner" />
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div className="size-24 md:size-32 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-xl shrink-0">
                            <img className="w-full h-full object-cover" src={server.icon} alt="Server Icon" />
                        </div>
                        <div className="text-white pb-2 text-left">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{server.name}</h1>
                                {server.verified && <span className="material-symbols-outlined text-blue-400 fill-1 text-2xl" title="Verified Server">verified</span>}
                            </div>
                            <p className="text-white/80 text-sm md:text-base font-medium">{server.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-primary/5">
                <div className="flex gap-2 flex-wrap">
                    {server.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">{tag}</span>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button className="flex-1 sm:flex-none">
                        <span className="material-symbols-outlined">add_circle</span>
                        Join Server
                    </Button>
                    <Button variant="secondary" className="flex-1 sm:flex-none">
                        <span className="material-symbols-outlined">arrow_upward</span>
                        Upvote <span className="ml-1 opacity-60">1.2k</span>
                    </Button>
                    <button className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-xl border-2 border-slate-100 bg-white text-slate-400 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </div>
            </div>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                {/* Main Content (Left) */}
                <div className="flex-1 space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">About this community</h3>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            {server.longDescription}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <aside className="w-full lg:w-80 flex flex-col gap-6">
                    {/* Stats Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Server Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm text-slate-600 font-medium">Online</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{server.stats.online}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">groups</span>
                                    <span className="text-sm text-slate-600 font-medium">Total Members</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{server.stats.members}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">calendar_today</span>
                                    <span className="text-sm text-slate-600 font-medium">Created</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{server.stats.created}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">language</span>
                                    <span className="text-sm text-slate-600 font-medium">Language</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{server.stats.language}</span>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase">Owner</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-primary/20 overflow-hidden">
                                    <img className="w-full h-full object-cover" src={server.owner.avatar} alt="Owner Avatar" />
                                </div>
                                <span className="text-sm font-bold text-slate-900">{server.owner.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium Card */}
                    <div className="bg-primary rounded-2xl p-6 text-white overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <span className="material-symbols-outlined text-8xl">star</span>
                        </div>
                        <h4 className="text-lg font-bold mb-2">Premium Member</h4>
                        <p className="text-white/80 text-sm mb-4 leading-snug">This server is part of our Discovery Gold program.</p>
                        <Button variant="dark" size="sm" className="w-full font-bold">Learn More</Button>
                    </div>
                </aside>
            </div>

            {/* Related Servers Section */}
            <section className="mt-16 pb-12">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Similar Communities</h3>
                    <a href="#" className="text-primary font-semibold text-sm hover:underline">View all</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SIMILAR_SERVERS.map(srv => (
                        <BrowseServerCard key={srv.id} server={srv} />
                    ))}
                </div>
            </section>
        </div>
    );
}
