const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:4173',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.some(allowed => origin?.includes(allowed))) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio Chatbot Backend is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load knowledge base from file
const loadKnowledgeBase = () => {
  try {
    const kbPath = path.join(__dirname, 'knowledge_base.txt');
    const kbContent = fs.readFileSync(kbPath, 'utf8');
    console.log('Knowledge base loaded successfully');
    return kbContent;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return '';
  }
};

// Load knowledge base
const kbContent = loadKnowledgeBase();


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received chat request:', message);
  try {
    // Use the first 2000 characters of the knowledge base as context
    const kbContext = kbContent.slice(0, 2000);
    const prompt = `You are a helpful assistant with knowledge about Aashmn's portfolio. Here is some context from the portfolio and resume:\n${kbContext}\n\nUser question: ${message}`;

    let responseText = '';
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch (err1) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
      } catch (err2) {
        console.error('Both gemini-1.5-flash and gemini-1.5-pro failed:', err1, err2);
        return res.status(500).json({ error: 'Gemini model not available', details: err2.message });
      }
    }
    console.log('Gemini response:', responseText);
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process chat request', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
