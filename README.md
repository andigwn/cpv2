# Qubu Resort — Company Profile Website (Hotel, Convention & Recreation)

Website **company profile** bergaya sinematik dengan **light theme** untuk grup hospitality
(hotel resort & waterpark), dibangun mengikuti `prd.md`: hero full-viewport dengan **rotating
background** yang sangat halus, **headline typewriter**, background beranimasi di **setiap
section**, carousel highlight, newswire, portfolio, karir, dan kontak.

Dibangun dengan **Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Framer Motion +
Lenis + Zustand + lucide-react**.

---

## 1. Menjalankan project

```bash
npm install          # install dependency
npm run dev          # development server → http://localhost:3000
npm run build        # production build
npm run start        # jalankan hasil build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier
```

Environment:

| File              | Variabel               | Keterangan                                     |
| ----------------- | ---------------------- | ---------------------------------------------- |
| `.env.local`      | `NEXT_PUBLIC_SITE_URL` | dipakai untuk canonical URL, sitemap, OG image |
| `.env.production` | `NEXT_PUBLIC_SITE_URL` | domain produksi (mis. `https://www.quburesort.id`) |

---

## 2. Sitemap

| Route              | Isi                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `/`                | Hero + rotating background + typewriter, Highlights Carousel, About Preview, Services, News, CTA |
| `/about`           | Story, visi-misi, nilai, timeline, tim kepemimpinan, testimoni                                   |
| `/services`        | Katalog 8 layanan dengan filter kategori + paket menginap                                        |
| `/services/[slug]` | Detail layanan: deskripsi, fitur, spesifikasi, galeri, layanan terkait                           |
| `/works`           | Portfolio 12 proyek dengan filter kategori                                                       |
| `/news`            | Newswire: filter kategori + pencarian keyword                                                    |
| `/news/[slug]`     | Detail artikel + sidebar berita terkait                                                          |
| `/careers`         | Tunjangan, 6 lowongan, alur rekrutmen                                                            |
| `/contact`         | 4 kanal kontak, form tervalidasi, peta, kontak departemen, FAQ, kebijakan privasi                |
| `/robots.txt`      | aturan crawler                                                                                   |
| `/sitemap.xml`     | sitemap seluruh route statis + dinamis                                                           |

---

## 3. Struktur folder

```
src/
├── app/                      # routing (App Router)
│   ├── layout.tsx            # metadata global + shell
│   ├── page.tsx              # Home
│   ├── globals.css           # design token Tailwind v4 (light hospitality palette)
│   ├── sitemap.ts robots.ts  # SEO
│   ├── about/ services/ works/ news/ careers/ contact/
│   └── not-found.tsx
├── components/
│   ├── layout/               # Navbar, Footer, PageTransition, Preloader, ScrollProgressBar, SiteShell
│   ├── sections/             # section besar per halaman (home/, about/, services/, news/, works/, careers/, contact/)
│   ├── ui/                   # presentational: Button, Card, Chip, SectionTitle, AnimatedText,
│   │                         # TypewriterText, Icon, SocialIcon
│   └── animations/           # FadeIn, StaggerContainer, ParallaxImage, RotatingBackground,
│                             # SectionBackground, SmoothScrollProvider
├── data/                     # SELURUH konten: meta, highlights, services, works, news, about,
│                             # team, careers, contact, facilities, sectionBackgrounds, credits
├── hooks/                    # useTypewriter, useScrollProgress, useMediaQuery,
│                             # usePrefersReducedMotion, useLockBodyScroll
├── lib/                      # constants.ts, animations.ts, utils.ts
├── store/                    # Zustand: useMenuStore, useLoaderStore, useCarouselStore
└── types/                    # interfaces bersama (Service, NewsPost, Work, TeamMember, …)
```

Konvensi yang dijaga (sesuai `prd.md` §6):

- Komponen di `components/ui` **tidak** menyentuh store — hanya menerima props.
- Semua varian animasi Framer Motion berada di `lib/animations.ts`.
- Seluruh teks/gambar/daftar konten berada di `data/`, tidak ada hardcode di komponen UI.
- Satu file satu tanggung jawab; section besar dipecah menjadi sub-komponen.

