import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export function BrowseServerCard({ server }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-gray-700 transition-all group overflow-hidden flex flex-col h-full">
            {/* Cover */}
            <div
                className={`h-24 relative ${server.gradient}`}
            >
                <div className="absolute -bottom-6 left-4">
                    <div className="w-16 h-16 rounded-xl border-4 border-white dark:border-gray-800 overflow-hidden bg-white shadow-sm">
                        <img
                            alt="Server icon"
                            className="w-full h-full object-cover"
                            src={server.icon}
                        />
                    </div>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-[10px] font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span>{server.online} Online</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 pt-10 flex-1 flex flex-col">
                <Link to={`/server/${server.id}`}>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{server.name}</h3>
                </Link>
                <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {server.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {server.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${i === 0 ? 'text-primary bg-primary/10' : 'text-slate-500 bg-slate-100'}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-500">
                        <span className="material-symbols-outlined text-sm mr-1">person</span>
                        {server.members} Members
                    </div>
                    <Button size="sm" className="px-4 py-1.5 text-xs rounded-lg">Join Server</Button>
                </div>
            </div>
        </div>
    );
}
