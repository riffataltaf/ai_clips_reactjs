import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, Sparkles, Download, RefreshCw, FileImage, User, Wand2, Megaphone, ShoppingBag, AlertCircle } from 'lucide-react';
import {
    removeBackground,
    enhanceImage,
    createBanner,
    createProfile,
    createAdCreative,
    createProductPhoto
} from '../services/localImageProcessor';

const actionButtons = [
    { id: 'enhance', label: 'Product Enhance', icon: Sparkles, color: 'from-violet-500 to-purple-600' },
    { id: 'banner', label: 'Banner Generate', icon: FileImage, color: 'from-blue-500 to-cyan-500' },
    { id: 'profile', label: 'Profile Generate', icon: User, color: 'from-emerald-500 to-teal-500' },
    { id: 'background', label: 'Remove BG', icon: Wand2, color: 'from-pink-500 to-rose-500' },
    { id: 'ad', label: 'Ad Creative', icon: Megaphone, color: 'from-orange-500 to-amber-500' },
    { id: 'product', label: 'Product Photo', icon: ShoppingBag, color: 'from-indigo-500 to-violet-500' },
];

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
    const [progressText, setProgressText] = useState('');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                setGeneratedImage(null);
                setSelectedAction(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                setGeneratedImage(null);
                setSelectedAction(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActionClick = async (action) => {
        if (!selectedImage) {
            document.getElementById('image-upload').click();
            return;
        }

        setSelectedAction(action);
        setIsGenerating(true);
        setError(null);
        setProgressText('');

        try {
            let result;

            switch (action.id) {
                case 'background':
                    // Remove Background using free local AI
                    result = await removeBackground(selectedImage, (progress) => {
                        setProgressText(progress);
                    });
                    break;

                case 'enhance':
                    // Enhance image quality
                    result = await enhanceImage(selectedImage);
                    break;

                case 'banner':
                    // Create marketing banner
                    result = await createBanner(selectedImage);
                    break;

                case 'profile':
                    // Create profile picture
                    result = await createProfile(selectedImage);
                    break;

                case 'ad':
                    // Create ad creative
                    result = await createAdCreative(selectedImage);
                    break;

                case 'product':
                    // Create product photo
                    result = await createProductPhoto(selectedImage);
                    break;

                default:
                    result = await enhanceImage(selectedImage);
            }

            setGeneratedImage(result);
        } catch (err) {
            console.error('Generation Error:', err);
            setError('Processing failed. Please try again with a different image.');
        } finally {
            setIsGenerating(false);
            setProgressText('');
        }
    };

    // Fallback canvas processing if API fails
    const fallbackCanvasProcessing = (action) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            switch (action.id) {
                case 'enhance':
                    ctx.filter = 'brightness(1.15) contrast(1.15) saturate(1.25)';
                    break;
                case 'banner':
                    ctx.filter = 'brightness(1.1) contrast(1.2) saturate(1.3)';
                    break;
                case 'profile':
                    ctx.filter = 'brightness(1.05) sepia(0.1)';
                    break;
                case 'ad':
                    ctx.filter = 'brightness(1.1) contrast(1.2) saturate(1.4)';
                    break;
                default:
                    ctx.filter = 'brightness(1.1) contrast(1.1)';
            }

            ctx.drawImage(img, 0, 0);
            setGeneratedImage(canvas.toDataURL('image/png', 1.0));
        };
        img.src = selectedImage;
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = `${selectedAction?.id || 'generated'}-image.png`;
            link.click();
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setGeneratedImage(null);
        setSelectedAction(null);
        setIsGenerating(false);
        setError(null);
    };

    return (
        <section className="py-20 px-6 relative z-10 overflow-hidden" id="generator-section">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            Upload & <span className="text-gradient">Generate</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Upload your image and choose an action to generate AI-powered results instantly.
                        </p>
                    </motion.div>
                </div>

                {/* Error Alert */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Main Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
                >
                    {/* Upload Area */}
                    {!generatedImage ? (
                        <>
                            <div
                                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${dragActive
                                    ? 'border-indigo-500 bg-indigo-50/50'
                                    : selectedImage
                                        ? 'border-gray-200 bg-gray-50'
                                        : 'border-gray-200 hover:border-indigo-300 bg-gray-50'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                                {selectedImage ? (
                                    <div className="relative">
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-full h-64 md:h-80 object-contain rounded-2xl"
                                        />

                                        {/* Remove button */}
                                        {!isGenerating && (
                                            <button
                                                onClick={handleReset}
                                                className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all shadow-lg"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}

                                        {/* Loading overlay */}
                                        <AnimatePresence>
                                            {isGenerating && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center"
                                                >
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl animate-pulse opacity-50"></div>
                                                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin relative z-10" />
                                                    </div>
                                                    <p className="mt-4 text-lg font-semibold text-indigo-700">
                                                        Generating {selectedAction?.label}...
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {progressText || 'Processing with AI (runs locally, may take a moment)'}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center cursor-pointer py-16 px-8"
                                    >
                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 mb-6 hover:scale-110 transition-all">
                                            <Upload className="w-10 h-10 text-indigo-500" />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900 mb-2">Drop your image here</p>
                                        <p className="text-gray-500 mb-2">or click to browse</p>
                                        <p className="text-sm text-gray-400">Supports: PNG, JPG, WEBP</p>
                                    </label>
                                )}
                            </div>

                            {/* Action Buttons - Always Active */}
                            <div className="mt-8">
                                <p className="text-center text-gray-600 font-medium mb-4">
                                    Choose an action:
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {actionButtons.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <button
                                                key={action.id}
                                                onClick={() => handleActionClick(action)}
                                                disabled={isGenerating}
                                                className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg bg-gradient-to-r ${action.color} text-white hover:scale-105 active:scale-95 hover:shadow-xl ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {action.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Result View */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Result Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-r ${selectedAction?.color}`}>
                                        {selectedAction && <selectedAction.icon className="w-5 h-5 text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{selectedAction?.label}</h3>
                                        <p className="text-sm text-gray-500">Generation complete!</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Success
                                </span>
                            </div>

                            {/* Before/After Comparison */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-gray-900/70 backdrop-blur text-white rounded-lg text-xs font-medium">
                                        Original
                                    </span>
                                    <img
                                        src={selectedImage}
                                        alt="Original"
                                        className="w-full h-64 object-contain"
                                    />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden bg-gray-50 border-2 border-indigo-200 ring-4 ring-indigo-500/10">
                                    <span className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${selectedAction?.color} text-white rounded-lg text-xs font-medium flex items-center gap-1`}>
                                        <Sparkles className="w-3 h-3" />
                                        AI Generated
                                    </span>
                                    <img
                                        src={generatedImage}
                                        alt="Generated"
                                        className="w-full h-64 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                                <button className="btn-primary flex items-center gap-2 px-8 py-4" onClick={handleDownload}>
                                    <Download className="w-5 h-5" />
                                    Download Result
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-8 py-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Start Over
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ImageUpload;
