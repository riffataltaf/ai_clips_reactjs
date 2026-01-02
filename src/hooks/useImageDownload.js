/**
 * Custom Hook: useImageDownload
 * Handles image download functionality
 */

import { useCallback } from 'react';
import { downloadImage, generateFilename } from '../utils/helpers';
import { MESSAGES } from '../config/constants';

export const useImageDownload = () => {
    /**
     * Download image from URL or Data URL
     * @param {string} url - Image URL or Data URL
     * @param {string} customFilename - Optional custom filename
     * @param {boolean} showNotification - Show success notification
     */
    const download = useCallback((url, customFilename = null, showNotification = true) => {
        try {
            const filename = customFilename || generateFilename('ai-product', '.png');
            downloadImage(url, filename);

            if (showNotification) {
                console.log(MESSAGES.SUCCESS.DOWNLOAD);
                // You can add toast notification here
            }

            return true;
        } catch (error) {
            console.error('Download error:', error);
            return false;
        }
    }, []);

    /**
     * Download multiple images as zip (future feature)
     * @param {Array} urls - Array of image URLs
     * @param {string} zipName - Zip file name
     */
    const downloadMultiple = useCallback(async (urls, zipName = 'images.zip') => {
        // Placeholder for future implementation with JSZip
        console.log('Batch download coming soon!');
        console.log('URLs to download:', urls);
    }, []);

    return {
        download,
        downloadMultiple,
    };
};

export default useImageDownload;
