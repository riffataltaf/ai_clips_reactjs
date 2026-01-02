# 🏗️ Complete Architecture - Frontend | Backend | API | Keys

## 📂 Project Ko 4 Parts Mein Samjho:

```
1. 🎨 FRONTEND (UI)          → User jo dekhta hai
2. 🔧 BACKEND (Server)       → Authentication handling
3. 🌐 API SERVICES           → External services
4. 🔑 ENVIRONMENT (Keys)     → API keys & secrets
```

---

# 1️⃣ FRONTEND (UI) - User Interface

## 📁 Location: `src/` folder

### Main Files:

#### **`src/App.jsx`** - Main Container
```javascript
// Ye main file hai jo sab components ko load karti hai

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageUpload from './components/ImageUpload';
import ResultShowcase from './components/ResultShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />           // Top navigation
      <Hero />             // Hero section
      <ImageUpload />      // ⭐ MAIN FEATURE
      <ResultShowcase />   // Results display
      <Footer />           // Footer
    </div>
  );
}
```

**Purpose**: Sare components ko ek saath render karta hai

---

### Components Folder: `src/components/`

#### **1. Navbar.jsx** - Top Navigation
```
File: src/components/Navbar.jsx
Lines: ~100
Purpose: Logo, menu, buttons
```

#### **2. Hero.jsx** - Hero Section
```
File: src/components/Hero.jsx
Lines: ~150
Purpose: Main headline, CTA buttons
```

#### **3. ImageUpload.jsx** ⭐ - MAIN COMPONENT
```
File: src/components/ImageUpload.jsx
Lines: 560
Purpose: Upload, 6 AI actions, display results

Kya karta hai:
├── Image upload (drag & drop)
├── 6 transformation buttons
├── ImageKit se baat karta hai
├── Results display karta hai
└── Download functionality

Ismein ye functions hain:
- handleChange()      → File select
- handleDrop()        → Drag & drop
- handleActionClick() → Button click, upload + transform
- handleDownload()    → Download result
- getTransformations() → Transformation parameters
```

#### **4. ResultShowcase.jsx**
```
File: src/components/ResultShowcase.jsx
Purpose: Previous results showcase
```

#### **5. Footer.jsx**
```
File: src/components/Footer.jsx
Lines: 83
Purpose: Footer with links, social media
```

---

### Entry Point:

```
src/main.jsx
    ↓
Loads App.jsx
    ↓
Renders all components
```

---

# 2️⃣ BACKEND (Server) - Authentication

## 📁 Location: **Root folder**

### **`server.js`** - Express Server

```javascript
// File: server.js (root folder mein)
// Port: 5000

import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';

const app = express();

// ⭐ IMAGEKIT CONFIGURATION
const imagekit = new ImageKit({
    publicKey: "public_fsnLsKXvUh7akxVAunC53JvbhiQ=",
    privateKey: "private_FNeZlw506bpl1WMYjV07xdEez18=",
    urlEndpoint: "https://ik.imagekit.io/myproducts786"
});

// ⭐ AUTHENTICATION ENDPOINT
app.get('/auth', (req, res) => {
    // ImageKit ke liye authentication parameters return karta hai
    const expire = Math.floor(Date.now() / 1000) + 1800;
    const authParams = imagekit.getAuthenticationParameters(null, { expire });
    res.json(authParams);
});

// Server start
app.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});
```

**Purpose**: 
- ImageKit authentication provide karta hai
- Frontend se `/auth` endpoint call hota hai
- Secure upload ke liye signature deta hai

**Kaise Run Hota Hai:**
```bash
npm run server
# Server runs on http://localhost:5000
```

---

# 3️⃣ API SERVICES - External API Calls

## 📁 Location: `src/services/` folder

### **1. imageKitApi.js** ⭐ MAIN API FILE

