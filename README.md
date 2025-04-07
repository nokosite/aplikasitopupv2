Berikut ini adalah versi lengkap `README.md` yang sudah diformat untuk GitHub:

---

```md
# 🎮 UdinApp – Aplikasi Top-Up Voucher Game

**UdinApp** adalah aplikasi mobile berbasis React Native yang dirancang untuk memudahkan pengguna melakukan pencarian dan top-up voucher game favorit mereka. Aplikasi ini menampilkan onboarding interaktif, daftar produk unggulan, dan fitur pencarian game dengan antarmuka yang modern dan responsif.

---

## 📱 Fitur Utama

- ✅ Onboarding screen untuk pengguna baru
- 🔍 Pencarian game secara real-time
- 🌟 Menampilkan produk unggulan dan semua game
- 🎨 Desain UI dark mode yang estetis dan nyaman digunakan

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/udinapp.git
cd udinapp
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Jalankan Aplikasi

Jika menggunakan **Expo**:

```bash
npx expo start
```

Jika menggunakan **React Native CLI**:

```bash
npx react-native run-android
# atau untuk iOS
npx react-native run-ios
```

---

## 📁 Struktur Folder

```
udinapp/
├── assets/             # Gambar dan ikon
├── src/
│   ├── components/     # Komponen UI terpisah
│   ├── data/           # Data game (static)
│   ├── pages/          # Halaman (Home, Onboarding, Detail)
│   ├── styles/         # StyleSheet untuk halaman
│   └── App.tsx         # Entry point utama
├── package.json
└── README.md
```

---

## 💡 Catatan Penggunaan

- Di halaman **Home**, kamu bisa menggunakan kolom pencarian untuk memfilter daftar game.
- Saat pencarian aktif, bagian *Produk Unggulan* dan *Semua Game* akan disembunyikan dan hanya menampilkan hasil pencarian.
- Klik pada kartu game untuk menampilkan detail (opsional dikembangkan lebih lanjut).

---

## ❗ Troubleshooting

| Error | Solusi |
|------|--------|
| `Unable to resolve module` | Jalankan `npm install` atau `yarn install` |
| `numColumns on the fly is not supported` | Pastikan tidak mengganti `numColumns` secara dinamis di `FlatList` |
| `Cannot find name 'Platform'` | Pastikan `import { Platform } from 'react-native'` ditambahkan |

Reset cache jika perlu:
```bash
npx react-native start --reset-cache
```

---

## 👨‍💻 Developer

- **Nama:** F. Maheswara Jevero Kanoko  
- **Universitas:** Primakara University  
- **Mata Kuliah:** Pemrograman Mobile  
- **Tahun:** 2025

---

## 📄 Lisensi

MIT License © 2025 – F. Maheswara Jevero Kanoko