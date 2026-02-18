import React from 'react';
import { BrowseServerCard } from '../components/ui/BrowseServerCard';

// Mock Data for Browse Page
const BROWSE_SERVERS = [
    {
        id: 1,
        name: "Elite Gamers Lounge",
        description: "The definitive home for competitive FPS players and strategy enthusiasts. Daily tournaments and friendly community.",
        members: "45,201",
        online: "12.4k",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuMhPyGsvv8w9fW54zMrTFblvapyKxc7d14NDV1OXPsDzu4rT_9IcKIqGEqikeoQajdWQG_HbUIsean2suYQaESybp3NaiRhdHE0jV8OQthfKj3C3Xxx85QFo62L9SmxGBO3lIuRn27Ae1W_nY1GJLgZ8dBfM_JMd62NGpSJu8IOUcPfZv7fBm29IOT-lmPPoDMZIs8mGmBLEYMYqvHRy7AC1M_8zwSk8H-cbDnMUo1GPngBU7M9x0tKqeZA0JiMVnHk4QCyuxerQ",
        gradient: "bg-gradient-to-r from-primary to-indigo-400",
        tags: ["Gaming", "Competitive"]
    },
    {
        id: 2,
        name: "DevStream Central",
        description: "Connect with developers worldwide. From Python to Rust, we share projects, help with bugs, and host weekly hackathons.",
        members: "12,850",
        online: "842",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAroY3Gcopvt0rsoUbyfjH5lXn2K5SKaFaJBzdG2lXFzLFpEIackWuil_xk6MVG2XvpVBt8JsB8O6OaJvyH-tsGN77LnrkhNxTPfXuMksma9A8vCB8krQjtUNgeJyUp1iuRoM-Fp501nA8WOzKskBJK7F29cNOsMBr3f5EWuqKKuExtpxLzU7u8B9CYawo7vbvt1x5ps4l4k_R_RumC17rPEctdxNVETJALCKCCUtIlBdWKCYv_-PtM11ax1itCCscWu8p0IGVOVRc",
        gradient: "bg-gradient-to-r from-orange-400 to-red-400",
        tags: ["Tech", "Programming"]
    },
    {
        id: 3,
        name: "Artists United",
        description: "A safe space for digital and traditional artists to share their work, get feedback, and find commission opportunities.",
        members: "28,410",
        online: "3.1k",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrbp0p-84ee8swEoAQysb9OSKv1-8-VARZOROlv-atNcpazTZVlRQKs-8GzLSU4dpv1EW1pe70ERvjUuB7Rqz5QkL-BiVnm4S1rIxYNn29SflqZYSTE19KnU-Yt3ltoKxCLmrh40g-OEi_Sr3CwQmfcHVSxOuoQCBuBvHrf7DynDY9MLP33tc7lLWEExWllewrKOjHoJBDgoEbWxd9R37Pb86B3JbnPaxEBpIIM5I-bbo4o5AH5rPPJm1UnrObqpIGpyzobC4vk20",
        gradient: "bg-gradient-to-r from-emerald-400 to-teal-500",
        tags: ["Art", "Creative"]
    },
    {
        id: 4,
        name: "Vaporwave Society",
        description: "Vibe check! Join the most relaxed community on Discord. We talk 80s aesthetic, synthwave, and chill gaming.",
        members: "8,300",
        online: "1.2k",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBANVMDK9pjNHlbYq6wb8kwXlnCtXPDJtKeI5WeU9W-K2nW4xTajTzkhSjEKE5qu9wbICimLZBcT3V6J9OUj9-0jSNC4a5Uiz2TeYNI2AQ-b5bXxH70zS9d_nGxxZtzNuVn89Xz7Ci8B4mK2FPLHQkn79Lwc3CEfejAWFXpY2uhSyuwii6AMbAca7XroAyOFHfmN6TNKZDgH8_wwuNooMqNa0CTEUOMloWzEM6c7d874aWhLm13gDuU3irI0-v79n0RZYbkjG9E9f8",
        gradient: "bg-gradient-to-r from-blue-400 to-cyan-400",
        tags: ["Social", "Lifestyle"]
    },
    {
        id: 5,
        name: "Podcast Network",
        description: "Discover new shows, connect with hosts, and learn the ropes of audio production. Regular voice chats and guest sessions.",
        members: "4,120",
        online: "421",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1CKhAnWUdRgRYevKFVNRQgoaQHtUm3rpkjIOGRo5-M_7MnEg7A-ov5iO660MDI_Jw-BJD3D0VUIp8MNPh4OnsIdPRT4IDBJBHPyrn25V_1As0zZo4aPJjZSdPU5MbbhevLBxBSQgncg1pVhtJIioEYo2GpBs7rK1dhbMubgU2JJY7ajlgqY8O3cEpDJ8-grFbBRfCPd6AX1DRsQzGu3SbRVYx2jvc-WUnDOhQGiqG6EUkYuQ-hV9P-EqLvIR4cGlPkyGU1SjkQxw",
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
        tags: ["Media", "Education"]
    },
    {
        id: 6,
        name: "Plant Parents Hub",
        description: "Need help with your Monstera? Want to trade cuttings? Join our growing community of botanical enthusiasts.",
        members: "15,902",
        online: "1.5k",
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5wCiUJ_LMNyKSHP9jOT-MMbs0x7xwiWaH1t1JGb-AooenNsIrXOINfepp4HV3XPoCFMOvl9HiChkg6Jp41oRTPUQIeP3gt-2KVP-0Qcvf5LMvAaCTclKhzhjX-4iwg0wHTrkU0vUfz8rp9nkGW38GKBhx_r7ywrLlJ8Mlcpqu-zLe5vfjm1r0SntTMIUE5YOI7ALNKRlsxKn_nbJ_lN8mSkX3das7a7adItQCEpKLAMRWi4QA1OEcr0jjDpCB4PvObyjXPuf_KX4",
        gradient: "bg-gradient-to-r from-yellow-400 to-amber-500",
        tags: ["Hobby", "Nature"]
    }
];

