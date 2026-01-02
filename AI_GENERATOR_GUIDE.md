# 🎨 AI Generator Studio - Complete Guide

## 📋 Overview

This is a modern AI-powered image and video generation platform with a clean, modular architecture. The application supports multiple AI operations through an intuitive interface.

## ✨ Features

### Currently Available:
1. **Text to Image** - Generate images from text prompts using Clipdrop AI
2. **Image Enhancement** - Upscale and enhance image quality
3. **Remove Background** - AI-powered background removal
4. **Replace Background** - Replace backgrounds with AI-generated scenes

### Coming Soon:
5. **Image to Video** - Animate images into videos
6. **Text to Video** - Generate videos from text descriptions

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AIGenerator.jsx       # Main AI generation interface (NEW)
│   ├── ImageUpload.jsx        # Legacy component (can be removed)
│   ├── Navbar.jsx            # Navigation bar
│   ├── Hero.jsx              # Hero section
│   ├── Footer.jsx            # Footer component
│   └── ResultShowcase.jsx    # Legacy (can be removed)
│
├── services/
│   ├── clipdropApi.js        # Clipdrop API integration
│   ├── videoApi.js           # Video generation (Coming Soon)
│   ├── imageKitApi.js        # Image storage (optional)
│   └── localImageProcessor.js # Local fallback processing
│
├── App.jsx                    # Main app component
└── index.css                  # Global styles
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Add your Clipdrop API key:
```env
VITE_CLIPDROP_API_KEY=your_api_key_here
```

Get your API key from: [https://clipdrop.co/apis](https://clipdrop.co/apis)

### 3. Start Development Servers

**Frontend:**
```bash
npm run dev
```

**Backend (for ImageKit):**
```bash
npm run server
```

### 4. Open the Application
Navigate to `http://localhost:5173` in your browser.

## 🎯 How to Use

### Text to Image
1. Click the "Text to Image" card
2. Enter your prompt (e.g., "A beautiful sunset over mountains")
3. Click "Generate"
4. Download your result

### Image Enhancement
1. Click the "Image Enhancement" card
2. Upload your image (drag & drop or click to browse)
3. Click "Generate"
4. Download the enhanced image

### Remove Background
1. Click the "Remove Background" card
2. Upload your image
3. Click "Generate"
4. Download the image with transparent background

### Replace Background
1. Click the "Replace Background" card
2. Upload your image
3. Enter a prompt describing the new background
4. Click "Generate"
5. Download the result

## 🔧 Component Architecture

### AIGenerator.jsx
The main component that handles all AI generation modes. It features:
- **Mode Selection**: Grid of cards for choosing generation type
- **Input Section**: Dynamic inputs based on selected mode
- **Result Display**: Real-time preview of generated content
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during generation

### Key Functions:

#### `handleGenerate()`
Main generation function that routes to the appropriate API based on mode:
```javascript
const handleGenerate = async () => {
    // Validation
    // API call based on selectedMode
    // Result handling
}
```

#### `handleImageUpload(file)`
Handles image file uploads with validation:
```javascript
const handleImageUpload = (file) => {
    // File validation
    // Convert to data URL
    // Update state
}
```

#### `handleReset()`
Resets all states to start fresh:
```javascript
const handleReset = () => {
    // Clear all states
    // Return to mode selection
}
```

## 📡 API Services

### clipdropApi.js

#### `generateImage(prompt)`
Generates an image from text prompt.
- **Endpoint**: `/text-to-image/v1`
- **Input**: Text prompt
- **Output**: Base64 image data

#### `enhanceImage(imageDataURL)`
Upscales and enhances image quality.
- **Endpoint**: `/image-upscaling/v1/upscale`
- **Input**: Base64 image
- **Output**: Enhanced image (2048x2048)

#### `removeBackground(imageDataURL)`
Removes background using AI.
- **Endpoint**: `/remove-background/v1`
- **Input**: Base64 image
- **Output**: Image with transparent background

#### `replaceBackground(imageDataURL, prompt)`
Replaces background with AI-generated scene.
- **Endpoint**: `/replace-background/v1`
- **Input**: Base64 image + prompt
- **Output**: Image with new background

### videoApi.js (Coming Soon)
Placeholder for future video generation features:
- `imageToVideo()` - Animate images
- `textToVideo()` - Generate videos from text
- `animateImage()` - Add camera movements

## 🎨 Styling

The app uses:
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Custom CSS** for gradients and special effects

### Color Palette:
- **Primary**: Violet/Indigo gradients
- **Accent**: Mode-specific colors (blue, pink, emerald, etc.)
- **Background**: Clean white with subtle colored blurs

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLIPDROP_API_KEY` | Clipdrop API key | ✅ Yes |
| `VITE_IMAGEKIT_PUBLIC_KEY` | ImageKit public key | ❌ Optional |
| `VITE_IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | ❌ Optional |

## 🐛 Troubleshooting

### "Generation failed" Error
- ✅ Check if `.env` file exists with valid API key
- ✅ Verify Clipdrop API key is correct
- ✅ Check browser console for detailed errors
- ✅ Ensure you have internet connection

### Images not uploading
- ✅ Check file format (PNG, JPG, WEBP supported)
- ✅ Verify file size is reasonable (< 10MB)
- ✅ Check browser console for errors

### Backend connection errors
- ✅ Make sure `server.js` is running (`npm run server`)
- ✅ Check if port 5000 is available
- ✅ Verify CORS settings in `server.js`

## 📝 Code Quality

### Best Practices Used:
- ✅ **Modular Architecture**: Separated concerns (components, services, utilities)
- ✅ **Clean Functions**: Single responsibility, well-named functions
- ✅ **Error Handling**: Try-catch blocks with user-friendly messages
- ✅ **Loading States**: Visual feedback for async operations
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Accessibility**: Semantic HTML, proper labels
- ✅ **Code Documentation**: Inline comments and JSDoc

## 🚀 Future Enhancements

### Planned Features:
1. **Video Generation**
   - Integration with Runway ML / Pika Labs
   - Image-to-video animations
   - Text-to-video creation

2. **Advanced Options**
   - Style selection (realistic, artistic, cartoon)
   - Resolution options
   - Batch processing

3. **User Accounts**
   - Save generation history
   - Favorite results
   - Usage analytics

4. **More AI Features**
   - Object removal/cleanup
   - Image reimagining
   - Style transfer
   - Face restoration

## 📚 Learning Resources

- [Clipdrop API Docs](https://clipdrop.co/apis/docs)
- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

To add a new AI feature:

1. **Create API service** in `src/services/`
2. **Add mode configuration** in `AIGenerator.jsx` MODES array
3. **Update switch case** in `handleGenerate()` function
4. **Test thoroughly** with different inputs
5. **Update documentation**

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using React, Tailwind CSS, and Clipdrop AI**
