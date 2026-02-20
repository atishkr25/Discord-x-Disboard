'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavbarAuthUI } from './NavbarAuthUI';

/**
 * Navigation Bar Component
 * Shows logged-in user or login button
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            🎮
          </div>
          <span>DiscServer</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition">
            Home
          </Link>
          <Link href="/browse" className="text-sm font-medium text-slate-600 hover:text-primary transition">
            Browse
          </Link>
          <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-primary transition">
            Search
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <NavbarAuthUI />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 p-4">
          <div className="space-y-4">
            <Link href="/" className="block text-sm font-medium">
              Home
            </Link>
            <Link href="/browse" className="block text-sm font-medium">
              Browse
            </Link>
            <Link href="/search" className="block text-sm font-medium">
              Search
            </Link>
            <Link href="/dashboard" className="block text-sm font-medium">
              Dashboard
            </Link>
            <div className="pt-4 border-t border-slate-200">
              <NavbarAuthUI />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