---

## 4. Fitur animasi utama

### 4.1 Rotating background hero (dual-layer crossfade, alternating zoom)

`components/animations/RotatingBackground.tsx`

- 2 layer bertumpuk dengan `AnimatePresence mode="sync"` → foto baru fade-in **sambil** foto lama
  fade-out, sehingga tidak ada jeda/flash.
- Durasi crossfade **2 detik** dengan easing `[0.43, 0.13, 0.23, 0.96]` (bukan linear/default).
- **Zoom bergantian**: index genap `scale 1 → 1.08` (zoom in), index ganjil `scale 1.08 → 1`
  (zoom out), durasi 7 detik dengan easing linear agar mengalir.
- Interval ganti foto **7 detik**; dua foto berikutnya di-preload via `new window.Image()`.
- Semua layer `absolute inset-0` di container tinggi tetap → **nol CLS**; overlay gradient berada
  di atas kedua layer sehingga kontras headline tidak berkedip.

### 4.2 Typewriter headline (Home)

`hooks/useTypewriter.ts` + `components/ui/TypewriterText.tsx`

- `useTypewriter(text, { speed })` → `{ displayedText, isDone }` memakai `setInterval`.
- `useSequentialTypewriter(lines)` mengetik baris berikutnya hanya setelah baris sebelumnya selesai.
- Kursor blok berkedip (Framer Motion `opacity: [1, 0]`) dan tetap berkedip pelan setelah selesai.
- `onComplete` memicu fade-up subheadline & CTA (staggered, bukan bersamaan).
- Tombol **"Putar ulang animasi teks"** tersedia di hero untuk memverifikasi efeknya.

### 4.3 Background beranimasi di setiap section

`components/animations/SectionBackground.tsx` + `data/sectionBackgrounds.ts`

- `type: "image-loop"` → foto dengan **slow pan** (`x: 0% → -3% → 0%`, 20 s) atau **slow zoom**
  (`scale: 1 → 1.06 → 1`, 12 s), `repeat: Infinity`, transform-only (GPU, tanpa reflow).
- `type: "video"` → `<video muted autoPlay loop playsInline poster>` yang **baru di-attach saat
  section mendekati viewport** (`useInView` + `margin: 200px`), dengan poster sebagai placeholder.
- Overlay tipis (`bg-white/45` atau gradient putih) menjaga kontras teks (WCAG AA).
- `prefers-reduced-motion: reduce` → animasi dimatikan, video tidak diputar (poster statis),
  typewriter langsung menampilkan teks penuh, Lenis dinonaktifkan.

> **Mengaktifkan background video:** taruh `mp4/webm` (idealnya < 5 MB, 1280×720) di
> `public/videos/`, lalu ubah entri terkait di `src/data/sectionBackgrounds.ts` menjadi
> `{ type: "video", src: "/videos/pool-loop.mp4", poster: "/images/hero-pool-daylight.jpg" }`.
> Komponennya sudah siap — tidak ada perubahan kode lain yang diperlukan.

### 4.4 Animasi lain

- Navbar hide-on-scroll-down, scroll progress bar, mobile drawer dengan body scroll lock.
- Carousel highlight: auto-slide, crossfade, drag/swipe, chip indikator, progress bar.
- Card hover: image scale, overlay gradient, judul bergeser, ikon muncul.
- Page transition via `AnimatePresence` per pathname, preloader intro dengan counter.
- Smooth scroll global dengan Lenis (lerp 0.09) + parallax pada hero dan gambar section.

---

## 5. Aset gambar & video (placeholder)

Semua foto di `public/images` adalah **placeholder** (Unsplash License / Wikimedia Commons),
sudah diverifikasi **terang/cerah** (skor luminance tinggi, rasio pixel gelap rendah) agar cocok
dengan light theme hospitality.

