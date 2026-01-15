const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Chatbot Backend Server is Running');
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  // Simple response for testing
  res.json({ response: `Echo: ${message}. This is a placeholder response from the backend. The full LlamaIndex setup will be implemented soon.` });
});

app.listen(port, () => {
  console.log(`Simple backend server running on http://localhost:${port}`);
});
