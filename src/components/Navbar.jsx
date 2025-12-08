import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">AI Product Generator</span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Solutions', 'Features', 'Resources', 'Pricing'].map((item) => (
                        <a key={item} href="#" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group">
                            {item}
                            {item !== 'Pricing' && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                    <path d="M6 9l6 6l6-6" />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <a href="#" className="hidden md:block text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                        Login
                    </a>
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
                        Try it now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