- Kredit & lisensi: `src/data/credits.ts`.
- **Ganti dengan foto properti asli sebelum launch** — cukup timpa file di `public/images`
  (nama file sama) atau ubah path di `src/data/*.ts`.
- Skrip pengumpulan/verifikasi aset (dev-only, tidak ikut bundel):
  - `node _tools/fetch-images.mjs` — unduh ulang placeholder dari Unsplash CDN.
  - `node _tools/unsplash-harvest.mjs` + `_tools/unsplash-review.mjs` — kumpulkan & tinjau kandidat.
  - `node _tools/promote-images.mjs` — crop 16:9 1600×900 dari kandidat terpilih.
  - `node _tools/commons-candidates.mjs` — kandidat dari Wikimedia Commons.
  - `node _tools/verify-promoted.mjs` — contact sheet untuk verifikasi visual akhir.
  - `node _tools/contact-sheet.mjs` — contact sheet untuk `public/images` apa pun.

---

## 6. Konfigurasi & optimasi produksi

- `next.config.ts`: `images.remotePatterns` (Unsplash/picsum/Wikimedia), format AVIF+WebP,
  `deviceSizes` untuk hero full-viewport, `optimizePackageImports` untuk `lucide-react`.
- Gambar hero memakai `priority`; gambar bawah fold memakai `loading="lazy"` + `next/image` `fill`.
- Semua route statis di-*prerender*; detail `[slug]` memakai `generateStaticParams`.
- `robots.txt` dan `sitemap.xml` dibuat via `app/robots.ts` dan `app/sitemap.ts`.
- Structured data JSON-LD (`Resort`, `ItemList` lowongan) untuk SEO.
- Font di-*self host* (`@fontsource-variable/archivo` + `inter`) → nol request eksternal,
  nol layout shift. Bila ingin memakai `next/font/google`, ganti import di `globals.css`.

---

## 7. Hasil verifikasi

```
✓ npm run lint        (eslint)        0 masalah
✓ npm run typecheck   (tsc --noEmit)  tanpa error
✓ npm run build       (next build)    26 route berhasil di-prerender
✓ node _tools/smoke-test.mjs          semua route + aset placeholder HTTP 200
```

`_tools/smoke-test.mjs` menjalankan server produksi lalu memeriksa setiap route
(termasuk `robots.txt`, `sitemap.xml`, halaman 404, dan foto hero) benar-benar
mengembalikan konten yang diharapkan:

```bash
npm run build
npm run start -- -p 3111        # di terminal lain
node _tools/smoke-test.mjs http://localhost:3111
```

### Catatan lingkungan

- `.npmrc` berisi `ignore-scripts=true` karena proses `npm install` di lingkungan ini
  tidak mengizinkan spawn proses. Di mesin developer biasa Anda bisa menghapus baris
  tersebut tanpa memengaruhi project.
- `next dev` / `next build` memerlukan izin spawn proses. Pada mesin normal keduanya
  berjalan seperti biasa; bila dijalankan di dalam sandbox ketat, jalankan dengan izin
  proses penuh.

---

## 8. Deploy dengan Docker

Repositori ini sudah menyertakan `Dockerfile` (multi-stage, `output: "standalone"`, user non-root)
dan `docker-compose.yml` untuk build produksi.

### 8.1 Build & jalankan dengan Docker Compose

```bash
# NEXT_PUBLIC_SITE_URL diambil dari .env.production lalu di-inline saat build
docker compose --env-file .env.production up -d --build

docker compose ps            # status + healthcheck
docker compose logs -f web   # log server
docker compose down          # hentikan & hapus container
```

Situs tersedia di `http://localhost:3000`. Ubah port host lewat `APP_PORT`, mis.
`APP_PORT=8080 docker compose --env-file .env.production up -d --build`.

### 8.2 Build image secara manual

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.quburesort.id \
  -t qubu-resort-company-profile:1.0.0 .

