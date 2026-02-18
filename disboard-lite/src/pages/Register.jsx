import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Register() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10">
                <div className="text-center mb-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                        <span className="material-symbols-outlined text-3xl">person_add</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create account</h1>
                    <p className="text-slate-500 mt-2">Join thousands of communities today</p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                            placeholder="CoolUser123"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                            placeholder="••••••••"
                        />
                        <p className="text-xs text-slate-400 mt-2">Must be at least 8 characters long</p>
                    </div>

                    <div className="flex items-start gap-3 mt-2">
                        <input type="checkbox" id="terms" className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" />
                        <label htmlFor="terms" className="text-sm text-slate-500 leading-tight">
                            I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <Link to="/dashboard">
                        <Button className="w-full py-3.5 text-base shadow-lg shadow-primary/25">Create Account</Button>
                    </Link>
                </form>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
