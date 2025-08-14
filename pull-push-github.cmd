@echo off
cd /d "C:\Users\TristanFisher\strapiserver"

echo Pulling latest changes from GitHub...
git pull origin main

REM Check for error using %ERRORLEVEL%
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Git pull failed. Please check your connection, credentials, or local changes.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ✅ Git pull completed successfully.
pause
