import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Image as ImageIcon,
    Video,
    Type,
    Upload,
    Wand2,
    Download,
    Loader2,
    X,
    ArrowRight,
    Check
} from 'lucide-react';
import {
    removeBackground,
    enhanceImage,
    createBanner,
    createProfile,
    createAdCreative,
    createProductPhoto
} from '../services/imageKitApi';

// Generation modes configuration
const MODES = [
    {
        id: 'image-enhance',
        title: 'Image Enhancement',
        description: 'Sharpen and enhance your images with AI quality boost',
        icon: Sparkles,
        color: 'from-blue-500 to-cyan-500',
        requiresImage: true,
        requiresPrompt: false
    },
    {
        id: 'remove-bg',
        title: 'Remove Background',
        description: 'Remove background from images instantly with AI',
        icon: Wand2,
        color: 'from-pink-500 to-rose-500',
        requiresImage: true,
        requiresPrompt: false
    },
    {
        id: 'create-banner',
        title: 'Banner Generator',
        description: 'Create 16:9 marketing banners with smart padding',
        icon: ImageIcon,
        color: 'from-violet-500 to-purple-600',
        requiresImage: true,
        requiresPrompt: false
    },
    {
        id: 'create-profile',
        title: 'Profile Photo',
        description: 'Generate circular profile images with custom borders',
        icon: Type,
        color: 'from-emerald-500 to-teal-500',
        requiresImage: true,
        requiresPrompt: false
    },
    {
        id: 'ad-creative',
        title: 'Ad Creative',
        description: 'Create 4:5 social media ad formats',
        icon: Sparkles,
        color: 'from-orange-500 to-amber-500',
        requiresImage: true,
        requiresPrompt: false
    },
    {
        id: 'product-photo',
        title: 'Product Photo',
        description: 'Professional product photos with white background',
        icon: ImageIcon,
        color: 'from-indigo-500 to-violet-500',
        requiresImage: true,
        requiresPrompt: false
    }
];

