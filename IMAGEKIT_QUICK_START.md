# ⚡ Quick Start - ImageKit API

## ✅ Aapka Setup READY hai!

ImageKit API **already configured** hai. Bas 2 commands run karni hain!

---

## 🚀 Start Kaise Karein (2 Steps)

### Step 1: Backend Server Start Karein
**Terminal 1** mein:
```bash
npm run server
```

✅ **Expected Output:**
```
Backend running on http://localhost:5000
```

### Step 2: Frontend App Start Karein  
**Terminal 2** mein (naya terminal):
```bash
npm run dev
```

✅ **Expected Output:**
```
VITE ready...
Local: http://localhost:5173/
```

---

## 🎯 Browser Mein Open Karein

```
http://localhost:5173
```

---

## 🎨 Kaise Use Karein?

1. **Image Upload Karein**
   - Drag & drop ya click karke select karein

2. **Action Choose Karein**
   - ✨ Product Enhance
   - 🪄 Remove BG
   - 📦 Product Photo
   - 🎨 Banner Generate
   - 👤 Profile Generate
   - 📢 Ad Creative

3. **Wait Karein** (5-10 seconds)
   - ImageKit API process karega

4. **Download Result**
   - "Download Result" button click karein

---

## 🔍 Verify Kaise Karein?

### Backend Check:
```bash
curl http://localhost:5000/auth
```
✅ JSON response with `token`, `expire`, `signature`

### Frontend Check:
- Browser console (F12) kholen
- Upload karke koi action try karein
- Yeh messages dikhne chahiye:
  ```
  🔐 Fetching auth from backend...
  ☁️ Uploading to ImageKit API...
  ✅ UPLOAD SUCCESSFUL
  🎨 TRANSFORMATION PHASE
  ✅ GENERATION COMPLETE
  ```

---

## ⚠️ Agar Problem Ho?

### Backend Not Responding?
```bash
# Terminal 1 mein ye command run karein:
npm run server

# Phir Terminal 2 mein:
npm run dev
```

### Upload Fail?
1. Dono servers running hain? Check karein
2. Backend `http://localhost:5000` pe hai? Verify karein
3. `.env` file correct hai? Check karein

---

## 📋 Currently Working Features

| Feature | Status |
|---------|--------|
| Image Upload | ✅ Working |
| Product Enhance | ✅ Working |
| Remove BG | ⚠️ Addon needed |
| Product Photo | ✅ Working |
| Banner Generate | ✅ Working |
| Profile Generate | ✅ Working |
| Ad Creative | ✅ Working |

**Note**: Background Removal ko ImageKit Dashboard se enable karna padega (addon hai)

---

## 🎉 That's It!

Bas itna hi! Aapka app **fully functional** hai with ImageKit API.

**Full Guide**: `IMAGEKIT_SETUP.md` dekhen detailed instructions ke liye.

---

**Happy Coding! 🚀✨**
