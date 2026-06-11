// ========================================================
// js/main.js - Professional IT Masterclass Version (FINAL)
// ========================================================

let ytPlayer;
let musicStarted = false;

// 1. YouTube Player Setup
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-audio-player', {
        videoId: '7N19lJzsgLU',
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': '7N19lJzsgLU', 'controls': 0, 'disablekb': 1, 'rel': 0 },
        events: { 'onReady': (event) => { event.target.setVolume(70); } }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. Smooth Entry
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    // 3. Apple-Style Reveal
    const scrollElements = document.querySelectorAll('.reveal-fade, .reveal-up, .letter-wrapper, .section-header');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    scrollElements.forEach(el => {
        el.classList.add('reveal-invisible');
        elementObserver.observe(el);
    });

    // 4. Smooth Anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 5. Smart Audio Trigger
    const triggerAudioEngine = () => {
        if (!musicStarted && ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
            musicStarted = true;
            document.removeEventListener('click', triggerAudioEngine);
            document.removeEventListener('touchstart', triggerAudioEngine);
        }
    };
    document.addEventListener('click', triggerAudioEngine);
    document.addEventListener('touchstart', triggerAudioEngine);

    // 6. Micro-Sparkles trigger
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) createCursorSparkle(e.clientX, e.clientY);
    });

    // ── TAMBAHAN BARU ──
    initTypingEffect();
    initPageTransition();
});

// ========================================================
// TAMBAHAN FITUR SPEKTAKULER (Ditaruh di paling bawah)
// ========================================================

function createCursorSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.backgroundColor = 'rgba(232, 160, 180, 0.7)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.boxShadow = '0 0 10px #e8a0b4';
    sparkle.style.transition = 'all 0.8s ease-out';
    document.body.appendChild(sparkle);
    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) scale(0)`;
        sparkle.style.opacity = '0';
    });
    setTimeout(() => sparkle.remove(), 800);
}

// A. Smart Tab Title
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? "Kangen kamu... 🤍" : "Untuk Kamu yang Spesial";
});

// B. Cinematic Intro Orchestrator
window.addEventListener('load', () => {
    const introScreen = document.getElementById('cinematic-intro');
    if (introScreen) {
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => introScreen.remove(), 1500);
        }, 4500);
    }
});

// C. Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed; top:0; left:0; height:2px; background:linear-gradient(90deg, #e8a0b4, #c0607a); z-index:999999; transition:width 0.2s ease-out;';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
    const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${p}%`;
});

// D. Custom Cursor Tracker
// — ditangani oleh particles.js (smooth lerp + hover expand)
// — dikomentari agar tidak bentrok / double cursor
/*
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    if(cursor) { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; }
});
*/

document.addEventListener('dblclick', () => {
    const msg = document.getElementById('secret-msg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 3000);
    }
});

// ========================================================
// E. TYPING EFFECT — Hero Subtitle
//    Teks hero subtitle muncul diketik satu-satu
// ========================================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const fullText = subtitle.textContent.trim();
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    subtitle.style.minHeight = '3em'; // Jaga layout tidak loncat

    // Kursor kedip
    const typeCursor = document.createElement('span');
    typeCursor.className = 'typewriter-cursor';
    subtitle.appendChild(typeCursor);

    let i = 0;

    function typeChar() {
        if (i < fullText.length) {
            const char = document.createTextNode(fullText[i]);
            subtitle.insertBefore(char, typeCursor);
            i++;

            // Jeda lebih lama di tanda baca
            const ch = fullText[i - 1];
            const delay = (ch === '.' || ch === ',' || ch === '…')
                ? 300 + Math.random() * 100
                : 60 + Math.random() * 40;

            setTimeout(typeChar, delay);
        } else {
            // Selesai — cursor berkedip 3 detik lalu hilang pelan
            setTimeout(() => {
                typeCursor.style.transition = 'opacity 0.6s ease';
                typeCursor.style.opacity = '0';
                setTimeout(() => typeCursor.remove(), 600);
            }, 3000);
        }
    }

    // Mulai setelah cinematic intro selesai (~6 detik) + sedikit buffer
    const introEl = document.getElementById('cinematic-intro');
    const startDelay = introEl ? 6200 : 900;
    setTimeout(typeChar, startDelay);
}

// ========================================================
// F. PAGE TRANSITION CINEMATIC — antar section
//    Curtain tipis muncul setiap scroll ke section baru
// ========================================================
function initPageTransition() {
    // Buat elemen curtain
    const curtain = document.createElement('div');
    curtain.id = 'page-curtain';
    curtain.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99990;
        pointer-events: none;
        background: linear-gradient(135deg, #1a0a2e 0%, #0a0512 50%, #2d0a1e 100%);
        opacity: 0;
        transform: scaleY(0);
        transform-origin: top;
        will-change: transform, opacity;
    `;
    document.body.appendChild(curtain);

    const sections = document.querySelectorAll(
        '#hero, #love-letter, #reasons, #timeline, #bottom-msg'
    );

    let lastSection = null;
    let transitioning = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target !== lastSection && !transitioning) {
                // Lewati trigger pertama (hero saat halaman pertama dibuka)
                if (lastSection !== null) {
                    transitioning = true;
                    playCurtain(() => { transitioning = false; });
                }
                lastSection = entry.target;
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => observer.observe(s));

    function playCurtain(onDone) {
        // Fase 1 — curtain turun dari atas (masuk)
        curtain.style.transition = 'opacity 0.15s ease, transform 0.32s cubic-bezier(0.76, 0, 0.24, 1)';
        curtain.style.transformOrigin = 'top';
        curtain.style.opacity = '0.6';
        curtain.style.transform = 'scaleY(1)';

        // Fase 2 — curtain naik ke atas (keluar)
        setTimeout(() => {
            curtain.style.transition = 'opacity 0.22s ease 0.08s, transform 0.38s cubic-bezier(0.76, 0, 0.24, 1) 0.04s';
            curtain.style.transformOrigin = 'bottom';
            curtain.style.transform = 'scaleY(0)';
            curtain.style.opacity = '0';

            setTimeout(() => {
                curtain.style.transformOrigin = 'top'; // Reset untuk next trigger
                if (onDone) onDone();
            }, 460);
        }, 340);
    }
}