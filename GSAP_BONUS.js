// ============================================
// BONUS: Advanced GSAP Animation Snippets
// ============================================
// Copy these into script.js for enhanced effects

// ============================================
// 1. MorphSVG Button Icon Transformation
// ============================================
// Requires GSAP MorphSVG plugin (premium)
// Morphs download icon to checkmark on success
/*
gsap.to("#download-icon", {
  morphSVG: "#checkmark-icon",
  duration: 0.8,
  ease: "power2.inOut"
});
*/

// ============================================
// 2. Liquid Button Effect
// ============================================
function createLiquidButton(button) {
  const liquid = document.createElement('div');
  liquid.className = 'liquid-fill';
  button.appendChild(liquid);
  
  button.addEventListener('mouseenter', () => {
    gsap.to(liquid, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power2.out',
      transformOrigin: 'bottom'
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(liquid, {
      scaleY: 0,
      duration: 0.4,
      ease: 'power2.in'
    });
  });
}

// CSS for liquid effect:
/*
.liquid-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--accent), var(--success));
  transform: scaleY(0);
  z-index: -1;
  border-radius: inherit;
}
*/

// ============================================
// 3. Magnetic Cursor Effect
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

// Usage: magneticEffect(document.querySelector('.btn-download'));

// ============================================
// 4. Text Scramble Effect
// ============================================
function scrambleText(element, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
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

// Usage: scrambleText(elements.videoTitle, videoData.title);

// ============================================
// 5. Parallax Scroll Effect
// ============================================
function parallaxScroll() {
  gsap.utils.toArray('.parallax-layer').forEach((layer, i) => {
    const depth = layer.dataset.depth || 0.5;
    
    gsap.to(layer, {
      y: () => window.innerHeight * depth,
      ease: 'none',
      scrollTrigger: {
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// HTML: <div class="parallax-layer" data-depth="0.3">Content</div>

// ============================================
// 6. Stagger Reveal on Scroll
// ============================================
function staggerReveal(selector) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out'
  });
}

// Usage: staggerReveal('.history-list li');

// ============================================
// 7. Glitch Effect
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

// Usage: glitchEffect(elements.errorToast);

// ============================================
// 8. Smooth Page Transition
// ============================================
function pageTransition(callback) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    z-index: 9999;
    transform: scaleY(0);
    transform-origin: bottom;
  `;
  document.body.appendChild(overlay);
  
  const tl = gsap.timeline({
    onComplete: () => {
      callback();
      overlay.remove();
    }
  });
  
  tl.to(overlay, {
    scaleY: 1,
    duration: 0.5,
    ease: 'power2.inOut'
  })
  .to(overlay, {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 0.5,
    ease: 'power2.inOut'
  }, '+=0.3');
}

// ============================================
// 9. Elastic Menu Animation
// ============================================
function elasticMenu(menuButton, menu) {
  let isOpen = false;
  
  menuButton.addEventListener('click', () => {
    if (!isOpen) {
      gsap.to(menu, {
        scaleY: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        transformOrigin: 'top'
      });
      gsap.to(menuButton, {
        rotation: 180,
        duration: 0.3
      });
    } else {
      gsap.to(menu, {
        scaleY: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(menuButton, {
        rotation: 0,
        duration: 0.3
      });
    }
    isOpen = !isOpen;
  });
}

// ============================================
// 10. Wave Progress Bar
// ============================================
function waveProgress(progressBar, percentage) {
  const wave = document.createElement('div');
  wave.className = 'wave';
  progressBar.appendChild(wave);
  
  gsap.to(progressBar, {
    width: percentage + '%',
    duration: 2,
    ease: 'power2.out'
  });
  
  gsap.to(wave, {
    x: '100%',
    duration: 1.5,
    repeat: -1,
    ease: 'linear'
  });
}

// CSS for wave:
/*
.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255,255,255,0.3), 
    transparent
  );
  left: -100%;
}
*/

// ============================================
// 11. 3D Card Flip
// ============================================
function cardFlip(card) {
  let isFlipped = false;
  
  card.addEventListener('click', () => {
    gsap.to(card, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.8,
      ease: 'power2.inOut',
      transformStyle: 'preserve-3d'
    });
    isFlipped = !isFlipped;
  });
}

// CSS required:
/*
.card {
  transform-style: preserve-3d;
  perspective: 1000px;
}
.card-front, .card-back {
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
*/

// ============================================
// 12. Cursor Trail Effect
// ============================================
function cursorTrail() {
  const trail = [];
  const trailLength = 10;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }
  
  document.addEventListener('mousemove', (e) => {
    trail.forEach((dot, index) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3 + index * 0.05,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// 13. Breathing Animation (Idle State)
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

// Usage: breathingAnimation(document.querySelector('.btn-search'));

// ============================================
// 14. Split Text Animation
// ============================================
// Requires GSAP SplitText plugin (premium)
// Animates each character individually
/*
const split = new SplitText(".logo-text", { type: "chars" });
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  rotationX: -90,
  stagger: 0.05,
  duration: 0.8,
  ease: "back.out(1.7)"
});
*/

// ============================================
// 15. Infinite Marquee
// ============================================
function infiniteMarquee(container) {
  const content = container.querySelector('.marquee-content');
  const clone = content.cloneNode(true);
  container.appendChild(clone);
  
  gsap.to([content, clone], {
    x: '-100%',
    duration: 20,
    repeat: -1,
    ease: 'linear',
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % -100)
    }
  });
}

// HTML: <div class="marquee"><div class="marquee-content">Text</div></div>

// ============================================
// IMPLEMENTATION NOTES
// ============================================
/*
1. Most effects work with GSAP core (free)
2. MorphSVG and SplitText require GSAP Club membership
3. Always test performance on mobile devices
4. Use will-change: transform for hardware acceleration
5. Combine effects for unique interactions
6. Keep animations under 1 second for responsiveness
7. Use ease: 'power2.out' for natural motion
8. Add delays with stagger for sequential animations
9. Use ScrollTrigger for scroll-based reveals
10. Test accessibility - ensure animations don't cause motion sickness

GSAP Easing Cheat Sheet:
- power1/2/3/4.out: Smooth deceleration
- back.out(1.7): Overshoot effect
- elastic.out(1, 0.5): Bouncy spring
- bounce.out: Bouncing ball
- circ.out: Circular motion
- expo.out: Exponential decay
*/

// ============================================
// PERFORMANCE TIPS
// ============================================
/*
1. Animate transform and opacity only (GPU-accelerated)
2. Avoid animating width/height/top/left (causes reflow)
3. Use will-change: transform on animated elements
4. Batch DOM reads/writes
5. Use gsap.set() for instant changes
6. Debounce scroll/resize events
7. Kill timelines when not needed: tl.kill()
8. Use lazy: true for ScrollTrigger
9. Reduce particle count on mobile
10. Test with Chrome DevTools Performance tab
*/
