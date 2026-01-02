// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔍 DEBUG TOOL - Browser Console mein paste karein
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n🔍 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 DEBUGGING AI PRODUCT GENERATOR');
console.log('🔍 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check 1: Backend Connection
console.log('📡 Step 1: Testing Backend Connection...');
fetch('http://localhost:5000/auth')
    .then(res => {
        if (res.ok) {
            console.log('✅ Backend is RUNNING on port 5000');
            return res.json();
        } else {
            console.error('❌ Backend responded with error:', res.status);
            throw new Error('Backend error');
        }
    })
    .then(data => {
        console.log('✅ Auth endpoint working. Token:', data.token?.substring(0, 20) + '...');
        console.log('   Expire:', data.expire);
        console.log('   Signature:', data.signature?.substring(0, 20) + '...');
    })
    .catch(err => {
        console.error('❌ Backend NOT RUNNING or not accessible');
        console.error('   Error:', err.message);
        console.error('   Solution: Run "npm run server" in Terminal 1');
    });

// Check 2: ImageKit Configuration
console.log('\n📦 Step 2: Checking ImageKit Configuration...');
const imageKitEndpoint = 'https://ik.imagekit.io/myproducts786';
const publicKey = 'public_fsnLsKXvUh7akxVAunC53JvbhiQ=';

console.log('   Endpoint:', imageKitEndpoint);
console.log('   Public Key:', publicKey);

// Check 3: Test ImageKit Accessibility
console.log('\n🌐 Step 3: Testing ImageKit Endpoint...');
fetch(imageKitEndpoint)
    .then(res => {
        if (res.ok || res.status === 403) { // 403 is expected for endpoint without image
            console.log('✅ ImageKit endpoint is ACCESSIBLE');
        } else {
            console.error('❌ ImageKit endpoint issue:', res.status);
        }
    })
    .catch(err => {
        console.error('❌ Cannot reach ImageKit endpoint');
        console.error('   Error:', err.message);
        console.error('   Solution: Check internet connection');
    });

// Check 4: Environment Variables
console.log('\n🔐 Step 4: Checking Environment Variables...');
const envVars = {
    'VITE_IMAGEKIT_PUBLIC_KEY': import.meta.env?.VITE_IMAGEKIT_PUBLIC_KEY,
    'VITE_IMAGEKIT_PRIVATE_KEY': import.meta.env?.VITE_IMAGEKIT_PRIVATE_KEY ? '***SET***' : 'NOT SET',
    'VITE_IMAGEKIT_URL_ENDPOINT': import.meta.env?.VITE_IMAGEKIT_URL_ENDPOINT,
};

Object.entries(envVars).forEach(([key, value]) => {
    if (value && value !== 'NOT SET') {
        console.log(`   ✅ ${key}: ${value}`);
    } else {
        console.error(`   ❌ ${key}: NOT SET`);
    }
});

// Check 5: DOM Elements
console.log('\n🎨 Step 5: Checking DOM Elements...');
setTimeout(() => {
    const uploadButton = document.getElementById('image-upload');
    const actionButtons = document.querySelectorAll('button');

    if (uploadButton) {
        console.log('   ✅ Upload input found');
    } else {
        console.error('   ❌ Upload input NOT found');
    }

    console.log(`   ℹ️  Total buttons on page: ${actionButtons.length}`);
}, 1000);

// Check 6: Sample Transformation URL
console.log('\n🔗 Step 6: Sample Transformation URLs...');
console.log('   Product Enhance:');
console.log(`   ${imageKitEndpoint}/tr:e-sharpen,q-100/sample.jpg`);
console.log('\n   Product Photo (1000x1000, white BG):');
console.log(`   ${imageKitEndpoint}/tr:w-1000,h-1000,bg-FFFFFF,cm-pad_resize/sample.jpg`);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Diagnostic Complete!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📋 NEXT STEPS:');
console.log('1. Check for any ❌ errors above');
console.log('2. Fix the errors one by one');
console.log('3. Try uploading an image again');
console.log('4. Watch console for new messages\n');
