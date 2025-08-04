@echo off

:: Start Strapi in a new terminal window
start "" cmd.exe /k "cd /d D:\WorkFiles\ngatimaru_strapi && npm run develop"

:: Wait a few seconds (optional, gives Strapi time to boot)
timeout /t 3 >nul

:: Open Strapi admin in default browser
start http://localhost:1337
