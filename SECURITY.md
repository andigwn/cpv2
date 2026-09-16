# Keamanan

Dokumen ini merangkum permukaan serangan situs, kontrol yang sudah aktif, dan langkah yang perlu
diambil sebelum dan sesudah naik ke produksi.

## 1. Permukaan serangan saat ini

Situs ini adalah **company profile statis**: seluruh route di-prerender saat build, tanpa database,
tanpa autentikasi, dan tanpa API.

| Vektor | Status |
| ------ | ------ |
| API route / route handler | Tidak ada |
| Server Action | Tidak ada |
| Cookie / sesi | Tidak ada |
| Query atau body yang diproses server | Tidak ada |
| Input pengguna yang disimpan | Tidak ada |
| Form kontak | Konfirmasi sisi klien saja, belum mengirim ke mana pun |

Konsekuensinya: **CSRF belum berlaku** pada kondisi sekarang, karena tidak ada aksi yang mengubah
state dan tidak ada cookie yang dikirim otomatis. Bagian 4 menjelaskan cara menjaganya saat fitur
dinamis ditambahkan.

## 2. Kontrol yang sudah aktif

- **Escaping JSON-LD** (`src/lib/json-ld.ts`). Halaman `contact` dan `careers` menyisipkan structured
  data ke dalam tag script. Sebelumnya memakai `JSON.stringify` mentah, sehingga teks yang memuat
  `</script>` bisa menutup tag lebih awal dan sisanya dieksekusi sebagai HTML. Sekarang `<`, `>`, `&`,
  dan pemisah baris JavaScript di-escape sebagai unicode JSON.
