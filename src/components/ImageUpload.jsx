import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, Sparkles, Download, RefreshCw, FileImage, User, Wand2, Megaphone, ShoppingBag, AlertCircle } from 'lucide-react';
import { IKContext, IKImage } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/myproducts786';
const publicKey = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);

    const authenticator = async () => {
        try {
            console.log('🔐 Authenticator: Fetching auth from backend...');
            const response = await fetch('http://localhost:5000/auth');
            if (!response.ok) {
                console.error('❌ Authenticator failed:', response.status);
                throw new Error('Backend not running');
            }
            const data = await response.json();
            console.log('✅ Authenticator success:', data);
            return data;
        } catch (error) {
            console.error('❌ Authenticator error:', error);
            throw error;
        }
    };

    const getTransformations = (action = null) => {
        const currentAction = action || selectedAction;
        if (!currentAction) return [];

        const transforms = {
            'background': [
                { raw: "bg-remove" } // Background Removal (AI Addon)
            ],
            'enhance': [
                { raw: "e-sharpen-10" }, // Increased sharpening
                { raw: "e-contrast-10" }, // Added contrast boost
                { raw: "q-100" }
            ],
            'banner': [
                { raw: "w-1200" },
                { raw: "h-630" },
                { raw: "cm-pad_resize" },
                { raw: "bg-F3E8FF" } // Light purple background to see the padding
            ],
            'profile': [
                { raw: "w-800" },
                { raw: "h-800" },
                { raw: "r-max" }, // Full circle
                { raw: "bg-FFFFFF" },
                { raw: "b-20_6366F1" } // Added a thick indigo BORDER so the circle is VISIBLE
            ],
            'ad': [
                { raw: "w-1080" },
                { raw: "h-1350" },
                { raw: "cm-pad_resize" },
                { raw: "bg-111827" }, // Dark background for contrast
                { raw: "e-tint-10" } // Subtle tint for "creative" feel
            ],
            'product': [
                { raw: "w-1000" },
                { raw: "h-1000" },
                { raw: "cm-pad_resize" },
                { raw: "bg-F9FAFB" }, // Light gray BG to see the boundaries
                { raw: "e-sharpen-5" }
            ]
        };

        return transforms[currentAction.id] || [];
    };

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
            console.log('📁 File dropped:', file.name, file.type, file.size);
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                setGeneratedImage(null);
                setUploadedImage(null);
                setSelectedAction(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const [image, setImage2] = useState(null);
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log('📁 File selected:', file.name, file.type, file.size);

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                setGeneratedImage(null);
                setUploadedImage(null);
                setSelectedAction(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActionClick = async (action) => {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 ACTION STARTED:', action.label);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        if (!selectedImage || !selectedFile) {
            console.log('⚠️ No image selected, opening file picker\n');
            document.getElementById('image-upload').click();
            return;
        }

        // Action descriptions
        const actionDescriptions = {
            'enhance': '✨ Enhancing product image quality with sharpening and color optimization',
            'banner': '🎨 Creating 16:9 marketing banner with padded resize',
            'profile': '👤 Generating circular profile image with custom border',
            'background': '🪄 Removing background using AI background removal',
            'ad': '📢 Creating 4:5 ad creative format for social media',
            'product': '📦 Generating professional product photo with white background'
        };

        console.log('📝 GENERATION PROMPT:');
        console.log('   ' + actionDescriptions[action.id]);
        console.log('');

        setSelectedAction(action);
        setIsGenerating(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            if (!uploadedImage) {
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('📤 UPLOAD PHASE');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('📁 File:', selectedFile.name);
                console.log('   Type:', selectedFile.type);
                console.log('   Size:', `${(selectedFile.size / 1024).toFixed(2)} KB`);
                console.log('');

                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('fileName', selectedFile.name);
                formData.append('publicKey', publicKey);

                console.log('🔐 Fetching auth from backend...');
                const authRes = await fetch('http://localhost:5000/auth');
                console.log('📡 Auth response status:', authRes.status);

                if (!authRes.ok) {
                    console.error('❌ Backend auth failed:', authRes.status, authRes.statusText);
                    throw new Error('Backend (server.js) not responding');
                }

                const authData = await authRes.json();
                console.log('✅ Auth data received:', {
                    token: authData.token?.substring(0, 10) + '...',
                    expire: authData.expire,
                    signature: authData.signature?.substring(0, 10) + '...'
                });

                formData.append('signature', authData.signature);
                formData.append('expire', authData.expire);
                formData.append('token', authData.token);

                console.log('☁️ Uploading to ImageKit API...');
                const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
                    method: 'POST',
                    body: formData
                });

                console.log('📡 ImageKit upload response:', uploadRes.status, uploadRes.statusText);

                if (!uploadRes.ok) {
                    const errData = await uploadRes.json();
                    console.error('❌ ImageKit upload error response:', errData);
                    throw new Error(errData.message || 'Upload failed');
                }

                const uploadData = await uploadRes.json();
                console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('✅ UPLOAD SUCCESSFUL');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('🆔 File ID:', uploadData.fileId);
                console.log('📂 Path:', uploadData.filePath);
                console.log('🔗 URL:', uploadData.url);
                console.log('📏 Dimensions:', `${uploadData.width}x${uploadData.height}`);
                console.log('💾 Size:', `${(uploadData.size / 1024).toFixed(2)} KB`);
                console.log('');

                setUploadedImage(uploadData);
            } else {
                console.log('✅ Using existing upload:', uploadedImage.url);
            }

            await new Promise(resolve => setTimeout(resolve, 800));

            const transformations = getTransformations(action);
            console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🎨 TRANSFORMATION PHASE');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Parameters:', JSON.stringify(transformations, null, 2));
            console.log('');

            setGeneratedImage(true);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('✅ GENERATION COMPLETE');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🖼️ Result ready for display\n');

        } catch (err) {
            console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.error('❌ ERROR OCCURRED');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.error('Type:', err.name);
            console.error('Message:', err.message);
            console.error('Stack:', err.stack);
            console.log('');
            setError(err.message || 'Failed. Ensure server.js is running.');
        } finally {
            setIsGenerating(false);
            console.log('🏁 Processing finished\n\n');
        }
    };

    const handleDownload = () => {
        if (uploadedImage && selectedAction) {
            console.log('💾 Download requested for:', selectedAction.label);
            const transformations = getTransformations();
            const transformStr = transformations.map(t => t.raw).join(',');

            // Remove leading slash from filePath to avoid double slashes
            const cleanPath = uploadedImage.filePath.startsWith('/')
                ? uploadedImage.filePath.substring(1)
                : uploadedImage.filePath;

            const url = `${urlEndpoint}/tr:${transformStr}/${cleanPath}`;
            console.log('🔗 Download URL:', url);
            window.open(url, '_blank');
        }
    };

    const handleReset = () => {
        console.log('🔄 Resetting all states');
        setSelectedImage(null);
        setSelectedFile(null);
        setUploadedImage(null);
        setGeneratedImage(null);
        setSelectedAction(null);
        setIsGenerating(false);
        setError(null);
    };

    return (
        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <section className="py-20 px-6 relative z-10 overflow-hidden" id="generator-section">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-[80px] -z-10" />

                <div className="max-w-5xl mx-auto">
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
                    >
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

                                            {!isGenerating && (
                                                <button
                                                    onClick={handleReset}
                                                    className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all shadow-lg"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            )}

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
                                                            Uploading to ImageKit and applying transformations
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
                                                    className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg bg-gradient-to-r ${action.color} text-white hover:scale-105 active:scale-95 hover:shadow-xl ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
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

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-gray-900/70 backdrop-blur text-white rounded-lg text-xs font-medium z-10">
                                            Original
                                        </span>
                                        <img
                                            src={selectedImage}
                                            alt="Original"
                                            className="w-full h-64 object-contain"
                                        />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-50 border-2 border-indigo-200 ring-4 ring-indigo-500/10">
                                        <span className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${selectedAction?.color} text-white rounded-lg text-xs font-medium flex items-center gap-1 z-10`}>
                                            <Sparkles className="w-3 h-3" />
                                            AI Generated
                                        </span>
                                        {uploadedImage && (() => {
                                            // Build transformation URL manually
                                            const transformations = getTransformations();
                                            let transformStr = '';

                                            if (transformations.length > 0) {
                                                // Since all transformations are now in raw format, just join them
                                                transformStr = transformations.map(t => t.raw).join(',');
                                            }

                                            // Remove leading slash from filePath to avoid double slashes
                                            const cleanPath = uploadedImage.filePath.startsWith('/')
                                                ? uploadedImage.filePath.substring(1)
                                                : uploadedImage.filePath;

                                            const transformedUrl = transformStr
                                                ? `${urlEndpoint}/tr:${transformStr}/${cleanPath}`
                                                : `${urlEndpoint}/${cleanPath}`;

                                            console.log('🎨 Generated transformation URL:', transformedUrl);

                                            return (
                                                <img
                                                    src={transformedUrl}
                                                    alt="AI Generated"
                                                    className="w-full h-64 object-contain"
                                                    onError={(e) => {
                                                        console.error('❌ Image load error:', e);
                                                        console.error('❌ Failed URL:', transformedUrl);
                                                    }}
                                                    onLoad={() => {
                                                        console.log('✅ Transformed image loaded successfully');
                                                        console.log('✅ URL:', transformedUrl);
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>
                                </div>

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
        </IKContext>
    );
};

export default ImageUpload;
