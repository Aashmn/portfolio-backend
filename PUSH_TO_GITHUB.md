# Push Backend to GitHub

## Your code is committed locally but needs to be pushed to GitHub

### Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `portfolio-backend`
3. Make it Public or Private (your choice)
4. **DO NOT** initialize with README
5. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, run these commands in PowerShell:

```powershell
cd C:\Users\aashm\OneDrive\Desktop\Protfolio_Website\backend

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

### Example:
If your GitHub username is `aashmn`, the command would be:
```powershell
git remote add origin https://github.com/aashmn/portfolio-backend.git
git branch -M main
git push -u origin main
```

### Step 3: Verify
After pushing, visit:
`https://github.com/YOUR_USERNAME/portfolio-backend`

You should see all your backend files there!

### Step 4: Deploy on Render
Once your code is on GitHub, follow the deployment guide:
- See: `deploy-to-render.md`
- Go to https://render.com
- Connect your GitHub repository
- Add environment variables
- Deploy!

---

## Quick Commands Reference

```powershell
# Check current status
git status

# Check remote
git remote -v

# Add remote (only once)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git

# Push to GitHub
git push -u origin main
```

---

## What Happens Next

1. ✅ Code is on GitHub
2. → Deploy on Render (5 min)
3. → Get backend URL
4. → Update frontend with backend URL
5. → Redeploy frontend
6. ✅ Chatbot works!
