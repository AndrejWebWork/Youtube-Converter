// ============================================
// MP3 Downloader - Frontend Logic with GSAP
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// API Base URL
const API_BASE = window.location.origin;

// ============================================
// State Management
// ============================================
const state = {
  currentVideo: null,
  theme: localStorage.getItem('theme') || 'dark',
  history: JSON.parse(localStorage.getItem('downloadHistory') || '[]')
};

// ============================================
// DOM Elements
// ============================================
const elements = {
  disclaimerModal: document.getElementById('disclaimer-modal'),
  acceptBtn: document.getElementById('accept-disclaimer'),
  themeToggle: document.getElementById('theme-toggle'),
  searchForm: document.getElementById('search-form'),
  urlInput: document.getElementById('url-input'),
  formatSelect: document.getElementById('format'),
  qualitySelect: document.getElementById('quality'),
  resolutionSelect: document.getElementById('resolution'),
  errorToast: document.getElementById('error-toast'),
  results: document.getElementById('results'),
  videoCard: document.getElementById('video-card'),
  videoThumbnail: document.getElementById('video-thumbnail'),
  videoTitle: document.getElementById('video-title'),
  videoDuration: document.getElementById('video-duration'),
  progressFill: document.getElementById('progress-fill'),
  downloadSection: document.getElementById('download-section'),
  downloadBtn: document.getElementById('download-mp3'),
  convertAgainBtn: document.getElementById('convert-again'),
  loadingSpinner: document.getElementById('loading-spinner'),
  historySection: document.getElementById('history'),
  historyList: document.getElementById('history-list'),
  clearHistoryBtn: document.getElementById('clear-history'),
  confettiContainer: document.getElementById('confetti-container'),
  particles: document.getElementById('particles')
};

// ============================================
// Initialization
// ============================================
function init() {
  // Show disclaimer on first visit
  if (!localStorage.getItem('disclaimerAccepted')) {
    showDisclaimer();
  }
  
  // Apply saved theme
  applyTheme(state.theme);
  
  // Initialize animations
  initHeroAnimations();
  initScrollAnimations();
  createParticles();
  initCursorTrail();
  
  // Apply magnetic effect to buttons
  magneticEffect(elements.downloadBtn);
  magneticEffect(document.querySelector('.btn-search'));
  
  // Breathing animation on search button
  breathingAnimation(document.querySelector('.btn-glow'));
  
  // Render history
  renderHistory();
  
  // Event listeners
  elements.acceptBtn.addEventListener('click', acceptDisclaimer);
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.searchForm.addEventListener('submit', handleSearch);
  elements.downloadBtn.addEventListener('click', handleDownload);
  elements.convertAgainBtn.addEventListener('click', resetForm);
  elements.clearHistoryBtn.addEventListener('click', clearHistory);
  elements.urlInput.addEventListener('focus', handleInputFocus);
  elements.urlInput.addEventListener('blur', handleInputBlur);
  elements.formatSelect.addEventListener('change', toggleQualityOptions);
}

// ============================================
// Disclaimer Modal
// ============================================
function showDisclaimer() {
  elements.disclaimerModal.classList.add('active');
  gsap.from('.modal-content', {
    scale: 0,
    rotation: 180,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });
}

function acceptDisclaimer() {
  localStorage.setItem('disclaimerAccepted', 'true');
  gsap.to('.modal-content', {
    scale: 0,
    rotation: -180,
    duration: 0.5,
    ease: 'back.in(1.7)',
    onComplete: () => {
      elements.disclaimerModal.classList.remove('active');
    }
  });
}

// ============================================
// Toggle Quality/Resolution Options
// ============================================
function toggleQualityOptions() {
  if (elements.formatSelect.value === 'mp4') {
    elements.qualitySelect.style.display = 'none';
    elements.resolutionSelect.style.display = 'inline-block';
  } else {
    elements.qualitySelect.style.display = 'inline-block';
    elements.resolutionSelect.style.display = 'none';
  }
}

