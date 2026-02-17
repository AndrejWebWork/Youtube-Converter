# ⚡ Quick Start Guide

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Verify FFmpeg (30 sec)
```bash
ffmpeg -version
```

**Don't have FFmpeg?**
- **Windows**: Download from https://ffmpeg.org/download.html
  - Extract to `C:\ffmpeg`
  - Add `C:\ffmpeg\bin` to System PATH
  - Restart terminal
- **Mac**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg`

### Step 3: Start Server (10 sec)
```bash
npm start
```

### Step 4: Open Browser (5 sec)
Navigate to: **http://localhost:3000**

---

## ✨ Try These Features Immediately

### 1. Test the Animations (30 sec)
- Move your mouse → See the **cursor trail** ✨
- Hover over "Convert" button → Feel the **magnetic pull** 🧲
- Watch the search button → Notice the **breathing effect** 💨

### 2. Convert a Video (1 min)
Paste this test URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```
- Click "Convert"
- Watch the **text scramble** effect on the title 🔤
- Click "Download MP3"
- Enjoy the **confetti burst** 🎉

### 3. Test Error Handling (15 sec)
- Type: `invalid url`
- Click "Convert"
- See the **glitch effect** on error ⚡

---

## 🎨 What You'll See

### Hero Section
- ✅ Staggered logo reveal
- ✅ Floating particles background
- ✅ Elastic input animations
- ✅ Pulsing button glow

### Video Results
- ✅ Card scales in with rotation
- ✅ Title scrambles into view
- ✅ Progress bar fills smoothly
- ✅ Auto-scroll to results

### Download
- ✅ Magnetic button interaction
- ✅ Rotating spinner
- ✅ 50-particle confetti explosion
- ✅ Success notification

### Theme Toggle
- ✅ Smooth color transitions
- ✅ 360° icon rotation
- ✅ Persistent across sessions

---

## 🐛 Troubleshooting

### "Cannot find ffmpeg"
```bash
# Windows - Check PATH
where ffmpeg

# If not found, add to PATH:
# System Properties > Environment Variables > Path > Add: C:\ffmpeg\bin
```

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env:
PORT=3001
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Performance Check

Open DevTools (F12) → Performance tab:
- ✅ Should see consistent 60fps
- ✅ CPU usage < 5% when idle
- ✅ No layout thrashing

---

## 🎯 Test Checklist

- [ ] Server starts without errors
- [ ] Page loads with animations
- [ ] Cursor trail follows mouse
- [ ] Buttons have magnetic effect
- [ ] Valid URL converts successfully
- [ ] Invalid URL shows glitch error
- [ ] Download triggers confetti
- [ ] Theme toggle works smoothly
- [ ] History saves and displays
- [ ] Mobile responsive (test with DevTools)

---

## 📱 Mobile Testing

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or "Galaxy S20"
4. Test all features
5. **Note**: Cursor trail won't show (no mouse on mobile)

---

## 🎓 Learn More

- **Full Documentation**: See `README.md`
- **Testing Guide**: See `TESTING.md`
- **Enhancement Details**: See `ENHANCEMENTS.md`
- **Advanced GSAP**: See `GSAP_BONUS.js`

---

## 🆘 Need Help?

1. Check console for errors (F12)
2. Verify FFmpeg is installed
3. Ensure Node.js >= 18.0.0
4. Check firewall isn't blocking port 3000
5. Try a different browser

---

## 🎉 You're Ready!

Your premium animated YouTube-to-MP3 converter is now running with:
- ✨ Magnetic buttons
- 🔤 Text scramble effects
- 🎯 Cursor trail
- 💨 Breathing animations
- ⚡ Glitch effects
- 🎊 Confetti celebrations

**Enjoy building! 🚀**
