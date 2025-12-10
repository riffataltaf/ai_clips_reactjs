// Clipdrop API Service
// Documentation: https://clipdrop.co/apis/docs

const CLIPDROP_API_KEY = import.meta.env.VITE_CLIPDROP_API_KEY;
const BASE_URL = 'https://clipdrop-api.co';

// Helper function to convert data URL to Blob
const dataURLtoBlob = (dataURL) => {
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

// Helper function to convert Blob to data URL
const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// 1. Remove Background
export const removeBackground = async (imageDataURL) => {
    try {
        const formData = new FormData();
        formData.append('image_file', dataURLtoBlob(imageDataURL), 'image.png');

        const response = await fetch(`${BASE_URL}/remove-background/v1`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Remove Background Error:', error);
        throw error;
    }
};

// 2. Image Upscaling (Enhance)
export const enhanceImage = async (imageDataURL) => {
    try {
        const formData = new FormData();
        formData.append('image_file', dataURLtoBlob(imageDataURL), 'image.png');
        formData.append('target_width', 2048);
        formData.append('target_height', 2048);

        const response = await fetch(`${BASE_URL}/image-upscaling/v1/upscale`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Enhance Image Error:', error);
        throw error;
    }
};

// 3. Replace Background (Product Photo)
export const replaceBackground = async (imageDataURL, prompt = "professional product photography, studio lighting, white background") => {
    try {
        const formData = new FormData();
        formData.append('image_file', dataURLtoBlob(imageDataURL), 'image.png');
        formData.append('prompt', prompt);

        const response = await fetch(`${BASE_URL}/replace-background/v1`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Replace Background Error:', error);
        throw error;
    }
};

// 4. Text to Image (Banner/Ad Generation)
export const generateImage = async (prompt) => {
    try {
        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await fetch(`${BASE_URL}/text-to-image/v1`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Generate Image Error:', error);
        throw error;
    }
};

// 5. Reimagine (Create variations)
export const reimagineImage = async (imageDataURL) => {
    try {
        const formData = new FormData();
        formData.append('image_file', dataURLtoBlob(imageDataURL), 'image.png');

        const response = await fetch(`${BASE_URL}/reimagine/v1/reimagine`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Reimagine Error:', error);
        throw error;
    }
};

// 6. Cleanup (Remove objects)
export const cleanupImage = async (imageDataURL, maskDataURL) => {
    try {
        const formData = new FormData();
        formData.append('image_file', dataURLtoBlob(imageDataURL), 'image.png');
        formData.append('mask_file', dataURLtoBlob(maskDataURL), 'mask.png');

        const response = await fetch(`${BASE_URL}/cleanup/v1`, {
            method: 'POST',
            headers: {
                'x-api-key': CLIPDROP_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        return await blobToDataURL(blob);
    } catch (error) {
        console.error('Cleanup Error:', error);
        throw error;
    }
};

export default {
    removeBackground,
    enhanceImage,
    replaceBackground,
    generateImage,
    reimagineImage,
    cleanupImage,
};
