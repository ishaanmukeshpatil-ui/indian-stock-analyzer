@echo off
echo ========================================
echo    Indian Stock Analyzer - Startup
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download from: https://nodejs.org
    pause
    exit /b 1
)

echo [1/3] Checking Node.js version...
node --version

echo.
echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Starting development server...
echo.
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop the server
echo.
call npm run dev

pause
