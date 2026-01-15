const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const kbContent = loadKnowledgeBase();

app.get('/', (req, res) => {
  res.send('Basic Chatbot Backend Server is Running');
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received chat request:', message);
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant with knowledge about Aashmn. Here is some information you can use to answer questions: ' + kbContent },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    const botResponse = completion.choices[0].message.content;
    console.log('Sending response:', botResponse);
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error processing chat request:', error.message);
    res.status(500).json({ error: 'Failed to process chat request', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Basic chatbot backend running on http://localhost:${port}`);
});
