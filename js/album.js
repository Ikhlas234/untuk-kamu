// ========================================================
// js/album.js — FIX AMAN 100%: VIDEO MUNCUL & FOTO NORMAL
// ========================================================

// 1. Fungsi Buka Album (Saat tombol utama diklik)
function openAlbum() {
  const overlay = document.getElementById('album-overlay');
  if (overlay) {
    overlay.style.display = 'block'; // Membuka tirai album
    setTimeout(() => overlay.classList.add('active'), 10);
  }
  document.body.style.overflow = 'hidden'; // Kunci scroll layar utama

  // Efek Hujan Kelopak Bunga Sakura Bawaan Aslimu
  const petalEmojis = ['🌸','🌷','🌹','💐','🌺'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'album-petal';
      p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
      p.style.cssText = `
        position: fixed;
        top: -40px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 16 + 16}px;
        pointer-events: none;
        z-index: 10005;
        animation: petalFall ${3 + Math.random() * 2}s ease-out forwards;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 6000);
    }, i * 100);
  }
}

// 2. Fungsi Tutup Album (Saat tombol ✕ diklik)
function closeAlbum() {
  const overlay = document.getElementById('album-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    
    // Matikan semua kartu yang terbuka
    const activeCards = document.querySelectorAll('.album-item.is-active');
    activeCards.forEach(card => card.classList.remove('is-active'));
    
    // Sembunyikan setelah animasi selesai
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = ''; // Membuka kunci scroll utama
    }, 400); 
  }
}
// 3. Fungsi Klik Kartu Foto (Mengatur Efek Kliping & Efek Mengetik)
function activeAlbumCard(element) {
  // Jika kartu yang diklik sudah aktif, maka tutup (kembali ke grid normal)
  if (element.classList.contains('is-active')) {
    element.classList.remove('is-active');
    return;
  }

  // Tutup kartu lain yang mungkin lagi terbuka
  const openCards = document.querySelectorAll('.album-item.is-active');
  openCards.forEach(card => card.classList.remove('is-active'));

  // Aktifkan kartu yang sedang diklik (buka kesamping)
  element.classList.add('is-active');

  // Jalankan efek mengetik pada kartu yang aktif
  const typingElement = element.querySelector('.album-typing');
  if (typingElement) {
    const fullText = typingElement.getAttribute('data-text');
    typingElement.textContent = ''; // Kosongkan teks awal
    
    let index = 0;
    function typeEffect() {
      if (index < fullText.length) {
        typingElement.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeEffect, 30); // Kecepatan mengetik (30ms per huruf)
      }
    }
    // Beri jeda sedikit nunggu animasi transisi buka selesai, baru ngetik
    setTimeout(typeEffect, 400);
  }
}