docker run --rm -p 3000:3000 --name qubu-resort qubu-resort-company-profile:1.0.0
```

### 8.3 Variabel yang bisa diatur

| Variabel               | Default                        | Dipakai saat | Keterangan                                       |
| ---------------------- | ------------------------------ | ------------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000`         | build        | canonical URL, `sitemap.xml`, `robots.txt`, OG  |
| `APP_PORT`             | `3000`                         | run          | port host yang dipublikasikan                    |
| `IMAGE_NAME`           | `qubu-resort-company-profile`       | run          | nama image                                       |
| `IMAGE_TAG`            | `latest`                       | run          | tag image                                        |

> **Penting:** `NEXT_PUBLIC_*` di-inline ke bundle saat `next build`. Mengubah nilainya
> **setelah** image dibuat tidak berpengaruh — build ulang image (`--build`) agar canonical
> URL, sitemap, dan Open Graph memakai domain baru.

### 8.4 Alur deploy ke server produksi

```bash
# 1) build & push dari mesin dev / CI
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://www.quburesort.id \
  -t registry.example.com/qubu-resort:1.0.0 .
docker push registry.example.com/qubu-resort:1.0.0

# 2) tarik & jalankan di server
docker run -d --restart unless-stopped -p 3000:3000 \
  --name qubu-resort registry.example.com/qubu-resort:1.0.0
```

Letakkan reverse proxy (Nginx / Caddy / Traefik) di depan container untuk TLS dan domain,
lalu arahkan ke `127.0.0.1:3000`.

### 8.5 Catatan image

- Base `node:24-alpine` + `libc6-compat`; runtime image hanya berisi hasil build *standalone*.
- Berjalan sebagai user non-root `nextjs` (uid 1001).
- `HEALTHCHECK` melakukan `GET /robots.txt` (halaman prerender paling ringan).
- `.dockerignore` mengecualikan `node_modules`, `.next`, `_tools/`, dan `.env*` sehingga build
  context tetap kecil dan build selalu bersih (tidak memakai artefak dari host).
- `.npmrc` (`ignore-scripts=true`) sengaja **tidak** ikut ke build context — pengaturan itu hanya
  untuk sandbox lokal.
- `next.config.ts` memakai `output: "standalone"` **hanya** saat `DOCKER_BUILD=1`, jadi
  `npm run dev` / `npm run build` / `npm run start` di mesin lokal tidak berubah.

---

## 9. Optimasi gambar & video

### 9.1 Pipeline yang sudah aktif

Semua foto dirender lewat `next/image` + `sharp`, jadi browser **tidak pernah** menerima JPEG asli di
`public/images`. Server mengubahnya sesuai permintaan ke AVIF (fallback WebP) pada lebar yang benar-benar
dipakai layout, lalu menyimpannya di cache.

Contoh nyata untuk `hero-resort-pool.jpg` (sumber 1600x900):

| Lebar diminta | Yang diterima browser |
| ------------- | --------------------- |
| 640 px        | 20 KB (AVIF)          |
| 1080 px       | 49 KB (AVIF)          |
| 1920 px       | 94 KB (AVIF)          |

Artinya: **mengganti ekstensi file sumber (.jpg ke .webp/.avif) hampir tidak berpengaruh ke kecepatan
load pengunjung.** Yang menentukan adalah `sizes` yang tepat, `priority` pada gambar LCP, dan cache.

### 9.2 Ukuran & format sumber

Target sumber: JPEG 1600x900 dan sebaiknya di bawah 200 KB per file.

```bash
node _tools/audit-images.mjs               # laporan ukuran + dimensi setiap gambar
node _tools/optimize-images.mjs            # simulasi, tidak menulis apa pun
node _tools/optimize-images.mjs --write    # kompres in-place, backup ke _tools/originals/
```

Hasil yang sudah diterapkan: 41 foto **14,43 MB menjadi 9,14 MB (-37%)** memakai mozjpeg kualitas 78,
progressive, dan chroma 4:2:0. Nama file tidak berubah, jadi tidak ada kode yang perlu disesuaikan.
Jalankan `--write` setiap kali mengganti foto.

### 9.3 Kualitas gambar (images.qualities)

