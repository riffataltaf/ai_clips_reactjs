import express from 'express';
import ImageKit from 'imagekit';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
    publicKey: "public_fsnLsKXvUh7akxVAunC53JvbhiQ=",
    privateKey: "private_FNeZlw506bpl1WMYjV07xdEez18=",
    urlEndpoint: "https://ik.imagekit.io/myproducts786"
});

app.get('/auth', (req, res) => {
    try {
        // Expire parameter - 30 minutes from now (1800 seconds)
        const expire = Math.floor(Date.now() / 1000) + 1800;

        // Generate authentication parameters with proper expire time
        const authParams = imagekit.getAuthenticationParameters(null, { expire });

        res.json(authParams);
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Backend running on http://localhost:5000');
});