// ============================================
// Theme Toggle
// ============================================
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  applyTheme(state.theme);
  
  gsap.to('body', {
    duration: 0.5,
    ease: 'power2.inOut'
  });
  
  gsap.to(elements.themeToggle, {
    rotation: 360,
    duration: 0.5,
    ease: 'back.out(1.7)'
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  elements.themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ============================================
// Hero Animations (GSAP)
// ============================================
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Staggered text reveal
  tl.from('.logo-text', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  })
  .from('.logo-subtitle', {
    y: 50,
    opacity: 0,
    duration: 0.8
  }, '-=0.5')
  .from('.input-wrapper', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .from('.quality-selector', {
    y: 30,
    opacity: 0,
    duration: 0.6
  }, '-=0.4');
}

function initScrollAnimations() {
  gsap.from('.footer', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      end: 'top center',
      scrub: 1
    },
    y: 100,
    opacity: 0
  });
}

// ============================================
// Particle Background
// ============================================
function createParticles() {
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(233, 69, 96, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    elements.particles.appendChild(particle);
    
    gsap.to(particle, {
      y: Math.random() * 200 - 100,
      x: Math.random() * 200 - 100,
      opacity: Math.random(),
      duration: Math.random() * 3 + 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// ============================================
// Input Animations
// ============================================
function handleInputFocus(e) {
  gsap.to(e.target, {
    scale: 1.02,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  });
}

function handleInputBlur(e) {
  gsap.to(e.target, {
    scale: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  });
}

// ============================================
// Magnetic Button Effect
// ============================================
function magneticEffect(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  });
}

// ============================================
// Text Scramble Effect
// ============================================
function scrambleText(element, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let iteration = 0;
  
  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, index) => {
        if (index < iteration) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iteration >= finalText.length) {
      clearInterval(interval);
    }
    iteration += 1 / 3;
  }, 30);
}

