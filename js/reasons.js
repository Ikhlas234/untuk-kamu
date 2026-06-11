// =============================================
// js/reasons.js — Kartu Alasan
// =============================================
// ✏️  Edit daftar di bawah sesuai perasaan kamu!
// =============================================

const reasons = [
  {
    emoji: '🌸',
    title: 'Senyumnya',
    desc: 'Satu senyum dari kamu bisa bikin hari yang berat jadi terasa ringan seketika.'
  },
  {
    emoji: '✨',
    title: 'Auranya',
    desc: 'Ada sesuatu dari kamu yang bikin semua orang di sekitarmu ikut bersinar.'
  },
  {
    emoji: '💭',
    title: 'Cara Pikirnya',
    desc: 'Kamu punya cara pandang yang bikin orang lain sadar akan hal-hal yang terlewatkan.'
  },
  {
    emoji: '🌙',
    title: 'Kehadirannya',
    desc: 'Ruangan terasa berbeda saat kamu ada — lebih hangat, lebih hidup.'
  },
  {
    emoji: '💖',
    title: 'Ketulusannya',
    desc: 'Kebaikan yang kamu tunjukkan bukan buat pamer — tapi karena memang begitulah dirimu.'
  },
  {
    emoji: '🎀',
    title: 'Semua Versinya',
    desc: 'Kamu yang senyum, kamu yang serius, kamu yang diam — semuanya sama indahnya.'
  }
];

function renderReasons() {
  const grid = document.getElementById('reasons-grid');
  if (!grid) return;

  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `
      <span class="reason-emoji">${r.emoji}</span>
      <div class="reason-title">${r.title}</div>
      <p class="reason-desc">${r.desc}</p>
    `;
    grid.appendChild(card);

    // stagger reveal via IntersectionObserver
    setTimeout(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      obs.observe(card);
    }, i * 80);
  });
}

document.addEventListener('DOMContentLoaded', renderReasons);
