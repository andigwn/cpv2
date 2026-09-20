import type { Service, ServiceCategory } from "@/types";

export const serviceCategories: { value: ServiceCategory | "all"; label: string }[] = [
  { value: "all", label: "Semua Layanan" },
  { value: "hotel", label: "Hotel & Kamar" },
  { value: "waterpark", label: "Waterpark" },
  { value: "wellness", label: "Spa & Wellness" },
  { value: "events", label: "Event & MICE" },
  { value: "dining", label: "Dining" },
];

export const services: Service[] = [
  {
    slug: "paradis-q",
    name: "Paradis Q Waterpark",
    tagline: "7 zona permainan air seluas 3,4 hektar",
    category: "waterpark",
    summary:
      "Waterpark keluarga dengan 18 seluncuran, kolam ombak, lazy river, dan area bermain air khusus balita.",
    description: [
      "Paradis Q dirancang sebagai jantung pengalaman liburan keluarga di kawasan Q. Tujuh zona tematik menghadirkan pengalaman bermain air yang berbeda untuk setiap usia, mulai dari kolam balita dengan kedalaman 20 cm hingga menara seluncuran setinggi 22 meter.",
      "Seluruh area memakai sistem filtrasi sirkulasi tertutup dengan pemantauan kualitas air setiap dua jam, serta dijaga oleh 24 lifeguard bersertifikat Bronze Medallion yang berpatroli bergiliran.",
      "Untuk kenyamanan keluarga, tersedia 320 loker berukuran besar, ruang laktasi, area bilas air hangat, dan delapan food truck bertema nusantara di dalam kawasan.",
    ],
    image: {
      src: "/images/paradis-q-1.jpeg",
      alt: "Area makan beratap di kawasan Paradis Q",
    },
    gallery: [
      {
        src: "/images/work-aquapark.jpg",
        alt: "Menara seluncuran waterpark dengan struktur berwarna cerah",
      },
      {
        src: "/images/hero-waterpark-pool.jpg",
        alt: "Kolam ombak waterpark dengan pengunjung bermain air",
      },
      {
        src: "/images/service-kids-club.jpg",
        alt: "Area bermain air anak dengan air dangkal dan pengawasan lifeguard",
      },
    ],
    features: [
      "18 seluncuran termasuk racer slide dan bowl slide",
      "Kolam ombak 1.100 m² dengan gelombang terjadwal",
      "Lazy river sepanjang 260 meter",
      "Toddler Lagoon: kolam dangkal berpemanas surya",
      "24 lifeguard bersertifikat internasional",
      "Sistem filtrasi sirkulasi tertutup + pemantauan tiap 2 jam",
      "320 loker, ruang bilas air hangat, dan ruang laktasi",
      "Delapan food truck bertema nusantara",
    ],
    specs: [
      { label: "Luas kawasan", value: "3,4 hektar" },
      { label: "Kapasitas harian", value: "4.500 pengunjung" },
      { label: "Jam operasional", value: "09.00 – 18.00 WITA" },
      { label: "Tinggi seluncuran tertinggi", value: "22 meter" },
      { label: "Kedalaman kolam terdalam", value: "1,5 meter" },
      { label: "Lokasi", value: "Tanjung Benoa, Bali" },
    ],
    priceFrom: "Rp 275.000 / orang",
    featured: true,
  },
  {
    slug: "qubu-suites",
    name: "Qubu Suites & Rooms",
    tagline: "412 kamar dan suite menghadap laut",
    category: "hotel",
    summary:
      "Kamar dan suite dengan balkon privat, linen organik, serta pemandangan Teluk Benoa atau taman tropis.",
    description: [
      "Qubu Suites menyediakan 412 kamar yang terbagi ke dalam enam tipe, mulai dari Deluxe Garden View hingga tiga-bedroom Presidential Q Villa dengan kolam privat.",
      "Semua kamar memakai kasur dengan sistem pocket-spring, linen katun organik 400 thread count, dan jendela berukuran besar untuk memaksimalkan cahaya alami sepanjang hari.",
      "Tamu suite mendapatkan akses ke Executive Lounge untuk sarapan privat, layanan butler 24 jam, dan late check-out hingga pukul 15.00.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Suite Hotel Qubu Suites dengan tempat tidur king dan aksen kayu",
    },
    gallery: [
      {
        src: "/images/qubu-suites-2.jpeg",
        alt: "Suite dengan area duduk dan pencahayaan alami",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Kamar suite dengan tempat tidur dan panel kayu",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Detail interior suite Hotel Qubu Suites",
      },
    ],
    features: [
      "Enam tipe kamar, dari Deluxe hingga Presidential Q Villa",
      "Balkon privat di 78% kamar",
      "Linen katun organik 400 thread count",
      "Kulkas mini, mesin kopi, dan air minum gratis harian",
      "Butler service 24 jam untuk kategori suite",
      "Akses Executive Lounge untuk sarapan privat",
      "Housekeeping dua kali sehari",
      "Wi-Fi fiber 300 Mbps di seluruh kamar",
    ],
    specs: [
      { label: "Jumlah kamar", value: "412 kamar & suite" },
      { label: "Tipe kamar", value: "6 kategori" },
      { label: "Luas terkecil", value: "42 m²" },
      { label: "Luas terbesar", value: "310 m² (Presidential Villa)" },
      { label: "Check-in / out", value: "14.00 / 12.00 WITA" },
      { label: "Lokasi", value: "Tanjung Benoa, Bali" },
    ],
    priceFrom: "Rp 1.450.000 / malam",
    featured: true,
  },
  {
    slug: "beach-club",
    name: "Beach Club",
    tagline: "Sunset deck, cabana, dan koktail tropis",
    category: "dining",
    summary:
      "Beach club tepi pasir dengan daybed privat, kolam infinity, live acoustic, dan menu grill segar.",
    description: [
      "Beach Club berada langsung di atas pasir putih Tanjung Benoa dengan kolam infinity yang menyatu secara visual dengan laut.",
      "Tersedia 24 daybed dan 12 cabana privat yang dapat dipesan harian, lengkap dengan layanan pramusaji pribadi dan colokan pengisi daya.",
      "Setiap hari mulai pukul 17.00, Sunset Deck menghadirkan live acoustic dan menu grill hasil tangkapan harian nelayan lokal.",
    ],
    image: {
      src: "/images/service-beach-club.jpg",
      alt: "Beach club tepi pantai dengan daybed dan payung di siang hari",
    },
    gallery: [
      {
        src: "/images/work-beach-club.jpg",
        alt: "Dek beach club menghadap laut biru",
      },
      {
        src: "/images/service-sunset-deck.jpg",
        alt: "Sunset deck dengan kursi santai menghadap laut",
      },
      {
        src: "/images/service-cabana.jpg",
        alt: "Cabana privat dengan tirai putih",
      },
    ],
    features: [
      "24 daybed dan 12 cabana privat",
      "Kolam infinity menghadap laut",
      "Live acoustic setiap hari 17.00 – 21.00",
      "Menu grill hasil tangkapan harian",
      "Koktail signature berbahan buah lokal",
      "Layanan pramusaji pribadi di daybed",
      "Akses langsung ke pantai",
      "Ramah anak dengan menu khusus",
    ],
    specs: [
      { label: "Kapasitas", value: "420 pengunjung" },
      { label: "Jam operasional", value: "10.00 – 23.00 WITA" },
      { label: "Daybed", value: "24 unit" },
      { label: "Cabana", value: "12 unit" },
      { label: "Dress code", value: "Resort casual" },
      { label: "Lokasi", value: "Pantai Tanjung Benoa" },
    ],
    priceFrom: "Rp 150.000 / daybed",
    featured: true,
  },
  {
    slug: "q-spa-wellness",
    name: "Q Spa & Wellness",
    tagline: "Ritual botani lokal di 8 ruang perawatan",
    category: "wellness",
    summary:
      "Spa dengan perawatan berbahan botani lokal, sauna inframerah, kolam hidroterapi, dan studio yoga.",
    description: [
      "Q Spa & Wellness menggabungkan teknik pijat tradisional Bali dengan formulasi botani yang diracik sendiri dari kebun herbal kami di Bedugul.",
      "Delapan ruang perawatan terdiri dari enam ruang couple dan dua ruang khusus untuk terapi olahraga. Setiap ruangan dilengkapi shower privat dan teras kecil menghadap taman.",
      "Fasilitas pendukung meliputi sauna inframerah, kolam hidroterapi air hangat, ruang relaksasi, serta studio yoga dengan kelas pagi setiap hari.",
    ],
    image: {
      src: "/images/spa-gym-1.jpeg",
      alt: "Ruang perawatan spa dengan dua tempat tidur dan dekorasi alami",
    },
    gallery: [
      {
        src: "/images/spa-gym-2.jpeg",
        alt: "Ruang fitness dengan treadmill dan rak dumbbell",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Suite Hotel Qubu Suites tempat spa berada",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Interior Hotel Qubu Suites",
      },
    ],
    features: [
      "Delapan ruang perawatan, termasuk enam ruang couple",
      "Produk botani racikan sendiri dari kebun herbal Bedugul",
      "Sauna inframerah dan kolam hidroterapi",
      "Studio yoga dengan kelas pagi harian",
      "Pusat kebugaran 24 jam dengan peralatan lengkap",
      "Terapi olahraga bersama fisioterapis bersertifikat",
      "Ruang relaksasi dengan teh herbal",
      "Paket perawatan pasangan 120 menit",
    ],
    specs: [
      { label: "Jumlah ruang", value: "8 ruang perawatan" },
      { label: "Jam operasional", value: "08.00 – 21.00 WITA" },
      { label: "Durasi perawatan", value: "60 / 90 / 120 menit" },
      { label: "Kapasitas harian", value: "96 perawatan" },
      { label: "Fasilitas", value: "Sauna, hidroterapi, yoga studio" },
      { label: "Lokasi", value: "Qubu Resort, lantai 2" },
    ],
    priceFrom: "Rp 520.000 / perawatan",
    featured: false,
  },
  {
    slug: "dining",
    name: "Q Dining",
    tagline: "Empat restoran, satu filosofi rasa",
    category: "dining",
    summary:
      "Empat outlet kuliner dengan konsep berbeda: all-day dining di Resto Patio, jamuan dan resepsi di Mahoni, sarapan serta menu plant-forward di Resto Embun, dan food court di Food Corner.",
    description: [
      "Q Dining menaungi empat outlet kuliner di dalam kawasan Q, masing-masing dengan identitas rasa yang berbeda namun berbagi komitmen pada bahan lokal segar.",
      "Resto Patio di Hotel Q adalah all-day dining dengan 12 live station yang menyajikan masakan nusantara, Asia, dan Western. Dapur buka pukul 06.00 untuk sarapan dan tutup pukul 23.00.",
      "Mahoni di QHall melayani jamuan dan resepsi dengan interior kayu mahoni berkapasitas 320 kursi, sementara Resto Embun di Qubu Suites menghadirkan sarapan buffet dan menu plant-forward dengan 40% hidangan berbasis sayuran.",
    ],
    image: {
      src: "/images/patio-1.jpeg",
      alt: "Interior Resto Patio dengan meja kayu dan rak tanaman",
    },
    gallery: [
      {
        src: "/images/mahoni-1.jpeg",
        alt: "Ruang jamuan Restoran Mahoni dengan meja bundar",
      },
      {
        src: "/images/embun-1.jpeg",
        alt: "Resto Embun dengan area buffet dan meja marmer hitam",
      },
      {
        src: "/images/q-rooftop-4-indoor.jpeg",
        alt: "Ruang makan indoor dengan meja bundar dan buffet",
      },
    ],
    features: [
      "Empat outlet: Resto Patio, Mahoni, Resto Embun, dan Food Corner",
      "12 live cooking station di Resto Patio",
      "Menu plant-forward di Resto Embun",
      "Jamuan dan resepsi 320 kursi di Mahoni",
      "Food court 600 kursi di Food Corner",
      "Sarapan buffet 06.00 – 10.30 di Resto Embun",
      "Layanan in-room dining 24 jam",
      "Pilihan menu anak dan alergi",
    ],
    specs: [
      { label: "Jumlah outlet", value: "4 restoran & food court" },
      { label: "Total kursi", value: "1.300 kursi" },
      { label: "Jam operasional", value: "06.00 – 23.00 WITA" },
      { label: "Sarapan", value: "Buffet 06.00 – 10.30" },
      { label: "In-room dining", value: "24 jam" },
      { label: "Lokasi", value: "Tersebar di 4 unit bisnis" },
    ],
    priceFrom: "Rp 185.000 / orang",
    featured: false,
  },
  {
    slug: "qhall",
    name: "QHall",
    tagline: "Ballroom 1.800 m² dan 8 ruang breakout",
    category: "events",
    summary:
      "Pusat konvensi dengan ballroom bebas pilar, pre-function lounge, dan tim event teknis bersertifikat.",
    description: [
      "QHall dirancang untuk konferensi, pameran, dan pernikahan berskala besar. Ballroom utamanya seluas 1.800 m² tanpa pilar dengan tinggi plafon 9 meter, dapat dibagi menjadi tiga ruang independen.",
      "Delapan ruang breakout berkapasitas 40 sampai 180 orang tersedia untuk sesi paralel, dilengkapi layar LED dan sistem audio terintegrasi.",
      "Tim event kami menangani perencanaan teknis, katering untuk hingga 2.000 pax, serta koordinasi akomodasi bagi delegasi yang menginap di properti kami.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "Fasad QHall dengan kanopi kawat dekoratif",
    },
    gallery: [
      {
        src: "/images/qhall-5.jpeg",
        alt: "Ballroom QHall dengan dekorasi acara dan lampu gantung",
      },
      {
        src: "/images/qhall-2.jpeg",
        alt: "Ruang QHall dengan penataan kursi acara",
      },
      {
        src: "/images/qhall-3.jpeg",
        alt: "Interior QHall dengan plafon tinggi",
      },
    ],
    features: [
      "Ballroom 1.800 m² bebas pilar, plafon 9 meter",
      "Dapat dibagi menjadi tiga ruang independen",
      "Delapan ruang breakout (40 – 180 orang)",
      "Pre-function lounge 620 m²",
      "Layar LED, sistem audio, dan rigging terintegrasi",
      "Katering hingga 2.000 pax dengan dapur halal",
      "Tim event teknis bersertifikat",
      "Dock bongkar-muat khusus pameran",
    ],
    specs: [
      { label: "Ballroom", value: "1.800 m² (kapasitas 1.500 delegasi)" },
      { label: "Breakout room", value: "8 ruang" },
      { label: "Plafon", value: "9 meter, bebas pilar" },
      { label: "Kapasitas banquet", value: "1.200 pax" },
      { label: "Kapasitas theatre", value: "1.500 pax" },
      { label: "Lokasi", value: "Qubu Resort, sayap timur" },
    ],
    priceFrom: "Rp 42.000.000 / hari",
    featured: true,
  },
  {
    slug: "kids-club-adventure",
    name: "Kids Club & Adventure",
    tagline: "Program harian untuk tamu kecil",
    category: "wellness",
    summary:
      "Kids club dengan pendamping bersertifikat, kelas kreatif, dan program adventure luar ruang.",
    description: [
      "Kids Club & Adventure menyediakan program terjadwal setiap hari untuk anak usia 4 sampai 12 tahun, dengan rasio pendamping maksimal 1:6.",
      "Aktivitas mencakup kelas memasak, kerajinan tangan dari bahan daur ulang, penanaman bakau, dan program adventure seperti treasure hunt di area resort.",
      "Ruang dalam ber-AC seluas 240 m² dilengkapi area bermain lunak, perpustakaan anak, dan ruang tidur siang.",
    ],
    image: {
      src: "/images/service-kids-club.jpg",
      alt: "Area bermain anak yang terang dan berwarna cerah",
    },
    gallery: [
      {
        src: "/images/hero-pool-daylight.jpg",
        alt: "Kolam anak dengan pengawasan lifeguard",
      },
      {
        src: "/images/about-hospitality-team.jpg",
        alt: "Pendamping kids club bersama anak-anak",
      },
      {
        src: "/images/service-waterpark.jpg",
        alt: "Area bermain air anak",
      },
    ],
    features: [
      "Program harian 09.00 – 17.00 WITA",
      "Rasio pendamping maksimal 1:6",
      "Pendamping bersertifikat pertolongan pertama",
      "Ruang ber-AC 240 m² dengan area lunak",
      "Kelas memasak dan kerajinan tangan",
      "Program penanaman bakau",
      "Treasure hunt di area resort",
      "Layanan pengasuhan malam (atas permintaan)",
    ],
    specs: [
      { label: "Usia peserta", value: "4 – 12 tahun" },
      { label: "Rasio pendamping", value: "1 : 6" },
      { label: "Jam operasional", value: "09.00 – 17.00 WITA" },
      { label: "Luas ruang dalam", value: "240 m²" },
      { label: "Bahasa", value: "Indonesia & Inggris" },
      { label: "Lokasi", value: "Qubu Resort, sayap taman" },
    ],
    priceFrom: "Rp 180.000 / sesi",
    featured: false,
  },
  {
    slug: "airport-transfer-tour",
    name: "Airport Transfer & Island Tour",
    tagline: "Transportasi privat dan tur pulau",
    category: "hotel",
    summary:
      "Layanan antar-jemput bandara dengan armada privat serta paket tur setengah dan sehari penuh.",
    description: [
      "Layanan transfer privat kami menggunakan armada Toyota Alphard, Hiace Premio, dan bus 45 kursi dengan pengemudi bersertifikat serta asuransi perjalanan.",
      "Tim concierge juga menyusun paket tur setengah hari dan sehari penuh ke destinasi seperti Uluwatu, Ubud, Nusa Penida, dan Bedugul, lengkap dengan pemandu berbahasa Indonesia, Inggris, dan Mandarin.",
      "Semua kendaraan dilengkapi kursi bayi, air mineral, dan Wi-Fi saat perjalanan.",
    ],
    image: {
      src: "/images/service-airport-shuttle.jpg",
      alt: "Kendaraan shuttle bandara di jalan dengan cahaya pagi",
    },
    gallery: [
      {
        src: "/images/about-resort-aerial.jpg",
        alt: "Pemandangan kawasan resort dari udara",
      },
      {
        src: "/images/hero-beach-resort.jpg",
        alt: "Pantai tujuan tur pulau",
      },
      {
        src: "/images/about-heritage.jpg",
        alt: "Bangunan tradisional Bali saat tur budaya",
      },
    ],
    features: [
      "Antar-jemput bandara 24 jam",
      "Armada Alphard, Hiace Premio, dan bus 45 kursi",
      "Pengemudi bersertifikat + asuransi perjalanan",
      "Kursi bayi dan booster tersedia",
      "Paket tur setengah hari dan sehari penuh",
      "Pemandu berbahasa Indonesia, Inggris, Mandarin",
      "Wi-Fi dan air mineral selama perjalanan",
      "Pemesanan fleksibel hingga 2 jam sebelum berangkat",
    ],
    specs: [
      { label: "Jarak dari bandara", value: "18 km (± 35 menit)" },
      { label: "Jam layanan", value: "24 jam" },
      { label: "Kapasitas armada", value: "1 – 45 kursi" },
      { label: "Destinasi tur", value: "12 rute populer" },
      { label: "Bahasa pemandu", value: "ID / EN / Mandarin" },
      { label: "Lokasi penjemputan", value: "Bandara I Gusti Ngurah Rai" },
    ],
    priceFrom: "Rp 350.000 / perjalanan",
    featured: false,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const featuredServices = services.filter((service) => service.featured);

/** Package bundles displayed on the services page under `#paket`. */
export const stayPackages = [
  {
    name: "Q Escape",
    nights: 2,
    price: "Rp 3.290.000",
    perks: [
      "2 malam Deluxe Garden View",
      "Sarapan untuk 2 orang",
      "Tiket waterpark 2 hari",
      "Late check-out 14.00",
    ],
    highlight: false,
  },
  {
    name: "Family Splash",
    nights: 3,
    price: "Rp 6.750.000",
    perks: [
      "3 malam Family Suite",
      "Sarapan untuk 4 orang",
      "Tiket waterpark + kids club",
      "Makan malam keluarga di Resto Patio",
      "Sesi foto keluarga 30 menit",
    ],
    highlight: true,
  },
  {
    name: "Wellness Reset",
    nights: 3,
    price: "Rp 7.980.000",
    perks: [
      "3 malam Qubu Suite",
      "3 sesi spa 90 menit",
      "Kelas yoga privat pagi",
      "Menu plant-forward di Resto Embun",
    ],
    highlight: false,
  },
];
