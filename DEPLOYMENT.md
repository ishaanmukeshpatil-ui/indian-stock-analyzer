# Deploy to Netlify - Step by Step

## Step 1: Upload to GitHub

1. Go to **https://github.com/new**
2. Create a repository named `indian-stock-analyzer`
3. Upload all files from `D:\public-apis-master\indian-stock-analyzer`

### Using GitHub Desktop (Easiest):
1. Download GitHub Desktop from https://desktop.github.com
2. Click "Add an Existing Repository"
3. Select `D:\public-apis-master\indian-stock-analyzer`
4. Click "Publish Repository"

### Using Git Commands:
```bash
cd D:\public-apis-master\indian-stock-analyzer
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/indian-stock-analyzer.git
git push -u origin main
```

---

## Step 2: Deploy to Netlify

1. Go to **https://app.netlify.com**
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy site"

---

## Step 3: Add API Keys in Netlify

1. Go to Site settings → Environment variables
2. Add these variables:

| Key | Value |
|-----|-------|
| `VITE_INDIAN_API_KEY` | `sk-live-jTfnihKnGcBrx2kqwKMkwo0Lhib5d6K6pQtHMxbI` |
| `VITE_GEMINI_API_KEY` | `AIzaSyABHuXkaSApH20RBWhBrEGmd8_h40DVQJE` |

3. Click "Deploy" to rebuild with new variables

---

## Step 4: Your Site is Live!

Netlify will give you a URL like:
`https://indian-stock-analyzer-xxxx.netlify.app`

---

## Auto-Deploy

Every time you push to GitHub, Netlify automatically rebuilds and deploys!

---

## Project Structure

```
indian-stock-analyzer/
├── netlify.toml          # Netlify config (auto-build)
├── .env                  # Your API keys (local dev)
├── package.json          # Dependencies
├── vite.config.js        # Build config
├── index.html            # Entry point
└── src/
    ├── components/       # UI components
    ├── pages/            # 3 pages
    ├── services/         # API services
    └── utils/            # Helpers
```

---

## Notes

- Netlify runs `npm install` and `npm run build` automatically
- The built files go to `dist/` folder
- Netlify serves the `dist/` folder
- You DON'T need Node.js locally - Netlify handles everything!
