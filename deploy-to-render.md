# 🚀 Deploy Backend to Render - Step by Step

## Prerequisites
- GitHub account
- Render account (free) - https://render.com
- Your Gemini API key

---

## Step 1: Push Backend to GitHub (5 minutes)

Open PowerShell and run these commands:

```powershell
# Navigate to backend folder
cd C:\Users\aashm\OneDrive\Desktop\Protfolio_Website\backend

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio chatbot backend"
```

Now create a new repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `portfolio-backend`
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** initialize with README
5. Click **"Create repository"**

Copy the commands GitHub shows you, or run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy on Render (5 minutes)

### 2.1 Create Render Account
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest option)

### 2.2 Create Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Connect account"** to connect GitHub
5. Find and select your `portfolio-backend` repository
6. Click **"Connect"**

### 2.3 Configure Service
Fill in these settings:

- **Name**: `portfolio-chatbot-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: **Free**

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"** section:

1. Click **"Add Environment Variable"**
2. Add these variables:

   **Variable 1:**
   - Key: `GEMINI_API_KEY`
   - Value: `YOUR_ACTUAL_GEMINI_API_KEY`

   **Variable 2:**
   - Key: `FRONTEND_URL`
   - Value: `https://aashmn-portfolio.netlify.app`

   **Variable 3:**
   - Key: `NODE_VERSION`
   - Value: `18`

3. Click **"Create Web Service"**

### 2.5 Wait for Deployment
- Deployment takes 5-10 minutes
- Watch the logs in real-time
- When you see "Live" with a green dot, it's ready!
- Copy your backend URL (e.g., `https://portfolio-chatbot-backend.onrender.com`)

---

## Step 3: Connect Frontend to Backend (2 minutes)

### 3.1 Update Environment Variable
1. Open `C:\Users\aashm\OneDrive\Desktop\Protfolio_Website\.env.production`
2. Replace the content with:
```
VITE_BACKEND_URL=https://YOUR-BACKEND-URL.onrender.com/api/chat
```
Replace `YOUR-BACKEND-URL` with your actual Render URL (without `/api/chat` at the end, we add it in the variable)

### 3.2 Redeploy Frontend
Open PowerShell:
```powershell
cd C:\Users\aashm\OneDrive\Desktop\Protfolio_Website
npm run build
netlify deploy --prod --dir=dist
```

---

## Step 4: Test Your Live Website! 🎉

1. Go to https://aashmn-portfolio.netlify.app
2. Click the chatbot icon (bottom right)
3. Ask a question like "Who is Aashmn?"
4. The chatbot should respond using AI!

**Note**: First request might take 30-60 seconds if the backend was sleeping (free tier limitation).

---

## 🎯 You're Done!

Your portfolio website is now:
- ✅ Permanently hosted on the internet
- ✅ Accessible to anyone worldwide
- ✅ Has a working AI chatbot
- ✅ Completely FREE!

**Share your portfolio:**
- https://aashmn-portfolio.netlify.app

---

## 📊 What You Get (Free Tier)

**Netlify (Frontend):**
- 100GB bandwidth/month
- Automatic HTTPS
- Continuous deployment from Git
- Custom domain support

**Render (Backend):**
- 750 hours/month (enough for 24/7)
- Automatic HTTPS
- Sleeps after 15 min inactivity
- Wakes on first request

---

## 🔧 Troubleshooting

### Backend not responding?
- Check Render dashboard → Logs
- Verify `GEMINI_API_KEY` is set correctly
- Wait 60 seconds for backend to wake up (free tier)

### Chatbot shows error?
- Open browser console (F12)
- Check if backend URL is correct
- Verify CORS settings in `server.js`

### Need to update backend?
Just push to GitHub:
```bash
git add .
git commit -m "Update backend"
git push
```
Render will automatically redeploy!

---

## 🚀 Optional: Keep Backend Awake

Free Render services sleep after 15 minutes. To keep it awake:

1. Go to https://uptimerobot.com (free)
2. Create account
3. Add new monitor:
   - Type: HTTP(s)
   - URL: Your Render backend URL
   - Interval: 5 minutes
4. This pings your backend every 5 minutes, keeping it awake!

---

## 🎊 Congratulations!

You now have a professional portfolio website with an AI-powered chatbot, hosted permanently on the internet for FREE!
