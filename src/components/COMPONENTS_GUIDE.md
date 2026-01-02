# Components Guide

## 🎯 AIGenerator.jsx - Main Component

### Purpose
The central AI generation component that handles all AI operations including text-to-image, image enhancement, background removal/replacement, and future video features.

### Component Structure

```
AIGenerator
│
├── State Management (8 states)
│   ├── selectedMode - Current generation mode
│   ├── prompt - User text input
│   ├── uploadedImage - File object
│   ├── uploadedImageURL - Base64 preview
│   ├── generatedResult - AI output
│   ├── isGenerating - Loading state
│   ├── error - Error message
│   └── dragActive - Drag & drop state
│
├── UI Sections
│   ├── Header (Title + Description)
│   ├── Mode Selection (6 cards grid)
│   └── Generation Interface
│       ├── Mode Header with close button
│       ├── Error Display (if any)
│       ├── Input Section
│       │   ├── Prompt textarea (conditional)
│       │   ├── Image upload (conditional)
│       │   └── Generate button
│       └── Result Section
│           ├── Loading animation
│           ├── Result preview
│           └── Download button
│
└── Functions (8 main)
    ├── handleImageUpload(file)
    ├── handleDrag(e)
    ├── handleDrop(e)
    ├── handleGenerate()
    ├── handleReset()
    └── handleDownload()
```

### Function Reference

#### `handleImageUpload(file)`
**Purpose**: Process uploaded images  
**Input**: File object  
**Output**: Updates state with Base64 URL  
**Error Handling**: Validates file type, size

```javascript
handleImageUpload(file) {
  1. Validate file exists
  2. Clear previous errors
  3. Create FileReader
  4. Convert to Base64
  5. Update uploadedImageURL state
  6. Clear previous results
}
```

#### `handleGenerate()`
**Purpose**: Main generation orchestrator  
**Process**:
1. Validate mode selected
2. Check if feature is available
3. Validate required inputs (prompt/image)
4. Set loading state
5. Call appropriate API
6. Display result
7. Handle errors

**Error States**:
- No mode selected
- Coming soon feature
- Missing prompt (if required)
- Missing image (if required)
- API errors

#### `handleReset()`
**Purpose**: Clear all states and return to mode selection  
**Clears**:
- Selected mode
- Prompt text
- Uploaded images
- Generated results
- Error messages
- Loading states

#### `handleDownload()`
**Purpose**: Download generated result  
**Process**:
1. Create temporary anchor element
2. Set href to result data URL
3. Set filename with timestamp
4. Trigger download
5. Clean up element

### Mode Configuration

```javascript
const MODES = [
  {
    id: 'text-to-image',
    title: 'Text to Image',
    description: 'Generate stunning images from your text prompts',
    icon: Type,
    color: 'from-violet-500 to-purple-600',
    requiresImage: false,
    requiresPrompt: true
  },
  // ... other modes
];
```

### Adding New Modes

1. **Add to MODES array**:
```javascript
{
  id: 'new-feature',
  title: 'Feature Name',
  description: 'What it does',
  icon: IconComponent,
  color: 'gradient-classes',
  requiresImage: boolean,
  requiresPrompt: boolean,
  comingSoon: false
}
```

2. **Add case to handleGenerate()**:
```javascript
switch (selectedMode) {
  case 'new-feature':
    result = await yourApiFunction(input);
    break;
  // ... existing cases
}
```

3. **Create API function** in `services/`

4. **Test thoroughly**

### Props
None - Self-contained component

### Dependencies
- `framer-motion` - Animations
- `lucide-react` - Icons
- `../services/clipdropApi` - AI operations

### Styling
- Tailwind CSS classes
- Custom gradients per mode
- Responsive breakpoints (md, lg)
- Smooth transitions throughout

---

## 🔧 Other Components

### Navbar.jsx
Navigation bar with logo and menu items.

### Hero.jsx
Hero section with main headline and CTA.

### Footer.jsx
Footer with links and information.

### ImageUpload.jsx (Legacy)
Old component - can be removed or kept for reference.

### ResultShowcase.jsx (Legacy)
No longer used - can be removed.

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns for modes)

---

## 🎨 Design System

### Colors
Each mode has unique gradient:
- Text to Image: `from-violet-500 to-purple-600`
- Enhancement: `from-blue-500 to-cyan-500`
- Remove BG: `from-pink-500 to-rose-500`
- Replace BG: `from-emerald-500 to-teal-500`
- Image to Video: `from-orange-500 to-amber-500`
- Text to Video: `from-indigo-500 to-violet-500`

### Spacing
- Section padding: `py-20`
- Card padding: `p-8 md:p-12`
- Gap between elements: `gap-6` or `gap-8`

### Borders
- Rounded cards: `rounded-[2rem]` or `rounded-3xl`
- Input fields: `rounded-xl`
- Small elements: `rounded-lg`

### Shadows
- Cards: `shadow-xl shadow-gray-200/50`
- Hover: `hover:shadow-xl hover:shadow-gray-300/50`

---

## 🔄 State Flow

```
Initial State
    ↓
Mode Selection (user clicks card)
    ↓
selectedMode is set
    ↓
Generation Interface appears
    ↓
User provides inputs (prompt/image)
    ↓
User clicks Generate
    ↓
isGenerating = true (loading)
    ↓
API call (try-catch)
    ↓
Success: generatedResult set
Error: error message set
    ↓
isGenerating = false
    ↓
User downloads or resets
```

---

## 📝 TODO / Future Improvements

- [ ] Add generation history
- [ ] Implement favorites
- [ ] Add advanced options (style, resolution)
- [ ] Batch processing
- [ ] Progress indicators for long operations
- [ ] Undo/Redo functionality
- [ ] Share to social media
- [ ] User accounts and saved presets
- [ ] API usage tracking
- [ ] Cost estimation

---

## 🐛 Common Issues

### Issue: "Please enter a prompt"
**Solution**: Make sure prompt field is filled for text-based modes

### Issue: "Please upload an image"
**Solution**: Upload image for image-based modes

### Issue: API errors
**Solution**: 
1. Check .env file has valid API key
2. Verify internet connection
3. Check Clipdrop API status
4. Review browser console for details

### Issue: Download not working
**Solution**:
1. Check browser popup blocker
2. Verify result was generated
3. Try right-click > Save As on result image

---

**For complete documentation, see AI_GENERATOR_GUIDE.md**