Next 16 mewajibkan allowlist kualitas dan **menolak** nilai yang tidak terdaftar: URL gambar yang
membawa kualitas tersebut dijawab HTTP 400 sehingga gambarnya tidak muncul.

`next.config.ts` mendaftarkan dua tingkat yang dipakai sengaja:

| Nilai | Dipakai untuk | Alasan |
| ----- | ------------- | ------ |
| 75    | Fotografi dan hero (gambar LCP) | Kualitas standar, mata masih melihat detail |
| 70    | Background section dekoratif | Selalu berada di bawah overlay putih 85-95%, jadi detail tidak terlihat |

Menurunkan hero dari 82 ke 75 menghemat sekitar 15% byte, dan background dari 80 ke 70 sekitar 25%.
Bila menambah gambar dengan `quality` baru, daftarkan dulu di `qualities`.

### 9.4 Cache & CDN

`next.config.ts` memasang header cache untuk berkas di `/public` (`/images/*` dan `/videos/*`):
`public, max-age=604800, stale-while-revalidate=2592000` (fresh 7 hari, revalidasi latar 30 hari).
Tanpa ini Next mengirim `max-age=0` sehingga browser selalu melakukan revalidasi.

Khusus `/_next/image`, hal ini **tidak bisa** diatur dari `next.config.ts`: image optimizer menulis
`Cache-Control: public, max-age=0, must-revalidate` setelah header config diterapkan (sudah diuji pada
container produksi). Akibatnya browser selalu revalidasi dan CDN pun tidak menyimpannya. Cache gambar
hasil optimasi karena itu **harus** diatur di edge.

Resep Cloudflare (free plan):

1. Pasang Cloudflare sebagai proxy di depan container.
2. Buat cache rule dengan path `/_next/image*` OR `/images/*` OR `/videos/*` OR `/_next/static/*`,
   lalu set **Edge TTL: Ignore cache-control, 1 year** dan **Browser TTL: 1 week**.
3. Biarkan origin mengirim `Vary: Accept` (sudah otomatis dari Next) agar AVIF dan WebP tidak
   tertukar di cache CDN.

Resep Nginx bila proxy dijalankan sendiri:

```nginx
location /_next/image {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_hide_header Cache-Control;
    add_header Cache-Control "public, max-age=604800, stale-while-revalidate=2592000" always;
}
```

### 9.5 Perlukah menyimpan gambar di layanan cloud gratis?

Jawaban singkat: **tidak perlu.** Alasannya:

- `next/image` sudah menghasilkan AVIF/WebP plus cache, jadi tambahan keuntungannya kecil.
- Layanan gratis (ImgBB, Postimages, Cloudinary free, dan sejenisnya) punya batas kuota/bandwidth,
  bisa menghapus berkas, dan beberapa melarang hotlinking sehingga situs klien berisiko rusak.
- Domain eksternal menambah DNS + TLS handshake dan menghilangkan kendali atas cache.
- Bila memang butuh CDN, pakai CDN sungguhan (Cloudflare) di depan origin sendiri sehingga tetap satu domain.

Kalau nanti pindah ke object storage (S3, R2, Supabase Storage), cukup tambahkan hostname-nya ke
`images.remotePatterns` di `next.config.ts` lalu ganti `src` di `src/data/*.ts`. Struktur datanya sudah
siap karena semua path gambar terpusat di folder data, bukan di komponen.

### 9.6 Video

`SectionBackground` sudah mendukung video loop dengan `poster` dan pemasangan malas saat section
mendekati viewport. Aturan praktisnya:

- Durasi 6 sampai 10 detik, 1280x720, target **maksimal 2 MB** per klip.
- Encode H.264 untuk kompatibilitas, tambahan AV1/HEVC bila ingin berkas lebih kecil.
- Jangan jadikan video sebagai elemen first paint; selalu sediakan poster (sudah diterapkan).
- Untuk klip besar, host di layanan video (Cloudflare Stream / Bunny Stream) karena transcoding,
  adaptive bitrate, dan bandwidth ditangani di sana. Simpan MP4 di `/public/videos` hanya untuk klip kecil.

