// Free Local Image Processing Service
// No API key required - everything runs in browser!

import { removeBackground as removeBackgroundAI } from '@imgly/background-removal';

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

// Load image from data URL
const loadImage = (dataURL) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = dataURL;
    });
};

// 1. Remove Background - Using @imgly/background-removal (FREE!)
export const removeBackground = async (imageDataURL, onProgress) => {
    try {
        const blob = dataURLtoBlob(imageDataURL);

        const config = {
            progress: (key, current, total) => {
                if (onProgress) {
                    const percent = Math.round((current / total) * 100);
                    onProgress(`${key}: ${percent}%`);
                }
            },
        };

        const resultBlob = await removeBackgroundAI(blob, config);
        return await blobToDataURL(resultBlob);
    } catch (error) {
        console.error('Remove Background Error:', error);
        throw error;
    }
};

// 2. Enhance Image - Improve quality with canvas filters
export const enhanceImage = async (imageDataURL) => {
    try {
        const img = await loadImage(imageDataURL);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Upscale by 1.5x for better quality
        canvas.width = img.width * 1.5;
        canvas.height = img.height * 1.5;

        // Apply enhancement filters
        ctx.filter = 'brightness(1.1) contrast(1.15) saturate(1.2)';
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply sharpening effect
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sharpened = applySharpen(imageData);
        ctx.putImageData(sharpened, 0, 0);

        return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
        console.error('Enhance Image Error:', error);
        throw error;
    }
};

// 3. Create Banner - Add gradient background
export const createBanner = async (imageDataURL) => {
    try {
        // First remove background
        const transparentImage = await removeBackground(imageDataURL);
        const img = await loadImage(transparentImage);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Banner dimensions (16:9)
        const bannerWidth = 1200;
        const bannerHeight = 675;
        canvas.width = bannerWidth;
        canvas.height = bannerHeight;

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, bannerWidth, bannerHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#f093fb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, bannerWidth, bannerHeight);

        // Add decorative circles
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(100, 100, 200, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bannerWidth - 150, bannerHeight - 100, 250, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Calculate image position (center-right)
        const scale = Math.min((bannerHeight * 0.8) / img.height, (bannerWidth * 0.5) / img.width);
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const imgX = bannerWidth - imgWidth - 50;
        const imgY = (bannerHeight - imgHeight) / 2;

        // Draw product image with shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
        console.error('Create Banner Error:', error);
        throw error;
    }
};

// 4. Create Profile Image - Circular with gradient border
export const createProfile = async (imageDataURL) => {
    try {
        const img = await loadImage(imageDataURL);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const size = 500;
        const borderWidth = 15;
        canvas.width = size;
        canvas.height = size;

        // Create gradient border
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#f093fb');

        // Draw border circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Clip to inner circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - borderWidth, 0, Math.PI * 2);
        ctx.clip();

        // Draw image to fit circle
        const scale = Math.max(size / img.width, size / img.height);
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const imgX = (size - imgWidth) / 2;
        const imgY = (size - imgHeight) / 2;

        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
        console.error('Create Profile Error:', error);
        throw error;
    }
};

// 5. Create Ad Creative - Eye-catching ad design
export const createAdCreative = async (imageDataURL) => {
    try {
        // First remove background
        const transparentImage = await removeBackground(imageDataURL);
        const img = await loadImage(transparentImage);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Instagram story dimensions (9:16)
        const adWidth = 540;
        const adHeight = 960;
        canvas.width = adWidth;
        canvas.height = adHeight;

        // Create vibrant gradient background
        const gradient = ctx.createLinearGradient(0, 0, adWidth, adHeight);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.3, '#feca57');
        gradient.addColorStop(0.6, '#ff9ff3');
        gradient.addColorStop(1, '#54a0ff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, adWidth, adHeight);

        // Add decorative elements
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.random() * adWidth,
                Math.random() * adHeight,
                50 + Math.random() * 100,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Calculate image position (center)
        const scale = Math.min((adHeight * 0.5) / img.height, (adWidth * 0.8) / img.width);
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const imgX = (adWidth - imgWidth) / 2;
        const imgY = adHeight * 0.35 - imgHeight / 2;

        // Draw shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        ctx.shadowBlur = 0;

        // Add sale badge
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(adWidth - 70, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SALE', adWidth - 70, 95);
        ctx.font = 'bold 16px Arial';
        ctx.fillText('50%', adWidth - 70, 115);

        // Add CTA button
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, adWidth / 2 - 80, adHeight - 150, 160, 50, 25);
        ctx.fill();

        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Shop Now →', adWidth / 2, adHeight - 118);

        return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
        console.error('Create Ad Error:', error);
        throw error;
    }
};

// 6. Product Photo - Professional white background
export const createProductPhoto = async (imageDataURL) => {
    try {
        // First remove background
        const transparentImage = await removeBackground(imageDataURL);
        const img = await loadImage(transparentImage);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Square product photo
        const size = 1000;
        const padding = 80;
        canvas.width = size;
        canvas.height = size;

        // Clean white/light gray gradient background
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#f5f5f5');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Calculate image size to fit with padding
        const maxSize = size - padding * 2;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const imgX = (size - imgWidth) / 2;
        const imgY = (size - imgHeight) / 2;

        // Add subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetY = 25;

        // Draw product
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        // Add floor reflection
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.1;
        ctx.save();
        ctx.translate(0, size);
        ctx.scale(1, -0.3);
        ctx.drawImage(img, imgX, size - imgY - imgHeight, imgWidth, imgHeight);
        ctx.restore();
        ctx.globalAlpha = 1;

        return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
        console.error('Create Product Photo Error:', error);
        throw error;
    }
};

// Helper: Apply sharpening filter
function applySharpen(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const factor = 0.2;

    const output = new ImageData(width, height);
    const outputData = output.data;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) {
                const i = (y * width + x) * 4 + c;
                const value = data[i] * (1 + 4 * factor)
                    - data[((y - 1) * width + x) * 4 + c] * factor
                    - data[((y + 1) * width + x) * 4 + c] * factor
                    - data[(y * width + x - 1) * 4 + c] * factor
                    - data[(y * width + x + 1) * 4 + c] * factor;
                outputData[i] = Math.max(0, Math.min(255, value));
            }
            outputData[(y * width + x) * 4 + 3] = data[(y * width + x) * 4 + 3];
        }
    }

    return output;
}

// Helper: Draw rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

export default {
    removeBackground,
    enhanceImage,
    createBanner,
    createProfile,
    createAdCreative,
    createProductPhoto,
};
