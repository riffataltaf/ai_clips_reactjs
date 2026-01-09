import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
    publicKey: "public_fsnLsKXvUh7akxVAunC53JvbhiQ=",
    privateKey: "private_FNeZlw506bpl1WMYjV07xdEez18=",
    urlEndpoint: "https://ik.imagekit.io/myproducts786"
});

// Authentication endpoint for ImageKit frontend uploads
app.get('/auth', (req, res) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.json({
            ...authParams,
            publicKey: "public_fsnLsKXvUh7akxVAunC53JvbhiQ="
        });
    } catch (error) {
        console.error('ImageKit Auth Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log(`🔐 ImageKit Auth endpoint ready at http://localhost:${PORT}/auth`);
});