### 9.7 Checklist sebelum launch

- [ ] Ganti foto placeholder, lalu jalankan `node _tools/optimize-images.mjs --write`
- [ ] Jalankan `node _tools/audit-images.mjs` dan pastikan tidak ada berkas di atas 200 KB
- [ ] Pastikan setiap `next/image` punya `sizes` (wajib untuk mode `fill`)
- [ ] Pasang Cloudflare beserta cache rule-nya
- [ ] Uji PageSpeed/Lighthouse pada domain produksi

---

## 10. Keamanan

Ringkasan lengkap ada di [`SECURITY.md`](./SECURITY.md). Poin utamanya:

- **CSRF belum relevan** karena situs sepenuhnya statis: tanpa API, server action, cookie, maupun
  input pengguna yang diproses server. Panduan saat backend ditambahkan ada di `SECURITY.md` bagian 4.
- **XSS / HTML injection**: React meng-escape teks dan atribut. Satu-satunya `dangerouslySetInnerHTML`
  ada di JSON-LD halaman kontak dan karir, dan sekarang lewat `serializeJsonLd()` sehingga teks yang
  memuat `</script>` tidak bisa keluar dari tag.
- **Script asing diblokir**: CSP hanya mengizinkan script same-origin dan inline, sehingga tag script
  dari host luar (jalur paling umum injeksi judi online) tidak akan dieksekusi browser.
- **Pemeriksa otomatis**: `npm run security:check` memindai HTML hasil build dan gagal bila menemukan
  script atau tautan ke host di luar allowlist. Jadikan langkah CI sebelum deploy.
- **Image optimizer**: `remotePatterns` dikosongkan, jadi `/_next/image` tidak bisa dipakai pihak lain
  sebagai proxy untuk membebani server.
- **Pengerasan server**: SSH hanya kunci, firewall, container non-root, port 3000 tidak diekspos,
  Cloudflare WAF, serta kunci registrar/DNS dengan 2FA. Rinciannya di `SECURITY.md` bagian 6.

---

## 11. Ritme section & animasi gambar

Setiap halaman dibangun dari dua jenis band yang bergantian di atas **satu kanvas broken-white**
(`--color-sand-100`). Tidak ada divider antar-section: tidak ada `border-t`, tidak ada pergantian warna
keras, dan band konten tidak punya background sendiri.

```
PageHero / Hero  ->  ContentBand  ->  ImageBand  ->  ContentBand  ->  ImageBand  ->  ...
```

| Komponen | Peran |
| --- | --- |
| `components/sections/ImageBand.tsx` | Foto full-viewport yang **di-pin** (`sticky top-0 h-svh`). Diam saat konten naik menutupinya, lalu menutupi konten berikutnya. Zoom loop lambat agar tidak kaku. Props: `image`, `caption`, `fade`, `align`, `priority`. |
| `components/sections/ContentBand.tsx` | Sheet opak yang **selalu di atas gambar** (`z-10`, tidak di-pin), jadi konten tidak pernah terpotong foto. Foto berikutnya muncul dari bawah setelah sheet bergeser. Prop `hold` memberi sheet satu layar penuh sebelum foto berikutnya mendekat. Isi di-zoom (0,94 -> 1). Props: `spacing`, `width`, `hold`, `id`. |
| `components/sections/PageHero.tsx` | Band pembuka halaman dalam: foto + judul halaman. |
| `components/ui/InfoCard.tsx` | Kartu untuk semua konten daftar: nilai, benefit, FAQ, kanal kontak, fitur, spesifikasi. Props: `title`, `body`, `eyebrow`, `icon`, `footer`, `href`, `titleClassName`. |
| `components/ui/AnimatedText.tsx` | Reveal teks kata-per-kata. Sudah dipakai otomatis oleh `SectionTitle`, jadi setiap judul band ikut beranimasi. |

