@echo off
echo ========================================
echo   Push to GitHub - Indian Stock Analyzer
echo ========================================
echo.

echo Checking for Git...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is NOT installed. Please install it first:
    echo https://git-scm.com/download/win
    echo.
    echo Or use GitHub Desktop: https://desktop.github.com
    pause
    exit /b
)

echo Git found! Initializing repository...
echo.

cd /d "%~dp0"

git init
git add -A
git commit -m "Indian Stock Analyzer - Complete project"
git branch -M main

echo.
echo ========================================
echo IMPORTANT: Enter your GitHub username:
echo ========================================
set /p username="Username: "

git remote remove origin 2>nul
git remote add origin https://github.com/%username%/indian-stock-analyzer.git
git push -u origin main

echo.
echo ========================================
echo   Upload complete! Go to Vercel and:
echo   1. Import this repository
echo   2. Framework Preset: Vite
echo   3. Build Command: npm run build
echo   4. Output Directory: dist
echo ========================================
pause
