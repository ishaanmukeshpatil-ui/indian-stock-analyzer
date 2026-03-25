========================================================
  INDIAN STOCK ANALYZER - DEPLOYMENT GUIDE
========================================================

IMPORTANT: The error "Could not resolve ./src/main.jsx"
means your GitHub repo is MISSING the src/ folder.

SOLUTION: Use GitHub Desktop (5 minutes)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in to GitHub
3. Click "File" → "Add Local Repository"
4. Select folder: D:\public-apis-master\indian-stock-analyzer
5. If asked to create repo, click "Create Repository"
6. Click "Publish repository" (top right)
7. UNCHECK "Keep this code private" to make it public
8. Click "Publish Repository"

This uploads ALL files including src/ folder.

THEN ON VERCEL:
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your "indian-stock-analyzer" repo
4. Framework Preset: Vite
5. Build Command: npm run build
6. Output Directory: dist
7. Click "Deploy"

DONE!

========================================================
IF GITHUB DESKTOP DOESN'T WORK:
========================================================

Option A: Install Git from https://git-scm.com/download/win
Then run push-to-github.bat

Option B: Upload via GitHub website
1. Go to https://github.com/new
2. Create repo named "indian-stock-analyzer"
3. Click "Add file" → "Upload files"
4. Drag ENTIRE src/ folder from:
   D:\public-apis-master\indian-stock-analyzer\
5. Make sure you see these folders in GitHub:
   - src/components/
   - src/pages/
   - src/services/
   - src/utils/
6. Commit changes

========================================================