Cara kerjanya: setiap `ImageBand` memakai `position: sticky` dengan `top: 0` pada containing block yang
sama (seluruh halaman). Akibatnya:

- foto tetap diam sementara `ContentBand` berikutnya naik menutupinya;
- `ImageBand` berikutnya naik menutupi foto sebelumnya lalu ikut ter-pin di tempatnya — itulah momen
  background berganti;
- saat di-scroll ke atas, urutannya berbalik dengan sendirinya.

Syarat teknis: jangan membungkus konten dengan ancestor ber-`transform`, dan jangan menaruh
`overflow: hidden` di antara band dan root. Lenis dipasang dengan `root` (native scroll) sehingga
`sticky` tetap bekerja.

Aturan saat menambah konten baru:

1. **Jangan** menambahkan `border-t`, `border-b`, `divide-y`, atau `SectionBackground` di dalam band.
   Ritme berasal dari sheet yang naik menutupi foto, bukan dari garis.
2. Selalu selingi `ImageBand` di antara dua `ContentBand`. Dua sheet bersebelahan akan memunculkan
   garis sambungan karena masing-masing punya sudut membulat dan shadow atas.
3. Jaga konten tetap ringkas: satu eyebrow, satu judul pendek, maksimal satu paragraf pendek, dan
   maksimal 4-6 item per band. Uraian panjang hanya di halaman detail.
4. Footer sengaja opak (`bg-sand-100`) karena ada foto ter-pin di belakang seluruh halaman.
5. Setiap band konten minimal setinggi satu layar (`min-h-svh` sudah diatur di `ContentBand`), dan
   ikut ter-pin dari breakpoint `lg`. Di bawah `lg` band konten mengalir normal: grid kartu menjadi
   satu kolom yang lebih tinggi dari layar, dan mem-pin-nya akan menyembunyikan konten di balik foto
   berikutnya. Jaga konten tetap cukup pendek agar muat satu layar di desktop.
6. Peralihan gambar dan konten memakai gradasi dua arah dari `ContentBand` (`-top-*` dan `-bottom-*`).
   Jangan menambah garis atau bayangan di tepi band — gradasi itu yang menyatukannya.
7. Konten yang berupa daftar wajib memakai `InfoCard` di dalam `StaggerContainer`, jangan teks polos
   berderet. Untuk sub-judul di bawah `SectionTitle`, pakai `AnimatedText`.

`components/sections/home/HighlightCarousel.tsx` sudah tidak dipakai di halaman mana pun (digantikan
oleh ImageBand). Filenya sengaja dibiarkan utuh bila nanti ingin dipakai kembali.

---

## 12. Yang perlu diganti sebelum go-live

1. Foto: `public/images/*` → fotografi asli klien (ikuti nama file yang ada), lalu jalankan
   `node _tools/optimize-images.mjs --write`.
2. Identitas: nama brand, alamat, telepon, email di `src/lib/constants.ts`.
3. Konten: layanan, proyek, berita, tim, lowongan di `src/data/*.ts`.
4. Foto kepala tim asli → tambahkan `image` pada entri di `src/data/team.ts`
   (sekarang memakai monogram bermerek sebagai fallback).
5. Video loop section → `public/videos/`, lalu ubah `src/data/sectionBackgrounds.ts`.
6. Integrasi form kontak ke CRM/email — lihat
   `src/components/sections/contact/ContactPageContent.tsx` (saat ini konfirmasi sisi klien).
7. `NEXT_PUBLIC_SITE_URL` pada `.env.production` → domain final.
8. `src/data/credits.ts` → perbarui kredit setelah foto diganti.
9. Logo: sumber resolusi tinggi disimpan di `_tools/logo-source.png` (tidak ikut ke image Docker).
   Bila logo diperbarui, turunkan ulang asetnya dengan `node _tools/make-logo.mjs`.
10. Keamanan: jalankan `npm audit` dan `npm run security:check`, lalu ikuti checklist di
    `SECURITY.md` bagian 10 (security header, firewall, SSH, Cloudflare, backup).
