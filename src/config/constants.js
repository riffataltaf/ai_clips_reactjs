/**
 * Application Constants & Configuration
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_CONFIG = {
    CLIPDROP: {
        BASE_URL: 'https://clipdrop-api.co',
        API_KEY: import.meta.env.VITE_CLIPDROP_API_KEY,
    },
    IMAGEKIT: {
        ENDPOINT: 'https://ik.imagekit.io/myproducts786',
        PUBLIC_KEY: 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=',
        PRIVATE_KEY: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
        URL_ENDPOINT: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
        AUTH_ENDPOINT: 'http://localhost:5000/auth',
    },
    BACKEND: {
        BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    },
};

// Image Processing Settings
export const IMAGE_SETTINGS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],

    // Default dimensions
    DIMENSIONS: {
        BANNER: { width: 1200, height: 630 },
        PROFILE: { width: 500, height: 500 },
        PRODUCT: { width: 1000, height: 1000 },
        AD_CREATIVE: { width: 1080, height: 1350 },
        THUMBNAIL: { width: 300, height: 300 },
    },

    // Quality settings
    QUALITY: {
        HIGH: 95,
        MEDIUM: 85,
        LOW: 70,
    },
};

// AI Generation Types
export const GENERATION_TYPES = {
    ENHANCE: {
        id: 'enhance',
        name: 'Product Enhance',
        description: 'Enhance image quality with AI upscaling',
        icon: '✨',
        color: 'indigo',
    },
    BANNER: {
        id: 'banner',
        name: 'Banner Generate',
        description: 'Create stunning banner images',
        icon: '🎨',
        color: 'purple',
    },
    PROFILE: {
        id: 'profile',
        name: 'Profile Generate',
        description: 'Perfect profile pictures',
        icon: '👤',
        color: 'blue',
    },
    REMOVE_BG: {
        id: 'removeBg',
        name: 'Remove Background',
        description: 'Remove image background cleanly',
        icon: '🎭',
        color: 'pink',
    },
    AD_CREATIVE: {
        id: 'adCreative',
        name: 'Ad Creative',
        description: 'Create ad-ready creative images',
        icon: '📢',
        color: 'orange',
    },
    PRODUCT_PHOTO: {
        id: 'productPhoto',
        name: 'Product Photo',
        description: 'Professional product photography',
        icon: '📸',
        color: 'green',
    },
};

// Transformation Presets
export const TRANSFORMATIONS = {
    // Professional subtle enhancements
    PROFESSIONAL: {
        product: 'w-1000,h-1000,cm-pad_resize,bg-FFFFFF,e-sharpen-5,e-contrast-10',
        banner: 'ar-16-9,cm-pad_resize,bg-F9FAFB,e-sharpen-3',
        profile: 'w-500,h-500,c-at_max,r-max,e-sharpen-3',
        adCreative: 'ar-4-5,cm-pad_resize,bg-FFFFFF,e-sharpen-5',
    },

    // High quality
    HIGH_QUALITY: {
        product: 'w-2048,q-95,e-sharpen-8,e-contrast-15',
        banner: 'w-1920,h-1080,q-90,e-sharpen-5',
        profile: 'w-1000,h-1000,q-95,e-sharpen-5',
    },

    // Optimized for web
    WEB_OPTIMIZED: {
        product: 'w-800,q-85,f-auto',
        banner: 'w-1200,h-630,q-85,f-auto',
        profile: 'w-400,h-400,q-85,f-auto',
    },
};

// UI Messages
export const MESSAGES = {
    SUCCESS: {
        UPLOAD: 'Image uploaded successfully!',
        GENERATE: 'Image generated successfully!',
        DOWNLOAD: 'Image downloaded successfully!',
    },
    ERROR: {
        UPLOAD: 'Failed to upload image. Please try again.',
        GENERATE: 'Failed to generate image. Please try again.',
        INVALID_FILE: 'Please select a valid image file.',
        FILE_TOO_LARGE: 'File size exceeds 10MB limit.',
        API_KEY_MISSING: 'API key not configured. Please check your environment variables.',
        NETWORK: 'Network error. Please check your connection.',
    },
    LOADING: {
        UPLOADING: 'Uploading image...',
        GENERATING: 'Generating image with AI...',
        PROCESSING: 'Processing image...',
    },
};

// Animation Settings
export const ANIMATIONS = {
    DURATION: {
        FAST: 0.2,
        NORMAL: 0.3,
        SLOW: 0.5,
    },
    EASE: {
        DEFAULT: [0.4, 0, 0.2, 1],
        SPRING: { type: 'spring', stiffness: 100, damping: 15 },
    },
};

// Gallery Sample Images
export const SAMPLE_IMAGES = [
    'perfume.png',
    'cream.jpg',
    'juice.png',
    'pills.png',
    'hero_showcase.png',
    'keto.png',
    'champagne.jpg',
    'candle_orange.jpg',
    'candle.png',
    'ring.png',
    'gold_ring.png',
];

// Brand Information
export const BRAND = {
    NAME: 'AI Product Generator',
    TAGLINE: 'Create stunning product photos with AI',
    DESCRIPTION: 'The only AI Product image generator with free and unlimited generations.',
    SOCIAL: {
        TWITTER: 'https://twitter.com/aiproductgen',
        FACEBOOK: 'https://facebook.com/aiproductgen',
        INSTAGRAM: 'https://instagram.com/aiproductgen',
        LINKEDIN: 'https://linkedin.com/company/aiproductgen',
    },
};

// Feature Highlights
export const FEATURES = [
    {
        title: 'Perfect Shadows & Lighting',
        description: 'AI-powered lighting adjustments',
        icon: '💡',
    },
    {
        title: 'Professional Quality',
        description: 'Studio-grade results in seconds',
        icon: '⭐',
    },
    {
        title: 'Unlimited Generations',
        description: 'No limits, completely free',
        icon: '∞',
    },
    {
        title: 'Multiple Formats',
        description: 'Banner, Profile, Product & more',
        icon: '🎯',
    },
];

// Stats
export const STATS = {
    BUSINESSES: '35,000+',
    IMAGES_GENERATED: '1,000,000+',
    COUNTRIES: '100+',
    SATISFACTION: '99%',
};

export default {
    API_CONFIG,
    IMAGE_SETTINGS,
    GENERATION_TYPES,
    TRANSFORMATIONS,
    MESSAGES,
    ANIMATIONS,
    SAMPLE_IMAGES,
    BRAND,
    FEATURES,
    STATS,
};
