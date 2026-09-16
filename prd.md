# Product Requirements Document (PRD)
# Website Company Profile Modern — Hotel & Waterpark — "Cinematic Experience"

| | |
|---|---|
| **Dokumen** | PRD - Company Profile Website (Hotel & Waterpark) |
| **Versi** | 1.0 |
| **Tanggal** | 14 September 2026 |
| **Industri** | Hospitality — Hotel & Waterpark |
| **Referensi Desain** | rockstargames.com (cinematic hero, zoom transition, smooth scroll) |
| **Status** | Draft untuk Review |

---

## 1. Latar Belakang & Tujuan

Perusahaan bergerak di bidang **hospitality**, mengelola **hotel** dan **waterpark**, dan membutuhkan website company profile dengan pengalaman visual yang imersif — terinspirasi dari gaya presentasi rockstargames.com: hero section penuh layar dengan background yang berganti secara sinematik (foto kamar hotel, area kolam/waterpark, suasana resort), transisi smooth scroll antar section, dan tipografi dengan animasi ketik (typewriter) pada halaman utama. Tujuannya adalah membangun kesan destinasi liburan premium sejak pertama kali pengunjung membuka website, sekaligus memudahkan calon tamu menemukan informasi kamar, wahana, fasilitas, dan cara memesan.

### 1.1 Tujuan Bisnis
- Membangun citra brand hotel & waterpark yang modern, premium, dan berkesan (mendukung keputusan booking calon tamu).
- Menampilkan daya tarik visual properti (kamar, kolam/wahana, fasilitas) secara sinematik agar calon tamu "terbayang" pengalaman liburannya.
- Meningkatkan waktu tinggal (dwell time) pengunjung dan mendorong klik ke channel reservasi (WhatsApp/telepon/OTA/booking engine eksternal).
- Menyediakan platform company profile yang mudah di-maintain dan scalable, termasuk untuk update promo musiman.

### 1.2 Tujuan Teknis
- Codebase bersih, modular, dan mudah dikembangkan tim lain.
- Siap production dengan containerization (Docker) dan environment terpisah (dev/prod).
- Dilengkapi automated testing agar perubahan di masa depan aman (regresi minim).

---

## 2. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Calon tamu hotel (keluarga/individu) | Info kamar & tipe kamar, harga/range harga, fasilitas, foto/video, cara reservasi |
| Calon pengunjung waterpark | Info wahana, harga tiket, jam operasional, aturan keselamatan, promo tiket |
| Calon tamu paket gabungan (hotel + waterpark) | Info paket bundling, promo, cara booking |
| Corporate / Event / MICE | Info fasilitas meeting/ballroom, kapasitas, kontak sales (opsional Fase 1) |
| Media/Investor | Profil perusahaan, pencapaian, berita/press |
| Internal (marketing) | Kemudahan update konten (foto, promo) — opsional CMS di fase lanjut |

---

## 3. Ruang Lingkup

### 3.1 In-Scope (Fase 1)
- Landing page (Home) dengan hero cinematic + typewriter + background zoom in/out (foto hotel & waterpark bergantian)
- Halaman About / Tentang Kami (profil perusahaan, sejarah, visi-misi)
- Halaman **Rooms / Accommodation** — daftar tipe kamar, fasilitas kamar, galeri foto per tipe
- Halaman **Waterpark / Attractions** — daftar wahana, highlight fasilitas air, safety info
- Halaman **Facilities & Amenities** — restoran, kolam renang, spa, area anak, parkir, dsb (bisa digabung dengan salah satu halaman di atas jika konten sedikit)
- Halaman **Promo / Packages** — paket bundling hotel + tiket waterpark, promo musiman
- Halaman **Gallery** — foto/video showcase properti
- Halaman **Contact & Reservation** — form kontak, info reservasi (telepon/WhatsApp/email), integrasi tautan ke OTA/booking engine eksternal jika ada (bukan booking engine internal)
- Navigasi responsif + smooth scroll antar section
- Dark/cinematic theme (mengikuti gaya referensi), disesuaikan warna brand hospitality (biru/toska untuk kesan air, dsb — final palette menyusul dari tim desain)
- SEO dasar (meta tag, OG image, sitemap) + structured data `LodgingBusiness`/`Hotel` (schema.org) untuk hasil pencarian yang lebih kaya
- Unit testing untuk komponen kunci & hooks
- Dockerfile + docker-compose untuk dev & production
- CI-ready (lint, test, build) — opsional pipeline detail menyusul

