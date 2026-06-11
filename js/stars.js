// =============================================
// js/stars.js — Star Canvas & Shooting Stars
// =============================================

(function () {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  let shootingStars = [];
  const STAR_COUNT = 140;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.03 + 0.005,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.15 ? '#e8a0b4' : 'white'
    }));
  }

  function addShootingStar() {
    const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
    shootingStars.push({
      x:     Math.random() * canvas.width * 0.7,
      y:     Math.random() * canvas.height * 0.4,
      len:   Math.random() * 120 + 80,
      speed: Math.random() * 10 + 8,
      alpha: 1,
      angle,
      tail:  []
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;

    // Stars
    stars.forEach(s => {
      const a = Math.sin(t * s.speed + s.phase) * 0.35 + 0.55;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color === '#e8a0b4'
        ? `rgba(232,160,180,${a})`
        : `rgba(255,255,255,${a * 0.85})`;
      ctx.fill();
    });

    // Shooting stars
    shootingStars = shootingStars.filter(ss => ss.alpha > 0);
    shootingStars.forEach(ss => {
      const tailX = ss.x - Math.cos(ss.angle) * ss.len;
      const tailY = ss.y - Math.sin(ss.angle) * ss.len;

      const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255,255,255,${ss.alpha})`);
      grad.addColorStop(0.3, `rgba(232,160,180,${ss.alpha * 0.7})`);
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${ss.alpha})`;
      ctx.fill();

      ss.x     += Math.cos(ss.angle) * ss.speed;
      ss.y     += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.022;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
  setInterval(addShootingStar, 3800);
  // Fire a few right away
  setTimeout(addShootingStar, 800);
  setTimeout(addShootingStar, 2000);
})();