const AIGenerator = () => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImageURL, setUploadedImageURL] = useState(null);
    const [generatedResult, setGeneratedResult] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // Handle image upload
    const handleImageUpload = (file) => {
        if (!file) return;

        setError(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImageURL(e.target.result);
            setUploadedImage(file);
            setGeneratedResult(null);
        };
        reader.readAsDataURL(file);
    };

    // Handle drag and drop
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
            handleImageUpload(e.dataTransfer.files[0]);
        }
    };

    // Main generation function
    const handleGenerate = async () => {
        if (!selectedMode) {
            setError('Please select a generation mode');
            return;
        }

        const mode = MODES.find(m => m.id === selectedMode);

        if (mode.comingSoon) {
            setError('This feature is coming soon!');
            return;
        }

        if (mode.requiresPrompt && !prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        if (mode.requiresImage && !uploadedImageURL) {
            setError('Please upload an image');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            let result;

            switch (selectedMode) {
                case 'image-enhance':
                    result = await enhanceImage(uploadedImageURL);
                    break;

                case 'remove-bg':
                    result = await removeBackground(uploadedImageURL);
                    break;

                case 'create-banner':
                    result = await createBanner(uploadedImageURL);
                    break;

                case 'create-profile':
                    result = await createProfile(uploadedImageURL);
                    break;

                case 'ad-creative':
                    result = await createAdCreative(uploadedImageURL);
                    break;

                case 'product-photo':
                    result = await createProductPhoto(uploadedImageURL);
                    break;

                default:
                    throw new Error('Invalid mode');
            }

            setGeneratedResult(result);
        } catch (err) {
            console.error('Generation error:', err);
            setError(err.message || 'Generation failed. Please check if backend server is running (npm run server) or if ImageKit background removal add-on is enabled.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Reset everything
    const handleReset = () => {
        setSelectedMode(null);
        setPrompt('');
        setUploadedImage(null);
        setUploadedImageURL(null);
        setGeneratedResult(null);
        setError(null);
        setIsGenerating(false);
    };

    // Download result
    const handleDownload = () => {
        if (!generatedResult) return;

        const link = document.createElement('a');
        link.href = generatedResult;
        link.download = `ai-generated-${selectedMode}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const currentMode = MODES.find(m => m.id === selectedMode);

    return (
        <section className="py-20 px-6 relative z-10 overflow-hidden" id="ai-generator">
            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        AI <span className="text-gradient">Generator Studio</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Choose your creation mode and let AI bring your vision to life
                    </p>
                </motion.div>

                {/* Mode Selection Grid */}
                {!selectedMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    >
                        {MODES.map((mode, index) => {
                            const Icon = mode.icon;
                            return (
                                <motion.button
                                    key={mode.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => !mode.comingSoon && setSelectedMode(mode.id)}
                                    disabled={mode.comingSoon}
                                    className={`relative group bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/50 border-2 border-gray-100 
                                        ${mode.comingSoon
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'hover:shadow-xl hover:shadow-gray-300/50 hover:scale-105 hover:border-gray-200 cursor-pointer'
                                        } transition-all duration-300`}
                                >
                                    {mode.comingSoon && (
                                        <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                            Coming Soon
                                        </span>
                                    )}

                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${mode.color} flex items-center justify-center mb-6 
                                        ${!mode.comingSoon && 'group-hover:scale-110'} transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {mode.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {mode.description}
                                    </p>

                                    {!mode.comingSoon && (
                                        <div className="mt-6 flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                                            Get Started <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}

                {/* Generation Interface */}
                {selectedMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100"
                    >
                        {/* Header with mode info */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${currentMode?.color} flex items-center justify-center`}>
                                    {currentMode && <currentMode.icon className="w-7 h-7 text-white" />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{currentMode?.title}</h3>
                                    <p className="text-gray-500">{currentMode?.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Error Display */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-center justify-between"
                                >
                                    <span>{error}</span>
                                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Input Section */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-900">Inputs</h4>

                                {/* Prompt Input */}
                                {currentMode?.requiresPrompt && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter your prompt
                                        </label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="Describe what you want to create..."
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 
                                                focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none h-32"
                                            disabled={isGenerating}
                                        />
                                    </div>
                                )}

                                {/* Image Upload */}
                                {currentMode?.requiresImage && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload your image
                                        </label>
                                        <div
                                            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${dragActive
                                                ? 'border-indigo-500 bg-indigo-50/50'
                                                : uploadedImageURL
                                                    ? 'border-green-300 bg-green-50/30'
                                                    : 'border-gray-300 hover:border-indigo-300 bg-gray-50'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                                                className="hidden"
                                                id="image-upload-input"
                                                disabled={isGenerating}
                                            />

                                            {uploadedImageURL ? (
                                                <div className="relative p-4">
                                                    <img
                                                        src={uploadedImageURL}
                                                        alt="Uploaded"
                                                        className="w-full h-48 object-contain rounded-xl"
                                                    />
                                                    {!isGenerating && (
                                                        <button
                                                            onClick={() => {
                                                                setUploadedImage(null);
                                                                setUploadedImageURL(null);
                                                            }}
                                                            className="absolute top-6 right-6 p-2 bg-white rounded-lg shadow-lg 
                                                                hover:bg-red-50 hover:text-red-500 transition-all"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor="image-upload-input"
                                                    className="flex flex-col items-center justify-center cursor-pointer py-12 px-6"
                                                >
                                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 mb-4">
                                                        <Upload className="w-8 h-8 text-indigo-500" />
                                                    </div>
                                                    <p className="text-lg font-semibold text-gray-900 mb-1">
                                                        Drop image here
                                                    </p>
                                                    <p className="text-sm text-gray-500">or click to browse</p>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || (currentMode?.requiresPrompt && !prompt.trim()) ||
                                        (currentMode?.requiresImage && !uploadedImageURL)}
                                    className={`w-full py-4 rounded-xl font-semibold text-white text-lg
                                        bg-gradient-to-r ${currentMode?.color} shadow-lg
                                        hover:shadow-xl hover:scale-105 active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                        transition-all flex items-center justify-center gap-2`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Result Section */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-900">Result</h4>

                                <div className="relative rounded-2xl border-2 border-gray-200 bg-gray-50 min-h-[300px] flex items-center justify-center overflow-hidden">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center gap-4 p-8">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl animate-pulse opacity-50" />
                                                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin relative z-10" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-indigo-700 mb-1">
                                                    AI is working its magic...
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    This may take a few moments
                                                </p>
                                            </div>
                                        </div>
                                    ) : generatedResult ? (
                                        <div className="relative w-full h-full p-4">
                                            <img
                                                src={generatedResult}
                                                alt="Generated result"
                                                className="w-full h-full object-contain rounded-xl"
                                            />
                                            <div className="absolute top-6 right-6 flex gap-2">
                                                <span className={`px-3 py-1 bg-gradient-to-r ${currentMode?.color} text-white 
                                                    rounded-lg text-xs font-medium flex items-center gap-1`}>
                                                    <Check className="w-3 h-3" />
                                                    Generated
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-8">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-200 flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-gray-400 font-medium">
                                                Your result will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Download Button */}
                                {generatedResult && !isGenerating && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleDownload}
                                        className="w-full py-4 rounded-xl font-semibold bg-white border-2 border-gray-200 
                                            text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all 
                                            flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Result
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AIGenerator;
