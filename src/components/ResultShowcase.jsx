import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Sparkles } from 'lucide-react';

const ResultShowcase = () => {
    return (
        <section className="py-20 px-6 relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-400/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            Stunning <span className="text-gradient">Results</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            See what our AI can do for your products. Professional studio quality, generated in seconds.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item * 0.1 }}
                            className="group relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                                <div className={`absolute inset-0 opacity-40 ${item === 1 ? 'bg-gradient-to-tr from-indigo-200 to-purple-200' :
                                    item === 2 ? 'bg-gradient-to-tr from-blue-200 to-cyan-200' :
                                        'bg-gradient-to-tr from-pink-200 to-rose-200'
                                    }`} />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-gray-400 font-medium">Result Preview {item}</span>
                                </div>

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                                    <button className="p-3 rounded-xl bg-white text-gray-900 hover:scale-110 transition-transform shadow-lg">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/20 text-white hover:bg-white/30 hover:scale-110 transition-all backdrop-blur-md border border-white/40">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Product Shot {item}</h3>
                                        <p className="text-sm text-gray-500">Studio Lighting • 4K</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
                                        v2.0
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResultShowcase;
