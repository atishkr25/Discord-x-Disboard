import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-slate-200/60 px-6 lg:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">DiscDir</h2>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {['Discover', 'Categories', 'Trending', 'Pricing'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Discover' ? '/browse' : '#'}
                            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button className="hidden sm:flex">
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            Submit Server
                        </Button>
                    </Link>

                    <div
                        className="h-10 w-10 rounded-full border-2 border-slate-100 bg-cover bg-center cursor-pointer overflow-hidden shadow-sm hover:border-primary/50 transition-colors"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASp0aP5vuCHY27kCMufqAUh9nWznJ5whUhcyL1GZUUsa2tVMQ7gEvf7lp4Y7b1zsGFrSePS0CMGqL9TXKyObD9eX7fv8v5ZLiJFlcs1AeG74fATd8NesB_8vEAlQ115nX9d-sTC0oeAeQEPuY4SS_1Nni4JhVYv6PC_GUa_RCLgqpmwFPDaRef6MI_ZnMQQimxKogPATNyu32BtNbhxxywDQmqMxoFsIg-WL8x-iOXysmFy0ZdowSAd38bFfcACV7yQZ0Gze4agv4")' }}
                    ></div>
                </div>
            </div>
        </header>
    );
}
