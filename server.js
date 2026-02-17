require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const youtubedl = require('youtube-dl-exec');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set binary path explicitly with quotes
const ytDlpPath = `"${path.join(__dirname, 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe')}"`;
const youtubedlExec = (url, options) => {
  process.env.YOUTUBE_DL_PATH = path.join(__dirname, 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
  return youtubedl(url, options);
};

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests' }
});
app.use('/api/', limiter);

const downloadsDir = path.join(__dirname, 'temp_downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir);

setInterval(() => {
  const now = Date.now();
  fs.readdir(downloadsDir, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(downloadsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (now - stats.mtimeMs > 3600000) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}, 300000);

function isValidYouTubeUrl(url) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/.test(url);
}

app.post('/api/info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    console.log('Fetching:', url);
    const info = await youtubedlExec(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      ffmpegLocation: path.join(__dirname, 'node_modules', 'ffmpeg-static')
    });

    console.log('Success:', info.title);
    res.json({
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      videoId: info.id
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch video' });
  }
});

app.post('/api/convert', async (req, res) => {
  try {
    const { url, quality = '320', resolution = '720', format = 'mp3' } = req.body;
    if (!url || !isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await youtubedlExec(url, { 
      dumpSingleJson: true, 
      noWarnings: true,
      ffmpegLocation: path.join(__dirname, 'node_modules', 'ffmpeg-static')
    });
    const title = info.title.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
    const filename = `${uuidv4()}_${title}.${format}`;
    const filepath = path.join(downloadsDir, filename);

    if (format === 'mp4') {
      await youtubedlExec(url, {
        format: `bestvideo[height<=${resolution}][ext=mp4]+bestaudio[ext=m4a]/best[height<=${resolution}][ext=mp4]/best`,
        output: filepath,
        noWarnings: true,
        addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        ffmpegLocation: path.join(__dirname, 'node_modules', 'ffmpeg-static')
      });
    } else {
      await youtubedlExec(url, {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        output: filepath,
        noWarnings: true,
        addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        ffmpegLocation: path.join(__dirname, 'node_modules', 'ffmpeg-static')
      });
    }

    res.json({
      downloadUrl: `/download/${filename}`,
      filename: `${title}.${format}`
    });
  } catch (error) {
    console.error('Conversion error:', error.message);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

app.get('/download/:filename', (req, res) => {
  const filepath = path.join(downloadsDir, req.params.filename);
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.download(filepath, (err) => {
    if (!err) setTimeout(() => fs.unlink(filepath, () => {}), 5000);
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`\n🚀 Server: http://localhost:${PORT}\n`);
});
