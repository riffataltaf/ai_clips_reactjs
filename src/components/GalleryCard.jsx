import React from 'react';
import { motion } from 'framer-motion';

const GalleryCard = ({ img, alt, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            viewport={{ once: true }}
            className={`shimmer-hover rounded-2xl overflow-hidden relative group bg-white shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 mb-4 ${className}`}
        >
            <img
                src={img}
                alt={alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm">{alt}</p>
            </div>
        </motion.div>
    );
};

export default GalleryCard;
