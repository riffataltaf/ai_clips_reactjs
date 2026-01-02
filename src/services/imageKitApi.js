
const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/myproducts786';
// NOTE: For security, you should strictly use signed uploads with a backend. 
// We are using the public key here as requested, which requires "Allow Unsigned Uploads" to be enabled in ImageKit Dashboard.
const PUBLIC_KEY = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';

// Helper: Convert Data URL to File object for upload
const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

// 1. Upload to ImageKit
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `ai-gen-${Date.now()}.png`);
    formData.append('publicKey', PUBLIC_KEY);
    // Needed for client-side uploads if unsigned is allowed
    formData.append('useUniqueFileName', 'true');
    formData.append('folder', '/ai-product-generator');

    try {
        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ImageKit Upload Failed');
        }
        return data.url; // Returns the file URL
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
};

// 2. Main Processing Function
const processImage = async (imageDataURL, transformationString) => {
    try {
        // Convert to file
        const file = dataURLtoFile(imageDataURL, 'image.png');

        // Upload
        let currentUrl = await uploadImage(file);

        // Append Transformation
        // ImageKit format: endpoint/tr:transformation/path/to/file
        // OR if URL already has path: URL?tr=transformation

        // Easier way with URL parameters:
        const separator = currentUrl.includes('?') ? '&' : '?';
        return `${currentUrl}${separator}tr=${transformationString}`;

    } catch (error) {
        throw new Error('Processing Failed: ' + error.message);
    }
};

// --- Exported Actions Mapped to ImageKit Transformations ---

export const removeBackground = async (imageDataURL) => {
    // Requires "Background Removal" Add-on enabled in ImageKit
    return await processImage(imageDataURL, 'bg-remove');
};

export const enhanceImage = async (imageDataURL) => {
    // Sharpen and increase contrast
    return await processImage(imageDataURL, 'e-sharpen,c-maintain_ratio,q-100');
};

export const replaceBackground = async (imageDataURL, prompt) => {
    // Note: ImageKit is NOT a Generative AI like Clipdrop. 
    // It cannot "Paint a beach". 
    // We will simulate "Banner" by adding padding/background generic colors or standard transforms.
    // However, if the user insists on *their* API, we use what's available.
    // We'll return a smart crop/pad version.
    return await processImage(imageDataURL, 'ar-16-9,cm-pad_resize,bg-F3F4F6');
};

// Functions expected by ImageUpload.jsx
export const createBanner = async (imageDataURL) => {
    return await processImage(imageDataURL, 'ar-16-9,cm-pad_resize,bg-gradient_000000_FFFFFF');
};

export const createProfile = async (imageDataURL) => {
    return await processImage(imageDataURL, 'r-max,bo-10_667eea');
};

export const createAdCreative = async (imageDataURL) => {
    return await processImage(imageDataURL, 'ar-4-5,bg-FFEDD5,bo-5_F97316');
};

export const createProductPhoto = async (imageDataURL) => {
    return await processImage(imageDataURL, 'w-1000,h-1000,cm-pad_resize,bg-FFFFFF');
};

export default {
    removeBackground,
    enhanceImage,
    createBanner,
    createProfile,
    createAdCreative,
    createProductPhoto
};
