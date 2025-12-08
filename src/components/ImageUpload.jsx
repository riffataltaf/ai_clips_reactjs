import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, Sparkles, Download, RefreshCw, FileImage, User, Wand2, Megaphone, ShoppingBag } from 'lucide-react';

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
            setSelectedImage(URL.createObjectURL(file));
            setGeneratedImage(null);
            setSelectedAction(null);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setGeneratedImage(null);
            setSelectedAction(null);
        }
    };

    const handleActionClick = (action) => {
        if (!selectedImage) {
            document.getElementById('image-upload').click();
            return;
        }

        setSelectedAction(action);
        setIsGenerating(true);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            switch (action.id) {
                case 'banner': {
                    // Create wide banner (1200x628 - Facebook ad size)
                    canvas.width = 1200;
                    canvas.height = 628;

                    // Gradient background
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, '#6366f1');
                    gradient.addColorStop(0.5, '#8b5cf6');
                    gradient.addColorStop(1, '#a855f7');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Add decorative circles
                    ctx.fillStyle = 'rgba(255,255,255,0.1)';
                    ctx.beginPath();
                    ctx.arc(100, 100, 150, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(canvas.width - 150, canvas.height - 100, 200, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw product image in center
                    const scale = Math.min(400 / img.width, 400 / img.height);
                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;
                    const x = (canvas.width - newWidth) / 2;
                    const y = (canvas.height - newHeight) / 2;

                    // White background for product
                    ctx.fillStyle = 'white';
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowBlur = 30;
                    ctx.fillRect(x - 20, y - 20, newWidth + 40, newHeight + 40);
                    ctx.shadowBlur = 0;

                    ctx.drawImage(img, x, y, newWidth, newHeight);
                    break;
                }

                case 'profile': {
                    // Create square profile (500x500)
                    canvas.width = 500;
                    canvas.height = 500;

                    // Gradient background
                    const gradient = ctx.createRadialGradient(250, 250, 0, 250, 250, 350);
                    gradient.addColorStop(0, '#10b981');
                    gradient.addColorStop(1, '#059669');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Circular clip for image
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(250, 250, 200, 0, Math.PI * 2);
                    ctx.clip();

                    // Draw image to fill circle
                    const size = Math.max(img.width, img.height);
                    const scale = 400 / Math.min(img.width, img.height);
                    ctx.drawImage(img, 250 - (img.width * scale) / 2, 250 - (img.height * scale) / 2, img.width * scale, img.height * scale);
                    ctx.restore();

                    // Circle border
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 8;
                    ctx.beginPath();
                    ctx.arc(250, 250, 204, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                }

                case 'ad': {
                    // Instagram story size (1080x1920)
                    canvas.width = 1080;
                    canvas.height = 1920;

                    // Vibrant gradient
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, '#f97316');
                    gradient.addColorStop(0.5, '#ef4444');
                    gradient.addColorStop(1, '#ec4899');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Product image
                    const scale = Math.min(800 / img.width, 800 / img.height);
                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;
                    const x = (canvas.width - newWidth) / 2;
                    const y = (canvas.height - newHeight) / 2 - 100;

                    // Shadow and image
                    ctx.shadowColor = 'rgba(0,0,0,0.4)';
                    ctx.shadowBlur = 50;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(x - 30, y - 30, newWidth + 60, newHeight + 60);
                    ctx.shadowBlur = 0;
                    ctx.drawImage(img, x, y, newWidth, newHeight);

                    // Add text
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 80px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('SPECIAL OFFER', canvas.width / 2, canvas.height - 300);
                    ctx.font = '50px Arial';
                    ctx.fillText('Shop Now →', canvas.width / 2, canvas.height - 200);
                    break;
                }

                case 'product': {
                    // Square product photo with white background
                    const size = Math.max(img.width, img.height) + 200;
                    canvas.width = size;
                    canvas.height = size;

                    // White background
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Soft shadow
                    ctx.shadowColor = 'rgba(0,0,0,0.15)';
                    ctx.shadowBlur = 60;
                    ctx.shadowOffsetY = 20;

                    // Center product
                    const x = (canvas.width - img.width) / 2;
                    const y = (canvas.height - img.height) / 2;
                    ctx.drawImage(img, x, y);
                    break;
                }

                case 'enhance':
                case 'background':
                default: {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.filter = action.id === 'enhance'
                        ? 'brightness(1.15) contrast(1.15) saturate(1.25)'
                        : 'brightness(1.2) contrast(1.3) saturate(1.1)';
                    ctx.drawImage(img, 0, 0);
                    break;
                }
            }

            const processedImage = canvas.toDataURL('image/png', 1.0);

            setTimeout(() => {
                setIsGenerating(false);
                setGeneratedImage(processedImage);
            }, 1500);
        };
        img.src = selectedImage;
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = 'generated-image.jpg';
            link.click();
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setGeneratedImage(null);
        setSelectedAction(null);
        setIsGenerating(false);
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
                                                    <p className="mt-2 text-sm text-gray-500">This may take a few seconds</p>
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
                                        Generated
                                    </span>
                                    <img
                                        src={generatedImage}
                                        alt="Generated"
                                        className="w-full h-64 object-contain brightness-110 contrast-105 saturate-110"
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
