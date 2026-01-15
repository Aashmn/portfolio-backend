const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

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

// Parse knowledge base into structured data
const parseKnowledgeBase = (content) => {
  const data = {
    name: 'Aashmn',
    profession: '',
    experience: [],
    education: [],
    skills: { technical: [], libraries: [], tools: [], soft: [] },
    projects: [],
    courses: []
  };

  const lines = content.split('\n');
  let currentSection = '';

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.includes('[Personal Information]')) currentSection = 'personal';
    else if (line.includes('[Experience]')) currentSection = 'experience';
    else if (line.includes('[Education]')) currentSection = 'education';
    else if (line.includes('[Skills]')) currentSection = 'skills';
    else if (line.includes('[Projects]')) currentSection = 'projects';
    else if (line.includes('[Online Courses]')) currentSection = 'courses';
    else if (line.startsWith('Profession:')) data.profession = line.replace('Profession:', '').trim();
    else if (currentSection === 'experience' && line.includes('Intern')) {
      data.experience.push(line);
    } else if (currentSection === 'education' && (line.includes('B.Tech') || line.includes('Class'))) {
      data.education.push(line);
    } else if (currentSection === 'skills') {
      if (line.startsWith('Technical Skills:')) data.skills.technical = line.split(':')[1].split(',').map(s => s.trim());
      else if (line.startsWith('Libraries:')) data.skills.libraries = line.split(':')[1].split(',').map(s => s.trim());
      else if (line.startsWith('Tools:')) data.skills.tools = line.split(':')[1].split(',').map(s => s.trim());
      else if (line.startsWith('Soft Skills:')) data.skills.soft = line.split(':')[1].split(',').map(s => s.trim());
    } else if (currentSection === 'projects' && (line.includes('(') && line.includes(')'))) {
      data.projects.push(line);
    } else if (currentSection === 'courses' && line.startsWith('-')) {
      data.courses.push(line.replace('-', '').trim());
    }
  }

  return data;
};

const knowledgeData = parseKnowledgeBase(kbContent);

// Custom chatbot logic
const generateResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Greeting patterns
  if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return `Hello! I'm Aashmn's AI assistant. I can tell you about Aashmn's experience, skills, projects, education, and more. What would you like to know?`;
  }

  // Who is Aashmn
  if (lowerMessage.includes('who') && (lowerMessage.includes('aashmn') || lowerMessage.includes('you'))) {
    return `Aashmn is an ${knowledgeData.profession}. Currently working as an AI/ML Intern at RaiseMatters, Aashmn specializes in developing AI-powered solutions, predictive maintenance models, and chatbots. With a strong background in machine learning, web development, and data science, Aashmn has worked on various projects involving LLMs, RAG applications, and time series forecasting.`;
  }

  // Experience questions
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('intern')) {
    const exp = knowledgeData.experience.join('\n\n');
    return `Aashmn has valuable experience in AI/ML:\n\n${exp}\n\nThese roles have provided hands-on experience with chatbot development, predictive maintenance, RAG applications, and working with LLMs.`;
  }

  // Skills questions
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return `Aashmn has a diverse skill set:\n\n**Programming Languages:** ${knowledgeData.skills.technical.join(', ')}\n\n**Libraries & Frameworks:** ${knowledgeData.skills.libraries.join(', ')}\n\n**Tools:** ${knowledgeData.skills.tools.join(', ')}\n\n**Soft Skills:** ${knowledgeData.skills.soft.join(', ')}`;
  }

  // Projects questions
  if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('developed')) {
    const projects = knowledgeData.projects.slice(0, 3).join('\n\n');
    return `Aashmn has worked on several impressive projects:\n\n${projects}\n\nThese projects showcase expertise in AI/ML, NLP, time series forecasting, and data structures.`;
  }

  // Education questions
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('college')) {
    const edu = knowledgeData.education.join('\n');
    return `Aashmn's educational background:\n\n${edu}\n\nCurrently pursuing B.Tech in Computer Science and Engineering at Bennett University.`;
  }

  // Contact/hire questions
  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return `You can reach out to Aashmn through the contact form on this portfolio website. Aashmn is open to opportunities in AI/ML, web development, and data science roles.`;
  }

  // Python specific
  if (lowerMessage.includes('python')) {
    return `Yes! Aashmn is highly proficient in Python and has used it extensively for AI/ML projects, including working with TensorFlow, Pandas, NumPy, Scikit-learn, LlamaIndex, and more. Python is Aashmn's primary language for data science and machine learning work.`;
  }

  // Machine Learning specific
  if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('ai')) {
    return `Aashmn has strong expertise in AI/ML! Currently working as an AI/ML Intern at RaiseMatters, Aashmn has developed chatbots, predictive maintenance models, RAG applications, and worked with LLMs. Experience includes Random Forest, XGBoost, LSTM, and frameworks like LlamaIndex and LangChain.`;
  }

  // Chatbot/LLM specific
  if (lowerMessage.includes('chatbot') || lowerMessage.includes('llm') || lowerMessage.includes('language model')) {
    return `Aashmn has extensive experience building chatbots! At RaiseMatters, developed an AI-powered chatbot using Botpress. At Pythian Technologies, designed custom chatbots for clients using RAG applications and LlamaIndex framework. Also created "Lawyer-ed!" - a legal query chatbot using OpenAI's GPT-3.5-Turbo.`;
  }

  // Strengths
  if (lowerMessage.includes('strength') || lowerMessage.includes('good at') || lowerMessage.includes('best')) {
    return `Aashmn's key strengths include:\n\n• AI/ML Development (chatbots, predictive models, RAG applications)\n• Working with LLMs and frameworks like LlamaIndex\n• Full-stack web development\n• Data analysis and visualization\n• Problem-solving and adaptability\n• Strong communication and teamwork\n\nAashmn is eager to learn and open to challenges!`;
  }

  // Default response with suggestions
  return `I'd be happy to help you learn more about Aashmn! You can ask me about:\n\n• Experience and work history\n• Technical skills and expertise\n• Projects and accomplishments\n• Education background\n• AI/ML and chatbot development\n• How to get in touch\n\nWhat would you like to know?`;
};

console.log('Custom chatbot logic initialized successfully');


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received chat request:', message);
  
  try {
    if (!message || !message.trim()) {
      return res.json({ 
        response: "Please ask me a question about Aashmn!" 
      });
    }

    // Generate response using custom logic
    const responseText = generateResponse(message);
    console.log('Custom chatbot response generated');
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ 
      response: "I encountered an error processing your request. Please try again." 
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