- **Security header** (`next.config.ts`, hanya di produksi): CSP, HSTS, `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
- **Tanpa `remotePatterns`.** `/_next/image` hanya melayani gambar dari domain sendiri, sehingga
  optimizer tidak bisa dipakai sebagai proxy untuk membebani server.
- **Allowlist kualitas gambar** sehingga jumlah varian gambar yang bisa dibuat terbatas.
- **`poweredByHeader: false`** agar versi framework tidak diumbar di setiap respons.
- **Tidak ada script pihak ketiga.** Font di-self-host, tanpa analytics, satu-satunya embed adalah
  peta Google di halaman kontak.
- **Container non-root** (uid 1001), tanpa rahasia di dalam image, `.env*` tidak ikut build context.
- **0 vulnerability** pada `npm audit` (production maupun dev) saat dokumen ini dibuat.
- Semua tautan `target="_blank"` memakai `rel="noreferrer noopener"`.
- **Pemeriksa otomatis**: `node _tools/check-external-assets.mjs` memindai HTML hasil build dan gagal
  bila menemukan script atau tautan ke host di luar allowlist.

## 3. XSS dan HTML injection

React melakukan escaping otomatis untuk nilai yang dirender sebagai teks maupun atribut. Karena itu
risiko utama bukan di komponen, melainkan pada tiga hal:

1. **`dangerouslySetInnerHTML`.** Hanya untuk JSON-LD, dan wajib lewat `serializeJsonLd()`. Jangan
   pernah memakainya untuk konten dari CMS, query string, atau input pengguna.
2. **URL yang berasal dari data.** Pastikan `href` bukan skema berbahaya (`javascript:`, `data:`).
   Saat ini semua tautan eksternal statis di `src/data`. Bila nanti dikelola CMS, saring skema di
   sisi server sebelum disimpan.
3. **Script eksternal.** Ini jalur paling umum penyelipan script judi. CSP saat ini hanya
   mengizinkan script same-origin dan inline, sehingga tag script dari host luar akan diblokir
   browser sekalipun berhasil disuntikkan ke HTML.

## 4. CSRF, saat fitur dinamis ditambahkan

CSRF baru relevan begitu ada aksi yang mengubah state, misalnya form kontak yang dikirim ke backend,
panel admin, atau integrasi CRM. Saat itu dilakukan:

- Simpan sesi di cookie dengan `SameSite=Lax` (atau `Strict` untuk panel admin), `HttpOnly`, `Secure`.
- Untuk aksi non-GET, verifikasi header `Origin` (atau `Referer`) terhadap domain sendiri.
- Tambahkan token anti-CSRF (double-submit cookie) untuk form yang mengubah data.
- Server Action Next.js sudah memverifikasi Origin terhadap Host secara bawaan. Jangan melewatinya
  dengan menulis route handler sendiri tanpa pemeriksaan yang setara.
- Batasi laju endpoint form dan login untuk mencegah spam dan brute force.
- Jangan memproses `POST` tanpa proteksi hanya karena endpoint tampak tidak terduga.

## 5. Mencegah injeksi konten judi dan SEO spam

Urutan jalur masuk yang paling realistis untuk situs seperti ini:

1. **Server atau akun hosting diambil alih** (password SSH lemah, panel admin terbuka). Ini penyebab
   paling umum kasus judi online. Lihat bagian 6.
2. **Domain atau DNS dibajak.** Aktifkan 2FA di registrar dan kunci transfer domain. Bila DNS jatuh,
   seluruh situs bisa diarahkan ke mana pun.
3. **CMS dengan autentikasi lemah.** Bila nanti ditambahkan, wajib MFA, pembatasan akses admin,
   pembaruan rutin, dan sanitasi konten saat disimpan.
4. **Dependency yang disusupi.** Jalankan `npm audit` berkala dan kunci versi dengan lockfile.
5. **Script pihak ketiga.** Setiap analytics atau embed menambah permukaan. Tambahkan seperlunya,
   lalu perbarui CSP dan allowlist pemeriksa di bagian 2.

Kontrol deteksi:

- Pantau Google Search Console terhadap halaman tak dikenal dan penalti spam.
- Diff `sitemap.xml` secara berkala; halaman baru yang tidak dikenal adalah sinyal kuat.
- Jalankan `node _tools/check-external-assets.mjs` setelah setiap build, idealnya sebagai langkah CI.
- Aktifkan notifikasi Google Safe Browsing untuk peringatan dini bila situs ditandai.

## 6. Pengerasan server produksi

- **SSH**: hanya kunci. Nonaktifkan `PasswordAuthentication` dan login root, lalu pasang `fail2ban`.
- **Firewall**: hanya buka 22, 80, dan 443. Port 3000 tidak boleh terekspos ke internet; container
  cukup diakses lewat `127.0.0.1`.
- **Pembaruan otomatis** untuk patch keamanan sistem operasi.
- **TLS** lewat reverse proxy (Nginx atau Caddy) dengan pembaruan sertifikat otomatis.
- **Cloudflare** di depan origin: WAF managed rules, rate limiting, dan bot fight mode. Ini sekaligus
  memberi proteksi DDoS dan cache gambar (lihat README bagian 9.4).
- **Backup** harian ke lokasi terpisah, dan uji prosedur pemulihannya.
- **Pemantauan** uptime dan log akses; waspadai lonjakan permintaan `/_next/image` yang tidak wajar.

## 7. Docker

- Image berjalan sebagai non-root `nextjs` dan hanya berisi hasil build standalone.
- Jangan memakai `--privileged`, dan hindari mount socket Docker ke dalam container.
- Pin base image ke digest bila ingin build yang sepenuhnya reprodusibel.
- Pindai image secara berkala, misalnya `docker scout cves` atau Trivy.
- `.env*` dan `_tools/` tidak ikut ke build context.

## 8. Rahasia dan supply chain

- Repositori ini tidak menyimpan rahasia. `NEXT_PUBLIC_SITE_URL` bernilai publik dan di-inline saat build.
- Jangan menaruh API key di variabel `NEXT_PUBLIC_*`; nilai itu ikut terkirim ke browser.
- Bila nanti butuh rahasia, berikan sebagai environment variable runtime, bukan build arg.
- Pakai `npm ci` (bukan `npm install`) agar versi sesuai lockfile.

## 9. Respons insiden

Bila situs diduga sudah disusupi:

1. Pasang halaman maintenance agar kerusakan tidak meluas.
2. Ganti seluruh kredensial: SSH, panel hosting, registrar, email, dan token deployment.
3. Periksa riwayat commit serta berkas yang berubah di luar proses rilis.
4. Cari halaman atau script tak dikenal dengan `node _tools/check-external-assets.mjs` dan diff
   `sitemap.xml`.
5. Build ulang image dari sumber bersih lalu deploy ulang; jangan menambal server yang terinfeksi.
6. Ajukan tinjauan ulang di Google Search Console setelah bersih.

## 10. Checklist produksi

- [ ] `npm audit` bersih
- [ ] `node _tools/check-external-assets.mjs` lulus setelah build
- [ ] Security header terverifikasi di domain produksi (CSP, HSTS, X-Frame-Options, nosniff)
- [ ] Port 3000 tidak terbuka ke internet
- [ ] SSH hanya kunci + fail2ban, firewall aktif
- [ ] Registrar dan DNS terkunci dengan 2FA
- [ ] Cloudflare WAF + rate limiting aktif
- [ ] Backup harian dan prosedur pemulihan sudah diuji