```javascript
// File: src/services/imageKitApi.js
// Purpose: ImageKit ke saath interact karna

// ⭐ CONFIGURATION
const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/myproducts786';
const PUBLIC_KEY = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';

// ⭐ MAIN FUNCTIONS:

// 1. Upload Image
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('publicKey', PUBLIC_KEY);
    
    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData
    });
    
    return response.json();
};

// 2. Process Image with Transformation
const processImage = async (imageDataURL, transformationString) => {
    // Upload karo
    const uploadedUrl = await uploadImage(file);
    
    // Transformation lagao
    const transformedUrl = `${uploadedUrl}?tr=${transformationString}`;
    
    return transformedUrl;
};

// 3. Remove Background
export const removeBackground = async (imageDataURL) => {
    return await processImage(imageDataURL, 'bg-remove');
};

// 4. Enhance Image
export const enhanceImage = async (imageDataURL) => {
    return await processImage(imageDataURL, 'q-100,e-sharpen');
};

// 5. Create Banner
export const createBanner = async (imageDataURL) => {
    return await processImage(imageDataURL, 'w-1600,h-900');
};

// 6. Create Profile
export const createProfile = async (imageDataURL) => {
    return await processImage(imageDataURL, 'r-max,w-500');
};

// ... more functions
```

**Purpose**: ImageKit API ke saath baat karne ke liye helper functions

---

### **2. clipdropApi.js** (Not in use)

```javascript
// File: src/services/clipdropApi.js
// Status: Available but not active
// Purpose: Clipdrop API integration (alternative)
```

---

### **3. localImageProcessor.js**

```javascript
// File: src/services/localImageProcessor.js
// Purpose: Canvas-based local image processing
// Status: Backup/alternative processing
```

---

### **4. videoApi.js**

```javascript
// File: src/services/videoApi.js
// Purpose: Future video API integrations
// Status: Placeholder for future features
```

---

# 4️⃣ ENVIRONMENT - API Keys & Configuration

## 📁 Location: **Root folder**

### **`.env`** - Environment Variables

```bash
# File: .env (root folder mein)
# ⚠️ IMPORTANT: Git mein upload NAHI karna!

# ⭐ IMAGEKIT API KEYS
VITE_IMAGEKIT_PUBLIC_KEY=public_fsnLsKXvUh7akxVAunC53JvbhiQ=
VITE_IMAGEKIT_PRIVATE_KEY=private_FNeZlw506bpl1WMYjV07xdEez18=
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/myproducts786
```

**Purpose**:
- API keys safely store karta hai
- Code mein directly keys nahi likhni padti
- Production aur development ke liye alag keys ho sakti hain

**Kaise Use Hota Hai:**
```javascript
// Frontend mein
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

// Backend mein (server.js)
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
```

---

### **`.env.example`** - Template File

```bash
# File: .env.example
# Purpose: Example template for new developers

VITE_IMAGEKIT_PUBLIC_KEY=your_public_key_here
VITE_IMAGEKIT_PRIVATE_KEY=your_private_key_here
VITE_IMAGEKIT_URL_ENDPOINT=your_endpoint_here
```

---

# 🔄 COMPLETE DATA FLOW

## Jab User Image Upload Karta Hai:

```
1. USER ACTION
   User uploads image
        ↓
        
2. FRONTEND (ImageUpload.jsx)
   handleActionClick() function triggers
        ↓
        
3. BACKEND REQUEST
   Calls: http://localhost:5000/auth
        ↓
        
4. BACKEND (server.js)
   Returns authentication parameters
        ↓
        
5. API SERVICE (imageKitApi.js)
   uploadImage() function
        ↓
        
6. IMAGEKIT API
   https://upload.imagekit.io/api/v1/files/upload
   Image upload hoti hai
        ↓
        
7. TRANSFORMATION
   URL build hota hai with transformation:
   https://ik.imagekit.io/myproducts786/tr:q-100,e-sharpen/image.jpg
        ↓
        
8. FRONTEND DISPLAY
   Transformed image display hoti hai
        ↓
        
9. DOWNLOAD
   User downloads result
```

---

# 📊 FILE SUMMARY TABLE

| File | Location | Purpose | Size |
|------|----------|---------|------|
| **App.jsx** | `src/` | Main container | Small |
| **ImageUpload.jsx** | `src/components/` | Main feature | 560 lines |
| **Navbar.jsx** | `src/components/` | Navigation | 100 lines |
| **Hero.jsx** | `src/components/` | Hero section | 150 lines |
| **Footer.jsx** | `src/components/` | Footer | 83 lines |
| **server.js** | Root | Backend auth | 34 lines |
| **imageKitApi.js** | `src/services/` | API calls | 112 lines |
| **.env** | Root | API keys | 3 lines |

---

# 🎯 WHERE IS WHAT?

