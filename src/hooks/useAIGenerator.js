/**
 * Custom Hook: useAIGenerator
 * Handles AI image generation with different providers (Clipdrop, ImageKit)
 */

import { useState, useCallback } from 'react';
import { clipdrop, imageKit } from '../services';
import { MESSAGES, GENERATION_TYPES } from '../config/constants';

export const useAIGenerator = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [generationError, setGenerationError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [activeType, setActiveType] = useState(null);

    /**
     * Generate image based on type
     * @param {string} imageDataURL - Source image data URL
     * @param {string} type - Generation type from GENERATION_TYPES
     * @param {string} provider - 'clipdrop' or 'imagekit'
     * @param {Object} options - Additional options
     */
    const generateImage = useCallback(async (imageDataURL, type, provider = 'clipdrop', options = {}) => {
        setIsGenerating(true);
        setGenerationError(null);
        setProgress(10);
        setActiveType(type);

        try {
            let result;

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 10, 90));
            }, 500);

            // Choose provider and method
            if (provider === 'clipdrop') {
                switch (type) {
                    case GENERATION_TYPES.ENHANCE.id:
                        result = await clipdrop.enhanceImage(imageDataURL);
                        break;
                    case GENERATION_TYPES.REMOVE_BG.id:
                        result = await clipdrop.removeBackground(imageDataURL);
                        break;
                    case GENERATION_TYPES.PRODUCT_PHOTO.id:
                        result = await clipdrop.replaceBackground(
                            imageDataURL,
                            options.prompt || 'professional product photography, studio lighting, white background'
                        );
                        break;
                    case GENERATION_TYPES.BANNER.id:
                        result = await clipdrop.replaceBackground(
                            imageDataURL,
                            options.prompt || 'professional banner background, vibrant colors, gradient'
                        );
                        break;
                    case GENERATION_TYPES.PROFILE.id:
                        result = await clipdrop.removeBackground(imageDataURL);
                        break;
                    case GENERATION_TYPES.AD_CREATIVE.id:
                        result = await clipdrop.reimagineImage(imageDataURL);
                        break;
                    default:
                        throw new Error('Unknown generation type');
                }
            } else if (provider === 'imagekit') {
                switch (type) {
                    case GENERATION_TYPES.ENHANCE.id:
                        result = await imageKit.enhanceImage(imageDataURL);
                        break;
                    case GENERATION_TYPES.REMOVE_BG.id:
                        result = await imageKit.removeBackground(imageDataURL);
                        break;
                    case GENERATION_TYPES.PRODUCT_PHOTO.id:
                        result = await imageKit.createProductPhoto(imageDataURL);
                        break;
                    case GENERATION_TYPES.BANNER.id:
                        result = await imageKit.createBanner(imageDataURL);
                        break;
                    case GENERATION_TYPES.PROFILE.id:
                        result = await imageKit.createProfile(imageDataURL);
                        break;
                    case GENERATION_TYPES.AD_CREATIVE.id:
                        result = await imageKit.createAdCreative(imageDataURL);
                        break;
                    default:
                        throw new Error('Unknown generation type');
                }
            }

            clearInterval(progressInterval);
            setProgress(100);
            setGeneratedImage(result);
            setIsGenerating(false);

            return result;
        } catch (error) {
            console.error('Generation error:', error);
            setGenerationError(error.message || MESSAGES.ERROR.GENERATE);
            setIsGenerating(false);
            setProgress(0);
            throw error;
        }
    }, []);

    /**
     * Reset generator state
     */
    const resetGenerator = useCallback(() => {
        setIsGenerating(false);
        setGeneratedImage(null);
        setGenerationError(null);
        setProgress(0);
        setActiveType(null);
    }, []);

    /**
     * Retry generation with same parameters
     */
    const retry = useCallback((imageDataURL, type, provider, options) => {
        return generateImage(imageDataURL, type, provider, options);
    }, [generateImage]);

    return {
        isGenerating,
        generatedImage,
        generationError,
        progress,
        activeType,
        generateImage,
        resetGenerator,
        retry,
    };
};

export default useAIGenerator;