### 3.2 Out of Scope (Fase 1)
- **Booking engine internal / payment gateway** (reservasi & pembayaran online) — Fase 1 hanya menyediakan CTA/redirect ke OTA (Traveloka, Agoda, dsb.) atau kontak WhatsApp/telepon. Integrasi booking engine penuh dipertimbangkan Fase 2.
- CMS / backend admin panel (dipertimbangkan Fase 2, agar tim marketing bisa update promo & galeri sendiri)
- Multi-language (i18n) — dipertimbangkan Fase 2 (mis. ID/EN untuk turis asing)
- Blog/news engine dinamis dari database — Fase 2
- Autentikasi pengguna / member area
- Sistem cek ketersediaan kamar real-time (availability checker) — Fase 2

---

## 4. Tech Stack

| Kategori | Pilihan |
|---|---|
| Framework | Next.js (versi terbaru, App Router) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion (utama), boleh dikombinasi GSAP untuk efek khusus (parallax/zoom kompleks) |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) atau `react-lenis` |
| Bahasa | TypeScript |
| Testing | Jest + React Testing Library (unit/component), opsional Playwright untuk E2E di fase lanjut |
| Linting/Format | ESLint + Prettier |
| Container | Docker, Docker Compose |
| Package Manager | pnpm (direkomendasikan, lebih cepat & hemat disk) atau npm |
| Font | next/font (self-hosted, untuk performa) |
| Image | next/image (optimasi otomatis) |

---

## 5. Functional Requirements

### 5.1 Homepage — Hero Cinematic Section
- **FR-1**: Hero section full-viewport (100vh) dengan background image/video yang berganti otomatis secara berkala (misal setiap 6–8 detik).
- **FR-2**: Transisi antar background **wajib efek zoom in/out (Ken Burns effect)**, bukan slide horizontal/vertikal. Contoh: gambar aktif melakukan scale dari 1.0 → 1.15 selama durasi tayang, lalu **crossfade (opacity)** ke gambar berikutnya yang mulai dari scale awal.
- **FR-3**: Overlay gradient/dark layer di atas background agar teks tetap terbaca (kontras cukup, sesuai WCAG AA minimal untuk teks besar).
- **FR-4**: Judul/headline hero menggunakan animasi **typewriter** (mengetik karakter demi karakter), dengan opsi looping atau sekali jalan sesuai kebutuhan copywriting.
- **FR-5**: CTA button dengan micro-interaction (hover scale/glow).
- **FR-6**: Indikator scroll (misal ikon panah/mouse) dengan animasi bounce halus mengarahkan user untuk scroll.

### 5.2 Smooth Scroll & Scroll-based Animation
- **FR-7**: Implementasi smooth scroll di seluruh halaman (inertia scrolling).
- **FR-8**: Section-section konten (About, Services, Portfolio, dsb.) muncul dengan animasi **reveal on scroll** (fade-up/scale-in) menggunakan Framer Motion `useInView`/`whileInView`.
- **FR-9**: Opsional: efek parallax ringan pada elemen gambar/section tertentu saat scroll.

### 5.3 Navigasi
- **FR-10**: Navbar sticky/transparan yang berubah style (solid background) saat user scroll melewati hero.
- **FR-11**: Menu responsif (hamburger di mobile) dengan animasi slide/fade saat dibuka-tutup.
- **FR-12**: Smooth scroll-to-section untuk anchor link internal (jika single-page) atau routing antar-page (jika multi-page).

