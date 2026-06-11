// ============================================================
// effects.js — Animasi 3D Spektakuler (Valentine Style)
// ============================================================

// ── 1. CINEMATIC INTRO: Huruf masuk dari luar ke tengah ──
function createCinematicIntro() {
  const intro = document.createElement('div');
  intro.id = 'spectacular-intro';
  intro.style.cssText = `
    position: fixed; inset: 0; z-index: 99998;
    background: linear-gradient(135deg, #1a0a2e 0%, #0a0512 50%, #2d0a1e 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    overflow: hidden;
  `;

  // Floating 3D objects background
  const objects3D = ['💍', '💎', '🌸', '💖', '✨', '🌙', '💫', '🌺'];
  for (let i = 0; i < 12; i++) {
    const obj = document.createElement('div');
    const emoji = objects3D[Math.floor(Math.random() * objects3D.length)];
    const size = 20 + Math.random() * 40;
    obj.style.cssText = `
      position: absolute;
      font-size: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      animation: floatObj3D ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s;
      filter: drop-shadow(0 0 10px rgba(232,160,180,0.6));
      transform-style: preserve-3d;
    `;
    obj.textContent = emoji;
    intro.appendChild(obj);
  }

  // Title text: huruf masuk satu per satu dari luar
  const titleWrapper = document.createElement('div');
  titleWrapper.style.cssText = `
    position: relative; z-index: 2; text-align: center;
    perspective: 800px;
  `;

  const line1 = document.createElement('div');
  line1.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 0 40px rgba(232,160,180,0.8);
    display: flex; justify-content: center; gap: 4px;
    margin-bottom: 8px;
  `;

  const line2 = document.createElement('div');
  line2.style.cssText = `
    font-family: 'Dancing Script', cursive;
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #e8a0b4;
    text-shadow: 0 0 30px rgba(232,160,180,0.9);
    display: flex; justify-content: center; gap: 3px;
  `;

  const word1 = 'Untuk';
  const word2 = 'Kamu ❤️';

  // Animate each letter flying in from random directions
  word1.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    const fromX = (Math.random() - 0.5) * 800;
    const fromY = (Math.random() - 0.5) * 600;
    const fromZ = -500 + Math.random() * 200;
    const rotate = (Math.random() - 0.5) * 360;
    span.style.cssText = `
      display: inline-block;
      opacity: 0;
      transform: translate(${fromX}px, ${fromY}px) translateZ(${fromZ}px) rotate(${rotate}deg) scale(0.2);
      animation: letterFlyIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-delay: ${0.2 + i * 0.08}s;
    `;
    line1.appendChild(span);
  });

  word2.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    const fromX = (Math.random() - 0.5) * 600;
    const fromY = 300 + Math.random() * 200;
    const rotate = (Math.random() - 0.5) * 270;
    span.style.cssText = `
      display: inline-block;
      opacity: 0;
      transform: translate(${fromX}px, ${fromY}px) rotate(${rotate}deg) scale(0.1);
      animation: letterFlyIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-delay: ${0.8 + i * 0.07}s;
    `;
    line2.appendChild(span);
  });

  // Subtitle
  const subtitle = document.createElement('div');
  subtitle.style.cssText = `
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: rgba(232,160,180,0.7);
    letter-spacing: 6px;
    text-transform: uppercase;
    margin-top: 24px;
    opacity: 0;
    animation: fadeInUp 1s ease forwards 2s;
  `;
  subtitle.textContent = '✦ sesuatu yang spesial untukmu ✦';

  titleWrapper.appendChild(line1);
  titleWrapper.appendChild(line2);
  titleWrapper.appendChild(subtitle);
  intro.appendChild(titleWrapper);

  // Heart burst particles
  const heartBurst = document.createElement('div');
  heartBurst.id = 'heart-burst';
  heartBurst.style.cssText = 'position: absolute; inset: 0; pointer-events: none;';
  intro.appendChild(heartBurst);

  // CSS keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes letterFlyIn {
      to { opacity: 1; transform: translate(0,0) translateZ(0) rotate(0deg) scale(1); }
    }
    @keyframes floatObj3D {
      0%,100% { opacity:0.6; transform: translateY(0) rotateY(0deg) scale(1); }
      25% { opacity:0.9; transform: translateY(-20px) rotateY(90deg) scale(1.1); }
      50% { opacity:0.7; transform: translateY(-35px) rotateY(180deg) scale(0.95); }
      75% { opacity:0.8; transform: translateY(-15px) rotateY(270deg) scale(1.05); }
    }
    @keyframes fadeInUp {
      from { opacity:0; transform: translateY(20px); }
      to   { opacity:1; transform: translateY(0); }
    }
    @keyframes heartPop {
      0%   { opacity:1; transform: translate(-50%,-50%) scale(0) rotate(0deg); }
      60%  { opacity:1; transform: translate(-50%,-50%) scale(1.4) rotate(var(--r)); }
      100% { opacity:0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.8) rotate(var(--r)); }
    }
    @keyframes glowPulse {
      0%,100% { box-shadow: 0 0 30px rgba(232,160,180,0.3); }
      50%      { box-shadow: 0 0 80px rgba(232,160,180,0.7), 0 0 120px rgba(192,96,122,0.4); }
    }
    #spectacular-intro .glow-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(232,160,180,0.2);
      animation: glowPulse 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(intro);

  // Add glow rings
  [200, 350, 500].forEach((size, i) => {
    const ring = document.createElement('div');
    ring.className = 'glow-ring';
    ring.style.cssText = `
      width:${size}px; height:${size}px;
      left:50%; top:50%;
      transform: translate(-50%,-50%);
      animation-delay: ${i * 0.5}s;
    `;
    intro.appendChild(ring);
  });

  // Heart burst at 2.2s
  setTimeout(() => createHeartBurst(heartBurst), 2200);

  // Fade out at 4s
  setTimeout(() => {
    intro.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    intro.style.opacity = '0';
    setTimeout(() => intro.remove(), 1200);
  }, 4500);
}

// ── 2. HEART BURST: Hati meledak ke segala arah ──
function createHeartBurst(container) {
  const hearts = ['❤️', '💖', '💗', '💝', '🌸', '✨', '💫', '💕'];
  for (let i = 0; i < 24; i++) {
    const h = document.createElement('div');
    const angle = (i / 24) * 360;
    const dist = 120 + Math.random() * 200;
    const tx = Math.cos((angle * Math.PI) / 180) * dist;
    const ty = Math.sin((angle * Math.PI) / 180) * dist;
    const size = 16 + Math.random() * 28;
    h.style.cssText = `
      position: absolute;
      left: 50%; top: 50%;
      font-size: ${size}px;
      --tx: ${tx}px; --ty: ${ty}px;
      --r: ${(Math.random()-0.5)*360}deg;
      animation: heartPop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: ${Math.random() * 0.3}s;
      pointer-events: none;
    `;
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    container.appendChild(h);
  }
}

// ── 3. FLOATING 3D OBJECTS: Objek melayang di background web ──
function create3DFloatingObjects() {
  const container = document.createElement('div');
  container.id = 'floating-3d-objects';
  container.style.cssText = `
    position: fixed; inset: 0;
    pointer-events: none; z-index: 2;
    overflow: hidden;
  `;

  const style3D = document.createElement('style');
  style3D.textContent = `
    .obj-3d {
      position: absolute;
      font-size: 28px;
      opacity: 0;
      animation: drift3D linear infinite;
      filter: drop-shadow(0 4px 12px rgba(192,96,122,0.4));
      will-change: transform;
    }
    @keyframes drift3D {
      0%   { opacity:0; transform: translateY(110vh) rotateY(0deg) rotateX(0deg) scale(0.5); }
      5%   { opacity: 0.7; }
      90%  { opacity: 0.6; }
      100% { opacity:0; transform: translateY(-15vh) rotateY(720deg) rotateX(360deg) scale(1.1); }
    }
    .obj-3d.ring-obj {
      font-size: 36px;
      filter: drop-shadow(0 0 15px rgba(212,168,67,0.6));
    }
    .obj-3d.heart-obj {
      filter: drop-shadow(0 0 12px rgba(232,100,120,0.7));
    }
    .obj-3d.diamond-obj {
      filter: drop-shadow(0 0 18px rgba(200,200,255,0.8));
    }
  `;
  document.head.appendChild(style3D);
  document.body.appendChild(container);

  const objTypes = [
    { emoji: '💍', cls: 'ring-obj' },
    { emoji: '💎', cls: 'diamond-obj' },
    { emoji: '❤️', cls: 'heart-obj' },
    { emoji: '💖', cls: 'heart-obj' },
    { emoji: '🌸', cls: '' },
    { emoji: '💫', cls: '' },
    { emoji: '✨', cls: '' },
    { emoji: '🌺', cls: '' },
    { emoji: '💝', cls: 'heart-obj' },
    { emoji: '🌙', cls: '' },
  ];

  function spawnObject() {
    const type = objTypes[Math.floor(Math.random() * objTypes.length)];
    const obj = document.createElement('div');
    obj.className = `obj-3d ${type.cls}`;
    obj.textContent = type.emoji;
    const duration = 8 + Math.random() * 10;
    const size = 20 + Math.random() * 30;
    obj.style.cssText += `
      left: ${Math.random() * 95}%;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: 0s;
    `;
    container.appendChild(obj);
    setTimeout(() => obj.remove(), (duration + 1) * 1000);
  }

  // Spawn objects continuously
  for (let i = 0; i < 6; i++) {
    setTimeout(() => spawnObject(), i * 1500);
  }
  setInterval(spawnObject, 2000);
}

// ── 4. PARALLAX 3D: Objek bergerak mengikuti mouse ──
function initParallax3D() {
  const layers = [];

  const parallaxStyle = document.createElement('style');
  parallaxStyle.textContent = `
    .parallax-obj {
      position: fixed;
      pointer-events: none;
      z-index: 3;
      transition: transform 0.15s ease-out;
      font-size: 30px;
      filter: drop-shadow(0 0 15px rgba(232,160,180,0.5));
      opacity: 0.5;
      animation: gentleFloat 4s ease-in-out infinite;
    }
    @keyframes gentleFloat {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-12px) scale(1.05); }
    }
  `;
  document.head.appendChild(parallaxStyle);

  const parallaxItems = [
    { emoji: '💍', x: 8,  y: 15, depth: 0.04 },
    { emoji: '💎', x: 88, y: 20, depth: 0.06 },
    { emoji: '💖', x: 5,  y: 70, depth: 0.03 },
    { emoji: '🌸', x: 92, y: 65, depth: 0.05 },
    { emoji: '✨', x: 15, y: 45, depth: 0.07 },
    { emoji: '🌙', x: 82, y: 42, depth: 0.04 },
  ];

  parallaxItems.forEach(item => {
    const el = document.createElement('div');
    el.className = 'parallax-obj';
    el.textContent = item.emoji;
    el.style.left = item.x + '%';
    el.style.top  = item.y + '%';
    el.dataset.depth = item.depth;
    el.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(el);
    layers.push(el);
  });

  let mouseX = 0, mouseY = 0;
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - cx;
    mouseY = e.clientY - cy;
    layers.forEach(el => {
      const depth = parseFloat(el.dataset.depth);
      const tx = mouseX * depth;
      const ty = mouseY * depth;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });
}

// ── 5. SCROLL REVEAL 3D: Section masuk dengan efek 3D ──
function init3DScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal-3d {
      opacity: 0;
      transform: perspective(1000px) rotateX(15deg) translateY(60px) scale(0.95);
      transition: opacity 0.9s cubic-bezier(0.215, 0.61, 0.355, 1),
                  transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .reveal-3d.visible-3d {
      opacity: 1;
      transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.reason-card, .letter-card, .timeline-item, .section-header');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible-3d'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.classList.add('reveal-3d');
    obs.observe(el);
  });
}

// ── 6. CONFETTI 3D: Saat klik tombol ──
function triggerConfetti() {
  const colors = ['#e8a0b4', '#c0607a', '#f8d7da', '#ffffff', '#d4a843', '#a855f7'];
  const shapes = ['❤️', '🌸', '✨', '💖', '💫', '🌺', '💍', '💎'];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      const isEmoji = Math.random() > 0.4;
      const x = Math.random() * window.innerWidth;

      p.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: -20px;
        pointer-events: none;
        z-index: 99999;
        font-size: ${12 + Math.random() * 20}px;
        animation: confettiFall3D ${2 + Math.random() * 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        --drift: ${(Math.random() - 0.5) * 200}px;
        --rot: ${Math.random() * 720 - 360}deg;
      `;

      if (isEmoji) {
        p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      } else {
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (4 + Math.random() * 8) + 'px';
        p.style.height = (4 + Math.random() * 8) + 'px';
        p.style.background = color;
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        p.style.boxShadow = `0 0 6px ${color}`;
      }

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 40);
  }
}

// Confetti CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall3D {
    0%   { opacity:1; transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
    100% { opacity:0; transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rot)) scale(0.3); }
  }
`;
document.head.appendChild(confettiStyle);

// ── 7. MAGNETIC BUTTON: Tombol ikuti cursor ──
function initMagneticButtons() {
  document.querySelectorAll('.album-btn, .confetti-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ── INIT: Jalankan semua saat halaman load ──
window.addEventListener('load', () => {
  createCinematicIntro();
  setTimeout(() => {
    create3DFloatingObjects();
    initParallax3D();
    init3DScrollReveal();
    initMagneticButtons();
  }, 5000);
});