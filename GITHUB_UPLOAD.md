# How to Upload to GitHub

## Method 1: GitHub Desktop (Easiest - No Command Line)

### Install GitHub Desktop
1. Download: https://desktop.github.com
2. Install and sign in with your GitHub account

### Upload Files
1. Open GitHub Desktop
2. Click "Create a New Repository on your hard drive..."
3. Name: `indian-stock-analyzer`
4. Local Path: `D:\public-apis-master\indian-stock-analyzer`
5. Click "Create Repository"
6. Click "Publish repository" (top right)
7. Uncheck "This is a private repository" (if you want it public)
8. Click "Publish Repository"

Done! Your code is on GitHub.

---

## Method 2: GitHub Website (Drag & Drop)

1. Go to **https://github.com/new**
2. Repository name: `indian-stock-analyzer`
3. Click "Create repository"
4. On the next page, click "uploading an existing file"
5. Drag ALL files from `D:\public-apis-master\indian-stock-analyzer` into the browser
6. Click "Commit changes"

Done!

---

## Method 3: Git Commands

Open PowerShell and run:

```powershell
cd D:\public-apis-master\indian-stock-analyzer

git init

git add .

git commit -m "Indian Stock Analyzer - Initial commit"

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/indian-stock-analyzer.git

git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## After Upload: Deploy to Netlify

1. Go to **https://app.netlify.com**
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repo
4. Click "Deploy site"
5. Add environment variables in Site Settings → Environment Variables:
   - `VITE_INDIAN_API_KEY` = `sk-live-jTfnihKnGcBrx2kqwKMkwo0Lhib5d6K6pQtHMxbI`
   - `VITE_GEMINI_API_KEY` = `AIzaSyABHuXkaSApH20RBWhBrEGmd8_h40DVQJE`
6. Click "Deploy" to rebuild

Your site will be live at: `https://indian-stock-analyzer-xxxx.netlify.app`