// ============================================
// Cursor Trail Effect
// ============================================
function initCursorTrail() {
  const trail = [];
  const trailLength = 8;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
      mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }
  
  document.addEventListener('mousemove', (e) => {
    trail.forEach((dot, index) => {
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.3 + index * 0.05,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// Breathing Animation
// ============================================
function breathingAnimation(element) {
  gsap.to(element, {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// ============================================
// Search & API Integration
// ============================================
async function handleSearch(e) {
  e.preventDefault();
  
  const url = elements.urlInput.value.trim();
  const quality = elements.qualitySelect.value;
  const resolution = elements.resolutionSelect.value;
  const format = elements.formatSelect.value;
  
  if (!validateYouTubeUrl(url)) {
    showError('Please enter a valid YouTube URL');
    shakeElement(elements.urlInput);
    return;
  }
  
  try {
    // Fetch video info
    const response = await fetch(`${API_BASE}/api/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const videoData = await response.json();
    state.currentVideo = { ...videoData, url, quality, resolution, format };
    
    displayVideoInfo(videoData);
    
  } catch (error) {
    showError(error.message);
  }
}

function validateYouTubeUrl(url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
  return regex.test(url);
}

function displayVideoInfo(data) {
  elements.videoThumbnail.src = data.thumbnail;
  elements.videoTitle.textContent = data.title;
  elements.videoDuration.textContent = formatDuration(data.duration);
  
  elements.results.classList.add('active');
  
  // Animate video card
  gsap.fromTo(elements.videoCard, 
    { scale: 0, rotation: -10 },
    { 
      scale: 1, 
      rotation: 0, 
      duration: 0.8, 
      ease: 'back.out(1.7)' 
    }
  );
  
  // Animate progress bar
  gsap.to(elements.progressFill, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.out'
  });
  
  // Scramble text effect for title
  scrambleText(elements.videoTitle, data.title);
  
  // Scroll to results
  elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// Download Handler
// ============================================
async function handleDownload() {
  if (!state.currentVideo) return;
  
  elements.downloadBtn.style.display = 'none';
  elements.loadingSpinner.classList.add('active');
  
  // Animate spinner
  gsap.to('.spinner', {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear'
  });
  
  try {
    const response = await fetch(`${API_BASE}/api/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: state.currentVideo.url,
        quality: state.currentVideo.quality,
        resolution: state.currentVideo.resolution,
        format: state.currentVideo.format
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const data = await response.json();
    
    // Download file
    const link = document.createElement('a');
    link.href = data.downloadUrl;
    link.download = data.filename;
    link.click();
    
    // Success animation
    elements.loadingSpinner.classList.remove('active');
    elements.convertAgainBtn.style.display = 'inline-flex';
    
    createConfetti();
    showSuccess('Download started!');
    
    // Save to history
    addToHistory(state.currentVideo);
    
  } catch (error) {
    elements.loadingSpinner.classList.remove('active');
    elements.downloadBtn.style.display = 'inline-flex';
    showError(error.message);
  }
}

// ============================================
// Reset Form
// ============================================
function resetForm() {
  gsap.to(elements.results, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    onComplete: () => {
      elements.results.classList.remove('active');
      elements.convertAgainBtn.style.display = 'none';
      elements.downloadBtn.style.display = 'inline-flex';
      elements.urlInput.value = '';
      state.currentVideo = null;
      gsap.set(elements.results, { opacity: 1, y: 0 });
      elements.urlInput.focus();
    }
  });
}

// ============================================
// Confetti Animation
// ============================================
function createConfetti() {
  const colors = ['#e94560', '#00d9ff', '#ffd700', '#ff6b6b'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    elements.confettiContainer.appendChild(confetti);
    
    gsap.to(confetti, {
      y: window.innerHeight + 100,
      x: Math.random() * 400 - 200,
      rotation: Math.random() * 720,
      opacity: 1,
      duration: Math.random() * 2 + 2,
      ease: 'power2.out',
      onComplete: () => confetti.remove()
    });
  }
}

// ============================================
// History Management
// ============================================
function addToHistory(video) {
  const historyItem = {
    title: video.title,
    url: video.url,
    timestamp: Date.now()
  };
  
  state.history.unshift(historyItem);
  state.history = state.history.slice(0, 10); // Keep last 10
  
  localStorage.setItem('downloadHistory', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    elements.historySection.classList.remove('active');
    return;
  }
  
  elements.historySection.classList.add('active');
  elements.historyList.innerHTML = '';
  
  state.history.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.title}</span>
      <small>${new Date(item.timestamp).toLocaleDateString()}</small>
    `;
    elements.historyList.appendChild(li);
    
    gsap.from(li, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });
}

function clearHistory() {
  gsap.to('.history-list li', {
    x: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 0.3,
    onComplete: () => {
      state.history = [];
      localStorage.removeItem('downloadHistory');
      renderHistory();
    }
  });
}

// ============================================
// UI Feedback
// ============================================
function showError(message) {
  elements.errorToast.textContent = message;
  elements.errorToast.classList.add('show');
  
  gsap.fromTo(elements.errorToast,
    { y: -150 },
    { y: 0, duration: 0.5, ease: 'back.out(1.7)' }
  );
  
  // Add glitch effect to error
  glitchEffect(elements.errorToast);
  
  setTimeout(() => {
    gsap.to(elements.errorToast, {
      y: -150,
      duration: 0.3,
      onComplete: () => elements.errorToast.classList.remove('show')
    });
  }, 3000);
}

function showSuccess(message) {
  const toast = elements.errorToast.cloneNode();
  toast.textContent = message;
  toast.style.background = 'var(--success)';
  document.body.appendChild(toast);
  
  gsap.fromTo(toast,
    { y: -150, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
  );
  
  setTimeout(() => {
    gsap.to(toast, {
      y: -150,
      opacity: 0,
      duration: 0.3,
      onComplete: () => toast.remove()
    });
  }, 3000);
}

function shakeElement(element) {
  gsap.to(element, {
    x: [-10, 10, -10, 10, 0],
    duration: 0.5,
    ease: 'power2.inOut'
  });
}

// ============================================
// Glitch Effect
// ============================================
function glitchEffect(element) {
  const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.1 });
  
  tl.to(element, {
    skewX: 20,
    duration: 0.05
  })
  .to(element, {
    skewX: -20,
    x: -10,
    duration: 0.05
  })
  .to(element, {
    skewX: 0,
    x: 0,
    duration: 0.05
  });
}

// ============================================
// Start Application
// ============================================
document.addEventListener('DOMContentLoaded', init);
