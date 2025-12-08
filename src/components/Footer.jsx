import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">AI Product Generator</span>
                        </div>
                        <p className="text-gray-500 mb-6 max-w-sm leading-relaxed">
                            The future of visual content powered by AI. Create stunning product photos in seconds.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Photography */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Product photography</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {['Product photography', 'Furniture photography', 'Jewelry photography', 'Skincare photography', 'Beauty photography'].map(item => (
                                <li key={item}><a href="#" className="hover:text-indigo-600 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Solutions</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {['AI clones', 'AI video ads', 'AI actors', 'AI avatar video', 'AI Ads'].map(item => (
                                <li key={item}><a href="#" className="hover:text-indigo-600 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {['Blog', 'About us', 'Careers', 'Contact', 'Terms of Service', 'Privacy Policy'].map(item => (
                                <li key={item}><a href="#" className="hover:text-indigo-600 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2024 AI Product Generator. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