### 5.4 Halaman Konten
- **FR-13**: Halaman About: cerita perusahaan, visi-misi, milestone/timeline dengan animasi reveal.
- **FR-14**: Halaman Rooms/Accommodation: grid/list tipe kamar (nama, ukuran, kapasitas tamu, fasilitas, foto) dengan hover interaction; klik kartu membuka detail/modal.
- **FR-15**: Halaman Waterpark/Attractions: grid wahana & fasilitas air (nama, deskripsi singkat, foto/video, batasan usia/tinggi jika relevan) dengan filter kategori (opsional, mis. "Anak-anak", "Ekstrem", "Keluarga").
- **FR-16**: Halaman Promo/Packages: kartu promo dengan periode berlaku, harga, dan CTA jelas ("Pesan Sekarang" → WhatsApp/OTA/kontak).
- **FR-17**: Halaman Gallery: grid foto/video dengan lightbox saat diklik, dikelompokkan per kategori (Hotel, Waterpark, Event).
- **FR-18**: Halaman Contact & Reservation: form (nama, email, nomor telepon, tanggal rencana kunjungan, pesan) dengan validasi client-side, feedback sukses/gagal, serta tombol cepat WhatsApp/telepon dan peta lokasi (embed Google Maps).

### 5.5 Non-Functional-ish tapi Fungsional
- **FR-19**: Semua gambar besar menggunakan lazy-loading & format optimized (next/image, WebP/AVIF) — penting karena konten hotel/waterpark sangat foto-intensif.
- **FR-20**: Responsive di breakpoint mobile, tablet, desktop (mayoritas calon tamu browsing dari mobile saat mencari tempat liburan).

---

## 6. Non-Functional Requirements

| Kategori | Requirement |
|---|---|
| Performa | Lighthouse Performance score ≥ 85 (mobile), FCP < 2.5s |
| SEO | Meta title/description dinamis per halaman, Open Graph, sitemap.xml, robots.txt, structured data `Hotel`/`LodgingBusiness` (schema.org) untuk mendukung local SEO & Google Maps/Search |
| Aksesibilitas | Kontras teks memadai, alt text pada gambar, navigasi keyboard dasar |
| Kompatibilitas Browser | Chrome, Firefox, Safari, Edge (2 versi terakhir) |
| Keamanan | Environment variable untuk data sensitif, tidak ada secret ter-hardcode, HTTPS di production |
| Maintainability | Struktur folder konsisten, komponen reusable, dokumentasi README |

---

## 7. Arsitektur & Struktur Folder

Prinsip: pemisahan jelas antara **UI Components**, **Hooks (state/logic)**, dan **Page (composition)**.

```
company-profile/
├── docker/
│   ├── Dockerfile
│   └── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.prod.yml
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── rooms/                  # Accommodation
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # detail tipe kamar
│   │   ├── waterpark/               # Attractions
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # detail wahana (opsional)
│   │   ├── promo/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                    # Button, Input, Card, dsb (atomic/reusable)
│   │   ├── layout/                # Navbar, Footer, PageWrapper
│   │   └── sections/               # HeroSection, AboutSection, ServiceGrid, dst
│   │       ├── hero/
│   │       │   ├── HeroSection.tsx
│   │       │   ├── HeroBackground.tsx     # logic zoom-in/out crossfade
│   │       │   └── TypewriterText.tsx
│   │       ├── about/
│   │       ├── rooms/                      # RoomCard, RoomGrid, RoomDetailModal
│   │       ├── waterpark/                   # AttractionCard, AttractionGrid
│   │       ├── promo/                       # PromoCard, PromoGrid
│   │       ├── gallery/                     # GalleryGrid, Lightbox
│   │       └── contact/
│   ├── hooks/                      # State management & logic terpisah dari UI
│   │   ├── useBackgroundSlider.ts   # kontrol index gambar & timer
│   │   ├── useTypewriter.ts
│   │   ├── useSmoothScroll.ts
│   │   ├── useScrollReveal.ts
│   │   ├── useLightbox.ts           # state gallery lightbox
│   │   └── useContactForm.ts
│   ├── lib/                        # utils, constants, api client
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── data/                       # konten statis (rooms.ts, attractions.ts, promos.ts, dst)
│   ├── types/                      # TypeScript interfaces/types
│   └── styles/
│       └── globals.css
├── __tests__/                       # unit test (mirror struktur src)
│   ├── components/
│   └── hooks/
├── .env.example
├── .env.development
├── .env.production
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.ts
└── package.json
```

