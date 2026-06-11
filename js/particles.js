// =============================================
// js/particles.js — Petals, Hearts, Sparkles
// =============================================

(function () {

  // ── Falling Petals ──
  const PETAL_COLORS = ['#e8a0b4','#f4c2d2','#c0607a','#ffd1dc','#fce4ec'];
  const PETAL_SVG = color =>
    `<svg viewBox="0 0 20 20" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 C4 4 0 10 4 15 C6 18 10 20 10 20 C10 20 14 18 16 15 C20 10 16 4 10 0Z"/>
    </svg>`;

  function spawnPetal() {
    const el    = document.createElement('div');
    el.className = 'petal';
    const size  = Math.random() * 16 + 10;
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const dur   = Math.random() * 8 + 8;
    el.style.cssText = `
      left: ${Math.random() * 110 - 5}%;
      top: -50px;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * 3}s;
    `;
    el.innerHTML = PETAL_SVG(color);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }

  setInterval(spawnPetal, 900);
  for (let i = 0; i < 10; i++) setTimeout(spawnPetal, i * 300);


  // ── Floating Hearts ──
  const HEARTS = ['💗','💖','💓','🌸','💝','✨'];

  function spawnHeart() {
    const el    = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    el.style.left   = Math.random() * window.innerWidth + 'px';
    el.style.bottom = '0';
    el.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  setInterval(spawnHeart, 2500);


  // ── Sparkle on Click ──
  const SPARKLES = ['✨','💖','🌸','⭐','💫','🌟','💗'];

  document.addEventListener('click', e => {
    // Skip if clicking inside album or lightbox
    if (e.target.closest('#album-overlay') || e.target.closest('#lightbox')) return;

    // Sparkle
    const spark    = document.createElement('div');
    spark.className = 'sparkle';
    spark.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    spark.style.left = e.clientX + 'px';
    spark.style.top  = e.clientY + 'px';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);

    // Ripple
    const ripple    = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top  = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });


  // ── Confetti Burst ──
  const CONFETTI_COLORS = [
    '#e8a0b4','#f4c2d2','#c0607a','#d4a843',
    '#a78bfa','#fbbf24','#fb7185','#fff'
  ];

  window.triggerConfetti = function () {
    const count = 80;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el     = document.createElement('div');
        el.className  = 'confetti-piece';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top  = '-10px';
        el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        el.style.width       = (Math.random() * 8 + 6) + 'px';
        el.style.height      = (Math.random() * 12 + 6) + 'px';
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        el.style.animationDelay    = '0s';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }, i * 20);
    }

    // Bonus hearts burst
    for (let i = 0; i < 15; i++) {
      setTimeout(spawnHeart, i * 100);
    }
  };


  // ── Custom Cursor ──
  const cursor = document.getElementById('cursor-glow');
  if (cursor) {
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
    });

    (function moveCursor() {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(moveCursor);
    })();

    // Expand on interactive elements
    document.querySelectorAll('button, a, .photo-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '50px';
        cursor.style.height = '50px';
        cursor.style.background = 'radial-gradient(circle, rgba(232,160,180,0.5) 0%, transparent 70%)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '24px';
        cursor.style.height = '24px';
        cursor.style.background = 'radial-gradient(circle, rgba(232,160,180,0.8) 0%, transparent 70%)';
      });
    });
  }

})();
