// ========================================================
// js/parallax3d.js — Cinematic 3D Parallax & Scroll Depth
// ========================================================

(function () {
  'use strict';

  // ── Layer config: setiap layer bergerak di kecepatan berbeda ──
  const LAYERS = [
    { selector: '#stars-canvas',        speedY: 0.08, speedX: 0.04 },
    { selector: '.petal',               speedY: 0.12, speedX: 0.06 },
    { selector: '.hero-section',        speedY: 0.05, speedX: 0.02 },
    { selector: '.love-letter-section', speedY: 0.15, speedX: 0.05 },
    { selector: '.polaroid-section',    speedY: 0.20, speedX: 0.08 },
    { selector: '.timeline-section',    speedY: 0.25, speedX: 0.06 },
    { selector: '.reasons-section',     speedY: 0.18, speedX: 0.04 },
    { selector: '.quote-section',       speedY: 0.22, speedX: 0.05 },
  ];

  // ── Mouse tilt state ──
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let rafId = null;
  let lastScrollY = window.scrollY;
  let isMobile = window.innerWidth <= 768;

  // ── Inisialisasi parallax pada tiap section saat scroll ──
  function initScrollParallax() {
    const sections = document.querySelectorAll(
      '.hero-section, .love-letter-section, .polaroid-section, ' +
      '.timeline-section, .reasons-section, .quote-section'
    );

    sections.forEach((el, i) => {
      el.style.willChange = 'transform';
      el.style.transition = 'transform 0.1s linear';
    });
  }

  // ── Scroll handler: gerakkan elemen berdasarkan posisi scroll ──
  function onScroll() {
    if (isMobile) return; // matikan di HP biar hemat baterai
    const scrollY = window.scrollY;

    LAYERS.forEach(({ selector, speedY }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const offset = scrollY * speedY;
      el.style.transform = `translateY(${offset}px)`;
    });

    lastScrollY = scrollY;
  }

  // ── Mouse move: efek tilt 3D keseluruhan halaman ──
  function onMouseMove(e) {
    if (isMobile) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    // Normalize -1 to 1
    targetX = (e.clientX - cx) / cx;
    targetY = (e.clientY - cy) / cy;
  }

  // ── Smooth lerp loop untuk mouse tilt ──
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateTilt() {
    mouseX = lerp(mouseX, targetX, 0.06);
    mouseY = lerp(mouseY, targetY, 0.06);

    // Terapkan ke hero section saja agar tidak overwhelming
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const rx = mouseY * 4;   // max 4deg tilt vertikal
      const ry = mouseX * -4;  // max 4deg tilt horizontal
      const tz = Math.abs(mouseX * mouseY) * 10; // sedikit zoom in
      hero.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
      hero.style.transition = 'transform 0.05s linear';
    }

    // Gerakkan bintang canvas berlawanan arah mouse (depth illusion)
    const stars = document.querySelector('#stars-canvas');
    if (stars) {
      stars.style.transform = `translate(${mouseX * -12}px, ${mouseY * -8}px)`;
      stars.style.transition = 'transform 0.1s linear';
    }

    rafId = requestAnimationFrame(animateTilt);
  }

  // ── Scroll reveal: section muncul saat masuk viewport ──
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(
      '.love-letter-section, .polaroid-section, ' +
      '.timeline-section, .reasons-section, .quote-section, ' +
      '.album-btn-wrapper'
    );

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── Depth fog: efek kabut tipis di bawah section ──
  function addDepthFog() {
    const fog = document.createElement('div');
    fog.id = 'parallax-fog';
    fog.style.cssText = `
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 180px;
      background: linear-gradient(to top, rgba(10,5,18,0.55) 0%, transparent 100%);
      pointer-events: none;
      z-index: 1;
    `;
    document.body.appendChild(fog);
  }

  // ── 3D tilt pada polaroid / foto utama ──
  function initPolaroidTilt() {
    const polaroids = document.querySelectorAll('.polaroid-wrapper, .polaroid-card, .polaroid');
    polaroids.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / (rect.height / 2)) * -10;
        const ry = ((e.clientX - cx) / (rect.width / 2)) * 10;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
        card.style.transition = 'transform 0.1s linear';
        card.style.boxShadow = `${-ry * 2}px ${rx * 2}px 40px rgba(232,160,180,0.35)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        card.style.boxShadow = '';
      });
    });
  }

  // ── Resize handler ──
  function onResize() {
    isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Reset semua transform di mobile
      LAYERS.forEach(({ selector }) => {
        const el = document.querySelector(selector);
        if (el) el.style.transform = '';
      });
      const hero = document.querySelector('.hero-section');
      if (hero) hero.style.transform = '';
    }
  }

  // ── Boot ──
  function init() {
    initScrollParallax();
    initScrollReveal();
    addDepthFog();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    if (!isMobile) {
      animateTilt();
      // Polaroid tilt init setelah DOM siap
      setTimeout(initPolaroidTilt, 800);
    }

    console.log('🎬 Parallax 3D aktif!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
