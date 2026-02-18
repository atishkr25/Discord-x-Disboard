import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function AddServer() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">
            {/* Simplified Sidebar for Add Flow */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/dashboard" className="flex items-center gap-2 mb-8">
                        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">arrow_back</span>
                        </div>
                        <span className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Back to Dashboard</span>
                    </Link>

                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Listing Progress</h3>
                        <div className="space-y-4">
                            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`size-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>1</div>
                                <span className="text-sm font-bold">Basic Info</span>
                            </div>
                            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`size-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>2</div>
                                <span className="text-sm font-bold">Technical Config</span>
                            </div>
                            <div className={`flex items-center gap-3 ${step >= 3 ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`size-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>3</div>
                                <span className="text-sm font-bold">Review</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-full overflow-y-auto items-center justify-center p-6">
                <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden border-t-4 border-t-primary">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Add New Server</h3>
                                <p className="text-slate-500 text-sm">Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Technical Details' : 'Review & Submit'}</p>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`size-2 rounded-full ${step >= i ? 'bg-primary' : 'bg-primary/20'}`}></div>
                                ))}
                            </div>
                        </div>

                        <form className="space-y-6">
                            {step === 1 && (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Server Name</label>
                                        <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" type="text" placeholder="e.g. My Awesome Community" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Description (Short)</label>
                                        <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-20" placeholder="Briefly describe your server..."></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
                                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white">
                                                <option>Gaming</option>
                                                <option>Social</option>
                                                <option>Technology</option>
                                                <option>Education</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Language</label>
                                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white">
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">IP Address or Domain</label>
                                        <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" type="text" placeholder="192.168.1.1" />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Port Number</label>
                                        <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="25565" type="number" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Invite Link (Permanent)</label>
                                        <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" type="text" placeholder="https://discord.gg/..." />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Tags (comma separated)</label>
                                        <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="production, gaming, node-js" type="text" />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center py-6">
                                    <div className="size-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-[40px]">check_circle</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">Ready to Submit?</h4>
                                    <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">Your server will be reviewed by our team within 24 hours. You will be notified via email once it's live.</p>

                                    <div className="bg-slate-50 rounded-lg p-4 text-left text-sm space-y-2 mb-6">
                                        <div className="flex justify-between"><span className="text-slate-500">Service Fee</span> <span className="font-bold text-slate-900">$0.00</span></div>
                                        <div className="flex justify-between"><span className="text-slate-500">Listing Type</span> <span className="font-bold text-slate-900">Standard</span></div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-100 flex justify-between">
                                {step > 1 ? (
                                    <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">Back</button>
                                ) : (
                                    <Link to="/dashboard" className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">Cancel</Link>
                                )}

                                {step < 3 ? (
                                    <button type="button" onClick={() => setStep(step + 1)} className="bg-primary text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                                        Continue
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => navigate('/dashboard')} className="bg-green-600 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
                                        Submit Server
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
