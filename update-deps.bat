@echo off
echo Updating dependencies to fix YouTube extraction...
echo.

npm uninstall ytdl-core
npm install @distube/ytdl-core@latest

echo.
echo ✅ Update complete! Now run: npm start
pause
