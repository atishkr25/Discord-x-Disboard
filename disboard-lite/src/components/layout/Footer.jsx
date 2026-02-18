import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-primary p-1 rounded flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-black tracking-tight">DiscDir</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">Connecting the world through curated Discord communities. Discover your tribe today.</p>
                        <div className="flex items-center gap-4">
                            {/* Social Icons */}
                            {['twitter', 'discord'].map((social, i) => (
                                <a key={i} href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        {/* Simplified paths for demo */}
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Directory Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Directory</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/browse" className="hover:text-primary transition-colors">Popular Servers</Link></li>
                            <li><Link to="/browse" className="hover:text-primary transition-colors">New Additions</Link></li>
                            <li><Link to="/browse" className="hover:text-primary transition-colors">Category List</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Verification Program</a></li>
                        </ul>
                    </div>

                    {/* Resource Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                        <p className="text-sm mb-4">Get the best communities in your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/5 border-none focus:ring-1 focus:ring-primary rounded-xl text-sm px-4 py-2.5 text-white"
                            />
                            <button className="bg-primary p-2.5 rounded-xl hover:bg-primary/90 transition-all">
                                <span className="material-symbols-outlined text-white">send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2024 DiscDir SaaS Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 bg-emerald-500 rounded-full"></span> API Status: Operational</span>
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
