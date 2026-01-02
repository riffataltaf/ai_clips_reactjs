/**
 * Custom Hook: useImageUpload
 * Handles image upload logic, validation, and state management
 */

import { useState, useCallback } from 'react';
import { validateImageFile, fileToDataURL } from '../utils/helpers';
import { MESSAGES } from '../config/constants';

export const useImageUpload = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    /**
     * Handle file selection
     * @param {File} file - Selected file
     */
    const handleFileSelect = useCallback(async (file) => {
        // Reset previous state
        setUploadError(null);
        setIsUploading(true);

        try {
            // Validate file
            const validation = validateImageFile(file);

            if (!validation.valid) {
                setUploadError(validation.error);
                setIsUploading(false);
                return;
            }

            // Convert to data URL for preview
            const dataURL = await fileToDataURL(file);

            // Update state
            setImage(file);
            setImagePreview(dataURL);

            setIsUploading(false);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(MESSAGES.ERROR.UPLOAD);
            setIsUploading(false);
        }
    }, []);

    /**
     * Handle drag and drop
     * @param {DragEvent} e - Drag event
     */
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);

    /**
     * Reset upload state
     */
    const resetUpload = useCallback(() => {
        setImage(null);
        setImagePreview(null);
        setUploadError(null);
        setIsUploading(false);
    }, []);

    return {
        image,
        imagePreview,
        isUploading,
        uploadError,
        handleFileSelect,
        handleDrop,
        resetUpload,
    };
};

export default useImageUpload;
