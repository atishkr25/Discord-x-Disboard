import React from 'react';

export const LoadingSpinner = ({ text = "Loading..." }) => (
    <div className="flex bg-slate-50 min-h-[50vh] items-center justify-center w-full">
        <div className="text-slate-500 font-bold flex flex-col items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-4xl">refresh</span>
            <span>{text}</span>
        </div>
    </div>
);
