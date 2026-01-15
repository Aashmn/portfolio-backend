const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Log environment variables to verify loading (sensitive info masked)
console.log('Environment variables loaded:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Key is set (masked for security)' : 'Not set');