export default function Browse() {
    return (
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 shrink-0 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Filters</h2>
                    <button className="text-primary text-xs font-semibold hover:underline">Clear all</button>
                </div>

                {/* Categories */}
                <div className="space-y-1">
                    <details className="group" open>
                        <summary className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors list-none">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">category</span>
                                <span className="text-sm font-medium">Categories</span>
                            </div>
                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <div className="mt-2 ml-9 space-y-2">
                            {['Gaming', 'Social', 'Education', 'Technology'].map(cat => (
                                <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked={cat === 'Gaming'} />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </details>
                </div>

                {/* Server Size */}
                <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 p-2 mb-2">
                        <span className="material-symbols-outlined text-primary">groups</span>
                        <span className="text-sm font-medium">Server Size</span>
                    </div>
                    <div className="space-y-3 px-2">
                        {[
                            { label: 'Small (< 100)', val: 'small' },
                            { label: 'Medium (100 - 1k)', val: 'medium', checked: true },
                            { label: 'Large (1k+)', val: 'large' }
                        ].map(opt => (
                            <label key={opt.val} className="flex items-center gap-3 group cursor-pointer">
                                <input type="radio" name="size" className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" defaultChecked={opt.checked} />
                                <span className="text-sm">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Language (Simplified) */}
                <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 p-2 mb-2">
                        <span className="material-symbols-outlined text-primary">language</span>
                        <span className="text-sm font-medium">Language</span>
                    </div>
                    <select className="w-full bg-white border-slate-300 rounded-lg text-sm focus:ring-primary focus:border-primary">
                        <option>All Languages</option>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>

                {/* Popular Tags */}
                <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 p-2 mb-2">
                        <span className="material-symbols-outlined text-primary">sell</span>
                        <span className="text-sm font-medium">Popular Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2 px-2">
                        {['#minecraft', '#coding', '#anime', '#music', '#art'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-md cursor-pointer hover:bg-slate-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Discovery <span className="text-sm font-normal text-slate-500 ml-2">1,248 servers found</span></h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Sort by:</span>
                        <select className="border-none bg-transparent text-sm font-semibold focus:ring-0 cursor-pointer text-slate-700">
                            <option>Most Popular</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                </div>

                {/* Server Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {BROWSE_SERVERS.map(server => (
                        <BrowseServerCard key={server.id} server={server} />
                    ))}
                </div>

                {/* Pagination (Visual Only) */}
                <div className="flex items-center justify-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">3</button>
                    <span className="text-slate-400 px-2">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">24</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
