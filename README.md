# Backend Deployment Instructions

## Quick Deploy to Render

### Step 1: Push to GitHub
```bash
cd C:\Users\aashm\OneDrive\Desktop\Protfolio_Website\backend
git init
git add .
git commit -m "Portfolio chatbot backend"
```

Create a new repository on GitHub (https://github.com/new) named `portfolio-backend`, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-chatbot-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

5. Add Environment Variable:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://aashmn-portfolio.netlify.app`

6. Click **"Create Web Service"**

7. Wait 5-10 minutes for deployment

8. Copy your backend URL (e.g., `https://portfolio-chatbot-backend.onrender.com`)

### Step 3: Connect Frontend to Backend

1. Update `.env.production` in your main project:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api/chat
```

2. Rebuild and redeploy frontend:
```bash
cd C:\Users\aashm\OneDrive\Desktop\Protfolio_Website
npm run build
netlify deploy --prod --dir=dist
```

Done! Your chatbot will now work on the live site.

---

## Alternative: Deploy Backend to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your backend repository
5. Add environment variable: `GEMINI_API_KEY`
6. Deploy!

Railway provides a URL automatically.

---

## Files Included
- `server.js` - Main backend server with Gemini AI integration
- `knowledge_base.txt` - Your portfolio information for the chatbot
- `render.yaml` - Render deployment configuration
- `.env` - Environment variables (DO NOT commit to Git)
- `.gitignore` - Prevents sensitive files from being committed

---

## Testing Locally
```bash
npm install
node server.js
```

Backend runs on http://localhost:3001

---

## Important Notes
- Free tier on Render sleeps after 15 min inactivity
- First request after sleep takes 30-60 seconds to wake up
- Use UptimeRobot (free) to keep it awake if needed
- Make sure `GEMINI_API_KEY` is set in Render dashboard
