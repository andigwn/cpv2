import type { BusinessUnit, NavItem, UnitOutlet } from "@/types";

/**
 * Business units owned by Qubu Resort.
 *
 * Each entry represents one building; `outlets` lists the business units that
 * operate inside it. This file is the single source of truth for the "Unit
 * Bisnis" navigation dropdown, the /unit-bisnis pages and the sitemap.
 *
 * Copy and photography are still placeholder drafts — replace with the real
 * property details and photos before go-live.
 */
export const businessUnits: BusinessUnit[] = [
  {
    slug: "hotel-q",
    name: "Hotel Q",
    type: "Hotel",
    tagline: "268 kamar, lobby atrium, dan Resto Patio di lantai dasar",
    summary:
      "Bangunan utama kawasan Q dengan kamar garden view dan pool view, kolam dewasa serta kolam anak, dan akses pejalan kaki ke QHall dan Paradis Q.",
    description: [
      "Hotel Q adalah bangunan utama kawasan Q dan pintu masuk bagi sebagian besar tamu. Tersedia 268 kamar dalam lima tipe, mulai dari Deluxe Garden View hingga Executive Suite dengan balkon privat.",
      "Lobby berkonsep atrium menghubungkan resepsionis, lobby lounge, pusat informasi wisata, dan Resto Patio yang melayani sarapan hingga makan malam.",
      "Fasilitas penunjang meliputi kolam dewasa dan kolam anak, pusat kebugaran, ruang serbaguna, serta jalur pejalan kaki beratap menuju QHall dan Paradis Q.",
    ],
    image: {
      src: "/images/hero-hotel-exterior.jpg",
      alt: "Fasad Hotel Q dengan taman tropis di siang hari",
    },
    gallery: [
      { src: "/images/about-lobby.jpg", alt: "Lobi Hotel Q dengan sofa dan tanaman hijau" },
      { src: "/images/work-suite.jpg", alt: "Kamar Hotel Q dengan tempat tidur besar" },
      { src: "/images/hero-pool-daylight.jpg", alt: "Kolam Hotel Q dengan kursi santai" },
    ],
    features: [
      "268 kamar dalam lima tipe",
      "Resto Patio di lantai dasar",
      "Kolam dewasa dan kolam anak",
      "Pusat kebugaran 24 jam",
      "Lobby lounge dan pusat informasi wisata",
      "Jalur pejalan kaki beratap ke QHall dan Paradis Q",
      "Parkir bawah tanah 180 kendaraan",
    ],
    specs: [
      { label: "Jumlah kamar", value: "268 kamar & suite" },
      { label: "Tipe kamar", value: "5 kategori" },
      { label: "Lantai", value: "9 lantai" },
      { label: "Check-in / out", value: "14.00 / 12.00 WITA" },
      { label: "Unit bisnis di dalam", value: "Resto Patio" },
      { label: "Lokasi", value: "Kawasan Q, Tanjung Benoa" },
    ],
    hours: "Resepsionis 24 jam",
    outlets: [
      {
        slug: "resto-patio",
        name: "Resto Patio",
        type: "Restoran",
        tagline: "All-day dining dengan teras taman",
        summary:
          "Restoran utama Hotel Q dengan 240 kursi, live station nusantara, Asia, dan Western, serta teras yang menghadap taman.",
        description: [
          "Resto Patio adalah restoran utama Hotel Q dengan 180 kursi di dalam ruangan dan 60 kursi di teras taman. Dapur buka pukul 06.00 untuk sarapan dan tutup pukul 23.00.",
          "Menu harian disajikan dalam format live station yang menggabungkan masakan nusantara, Asia, dan Western, lengkap dengan menu anak serta opsi bebas gluten.",
          "Pada sore hari teras Patio berubah menjadi area makan santai dengan live acoustic tiga kali seminggu.",
        ],
        image: {
          src: "/images/service-restaurant.jpg",
          alt: "Resto Patio dengan penataan meja dan cahaya alami",
        },
        gallery: [
          { src: "/images/work-restaurant.jpg", alt: "Interior Resto Patio dengan meja kayu" },
          { src: "/images/service-cabana.jpg", alt: "Meja makan privat di area teras Patio" },
          { src: "/images/news-summer-promo.jpg", alt: "Suasana makan siang yang terang" },
        ],
        features: [
          "180 kursi dalam ruangan dan 60 kursi teras",
          "Live station nusantara, Asia, dan Western",
          "Menu anak dan opsi bebas gluten",
          "Live acoustic tiga kali seminggu",
          "In-room dining 24 jam untuk tamu Hotel Q",
        ],
        specs: [
          { label: "Kapasitas", value: "240 kursi" },
          { label: "Jam operasional", value: "06.00 – 23.00 WITA" },
          { label: "Sarapan", value: "Buffet 06.00 – 10.30" },
          { label: "Berada di", value: "Hotel Q, lantai dasar" },
          { label: "Dress code", value: "Smart casual" },
        ],
        hours: "06.00 – 23.00 WITA",
        priceFrom: "Rp 145.000 / orang",
      },
    ],
  },
  {
    slug: "qhall",
    name: "QHall",
    type: "Convention Center",
    tagline: "Ballroom 1.800 m2 bebas pilar dan 8 ruang breakout",
    summary:
      "Pusat konvensi dengan ballroom bebas pilar, pre-function lounge 620 m2, dan tim event teknis bersertifikat.",
    description: [
      "QHall dirancang untuk konferensi, pameran, dan pernikahan berskala besar. Ballroom utamanya seluas 1.800 m2 tanpa pilar dengan tinggi plafon 9 meter dan dapat dibagi menjadi tiga ruang independen.",
      "Delapan ruang breakout berkapasitas 40 sampai 180 orang tersedia untuk sesi paralel, dilengkapi layar LED dan sistem audio terintegrasi.",
      "Tim event QHall menangani perencanaan teknis, katering hingga 2.000 pax, serta koordinasi akomodasi bagi delegasi yang menginap di Hotel Q dan Hotel Qubu Suites.",
    ],
    image: {
      src: "/images/work-convention.jpg",
      alt: "Ballroom QHall yang luas dengan penataan meja",
    },
    gallery: [
      { src: "/images/service-ballroom.jpg", alt: "Ballroom QHall dengan kursi tertata rapi" },
      { src: "/images/news-mice.jpg", alt: "Suasana konferensi di QHall" },
      { src: "/images/about-lobby.jpg", alt: "Pre-function lounge QHall" },
    ],
    features: [
      "Ballroom 1.800 m2 bebas pilar, plafon 9 meter",
      "Dapat dibagi menjadi tiga ruang independen",
      "Delapan ruang breakout (40 – 180 orang)",
      "Pre-function lounge 620 m2",
      "Layar LED, sistem audio, dan rigging terintegrasi",
      "Katering hingga 2.000 pax dengan dapur halal",
      "Dock bongkar-muat khusus pameran",
    ],
    specs: [
      { label: "Ballroom", value: "1.800 m2 (1.500 delegasi)" },
      { label: "Breakout room", value: "8 ruang" },
      { label: "Plafon", value: "9 meter, bebas pilar" },
      { label: "Kapasitas banquet", value: "1.200 pax" },
      { label: "Unit bisnis di dalam", value: "Mahoni" },
      { label: "Lokasi", value: "Kawasan Q, sayap timur" },
    ],
    hours: "Fleksibel sesuai jadwal acara",
    outlets: [
      {
        slug: "mahoni",
        name: "Mahoni",
        type: "Restoran",
        tagline: "Restoran kayu mahoni untuk jamuan dan resepsi",
        summary:
          "Restoran dan venue jamuan berkapasitas 320 kursi dengan interior kayu mahoni, cocok untuk resepsi, gala dinner, dan makan siang delegasi.",
        description: [
          "Mahoni berada di sisi barat QHall dengan interior panel kayu mahoni dan jendela setinggi ruangan yang menghadap taman.",
          "Kapasitas 320 kursi dapat ditata untuk gala dinner, resepsi pernikahan, maupun makan siang delegasi konferensi dengan buffet atau set menu.",
          "Dapur Mahoni berbagi fasilitas dengan dapur katering QHall sehingga dapat melayani hingga 1.200 pax untuk acara besar.",
        ],
        image: {
          src: "/images/work-restaurant.jpg",
          alt: "Interior Restoran Mahoni dengan panel kayu",
        },
        gallery: [
          { src: "/images/service-restaurant.jpg", alt: "Meja jamuan di Restoran Mahoni" },
          { src: "/images/service-sunset-deck.jpg", alt: "Area makan luar Restoran Mahoni" },
          { src: "/images/news-mice.jpg", alt: "Jamuan delegasi di Mahoni" },
        ],
        features: [
          "320 kursi dengan tata letak fleksibel",
          "Interior panel kayu mahoni dan jendela tinggi",
          "Gala dinner, resepsi, dan set menu delegasi",
          "Dapur terhubung dengan katering QHall",
          "Ruang privat 40 kursi untuk jamuan tertutup",
        ],
        specs: [
          { label: "Kapasitas", value: "320 kursi" },
          { label: "Jam operasional", value: "Mengikuti jadwal acara" },
          { label: "Ruang privat", value: "40 kursi" },
          { label: "Berada di", value: "QHall, sayap barat" },
          { label: "Dress code", value: "Formal / sesuai acara" },
        ],
        hours: "Mengikuti jadwal acara",
        priceFrom: "Rp 235.000 / orang",
      },
    ],
  },
  {
    slug: "paradis-q",
    name: "Paradis Q",
    type: "Waterpark",
    tagline: "18 seluncuran, kolam ombak, dan lazy river",
    summary:
      "Waterpark keluarga seluas 3,4 hektar dengan tujuh zona tematik, 24 lifeguard bersertifikat, dan Food Corner di dalam kawasan.",
    description: [
      "Paradis Q adalah waterpark keluarga dengan tujuh zona tematik, mulai dari kolam balita berkedalaman 20 cm hingga menara seluncuran setinggi 22 meter.",
      "Seluruh area memakai sistem filtrasi sirkulasi tertutup dengan pemantauan kualitas air setiap dua jam, serta dijaga 24 lifeguard bersertifikat Bronze Medallion.",
      "Fasilitas penunjang meliputi 320 loker, ruang bilas air hangat, ruang laktasi, dan Food Corner yang melayani pengunjung sepanjang jam operasional.",
    ],
    image: {
      src: "/images/service-waterpark.jpg",
      alt: "Seluncuran Paradis Q dengan percikan air di siang hari",
    },
    gallery: [
      { src: "/images/hero-waterpark-pool.jpg", alt: "Kolam ombak Paradis Q" },
      { src: "/images/work-aquapark.jpg", alt: "Menara seluncuran Paradis Q" },
      { src: "/images/service-waterpark-alt.jpg", alt: "Area bermain air Paradis Q" },
    ],
    features: [
      "18 seluncuran termasuk racer slide dan bowl slide",
      "Kolam ombak 1.100 m2 dengan gelombang terjadwal",
      "Lazy river sepanjang 260 meter",
      "Toddler Lagoon: kolam dangkal berpemanas surya",
      "24 lifeguard bersertifikat internasional",
      "320 loker, ruang bilas air hangat, dan ruang laktasi",
    ],
    specs: [
      { label: "Luas kawasan", value: "3,4 hektar" },
      { label: "Kapasitas harian", value: "4.500 pengunjung" },
      { label: "Jam operasional", value: "09.00 – 18.00 WITA" },
      { label: "Seluncuran tertinggi", value: "22 meter" },
      { label: "Unit bisnis di dalam", value: "Food Corner" },
      { label: "Lokasi", value: "Kawasan Q, sisi utara" },
    ],
    hours: "09.00 – 18.00 WITA",
    outlets: [
      {
        slug: "food-corner",
        name: "Food Corner",
        type: "Food Court",
        tagline: "Delapan tenant kuliner di dalam waterpark",
        summary:
          "Food court dengan delapan tenant bertema nusantara, area makan beratap, dan pilihan menu cepat saji untuk pengunjung waterpark.",
        description: [
          "Food Corner berada di tengah kawasan Paradis Q dengan delapan tenant yang menyajikan masakan nusantara, makanan ringan, dan minuman dingin.",
          "Area makan beratap berkapasitas 600 kursi dirancang agar pengunjung tetap nyaman meski sedang basah setelah bermain air.",
          "Seluruh tenant memakai bahan segar harian dan menyediakan paket combo keluarga serta menu anak.",
        ],
        image: {
          src: "/images/work-beach-club.jpg",
          alt: "Area makan Food Corner dengan kursi dan meja",
        },
        gallery: [
          { src: "/images/service-cabana.jpg", alt: "Meja makan di area beratap Food Corner" },
          { src: "/images/news-summer-promo.jpg", alt: "Pengunjung menikmati makan siang" },
          { src: "/images/service-waterpark-alt.jpg", alt: "Suasana waterpark di sekitar Food Corner" },
        ],
        features: [
          "Delapan tenant kuliner nusantara",
          "Area makan beratap 600 kursi",
          "Paket combo keluarga dan menu anak",
          "Pilihan menu cepat saji dan minuman dingin",
          "Berada di tengah kawasan waterpark",
        ],
        specs: [
          { label: "Jumlah tenant", value: "8 tenant" },
          { label: "Kapasitas", value: "600 kursi" },
          { label: "Jam operasional", value: "09.00 – 18.00 WITA" },
          { label: "Berada di", value: "Paradis Q, area tengah" },
          { label: "Pembayaran", value: "Tunai & non-tunai" },
        ],
        hours: "09.00 – 18.00 WITA",
        priceFrom: "Rp 35.000 / porsi",
      },
    ],
  },
  {
    slug: "qubu-suites",
    name: "Hotel Qubu Suites",
    type: "Hotel & Suites",
    tagline: "144 suite dengan Resto Embun, Gym, dan Spa",
    summary:
      "Sayap suite dengan balkon privat, butler service 24 jam, serta tiga unit bisnis di dalamnya: Resto Embun, Gym, dan Spa.",
    description: [
      "Hotel Qubu Suites menempati sayap barat kawasan Q dengan 144 suite dalam empat tipe, mulai dari Qubu Suite hingga tiga-bedroom Presidential Q Villa dengan kolam privat.",
      "Semua suite memakai kasur pocket-spring, linen katun organik 400 thread count, dan balkon privat menghadap taman atau Teluk Benoa.",
      "Tamu suite mendapat akses ke Executive Lounge untuk sarapan privat, butler service 24 jam, dan late check-out hingga pukul 15.00. Di dalam gedung ini juga beroperasi Resto Embun, Gym, dan Spa.",
    ],
    image: {
      src: "/images/work-suite.jpg",
      alt: "Suite Hotel Qubu dengan tempat tidur besar dan jendela lebar",
    },
    gallery: [
      { src: "/images/hero-hotel-room.jpg", alt: "Suite dengan pencahayaan alami" },
      { src: "/images/work-pool-deck.jpg", alt: "Dek kolam privat di depan suite" },
      { src: "/images/hero-pool-daylight.jpg", alt: "Area kolam Hotel Qubu Suites" },
    ],
    features: [
      "144 suite dalam empat tipe",
      "Balkon privat di 82% suite",
      "Butler service 24 jam",
      "Akses Executive Lounge untuk sarapan privat",
      "Tiga unit bisnis: Resto Embun, Gym, dan Spa",
      "Kolam privat pada tipe Presidential Q Villa",
    ],
    specs: [
      { label: "Jumlah suite", value: "144 suite" },
      { label: "Tipe suite", value: "4 kategori" },
      { label: "Luas terkecil", value: "64 m2" },
      { label: "Luas terbesar", value: "310 m2 (Presidential)" },
      { label: "Unit bisnis di dalam", value: "Resto Embun, Gym, Spa" },
      { label: "Lokasi", value: "Kawasan Q, sayap barat" },
    ],
    hours: "Resepsionis 24 jam",
    outlets: [
      {
        slug: "resto-embun",
        name: "Resto Embun",
        type: "Restoran",
        tagline: "Sarapan pagi dan menu plant-forward",
        summary:
          "Restoran sarapan dengan 140 kursi, live cooking station, dan menu plant-forward yang menghadap taman tropis.",
        description: [
          "Resto Embun melayani sarapan untuk tamu Hotel Qubu Suites dengan 140 kursi dan jendela besar yang menghadap taman tropis.",
          "Selain buffet sarapan, dapur Embun mengembangkan menu plant-forward dengan 40% hidangan berbasis sayuran dari kebun sendiri.",
          "Mulai pukul 18.00 Resto Embun membuka sesi makan malam dengan menu degustasi lima hidangan.",
        ],
        image: {
          src: "/images/work-sky-lounge.jpg",
          alt: "Resto Embun dengan pemandangan taman di siang hari",
        },
        gallery: [
          { src: "/images/service-sunset-deck.jpg", alt: "Area makan Resto Embun menghadap taman" },
          { src: "/images/work-restaurant.jpg", alt: "Interior Resto Embun" },
          { src: "/images/hero-pool-daylight.jpg", alt: "Taman di sekitar Resto Embun" },
        ],
        features: [
          "140 kursi menghadap taman",
          "Buffet sarapan 06.00 – 10.30",
          "40% menu berbasis sayuran",
          "Menu degustasi lima hidangan setiap malam",
          "Pilihan menu bebas gluten dan menu anak",
        ],
        specs: [
          { label: "Kapasitas", value: "140 kursi" },
          { label: "Jam operasional", value: "06.00 – 22.00 WITA" },
          { label: "Sarapan", value: "Buffet 06.00 – 10.30" },
          { label: "Berada di", value: "Hotel Qubu Suites, lantai 2" },
          { label: "Dress code", value: "Resort casual" },
        ],
        hours: "06.00 – 22.00 WITA",
        priceFrom: "Rp 165.000 / orang",
      },
      {
        slug: "gym",
        name: "Gym",
        type: "Pusat Kebugaran",
        tagline: "Peralatan lengkap, buka 24 jam",
        summary:
          "Pusat kebugaran 24 jam dengan peralatan cardio dan strength, area functional training, serta kelas grup harian.",
        description: [
          "Gym Hotel Qubu Suites buka 24 jam dan dapat diakses tamu menggunakan kartu kamar.",
          "Tersedia peralatan cardio dan strength dari merek komersial, area functional training seluas 120 m2, serta ruang kelas untuk sesi grup.",
          "Pelatih pribadi tersedia atas permintaan, begitu pula program latihan pagi di area taman.",
        ],
        image: {
          src: "/images/service-fitness.jpg",
          alt: "Ruang Gym dengan peralatan modern dan jendela besar",
        },
        gallery: [
          { src: "/images/service-fitness.jpg", alt: "Area cardio Gym" },
          { src: "/images/about-hospitality-team.jpg", alt: "Pelatih mendampingi tamu di Gym" },
          { src: "/images/hero-pool-daylight.jpg", alt: "Area taman untuk latihan pagi" },
        ],
        features: [
          "Akses 24 jam dengan kartu kamar",
          "Peralatan cardio dan strength komersial",
          "Area functional training 120 m2",
          "Kelas grup harian",
          "Pelatih pribadi atas permintaan",
        ],
        specs: [
          { label: "Jam operasional", value: "24 jam" },
          { label: "Luas area", value: "120 m2" },
          { label: "Kelas grup", value: "2 sesi per hari" },
          { label: "Berada di", value: "Hotel Qubu Suites, lantai 3" },
          { label: "Akses", value: "Kartu kamar tamu" },
        ],
        hours: "24 jam",
      },
      {
        slug: "spa",
        name: "Spa",
        type: "Spa & Wellness",
        tagline: "Delapan ruang perawatan dengan bahan botani lokal",
        summary:
          "Spa dengan delapan ruang perawatan, sauna inframerah, kolam hidroterapi, dan produk botani racikan sendiri.",
        description: [
          "Spa Hotel Qubu Suites menggabungkan teknik pijat tradisional Bali dengan formulasi botani yang diracik dari kebun herbal sendiri.",
          "Delapan ruang perawatan terdiri dari enam ruang couple dan dua ruang terapi olahraga, masing-masing dengan shower privat dan teras kecil menghadap taman.",
          "Fasilitas pendukung meliputi sauna inframerah, kolam hidroterapi air hangat, ruang relaksasi, dan studio yoga dengan kelas pagi harian.",
        ],
        image: {
          src: "/images/service-spa.jpg",
          alt: "Ruang perawatan Spa dengan handuk putih dan dekorasi alami",
        },
        gallery: [
          { src: "/images/work-spa.jpg", alt: "Interior Spa dengan elemen kayu dan tanaman" },
          { src: "/images/about-heritage.jpg", alt: "Kebun herbal bahan perawatan Spa" },
          { src: "/images/about-hospitality-team.jpg", alt: "Terapis Spa menyiapkan perawatan" },
        ],
        features: [
          "Delapan ruang perawatan, enam di antaranya couple",
          "Produk botani racikan sendiri",
          "Sauna inframerah dan kolam hidroterapi",
          "Studio yoga dengan kelas pagi harian",
          "Paket perawatan pasangan 120 menit",
        ],
        specs: [
          { label: "Jumlah ruang", value: "8 ruang perawatan" },
          { label: "Jam operasional", value: "08.00 – 21.00 WITA" },
          { label: "Durasi perawatan", value: "60 / 90 / 120 menit" },
          { label: "Kapasitas harian", value: "96 perawatan" },
          { label: "Berada di", value: "Hotel Qubu Suites, lantai 2" },
        ],
        hours: "08.00 – 21.00 WITA",
        priceFrom: "Rp 520.000 / perawatan",
      },
    ],
  },
  {
    slug: "villa",
    name: "Villa",
    type: "Villa",
    tagline: "Enam villa privat dengan kolam dan dapur sendiri",
    summary:
      "Enam villa privat berukuran dua sampai empat kamar dengan kolam pribadi, dapur, dan layanan villa host.",
    description: [
      "Villa Qubu Resort terdiri dari enam unit privat berukuran dua sampai empat kamar tidur, masing-masing dengan kolam pribadi, dapur, dan ruang makan sendiri.",
      "Setiap villa memiliki villa host yang mengatur kebutuhan tamu, mulai dari transportasi, katering, hingga penjadwalan aktivitas keluarga.",
      "Villa cocok untuk keluarga besar, grup kecil, maupun tamu yang menginap jangka panjang dengan kebutuhan privasi lebih.",
    ],
    image: {
      src: "/images/hero-beach-resort.jpg",
      alt: "Villa privat dengan kolam dan taman menghadap pantai",
    },
    gallery: [
      { src: "/images/work-cabana-club.jpg", alt: "Area santai villa dengan kursi dan payung" },
      { src: "/images/work-pool-deck.jpg", alt: "Kolam pribadi villa" },
      { src: "/images/cta-banner.jpg", alt: "Pemandangan kawasan villa di siang hari" },
    ],
    features: [
      "Enam villa privat, 2 sampai 4 kamar tidur",
      "Kolam pribadi dan dapur lengkap",
      "Villa host untuk kebutuhan harian",
      "Katering privat atas permintaan",
      "Layanan antar-jemput dalam kawasan",
    ],
    specs: [
      { label: "Jumlah villa", value: "6 unit" },
      { label: "Kamar tidur", value: "2 – 4 kamar per villa" },
      { label: "Kapasitas", value: "4 – 10 tamu per villa" },
      { label: "Check-in / out", value: "14.00 / 12.00 WITA" },
      { label: "Unit bisnis di dalam", value: "Layanan villa (single unit)" },
      { label: "Lokasi", value: "Kawasan Q, sisi selatan" },
    ],
    hours: "Check-in 14.00 · Check-out 12.00",
    outlets: [],
  },
  {
    slug: "pemancingan",
    name: "Pemancingan",
    type: "Rekreasi",
    tagline: "Kolam pemancingan keluarga dan pondok makan ikan",
    summary:
      "Area pemancingan keluarga dengan tiga kolam, penyewaan alat, dan pondok makan yang mengolah hasil tangkapan tamu.",
    description: [
      "Pemancingan Qubu Resort menempati area seluas 1,2 hektar dengan tiga kolam: kolam ikan mas, kolam nila, dan kolam khusus untuk anak.",
      "Pengunjung dapat menyewa alat pancing, membeli umpan, atau mengikuti sesi pemandu untuk tamu yang baru pertama kali memancing.",
      "Hasil tangkapan dapat langsung diolah di pondok makan dengan pilihan bakar, goreng, atau sup, dan dinikmati di saung tepi kolam.",
    ],
    image: {
      src: "/images/work-lagoon-pool.jpg",
      alt: "Kolam pemancingan dengan saung dan pohon rindang",
    },
    gallery: [
      { src: "/images/hero-beach-resort.jpg", alt: "Area hijau di sekitar kolam pemancingan" },
      { src: "/images/service-sunset-deck.jpg", alt: "Saung tepi kolam pemancingan" },
      { src: "/images/work-lagoon-pool.jpg", alt: "Air kolam pemancingan yang tenang" },
    ],
    features: [
      "Tiga kolam: ikan mas, nila, dan kolam anak",
      "Penyewaan alat pancing dan penjualan umpan",
      "Sesi pemandu untuk pemula",
      "Pondok makan pengolahan hasil tangkapan",
      "Saung tepi kolam untuk keluarga",
    ],
    specs: [
      { label: "Luas area", value: "1,2 hektar" },
      { label: "Jumlah kolam", value: "3 kolam" },
      { label: "Jam operasional", value: "07.00 – 18.00 WITA" },
      { label: "Sewa alat", value: "Rp 25.000 / set" },
      { label: "Unit bisnis di dalam", value: "Layanan pemancingan (single unit)" },
      { label: "Lokasi", value: "Kawasan Q, sisi barat" },
    ],
    hours: "07.00 – 18.00 WITA",
    outlets: [],
  },
];

export function getUnitBySlug(slug: string) {
  return businessUnits.find((unit) => unit.slug === slug);
}

export function getOutlet(unitSlug: string, outletSlug: string): UnitOutlet | undefined {
  return getUnitBySlug(unitSlug)?.outlets.find((outlet) => outlet.slug === outletSlug);
}

/** Absolute href helpers so every layer builds the same URLs. */
export function unitHref(unit: BusinessUnit) {
  return "/unit-bisnis/" + unit.slug;
}

export function outletHref(unit: BusinessUnit, outlet: UnitOutlet) {
  return "/unit-bisnis/" + unit.slug + "/" + outlet.slug;
}

/** Total business units operated inside buildings (used in copy + stats). */
export const outletCount = businessUnits.reduce((total, unit) => total + unit.outlets.length, 0);

/** Entries for the "Unit Bisnis" navigation dropdown. */
export const businessUnitMenu: NavItem[] = businessUnits.map((unit) => ({
  label: unit.name,
  href: unitHref(unit),
  children: unit.outlets.map((outlet) => ({
    label: outlet.name,
    href: outletHref(unit, outlet),
  })),
}));
