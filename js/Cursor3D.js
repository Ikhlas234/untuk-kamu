// ========================================================
// js/cursor3d.js — Rose Gold Cursor Trail + Easter Egg
// ========================================================

(function () {
  'use strict';

  // ── Jangan jalankan di mobile (tidak ada cursor) ──
  const isMobile = () => window.innerWidth <= 768 || 'ontouchstart' in window;
  if (isMobile()) return;

  // ──────────────────────────────────────────
  // 1. CUSTOM CURSOR
  // ──────────────────────────────────────────
  const cursor = document.createElement('div');
  cursor.id = 'cursor3d-main';
  cursor.style.cssText = `
    position: fixed;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: radial-gradient(circle, #e8a0b4 0%, #c0607a 70%);
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: screen;
    box-shadow: 0 0 12px rgba(232,160,180,0.8), 0 0 24px rgba(192,96,122,0.4);
  `;

  const cursorRing = document.createElement('div');
  cursorRing.id = 'cursor3d-ring';
  cursorRing.style.cssText = `
    position: fixed;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1.5px solid rgba(232,160,180,0.55);
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    transition: width 0.35s cubic-bezier(0.16,1,0.3,1),
                height 0.35s cubic-bezier(0.16,1,0.3,1),
                border-color 0.3s;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let cx = -100, cy = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  // Ring follows with lerp
  function lerpCursor() {
    rx = rx + (cx - rx) * 0.12;
    ry = ry + (cy - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .album-btn, .album-item, .polaroid, .polaroid-card, .polaroid-wrapper, .reason-card, .timeline-item, video';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.style.width      = '28px';
      cursor.style.height     = '28px';
      cursor.style.background = 'radial-gradient(circle, #fce4ec 0%, #e8a0b4 60%)';
      cursorRing.style.width  = '60px';
      cursorRing.style.height = '60px';
      cursorRing.style.borderColor = 'rgba(232,160,180,0.9)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.style.width      = '16px';
      cursor.style.height     = '16px';
      cursor.style.background = 'radial-gradient(circle, #e8a0b4 0%, #c0607a 70%)';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(232,160,180,0.55)';
    }
  });

  // ──────────────────────────────────────────
  // 2. CURSOR TRAIL — Rose Gold Light Particles
  // ──────────────────────────────────────────
  const TRAIL_COUNT = 14;
  const trails = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const t = document.createElement('div');
    const progress = i / TRAIL_COUNT; // 0 = freshest, 1 = oldest
    const size = 6 - progress * 4;    // freshest lebih besar
    const alpha = 0.7 - progress * 0.6;
    t.style.cssText = `
      position: fixed;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: rgba(232,160,180,${alpha});
      pointer-events: none;
      z-index: 99990;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(t);
    trails.push({ el: t, x: -100, y: -100 });
  }

  let trailMouseX = -100, trailMouseY = -100;
  document.addEventListener('mousemove', (e) => {
    trailMouseX = e.clientX; trailMouseY = e.clientY;
  });

  function animateTrails() {
    // Chain: setiap titik mengikuti titik sebelumnya
    trails[0].x = trailMouseX;
    trails[0].y = trailMouseY;
    for (let i = 1; i < TRAIL_COUNT; i++) {
      trails[i].x += (trails[i - 1].x - trails[i].x) * 0.45;
      trails[i].y += (trails[i - 1].y - trails[i].y) * 0.45;
    }
    trails.forEach(t => {
      t.el.style.left = t.x + 'px';
      t.el.style.top  = t.y + 'px';
    });
    requestAnimationFrame(animateTrails);
  }
  animateTrails();

  // ──────────────────────────────────────────
  // 3. PHOTO HOLOGRAM HOVER (album items)
  // ──────────────────────────────────────────
  function initHologramHover() {
    const cards = document.querySelectorAll('.album-item, .album-photo-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0–1
        const y = (e.clientY - rect.top)  / rect.height;  // 0–1
        const rx = (y - 0.5) * -20;
        const ry = (x - 0.5) *  20;

        // Hologram shimmer gradient follows mouse
        card.style.background = `
          radial-gradient(
            circle at ${x * 100}% ${y * 100}%,
            rgba(232,160,180,0.18) 0%,
            transparent 60%
          )
        `;
        card.style.transform  = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
        card.style.transition = 'transform 0.08s linear';
        card.style.boxShadow  = `${-ry}px ${rx}px 30px rgba(232,160,180,0.3)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s, box-shadow 0.4s';
        card.style.background = '';
        card.style.boxShadow  = '';
      });
    });
  }

  // Init hologram setelah album mungkin terbuka
  setTimeout(initHologramHover, 1000);
  // Re-init kalau album dibuka
  const origOpenAlbum = window.openAlbum;
  window.openAlbum = function () {
    if (origOpenAlbum) origOpenAlbum.apply(this, arguments);
    setTimeout(initHologramHover, 600);
  };

  // ──────────────────────────────────────────
  // 4. EASTER EGG — Klik 5x bintang = pesan rahasia
  // ──────────────────────────────────────────
  let starClickCount = 0;
  let starClickTimer = null;

  const EASTER_MESSAGE = {
    title: '✨ Hei, kamu...✨',
    body: [
      'Kalau kamu bisa baca ini,',
      'artinya kamu penasaran juga sama aku 😊',
      '',
      'Dan aku harap,',
      'rasa itu nggak cuma dari satu arah saja... 💌',
    ]
  };

  function showEasterEgg() {
    // Jangan tampilkan dua kali
    if (document.getElementById('easter-egg-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-modal';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(10,5,18,0.88);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: easterFadeIn 0.5s ease forwards;
      backdrop-filter: blur(8px);
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: linear-gradient(135deg, rgba(30,10,40,0.95) 0%, rgba(20,5,30,0.98) 100%);
      border: 1px solid rgba(232,160,180,0.35);
      border-radius: 20px;
      padding: 48px 40px;
      max-width: 420px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 60px rgba(232,160,180,0.2), 0 0 120px rgba(192,96,122,0.1);
      animation: easterCardIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
      transform: scale(0.8);
    `;

    const title = document.createElement('h2');
    title.textContent = EASTER_MESSAGE.title;
    title.style.cssText = `
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.4rem, 4vw, 1.8rem);
      color: #e8a0b4;
      margin: 0 0 24px;
      text-shadow: 0 0 20px rgba(232,160,180,0.6);
    `;

    const body = document.createElement('div');
    body.style.cssText = `
      font-family: 'Lato', sans-serif;
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: rgba(252,228,236,0.85);
      line-height: 1.9;
      margin-bottom: 32px;
      white-space: pre-line;
    `;

    // Typing effect untuk easter egg
    const fullText = EASTER_MESSAGE.body.join('\n');
    body.textContent = '';
    let idx = 0;
    function typeEaster() {
      if (idx < fullText.length) {
        body.textContent += fullText.charAt(idx++);
        setTimeout(typeEaster, 38);
      }
    }
    setTimeout(typeEaster, 300);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '💌 Tutup';
    closeBtn.style.cssText = `
      background: linear-gradient(135deg, #c0607a, #e8a0b4);
      border: none;
      border-radius: 50px;
      padding: 12px 32px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      font-family: 'Lato', sans-serif;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 20px rgba(192,96,122,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    `;
    closeBtn.addEventListener('mouseover', () => {
      closeBtn.style.transform = 'scale(1.06)';
      closeBtn.style.boxShadow = '0 6px 28px rgba(192,96,122,0.6)';
    });
    closeBtn.addEventListener('mouseout', () => {
      closeBtn.style.transform = 'scale(1)';
      closeBtn.style.boxShadow = '0 4px 20px rgba(192,96,122,0.4)';
    });
    closeBtn.addEventListener('click', () => {
      overlay.style.animation = 'easterFadeOut 0.4s ease forwards';
      setTimeout(() => overlay.remove(), 400);
    });

    card.append(title, body, closeBtn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Inject keyframes kalau belum ada
    if (!document.getElementById('easter-keyframes')) {
      const style = document.createElement('style');
      style.id = 'easter-keyframes';
      style.textContent = `
        @keyframes easterFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes easterFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes easterCardIn  { from { transform: scale(0.8) translateY(20px); opacity: 0; }
                                    to   { transform: scale(1) translateY(0); opacity: 1; } }
      `;
      document.head.appendChild(style);
    }

    // Confetti kecil buat easter egg
    const emojis = ['💖', '✨', '🌸', '💌', '🌟'];
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
          position: fixed;
          font-size: ${14 + Math.random() * 14}px;
          left: ${Math.random() * 100}vw;
          top: -40px;
          pointer-events: none;
          z-index: 1000000;
          animation: petalFall ${2.5 + Math.random() * 2}s ease-out forwards;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 5000);
      }, i * 80);
    }
  }

  // Event: klik di hero atau bintang canvas 5x dalam 4 detik
  const heroSection = document.querySelector('.hero-section, #hero, body');
  if (heroSection) {
    heroSection.addEventListener('click', (e) => {
      // Hanya aktif kalau klik di area atas (hero zone)
      if (e.clientY > window.innerHeight * 0.7) return;

      starClickCount++;
      clearTimeout(starClickTimer);
      starClickTimer = setTimeout(() => { starClickCount = 0; }, 4000);

      if (starClickCount >= 5) {
        starClickCount = 0;
        showEasterEgg();
      }
    });
  }

  // ──────────────────────────────────────────
  // 5. SEMBUNYIKAN CURSOR DEFAULT BROWSER
  // ──────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }
    #cursor3d-main, #cursor3d-ring { cursor: none !important; }
  `;
  document.head.appendChild(style);

  console.log('🖱️ Cursor 3D + Easter Egg aktif! Klik 5x di langit bintang... 🌟');

})();
