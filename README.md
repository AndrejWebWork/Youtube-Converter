# 🎵 MP3 Downloader but animated

A stunning, production-ready YouTube-to-MP3 converter with premium GSAP animations. Convert YouTube videos to high-quality MP3 audio files (up to 320kbps) with a beautiful, animated user interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

---

## ⚠️ IMPORTANT LEGAL DISCLAIMER

**This application is for EDUCATIONAL and PERSONAL USE ONLY.**

- You must comply with YouTube's Terms of Service
- Only download content you have permission to use
- Respect copyright laws and intellectual property rights
- This tool should NOT be used for commercial purposes
- The developers are NOT responsible for misuse of this software

**By using this application, you agree to use it responsibly and legally.**

---

## ✨ Features

### Core Functionality
- ✅ **YouTube URL Parsing**: Paste any YouTube video URL
- ✅ **Real-time Metadata Fetching**: Title, duration, thumbnail
- ✅ **High-Quality MP3 Conversion**: 128/256/320 kbps options
- ✅ **Secure Downloads**: Auto-expiring temporary links (1 hour)
- ✅ **Download History**: LocalStorage-based recent downloads

### Premium Animations (GSAP 3.x)
- 🎨 **Hero Animations**: Staggered text reveals, floating particles
- 🎨 **Interactive Elements**: Elastic input focus, button lifts
- 🎨 **Result Cards**: Scale-in animations, typewriter effects
- 🎨 **Progress Bars**: Smooth SVG-like line draws
- 🎨 **Confetti Burst**: Success celebration particles
- 🎨 **Scroll Triggers**: Footer slide-up on scroll
- 🎨 **Theme Toggle**: Smooth dark/light mode transitions

### Design & UX
- 🌙 **Dark/Light Themes**: Toggle with smooth GSAP transitions
- 📱 **Fully Responsive**: Mobile-first (320px, 768px, 1200px)
- ♿ **Accessible**: WCAG 2.1 compliant, ARIA labels, keyboard nav
- 🔒 **Secure**: Input sanitization, rate limiting, Helmet.js
- ⚡ **Performant**: 60fps animations, hardware acceleration

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0.0
- **FFmpeg** installed on your system ([Download FFmpeg](https://ffmpeg.org/download.html))

### Installation

1. **Clone or download this repository**
```bash
cd youtube-converter
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
copy .env.example .env
```

Edit `.env` if needed (default values work fine):
```env
PORT=3000
NODE_ENV=production
DOWNLOAD_EXPIRY_MS=3600000
MAX_REQUESTS_PER_MINUTE=10
```

4. **Verify FFmpeg installation**
```bash
ffmpeg -version
```
If not installed, download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH.

5. **Start the server**
```bash
npm start
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup, accessibility
- **CSS3**: Flexbox/Grid, custom properties, responsive design
- **Vanilla JavaScript**: No frameworks, lightweight
- **GSAP 3.x**: Core + ScrollTrigger for animations
- **Google Fonts**: Orbitron (logo), Inter (body)

### Backend
- **Node.js + Express.js**: RESTful API server
- **ytdl-core**: YouTube metadata extraction
- **fluent-ffmpeg**: Audio conversion to MP3
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **express-rate-limit**: API rate limiting
- **uuid**: Unique download IDs

---

## 📁 Project Structure

```
mp3-downloader-animated/
├── README.md                 # This file
├── package.json              # Dependencies & scripts
├── .env.example              # Environment variables template
├── Procfile                  # Heroku deployment config
├── server.js                 # Express backend
├── temp_downloads/           # Auto-generated temp folder
└── public/                   # Frontend assets
    ├── index.html            # Main HTML
    ├── styles.css            # Responsive CSS
    ├── script.js             # GSAP animations & logic
    └── assets/               # Static assets (if needed)
```

---

## 🔌 API Endpoints

### POST `/api/info`
Fetch YouTube video metadata.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "title": "Video Title",
  "duration": 180,
  "thumbnail": "https://...",
  "videoId": "VIDEO_ID"
}
```

### POST `/api/convert`
Convert YouTube video to MP3.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "quality": "320"
}
```

**Response:**
```json
{
  "downloadUrl": "/download/uuid_filename.mp3",
  "filename": "Video_Title.mp3"
}
```

### GET `/download/:filename`
Download converted MP3 file (auto-expires after 1 hour).

---

## 🎨 GSAP Animation Highlights

### Hero Section
```javascript
// Staggered text reveal with elastic ease
gsap.from('.logo-text', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'back.out(1.7)'
});
```

### Video Card
```javascript
// Scale-in with rotation
gsap.fromTo(videoCard, 
  { scale: 0, rotation: -10 },
  { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
);
```

### Confetti Burst
```javascript
// Particle explosion on download success
gsap.to(confetti, {
  y: window.innerHeight + 100,
  x: Math.random() * 400 - 200,
  rotation: Math.random() * 720,
  opacity: 1,
  duration: Math.random() * 2 + 2
});
```

---

## 🌐 Deployment

### Heroku
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add FFmpeg buildpack:
   ```bash
   heroku buildpacks:add --index 1 https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Vercel
1. Install [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`
2. Deploy: `vercel`
3. **Note**: Vercel has limitations with FFmpeg. Consider using Heroku or a VPS.

### VPS (Ubuntu/Debian)
1. Install Node.js & FFmpeg:
   ```bash
   sudo apt update
   sudo apt install nodejs npm ffmpeg
   ```
2. Clone repo, install deps, run with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name mp3-downloader
   ```

---

## 🔒 Security Features

- ✅ **Helmet.js**: Security headers (XSS, clickjacking protection)
- ✅ **CORS**: Controlled cross-origin requests
- ✅ **Rate Limiting**: 10 requests/minute per IP
- ✅ **Input Validation**: YouTube URL regex validation
- ✅ **Auto-Cleanup**: Temp files deleted after 1 hour
- ✅ **Error Handling**: Graceful failures, no stack traces exposed

---

## 🐛 Troubleshooting

### FFmpeg not found
**Error:** `Cannot find ffmpeg`
**Solution:** Install FFmpeg and add to system PATH.
- Windows: Download from [ffmpeg.org](https://ffmpeg.org), extract, add `bin/` to PATH
- macOS: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

### Port already in use
**Error:** `EADDRINUSE: address already in use`
**Solution:** Change PORT in `.env` or kill process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

### Video unavailable
**Error:** `Failed to fetch video`
**Solution:** Video may be private, age-restricted, or region-locked. Try a different video.

---

## 📝 Development

### Run in development mode with auto-reload
```bash
npm install -g nodemon
npm run dev
```

### Customize animations
Edit `public/script.js` and adjust GSAP timelines:
```javascript
gsap.to(element, {
  // Your custom animation properties
  duration: 1,
  ease: 'power2.out'
});
```

### Add new themes
Edit CSS custom properties in `public/styles.css`:
```css
:root {
  --accent: #your-color;
  --bg-primary: #your-bg;
}
```

---

## 🤝 Contributing

This is an educational project. Feel free to fork and customize for your own learning!

---

## 📄 License

MIT License - See LICENSE file for details.

**Remember:** Use responsibly and respect copyright laws. This tool is for personal, educational use only.

---

## 🙏 Acknowledgments

- **GSAP**: GreenSock Animation Platform
- **ytdl-core**: YouTube downloader library
- **FFmpeg**: Multimedia framework
- **Express.js**: Web framework

---

## 📧 Support

For issues or questions, please open an issue on the repository.

**Enjoy your animated MP3 downloader! 🎉**
