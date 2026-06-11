// ========================================================
// DATA ALBUM FOTO (Bawaan Lama - Tetap Dipertahankan)
// ========================================================
const photos = [
  {
    src: 'assets/photos/foto1.jpeg',
    caption: 'Senyum itu... ✨'
  },
  {
    src: 'assets/photos/foto2.jpeg',
    caption: 'Cahayanya bikin buta 🌟'
  },
  {
    src: 'assets/photos/foto3.jpeg',
    caption: 'Aesthetic banget 🌸'
  },
  {
    src: 'assets/photos/foto4.jpeg',
    caption: 'Selalu bikin kangen 😌'
  },
  {
    src: 'assets/photos/foto5.jpeg',
    caption: 'Soft & gentle 💭'
  },
  {
    src: 'assets/photos/foto6.jpeg',
    caption: 'Bikin hati adem 🧊'
  },
  {
    src: 'assets/photos/foto7.jpeg',
    caption: 'Senyum yang selalu dirindukan 😊'
  },
  {
    src: 'assets/photos/foto8.jpeg',
    caption: 'Momen yang selalu diingat 💖'
  }
];

// Update hint di tombol album (Bawaan Lama)
document.addEventListener('DOMContentLoaded', () => {
  const hint = document.querySelector('.album-hint');
  if (hint) hint.textContent = `${photos.length} foto yang bikin senyum sendiri`;
  console.log("Album romantis siap digunakan! ✨");
});


