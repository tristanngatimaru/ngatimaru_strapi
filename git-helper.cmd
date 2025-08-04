@echo off
setlocal enabledelayedexpansion

:: Navigate to your project folder
cd /d D:\WorkFiles\ngatimaru_strapi

:: Check if .git folder exists
if not exist .git (
    echo This folder is not a Git repository.
    pause
    exit /b
)

:: Show current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set branch=%%i
echo Current branch: %branch%

:: Pull latest changes
echo Pulling latest changes from origin/%branch%...
git pull origin %branch%

:: Stage all changes
git add .

:: Ask for commit message
set /p msg=Enter commit message: 

:: Check if user entered a message
if "%msg%"=="" (
    echo Commit message cannot be empty.
    pause
    exit /b
)

:: Commit and push
git commit -m "%msg%"
git push origin %branch%

echo.
echo ✅ Git push complete.
pause
