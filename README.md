# 💌 Untuk Kamu — Panduan Lengkap

---

## 📁 Struktur File

```
untuk-kamu/
│
├── index.html              ← File utama (jangan diubah strukturnya)
│
├── css/
│   ├── style.css           ← Layout & tampilan utama
│   ├── animations.css      ← Semua animasi (petals, sparkle, dll)
│   └── album.css           ← Tampilan album & lightbox
│
├── js/
│   ├── photos.js           ← ✏️ GANTI foto & caption di sini
│   ├── reasons.js          ← ✏️ GANTI alasan kenapa dia spesial
│   ├── timeline.js         ← ✏️ GANTI momen-momen kalian
│   ├── stars.js            ← Animasi bintang (jangan diubah)
│   ├── particles.js        ← Animasi partikel (jangan diubah)
│   ├── album.js            ← Logika album & lightbox (jangan diubah)
│   ├── effects.js          ← Scroll reveal & musik (jangan diubah)
│   └── main.js             ← Inisialisasi (jangan diubah)
│
└── assets/
    ├── photos/             ← 📸 TARUH SEMUA FOTO DI SINI
    │   ├── foto1.jpg
    │   ├── foto2.jpg
    │   └── ...
    └── music.mp3           ← 🎵 Opsional: tambah musik latar
```

---

## ✏️ Cara Edit Konten

### 1. Ganti Foto
- Taruh semua foto ke folder `assets/photos/`
- Buka `js/photos.js`
- Ganti `src` dengan nama file foto kamu
- Ganti `caption` dengan teks yang kamu mau

```js
const photos = [
  { src: 'assets/photos/foto1.jpg', caption: 'Caption kamu di sini ✨' },
  // tambah lebih banyak...
];
```

### 2. Ganti Alasan
- Buka `js/reasons.js`
- Edit array `reasons` sesuai perasaan kamu

### 3. Ganti Timeline
- Buka `js/timeline.js`
- Edit array `timelineData` dengan momen-momen spesial

### 4. Ganti Teks Utama
- Buka `index.html`
- Cari bagian `LETTER` dan `QUOTE` lalu edit teksnya

### 5. Tambah Musik (Opsional)
- Taruh file `.mp3` di `assets/music.mp3`
- Buka `index.html`, cari baris:
  ```html
  <!-- <source src="assets/music.mp3" type="audio/mpeg"> -->
  ```
- Hapus komentar `<!--` dan `-->` nya
- Hapus juga `class="hidden"` dari `<div id="music-player">`

---

## 🚀 Cara Deploy (Go Public)

Ada 3 pilihan, semua **GRATIS** dan mudah:

---

### ✅ PILIHAN 1 — Netlify Drop (TERMUDAH, 1 menit)

1. Buka **https://app.netlify.com/drop**
2. Login / daftar gratis
3. **Drag & drop** folder `untuk-kamu/` ke halaman tersebut
4. Tunggu upload selesai
5. Netlify langsung kasih link seperti:
   `https://amazing-name-123.netlify.app`
6. Bisa custom nama URL gratis (misal: `untuk-dia.netlify.app`)

> 💡 **Paling direkomendasikan** untuk pemula. Tidak perlu GitHub.

---

### ✅ PILIHAN 2 — GitHub Pages

**Step 1: Buat repo GitHub**
1. Buka https://github.com → New Repository
2. Nama repo: `untuk-kamu` (atau apapun)
3. Set ke **Public**
4. Klik Create Repository

**Step 2: Upload file**
```bash
# Di terminal VSCode (Ctrl+`)
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/untuk-kamu.git
git push -u origin main
```

**Step 3: Aktifkan GitHub Pages**
1. Buka repo di GitHub
2. Settings → Pages
3. Source: **Deploy from a branch**
4. Branch: **main** / **(root)**
5. Save

Link kamu: `https://USERNAME.github.io/untuk-kamu`

---

### ✅ PILIHAN 3 — Vercel (Paling Cepat + Custom Domain)

1. Buka https://vercel.com → Sign Up with GitHub
2. Klik **New Project** → Import repo GitHub kamu
3. Klik **Deploy**
4. Selesai! Link: `https://untuk-kamu.vercel.app`

---

## 🌐 Custom Domain (Opsional)

Kalau mau domain keren seperti `untukdia.my.id`:

1. Beli domain di **Niagahoster** / **Domainesia** (~Rp 15rb/tahun untuk `.my.id`)
2. Di Netlify/Vercel → Domain Settings → Add Custom Domain
3. Ikuti instruksi DNS yang dikasih

---

## 📱 Test di HP Sebelum Deploy

Di VSCode, install ekstensi **Live Server**:
1. `Ctrl+Shift+X` → cari "Live Server" → Install
2. Klik kanan `index.html` → "Open with Live Server"
3. Buka di HP: `http://[IP laptop kamu]:5500`
   (lihat IP di terminal: `ipconfig` di Windows / `ifconfig` di Mac)

---

## ❓ FAQ

**Q: Foto tidak muncul?**
→ Pastikan nama file di `photos.js` sama persis dengan nama file di `assets/photos/` (termasuk huruf besar/kecil)

**Q: Mau tambah foto lebih dari 12?**
→ Tinggal tambah baris baru di array `photos` di `js/photos.js`

**Q: Link sudah bisa dibagikan?**
→ Ya! Setelah deploy, langsung kirim linknya ke dia 💌

---

*Dibuat dengan sepenuh hati. Semoga dia terkesan dan tersenyum~ 🌸*