**Prinsip pemisahan:**
- **`components/`** → murni presentational (menerima props, minim logic).
- **`hooks/`** → seluruh state management, side-effect, dan logic animasi/interaksi (mis. `useBackgroundSlider` mengatur index gambar aktif + timer zoom, `useTypewriter` mengatur karakter yang tampil).
- **`app/*/page.tsx`** → hanya melakukan composition (merangkai section-section & memanggil hook bila perlu), tanpa logic kompleks langsung di file page.

---

## 8. Spesifikasi Animasi (Detail Teknis)

### 8.1 Background Zoom In/Out (Ken Burns Effect)
- Gunakan Framer Motion `motion.div` dengan `animate={{ scale: [1, 1.15] }}` selama durasi tayang (misal 7 detik), `ease: 'linear'` atau `easeOut`.
- Saat berganti gambar: gambar lama fade-out (`opacity: 1 → 0`), gambar baru fade-in bersamaan (`opacity: 0 → 1`) sambil mulai scale dari 1 lagi — sehingga terasa "zoom" bukan "slide".
- Preload gambar berikutnya agar tidak ada flicker/lag saat transisi.
- Disarankan maksimal 4–6 gambar hero untuk menjaga performa loading.

### 8.2 Typewriter Effect
- Custom hook `useTypewriter(text, speed)` mengembalikan substring yang bertambah per interval.
- Tambahkan cursor berkedip (CSS `blink` animation) di akhir teks.
- Pertimbangkan `prefers-reduced-motion` — jika user mengaktifkan reduce motion di OS, tampilkan teks langsung tanpa animasi ketik (aksesibilitas).

### 8.3 Smooth Scroll
- Gunakan library `lenis` untuk inertia scroll, diinisialisasi di root layout via custom hook `useSmoothScroll`.
- Sinkronkan dengan Framer Motion `useScroll`/`useTransform` bila ada efek parallax.

### 8.4 Reveal on Scroll
- Section-section non-hero menggunakan `whileInView` dengan `viewport={{ once: true, amount: 0.2 }}` agar animasi hanya trigger sekali dan tidak berat.

---

## 9. Testing Strategy

| Jenis | Tools | Cakupan |
|---|---|---|
| Unit Test - Hooks | Jest + React Testing Library (`renderHook`) | `useTypewriter`, `useBackgroundSlider`, `useContactForm` (validasi logic) |
| Unit/Component Test | Jest + RTL | Render komponen UI penting (Navbar, HeroSection, ContactForm) — memastikan render benar & interaksi dasar (klik, submit) berjalan |
| Snapshot (opsional) | Jest | Komponen UI stabil (Button, Card) |
| Lint & Type Check | ESLint, `tsc --noEmit` | Bagian dari pipeline sebelum build |
| E2E (Fase lanjut) | Playwright | Flow kritikal: submit form contact, navigasi antar halaman |

**Target coverage awal**: minimal 70% untuk folder `hooks/` dan komponen kritikal (bukan target kaku untuk seluruh UI dekoratif).

---

## 10. Docker & Environment Setup

