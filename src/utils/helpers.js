/**
 * Helper Utilities
 * Reusable utility functions used throughout the application
 */

import { IMAGE_SETTINGS } from '../config/constants';

/**
 * Convert Data URL to Blob
 * @param {string} dataURL - Data URL string
 * @returns {Blob} - Blob object
 */
export const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

/**
 * Convert Data URL to File
 * @param {string} dataURL - Data URL string
 * @param {string} filename - Filename for the file
 * @returns {File} - File object
 */
export const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

/**
 * Convert Blob to Data URL
 * @param {Blob} blob - Blob object
 * @returns {Promise<string>} - Data URL string
 */
export const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

/**
 * Convert File to Data URL
 * @param {File} file - File object
 * @returns {Promise<string>} - Data URL string
 */
export const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {Object} - { valid: boolean, error: string|null }
 */
export const validateImageFile = (file) => {
    // Check if file exists
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    // Check file type
    if (!IMAGE_SETTINGS.ALLOWED_FORMATS.includes(file.type)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${IMAGE_SETTINGS.ALLOWED_EXTENSIONS.join(', ')}`,
        };
    }

    // Check file size
    if (file.size > IMAGE_SETTINGS.MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `File too large. Maximum size: ${formatBytes(IMAGE_SETTINGS.MAX_FILE_SIZE)}`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Format bytes to human readable string
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Download image from URL or Data URL
 * @param {string} url - URL or Data URL
 * @param {string} filename - Filename for download
 */
export const downloadImage = (url, filename = 'image.png') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Generate unique filename
 * @param {string} prefix - Filename prefix
 * @param {string} extension - File extension (with dot)
 * @returns {string} - Unique filename
 */
export const generateFilename = (prefix = 'image', extension = '.png') => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}-${timestamp}-${random}${extension}`;
};

/**
 * Compress image using canvas
 * @param {File|Blob} file - Image file to compress
 * @param {number} quality - Quality (0-1)
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<Blob>} - Compressed image blob
 */
export const compressImage = async (file, quality = 0.85, maxWidth = 2048, maxHeight = 2048) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                let { width, height } = img;

                // Calculate new dimensions
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }

                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to blob
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to compress image'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
};

/**
 * Get image dimensions
 * @param {string|File} source - Image URL or File
 * @returns {Promise<{width: number, height: number}>} - Image dimensions
 */
export const getImageDimensions = (source) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        if (typeof source === 'string') {
            img.src = source;
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(source);
        }
    });
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy:', error);
        return false;
    }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 300) => {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
    if (text.length <= length) return text;
    return text.substring(0, length) + suffix;
};

/**
 * Check if device is mobile
 * @returns {boolean} - Is mobile
 */
export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} - Random item
 */
export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default {
    dataURLtoBlob,
    dataURLtoFile,
    blobToDataURL,
    fileToDataURL,
    validateImageFile,
    formatBytes,
    downloadImage,
    generateFilename,
    compressImage,
    getImageDimensions,
    copyToClipboard,
    debounce,
    throttle,
    sleep,
    formatNumber,
    truncateText,
    isMobile,
    getRandomItem,
    shuffleArray,
};
