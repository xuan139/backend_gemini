const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");
const multer = require('multer');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views');

app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(data, mimeType) {
    return {
        inlineData: {
            data: data.toString('base64'),
            mimeType,
        },
    };
}

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api2', (req, res) => {
    const { prompt } = req.body;
    res.json({ result: "hello "+prompt });
});

app.post('/api', upload.single('image'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const imageFile = req.file;

        if (!prompt || !imageFile) {
            return res.status(400).json({ error: 'Missing prompt or image file in the request body' });
        }

        console.log('Received request with prompt:', prompt);
        console.log('Received image file:', imageFile);

        const template = prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const image = [fileToGenerativePart(imageFile.buffer, imageFile.mimetype)];

        const result = await model.generateContent([template, ...image]);
        const response = await result.response;
        const text = response.text();

        console.log('Generated text:', text);

        res.json({ result: text });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