### 10.1 Environment
- `.env.development` → variabel untuk local dev (mis. `NEXT_PUBLIC_SITE_URL=http://localhost:3000`)
- `.env.production` → variabel production (domain asli, analytics ID, dsb.)
- `.env.example` → template tanpa nilai sensitif, di-commit ke repo sebagai acuan tim

### 10.2 Docker
- **Dockerfile.dev**: image untuk development, menjalankan `next dev` dengan volume mount agar hot-reload berfungsi.
- **Dockerfile** (production): multi-stage build —
  1. Stage `deps`: install dependencies
  2. Stage `builder`: build Next.js (`next build`, output standalone)
  3. Stage `runner`: image minimal (node:alpine) hanya berisi hasil build `standalone` untuk image sekecil mungkin
- **docker-compose.yml**: service dev (port 3000, volume mount source code)
- **docker-compose.prod.yml**: service production (image hasil build, tanpa volume mount source, restart policy `unless-stopped`)

### 10.3 Next.js Config untuk Docker
- `next.config.ts` menggunakan `output: 'standalone'` agar image production ringan.

---

## 11. Alur Kerja Development (Ringkas)

1. Setup project (Next.js + TS + Tailwind + Framer Motion + Lenis)
2. Setup struktur folder sesuai section 7
3. Bangun komponen UI dasar (design system kecil: Button, Container, Typography)
4. Implementasi Hero (background zoom/crossfade + typewriter) — bagian paling kompleks, dikerjakan lebih awal untuk validasi feel/animasi
5. Implementasi Navbar + smooth scroll
6. Bangun halaman About, Services, Portfolio, Contact
7. Tulis unit test paralel dengan development (hooks dahulu, lalu komponen kunci)
8. Setup Docker (dev dahulu, lalu production)
9. Optimasi performa (image, font, code-splitting) & audit Lighthouse
10. QA lintas browser/device, aksesibilitas check
11. Deployment ke staging → review → production

---

## 12. Metrik Keberhasilan (Fase 1)

- Website live & dapat diakses di production melalui Docker deployment.
- Lighthouse Performance ≥ 85 (mobile), Accessibility ≥ 90.
- Semua unit test hooks & komponen kunci lulus (CI green).
- Zero critical bug pada flow utama (navigasi, form contact) saat UAT.
- Feedback stakeholder: pengalaman visual dirasakan "premium/cinematic" sesuai referensi.

---

## 13. Risiko & Asumsi

| Risiko | Mitigasi |
|---|---|
| Animasi berat memperlambat performa mobile | Batasi jumlah/ukuran gambar hero, gunakan `prefers-reduced-motion`, lazy load section di luar viewport |
| Kompleksitas efek zoom+crossfade sinkron | Prototyping awal khusus untuk `HeroBackground` sebelum lanjut ke fitur lain |
| Scope creep (fitur CMS/i18n masuk tanpa rencana) | Tegaskan out-of-scope Fase 1 di dokumen ini, dorong ke Fase 2 |
| Asumsi: konten (teks, gambar, video) disediakan oleh tim marketing | Perlu konfirmasi timeline pengiriman aset agar tidak menghambat development |

---

## 14. Lampiran — Contoh Interface Hook Utama (Referensi Kontrak, bukan implementasi final)

```ts
// useBackgroundSlider.ts
interface UseBackgroundSliderOptions {
  images: string[];
  interval?: number; // default 7000ms
}
interface UseBackgroundSliderResult {
  currentIndex: number;
  currentImage: string;
}

// useTypewriter.ts
interface UseTypewriterOptions {
  text: string;
  speed?: number; // ms per karakter
  loop?: boolean;
}
interface UseTypewriterResult {
  displayedText: string;
  isDone: boolean;
}
```

---

*Dokumen ini adalah acuan awal (Fase 1). Detail desain visual (warna, font, copywriting) akan dilengkapi melalui asset dari tim desain/marketing sebelum development section per section dimulai.*