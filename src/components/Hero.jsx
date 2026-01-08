import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GalleryCard from './GalleryCard';

// Import All Gallery Images
import PerfumeImg from '../assets/gallery/perfume.png';
import CreamImg from '../assets/gallery/cream.jpg';
import JuiceImg from '../assets/gallery/juice.png';
import PillsImg from '../assets/gallery/pills.png';
import HeroShowcaseImg from '../assets/gallery/hero_showcase.png';
import KetoImg from '../assets/gallery/keto.png';
import ChampagneImg from '../assets/gallery/champagne.jpg';
import CandleOrangeImg from '../assets/gallery/candle_orange.jpg';
import CandleImg from '../assets/gallery/candle.png';
import RingImg from '../assets/gallery/ring.png';
import GoldRingImg from '../assets/gallery/gold_ring.png';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-6 min-h-screen overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-400/10 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-left z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-indigo-600 mb-6 font-medium tracking-wide text-sm uppercase"
                    >
                        <span>Home</span>
                        <span>/</span>
                        <span>AI Photos</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]"
                    >
                        AI Product <span className="text-gradient">Photos</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed"
                    >
                        Create Product photos in seconds with AI. The only AI Product image generator with free and unlimited generations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4"
                    >
                        <button className="btn-primary text-lg px-10 py-4">
                            Get Free Photos
                        </button>
                        <button className="btn-secondary px-8 py-4">
                            Learn More
                        </button>
                    </motion.div>

                    <div className="mt-8 flex items-center gap-4 text-gray-500 text-sm">
                        <ArrowRight className="rotate-45 text-indigo-500" />
                        <span>Perfect shadows & lighting</span>
                    </div>
                </div>

                {/* Right Feature Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative z-10"
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border-4 border-white">
                        <img
                            src={HeroShowcaseImg}
                            alt="Product Demo"
                            className="w-full h-auto object-cov
                             
                            \   
                               
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                                                                                                                                          er"
                        />
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded-2xl shadow-xl animate-float">
                            <img
                                src={HeroShowcaseImg}
                                className="w-16 h-16 object-contain opacity-60 grayscale"
                                alt="Original"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Logo Marquee */}
            <div className="mt-24 pt-10 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm mb-8">
                    Used by <span className="font-bold text-gray-900">35,000+ businesses</span> from small brands to some of the biggest agencies:
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                    {['Polonio', 'Publicis Groupe', 'Gova', 'AeroPress', 'Bed Bath & Beyond'].map((brand) => (
                        <span key={brand} className="text-gray-400 text-xl font-bold font-serif tracking-widest hover:text-indigo-600 transition-colors cursor-pointer">{brand}</span>
                    ))}
                </div>
            </div>

            {/* Gallery Grid - Masonry Style */}
            <div className="mt-20 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-gray-500">Beautiful product photos created with AI</p>
                </div>

                {/* Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    <GalleryCard img={JuiceImg} alt="Juice" delay={0.1} className="break-inside-avoid" />
                    <GalleryCard img={CreamImg} alt="Cream" delay={0.15} className="break-inside-avoid" />
                    <GalleryCard img={ChampagneImg} alt="Champagne" delay={0.2} className="break-inside-avoid" />
                    <GalleryCard img={KetoImg} alt="Keto" delay={0.25} className="break-inside-avoid" />
                    <GalleryCard img={PerfumeImg} alt="Perfume" delay={0.3} className="break-inside-avoid" />
                    <GalleryCard img={CandleOrangeImg} alt="Candle Orange" delay={0.35} className="break-inside-avoid" />
                    <GalleryCard img={GoldRingImg} alt="Gold Ring" delay={0.4} className="break-inside-avoid" />
                    <GalleryCard img={CandleImg} alt="Blue Candle" delay={0.45} className="break-inside-avoid" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
