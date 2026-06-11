// =============================================
// js/timeline.js — Timeline Momen
// =============================================
// ✏️  Isi dengan momen-momen spesial kamu!
//     date  : tanggal / bulan / waktu
//     title : judul singkat momen
//     desc  : cerita singkat
//     emoji : emoji yang cocok
// =============================================

const timelineData = [
  {
    date: 'Pertama kali',
    title: 'Ketemu Kamu',
    desc: 'Nggak nyangka pertemuan biasa bisa ninggalin kesan yang luar biasa.',
    emoji: '🌟'
  },
  {
    date: 'Setelah itu',
    title: 'Mulai Sadar',
    desc: 'Sadar kalau nama kamu sering banget muncul di pikiran tanpa diminta.',
    emoji: '💭'
  },
  {
    date: 'Suatu hari',
    title: 'Senyum Sendiri',
    desc: 'Baca chat kamu sambil senyum-senyum sendiri. Malu tapi bahagia.',
    emoji: '🌸'
  },
  {
    date: 'Sekarang',
    title: 'Bikin Ini Buat Kamu',
    desc: 'Karena kata-kata biasa nggak cukup untuk bilang betapa spesialnya kamu.',
    emoji: '💌'
  }
];

function renderTimeline() {
  const track = document.getElementById('timeline-track');
  if (!track) return;

  timelineData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">${item.emoji} ${item.date}</div>
      <div class="timeline-title">${item.title}</div>
      <p class="timeline-desc">${item.desc}</p>
    `;
    track.appendChild(el);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 120);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', renderTimeline);
