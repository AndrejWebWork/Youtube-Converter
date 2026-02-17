# 🧪 Testing Guide - MP3 Downloader but animated

## Quick Test (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify FFmpeg
```bash
ffmpeg -version
```
**If not installed:**
- Windows: Download from https://ffmpeg.org/download.html, extract, add to PATH
- macOS: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

### Step 3: Start Server
```bash
npm start
```
You should see:
```
🚀 Server running on http://localhost:3000
📁 Temp downloads: C:\Users\andre\Desktop\youtube converter\temp_downloads
```

### Step 4: Open Browser
Navigate to: `http://localhost:3000`

---

## Test Cases

### ✅ Test 1: First Load Experience
**Expected:**
1. Disclaimer modal appears with slide-in animation
2. Click "I Understand" - modal rotates out
3. Hero section animates: logo bounces in, particles float
4. Search bar scales in with elastic effect

### ✅ Test 2: Theme Toggle
**Steps:**
1. Click moon/sun icon (top-right)
2. **Expected:** Smooth color transition, icon rotates 360°
3. Toggle again to verify persistence (uses localStorage)

### ✅ Test 3: Invalid URL Handling
**Steps:**
1. Enter invalid text: `hello world`
2. Click "Convert"
3. **Expected:** Input shakes, red error toast slides down from top
4. Toast auto-dismisses after 3 seconds

### ✅ Test 4: Valid YouTube URL - Full Flow
**Steps:**
1. Paste a valid YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. Select quality: 320 kbps
3. Click "Convert"
4. **Expected:**
   - Video card scales in from center with rotation
   - Thumbnail loads
   - Title appears with typewriter effect
   - Progress bar fills smoothly
   - Page auto-scrolls to results
5. Click "Download MP3"
6. **Expected:**
   - Button hides, spinner appears and rotates
   - After conversion: confetti burst animation
   - Browser download starts automatically
   - Success toast appears

### ✅ Test 5: Download History
**Steps:**
1. After successful download, scroll down
2. **Expected:** History section appears with staggered list animation
3. Recent download shows with title and date
4. Click "Clear History"
5. **Expected:** Items slide out to the right, section disappears

### ✅ Test 6: Responsive Design
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test breakpoints:
   - **320px (Mobile)**: Vertical layout, full-width buttons
   - **768px (Tablet)**: Adjusted spacing
   - **1200px (Desktop)**: Optimal layout
4. **Expected:** No horizontal scroll, all elements readable

### ✅ Test 7: Accessibility
**Steps:**
1. Tab through all interactive elements
2. **Expected:** Visible focus states with GSAP highlights
3. Use screen reader (NVDA/JAWS)
4. **Expected:** All buttons/inputs have proper ARIA labels

### ✅ Test 8: Error Handling - Private Video
**Steps:**
1. Try a private/unavailable video URL
2. **Expected:** Error toast: "Failed to fetch video. It may be private..."

### ✅ Test 9: Rate Limiting
**Steps:**
1. Make 11+ requests within 1 minute
2. **Expected:** Error: "Too many requests, please try again later."

### ✅ Test 10: File Cleanup
**Steps:**
1. Download a file
2. Check `temp_downloads/` folder - file exists
3. Wait 5 minutes (or manually trigger cleanup)
4. **Expected:** Old files (>1 hour) are deleted automatically

---

## Performance Checks

### Animation Performance
1. Open DevTools > Performance tab
2. Record while interacting with site
3. **Expected:** Consistent 60fps, no jank
4. Check for `will-change: transform` on animated elements

### Network Efficiency
1. Open DevTools > Network tab
2. **Expected:**
   - GSAP loaded from CDN (cached)
   - API calls return quickly (<2s for metadata)
   - MP3 conversion time depends on video length

---

## Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Known Limitations

1. **FFmpeg Required**: Must be installed on server
2. **Conversion Time**: Depends on video length (1-2 min for 5-min video)
3. **File Size**: Large videos may take longer
4. **YouTube Restrictions**: Cannot download age-restricted, private, or region-locked videos
5. **Rate Limiting**: 10 requests/minute per IP

---

## Debugging Tips

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### FFmpeg errors
```bash
# Verify FFmpeg path
where ffmpeg

# Test FFmpeg
ffmpeg -version
```

### GSAP not loading
- Check browser console for CDN errors
- Verify internet connection
- Try alternative CDN in index.html

---

## Advanced Testing

### Load Testing
```bash
# Install Apache Bench
# Send 100 requests
ab -n 100 -c 10 http://localhost:3000/api/info
```

### Security Testing
- Try SQL injection in URL input (should be sanitized)
- Test CORS with different origins
- Verify Helmet headers in Network tab

---

## Success Criteria

✅ All animations run at 60fps
✅ No console errors
✅ Downloads work end-to-end
✅ Responsive on all breakpoints
✅ Accessible via keyboard
✅ Theme persists across sessions
✅ History saves to localStorage
✅ Rate limiting works
✅ Files auto-cleanup

---

**Happy Testing! 🎉**