## 🎨 UI/Frontend:
```
📂 src/
   ├── App.jsx                    → Main app
   ├── main.jsx                   → Entry point
   ├── index.css                  → Global styles
   └── 📂 components/
       ├── Navbar.jsx             → Navigation
       ├── Hero.jsx               → Hero
       ├── ImageUpload.jsx        → ⭐ MAIN FEATURE
       ├── ResultShowcase.jsx     → Results
       └── Footer.jsx             → Footer
```

## 🔧 Backend:
```
📂 Root/
   └── server.js                  → Express server (Port 5000)
```

## 🌐 API Services:
```
📂 src/services/
   ├── imageKitApi.js             → ⭐ ImageKit integration
   ├── clipdropApi.js             → Alternative (not used)
   ├── localImageProcessor.js     → Local processing
   └── videoApi.js                → Future video APIs
```

## 🔑 Environment/Keys:
```
📂 Root/
   ├── .env                       → ⭐ Your API keys
   └── .env.example               → Example template
```

---

# 🚀 HOW TO RUN

## Terminal 1: Backend
```bash
cd d:\react projects\ai-product-generator
npm run server

# Output:
Backend running on http://localhost:5000
```

## Terminal 2: Frontend
```bash
cd d:\react projects\ai-product-generator
npm run dev

# Output:
Local: http://localhost:5173
```

## Browser:
```
Open: http://localhost:5173
```

---

# 🔍 API CALLS KAHAN SE HO RAHI HAIN?

## Call Chain:

### 1. User Clicks Button (Frontend)
```javascript
// File: src/components/ImageUpload.jsx
// Line: ~144

const handleActionClick = async (action) => {
    // Step 1: Backend se auth lena
    const authUrl = 'http://localhost:5000/auth';
    const authResponse = await fetch(authUrl);
    const authData = await authResponse.json();
    
    // Step 2: ImageKit API call
    const uploadUrl = 'https://upload.imagekit.io/api/v1/files/upload';
    const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
    });
    
    // Step 3: Transformation URL build
    const transformedUrl = buildTransformationUrl();
    
    // Step 4: Display result
    setGeneratedImage(transformedUrl);
};
```

### 2. Backend Returns Auth
```javascript
// File: server.js (root)
// Line: 15

app.get('/auth', (req, res) => {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);  // Frontend ko bhejta hai
});
```

### 3. ImageKit Upload
```
Direct API Call:
https://upload.imagekit.io/api/v1/files/upload

With parameters:
- file: Image file
- publicKey: from .env
- signature: from backend
- expire: timestamp
- token: authentication token
```

---

# 🔑 KEYS KAHAN STORED HAIN?

## 1. Environment File (.env)
```bash
# Location: Root/.env
VITE_IMAGEKIT_PUBLIC_KEY=public_fsnLsKXvUh7akxVAunC53JvbhiQ=
VITE_IMAGEKIT_PRIVATE_KEY=private_FNeZlw506bpl1WMYjV07xdEez18=
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/myproducts786
```

## 2. Backend File (server.js)
```javascript
// Hardcoded (should use .env but currently direct)
const imagekit = new ImageKit({
    publicKey: "public_fsnLsKXvUh7akxVAunC53JvbhiQ=",
    privateKey: "private_FNeZlw506bpl1WMYjV07xdEez18=",
    urlEndpoint: "https://ik.imagekit.io/myproducts786"
});
```

## 3. Frontend Components
```javascript
// File: src/components/ImageUpload.jsx
// Line: 6-7
const urlEndpoint = 'https://ik.imagekit.io/myproducts786';
const publicKey = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';
```

## 4. API Service
```javascript
// File: src/services/imageKitApi.js
// Line: 2-3
const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/myproducts786';
const PUBLIC_KEY = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';
```

---

# 📝 SUMMARY

## Frontend (UI):
- **Location**: `src/` folder
- **Main File**: `src/components/ImageUpload.jsx`
- **Purpose**: User interface, upload handling

## Backend (Server):
- **Location**: `server.js` (root)
- **Port**: 5000
- **Purpose**: ImageKit authentication

## API Services:
- **Location**: `src/services/` folder
- **Main File**: `imageKitApi.js`
- **Purpose**: API call functions

## Keys/Config:
- **Location**: `.env` (root)
- **Also in**: `server.js`, `ImageUpload.jsx`, `imageKitApi.js`
- **Purpose**: Store API credentials

---

**Ab aapko pata chal gaya ke kya kahan hai aur kaise kaam kar raha hai! 🚀✨**
