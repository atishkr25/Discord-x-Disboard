import React from 'react';
import { Button } from './Button';

export function ServerCard({ server }) {
    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
            <div
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6)), url("${server.banner}")` }}
            ></div>

            <div className="px-6 pb-6 relative flex-1 flex flex-col">
                <div
                    className="absolute -top-10 left-6 h-16 w-16 rounded-2xl border-4 border-white bg-slate-100 bg-cover shadow-md overflow-hidden"
                    style={{ backgroundImage: `url("${server.icon}")` }}
                ></div>

                <div className="mt-8 flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{server.name}</h3>
                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                            {server.verified && (
                                <span className="material-symbols-outlined text-[14px] text-primary fill-1">verified</span>
                            )}
                            {server.verified ? 'Verified' : 'Community'} • {server.category}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{server.members} members</span>
                    </div>
                </div>

                <p className="text-sm text-slate-600 mt-4 line-clamp-2 flex-1">{server.description}</p>

                <Button variant="secondary" className="w-full mt-6 group-hover:bg-primary group-hover:text-white border-none bg-slate-50 text-slate-900">
                    Join Community
                </Button>
            </div>
        </div>
    );
}
