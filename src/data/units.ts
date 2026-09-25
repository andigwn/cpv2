import type { BusinessUnit, NavItem } from "@/types";

/**
 * Business units owned by Qubu Resort.
 *
 * Each entry is one business unit. The page rhythm for every unit is:
 * profile → room/venue/pool categories (`roomTypes`) → supporting facilities
 * (`facilities`) → photo gallery (`gallery`). This file is the single source of
 * truth for the "Destinasi" navigation dropdown, the /unit-bisnis pages and
 * the sitemap.
 */
export const businessUnits: BusinessUnit[] = [
  {
    slug: "qubu-suites",
    name: "Hotel Qubu Suites",
    type: "Hotel & Suites",
    tagline: "Suite dengan balkon privat, restoran signature, dan spa",
    summary:
      "Sayap suite kawasan Q dengan balkon privat, butler service 24 jam, serta Embun Signature Restaurant, spa, dan fasilitas keluarga di dalam satu gedung.",
    description: [
      "Hotel Qubu Suites menempati sayap barat kawasan Q dengan 144 suite yang terbagi ke dalam lima tipe: Deluxe, Deluxe with View, Suite Room, Family Suite, dan Qubu Grand Suite.",
      "Semua suite memakai kasur pocket-spring, linen katun organik, dan balkon privat menghadap taman tropis atau Teluk Benoa. Tamu suite mendapat akses Executive Lounge untuk sarapan privat dan butler service 24 jam.",
      "Di dalam gedung ini juga beroperasi Embun Signature Restaurant, Qubiq Bar, Meeting Room, Spa & Wellness Center, Entertainment Room, dan Kids Club, sehingga tamu tidak perlu meninggalkan sayap suite untuk makan, bersantai, atau membawa anak bermain.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Kamar Hotel Qubu Suites dengan tempat tidur king dan panel kayu ukir",
    },
    gallery: [
      {
        src: "/images/qubu-suites-1.jpeg",
        alt: "Kamar Hotel Qubu Suites dengan tempat tidur king dan panel kayu ukir",
      },
      {
        src: "/images/qubu-suites-2.jpeg",
        alt: "Kamar suite dengan meja kerja, kursi santai, dan jendela besar",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Dapur kecil dan area minibar di dalam suite Hotel Qubu Suites",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Ruang tamu suite dengan sofa, meja makan, dan televisi",
      },
      {
        src: "/images/embun-1.jpeg",
        alt: "Embun Signature Restaurant dengan area buffet dan meja marmer hitam",
      },
      {
        src: "/images/spa-gym-1.jpeg",
        alt: "Dua tempat tidur perawatan di Spa & Wellness Center Qubu",
      },
      {
        src: "/images/work-sky-lounge.jpg",
        alt: "Bar lounge dengan area duduk dan rak botol menghadap laut",
      },
      {
        src: "/images/service-ballroom.jpg",
        alt: "Ruang rapat dengan barisan kursi dan plafon tinggi",
      },
      {
        src: "/images/work-lobby.jpg",
        alt: "Ruang santai dengan sofa merah dan meja kayu",
      },
      {
        src: "/images/service-kids-club.jpg",
        alt: "Area bermain anak dengan perosotan dan rangka warna-warni",
      },
    ],
    features: [
      "144 suite dalam lima tipe",
      "Balkon privat di sebagian besar suite",
      "Butler service 24 jam",
      "Akses Executive Lounge untuk sarapan privat",
      "Embun Signature Restaurant dan Qubiq Bar",
      "Spa & Wellness Center, Entertainment Room, dan Kids Club",
    ],
    specs: [
      { label: "Jumlah suite", value: "144 suite" },
      { label: "Tipe kamar", value: "5 kategori" },
      { label: "Luas kamar", value: "48 – 160 m2" },
      { label: "Check-in / out", value: "14.00 / 12.00 WITA" },
      { label: "Fasilitas unggulan", value: "Embun, Qubiq Bar, Spa" },
      { label: "Lokasi", value: "Kawasan Q, sayap barat" },
    ],
    hours: "Resepsionis 24 jam",
    roomTypesLabel: "Jenis Kamar",
    roomTypes: [
      {
        slug: "deluxe",
        name: "Deluxe",
        description:
          "Kamar deluxe dengan tempat tidur king, meja kerja, dan pencahayaan hangat untuk dua tamu.",
        image: {
          src: "/images/qubu-suites-2.jpeg",
          alt: "Kamar Deluxe dengan tempat tidur king dan meja kerja menghadap jendela",
        },
        size: "48 m2",
        bed: "1 King atau 2 Single",
        capacity: "2 tamu",
        view: "Garden view",
        features: [
          "AC dan smart TV",
          "Kamar mandi shower",
          "Mini bar dan safety box",
          "Balkon privat",
        ],
      },
      {
        slug: "deluxe-with-view",
        name: "Deluxe with View",
        description:
          "Kamar deluxe di lantai atas dengan balkon yang menghadap taman tropis atau Teluk Benoa.",
        image: {
          src: "/images/qubu-suites-1.jpeg",
          alt: "Kamar Deluxe with View dengan tempat tidur king dan panel kayu ukir",
        },
        size: "52 m2",
        bed: "1 King",
        capacity: "2 tamu + 1 anak",
        view: "Taman atau Teluk Benoa",
        features: [
          "Balkon privat dengan pemandangan",
          "Area duduk",
          "Kulkas mini dan mesin kopi",
          "Akses Executive Lounge",
        ],
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Suite satu kamar dengan ruang tamu terpisah, meja makan, dan akses Executive Lounge.",
        image: {
          src: "/images/qubu-suites-4.jpeg",
          alt: "Ruang tamu Suite Room dengan sofa dan meja makan",
        },
        size: "64 m2",
        bed: "1 King",
        capacity: "2 tamu",
        view: "Garden view",
        features: [
          "Ruang tamu terpisah",
          "Balkon privat",
          "Akses Executive Lounge",
          "Butler service 24 jam",
        ],
      },
      {
        slug: "family-suite",
        name: "Family Suite",
        description:
          "Suite keluarga dengan dapur kecil dan ruang tamu bersama untuk hingga empat tamu.",
        image: {
          src: "/images/qubu-suites-3.jpeg",
          alt: "Dapur kecil dan area minibar di Family Suite Hotel Qubu Suites",
        },
        size: "96 m2",
        bed: "1 King + 2 Single",
        capacity: "4 tamu",
        view: "Taman tropis",
        features: [
          "Ruang tamu bersama",
          "Dapur kecil",
          "Perlengkapan anak tersedia",
          "Akses Executive Lounge",
        ],
      },
      {
        slug: "qubu-grand-suite",
        name: "Qubu Grand Suite",
        description:
          "Suite terluas dengan ruang tamu dan ruang makan terpisah serta balkon panorama.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Qubu Grand Suite dengan area duduk dan tempat tidur menghadap jendela besar",
        },
        size: "160 m2",
        bed: "1 King",
        capacity: "2 – 4 tamu",
        view: "Panorama Teluk Benoa",
        features: [
          "Ruang tamu dan ruang makan terpisah",
          "Balkon panorama",
          "Butler service 24 jam",
          "Akses Executive Lounge",
        ],
      },
    ],
    facilities: [
      {
        slug: "embun-signature-restaurant",
        name: "Embun Signature Restaurant",
        type: "Restoran",
        description:
          "Restoran signature dengan 140 kursi, live cooking station, dan menu plant-forward yang menghadap taman tropis.",
        image: {
          src: "/images/embun-1.jpeg",
          alt: "Embun Signature Restaurant dengan area buffet dan meja marmer hitam",
        },
      },
      {
        slug: "qubiq-bar",
        name: "Qubiq Bar",
        type: "Bar & Lounge",
        description:
          "Bar lounge dengan koktail tropis, pilihan wine, dan small bites, buka setiap sore hingga malam.",
        image: {
          src: "/images/work-sky-lounge.jpg",
          alt: "Bar lounge dengan area duduk dan rak botol menghadap laut",
        },
      },
      {
        slug: "meeting-room",
        name: "Meeting Room",
        type: "Ruang Rapat",
        description:
          "Ruang rapat dengan proyektor, tata suara, dan penataan meja bundar untuk pertemuan korporat maupun acara privat.",
        image: {
          src: "/images/service-ballroom.jpg",
          alt: "Ruang rapat dengan barisan kursi dan plafon tinggi",
        },
      },
      {
        slug: "spa-wellness-center",
        name: "Spa & Wellness Center",
        type: "Spa & Wellness",
        description:
          "Delapan ruang perawatan, sauna inframerah, kolam hidroterapi, dan produk botani racikan sendiri.",
        image: {
          src: "/images/spa-gym-1.jpeg",
          alt: "Dua tempat tidur perawatan di Spa & Wellness Center Qubu",
        },
      },
      {
        slug: "entertainment-room",
        name: "Entertainment Room",
        type: "Ruang Hiburan",
        description:
          "Ruang hiburan dengan meja biliar, karaoke, dan konsol permainan untuk tamu dewasa maupun keluarga.",
        image: {
          src: "/images/work-lobby.jpg",
          alt: "Ruang santai dengan sofa merah dan meja kayu",
        },
      },
      {
        slug: "kids-club",
        name: "Kids Club",
        type: "Klub Anak",
        description:
          "Area bermain anak dengan pendamping bersertifikat, kegiatan harian, dan rasio pengawasan 1:6.",
        image: {
          src: "/images/service-kids-club.jpg",
          alt: "Area bermain anak dengan perosotan dan rangka warna-warni",
        },
      },
    ],
  },
  {
    slug: "hotel-q",
    name: "Hotel Q",
    type: "Hotel",
    tagline: "Kamar Superior hingga Suite dengan Patio Bistro di lantai dasar",
    summary:
      "Bangunan utama kawasan Q dengan lima tipe kamar, kolam dewasa dan kolam anak, serta akses pejalan kaki ke The Q Hall dan Paradis-Q.",
    description: [
      "Hotel Q adalah bangunan utama kawasan Q dan pintu masuk bagi sebagian besar tamu. Tersedia lima tipe kamar: Superior, Superior Plus, Premier, Premier Plus, dan Suite Room.",
      "Lobby berkonsep atrium menghubungkan resepsionis, lobby lounge, pusat informasi wisata, dan Patio Bistro yang melayani sarapan hingga makan malam.",
      "Fasilitas penunjang meliputi kolam dewasa dan kolam anak, pusat kebugaran, meeting room, serta jalur pejalan kaki beratap menuju The Q Hall dan Paradis-Q.",
    ],
    image: {
      src: "/images/hotel-q-1.jpeg",
      alt: "Fasad Hotel Q dengan lapisan kisi geometris merah dan putih",
    },
    gallery: [
      {
        src: "/images/hotel-q-2.jpeg",
        alt: "Kamar Hotel Q dengan tempat tidur besar dan handuk berbentuk gajah",
      },
      {
        src: "/images/hotel-q-1.jpeg",
        alt: "Fasad Hotel Q dengan lapisan kisi geometris merah dan putih",
      },
      {
        src: "/images/hero-hotel-room.jpg",
        alt: "Kamar hotel dengan sofa, tempat tidur besar, dan jendela lebar",
      },
      {
        src: "/images/work-suite.jpg",
        alt: "Kamar hotel dengan tempat tidur besar dan panel kepala tempat tidur bergelombang",
      },
      {
        src: "/images/patio-1.jpeg",
        alt: "Interior Patio Bistro dengan meja kayu dan rak botol",
      },
      {
        src: "/images/patio-2.jpeg",
        alt: "Suasana makan malam di Patio Bistro dengan plafon kayu",
      },
      {
        src: "/images/service-ballroom.jpg",
        alt: "Meeting room dengan barisan kursi dan plafon tinggi",
      },
    ],
    features: [
      "Lima tipe kamar untuk pasangan maupun keluarga",
      "Patio Bistro di lantai dasar",
      "Kolam dewasa dan kolam anak",
      "Meeting room untuk pertemuan kecil",
      "Lobby lounge dan pusat informasi wisata",
      "Jalur pejalan kaki beratap ke The Q Hall dan Paradis-Q",
    ],
    specs: [
      { label: "Jumlah kamar", value: "268 kamar" },
      { label: "Tipe kamar", value: "5 kategori" },
      { label: "Luas kamar", value: "24 – 56 m2" },
      { label: "Check-in / out", value: "14.00 / 12.00 WITA" },
      { label: "Fasilitas unggulan", value: "Patio Bistro & Meeting Room" },
      { label: "Lokasi", value: "Kawasan Q, Tanjung Benoa" },
    ],
    hours: "Resepsionis 24 jam",
    roomTypesLabel: "Jenis Kamar",
    roomTypes: [
      {
        slug: "superior",
        name: "Superior",
        description:
          "Tipe kamar dasar Hotel Q dengan fasilitas lengkap untuk dua tamu dan akses ke seluruh area kawasan Q.",
        image: {
          src: "/images/hotel-q-2.jpeg",
          alt: "Kamar Superior Hotel Q dengan tempat tidur besar dan handuk berbentuk gajah",
        },
        size: "24 m2",
        bed: "1 King atau 2 Single",
        capacity: "2 tamu",
        view: "Kota atau taman",
        features: [
          "AC dan smart TV",
          "Kamar mandi shower",
          "Mini bar dan safety box",
          "Akses kolam dewasa & kolam anak",
        ],
      },
      {
        slug: "superior-plus",
        name: "Superior Plus",
        description:
          "Kamar superior yang lebih luas dengan area duduk, meja kerja, dan jendela besar.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Kamar Superior Plus dengan sofa, tempat tidur besar, dan jendela lebar",
        },
        size: "28 m2",
        bed: "1 King",
        capacity: "2 tamu + 1 anak",
        view: "Pool view",
        features: [
          "Area duduk tambahan",
          "Balkon privat",
          "Coffee maker dan mini bar",
          "Akses kolam dewasa & kolam anak",
        ],
      },
      {
        slug: "premier",
        name: "Premier",
        description:
          "Kamar premier dengan tempat tidur besar, panel kayu, dan ruang gerak lebih lega.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Kamar Premier dengan tempat tidur besar dan panel kepala tempat tidur bergelombang",
        },
        size: "32 m2",
        bed: "1 King",
        capacity: "3 tamu",
        view: "Garden view",
        features: [
          "Area kerja dan meja rias",
          "Kulkas mini dan mesin kopi",
          "Bathrobe dan sandal",
          "Akses kolam dewasa & kolam anak",
        ],
      },
      {
        slug: "premier-plus",
        name: "Premier Plus",
        description:
          "Kamar premier dengan area duduk tambahan serta pemandangan kolam atau taman kawasan Q.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Kamar Premier Plus dengan sofa dan tempat tidur menghadap jendela besar",
        },
        size: "36 m2",
        bed: "1 King",
        capacity: "2 tamu + 1 anak",
        view: "Pool & garden view",
        features: [
          "Area duduk tambahan",
          "Balkon privat",
          "Coffee maker dan mini bar",
          "Akses kolam dewasa & kolam anak",
        ],
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Suite satu kamar dengan ruang tamu kecil dan ruang gerak paling lega di Hotel Q.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Suite Room dengan tempat tidur besar dan area duduk di Hotel Q",
        },
        size: "56 m2",
        bed: "1 King",
        capacity: "2 tamu + 2 anak",
        view: "Pool view",
        features: [
          "Ruang tamu terpisah",
          "Balkon privat",
          "Layanan kamar 24 jam",
          "Akses kolam dewasa & kolam anak",
        ],
      },
    ],
    facilities: [
      {
        slug: "patio-bistro",
        name: "Patio Bistro",
        type: "Restoran",
        description:
          "Restoran utama Hotel Q dengan 240 kursi, live station nusantara, Asia, dan Western, serta teras yang menghadap taman.",
        image: {
          src: "/images/patio-1.jpeg",
          alt: "Interior Patio Bistro dengan meja kayu dan rak botol",
        },
      },
      {
        slug: "meeting-room",
        name: "Meeting Room",
        type: "Ruang Rapat",
        description:
          "Ruang rapat dengan proyektor dan tata suara untuk pertemuan korporat maupun acara privat skala kecil.",
        image: {
          src: "/images/service-ballroom.jpg",
          alt: "Meeting room dengan barisan kursi dan plafon tinggi",
        },
      },
    ],
  },
  {
    slug: "qhall",
    name: "The Q Hall Convention Center",
    type: "Convention Center",
    tagline: "Ballroom bebas pilar dan enam ruang pertemuan serbaguna",
    summary:
      "Pusat konvensi dengan ballroom bebas pilar, pre-function lounge, dan tim event teknis untuk konferensi, pameran, serta pernikahan berskala besar.",
    description: [
      "The Q Hall Convention Center dirancang untuk konferensi, pameran, dan pernikahan berskala besar. Ballroom utamanya bebas pilar dengan tinggi plafon 9 meter dan dapat dibagi menjadi tiga ruang independen.",
      "Enam ruang pertemuan — Merbau, Lontar, Pulai, The Q Hall Lantai 1, Mahoni, dan Mahoni Outdoor — tersedia untuk sesi paralel, jamuan, maupun acara privat dengan kapasitas yang berbeda-beda.",
      "Tim event The Q Hall menangani perencanaan teknis, katering hingga ribuan pax, serta koordinasi akomodasi bagi delegasi yang menginap di Hotel Q dan Hotel Qubu Suites.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "Fasad The Q Hall Convention Center dengan kanopi kawat dekoratif",
    },
    gallery: [
      {
        src: "/images/qhall-1.jpeg",
        alt: "Fasad The Q Hall Convention Center dengan kanopi kawat dekoratif",
      },
      {
        src: "/images/qhall-2.jpeg",
        alt: "Ruang Merbau dengan barisan kursi dan karpet bermotif merah",
      },
      {
        src: "/images/qhall-3.jpeg",
        alt: "Ruang Lontar dengan meja bundar dan karpet merah bermotif",
      },
      {
        src: "/images/qhall-4.jpeg",
        alt: "Ruang Pulai dengan penataan meja kelas dan lampu gantung",
      },
      {
        src: "/images/qhall-5.jpeg",
        alt: "Ruang Mahoni dengan lorong dekorasi bunga dan lampu gantung",
      },
      {
        src: "/images/qhall-6.jpeg",
        alt: "The Q Hall Lantai 1 dengan meja bundar, karpet merah, dan lampu gantung emas",
      },
      {
        src: "/images/mahoni-1.jpeg",
        alt: "Ruang Mahoni dengan meja bundar dan kursi berkain merah muda",
      },
      {
        src: "/images/mahoni-2.jpeg",
        alt: "Ruang Mahoni Outdoor dengan dekorasi balon dan panggung acara",
      },
    ],
    features: [
      "Ballroom bebas pilar dengan plafon 9 meter",
      "Dapat dibagi menjadi tiga ruang independen",
      "Enam ruang pertemuan serbaguna",
      "Pre-function lounge untuk resepsi dan pameran",
      "Layar LED, sistem audio, dan rigging terintegrasi",
      "Katering hingga ribuan pax dengan dapur halal",
    ],
    specs: [
      { label: "Ballroom", value: "1.800 m2" },
      { label: "Ruang pertemuan", value: "6 ruangan" },
      { label: "Plafon", value: "9 meter, bebas pilar" },
      { label: "Kapasitas banquet", value: "1.200 pax" },
      { label: "Kapasitas teater", value: "1.500 delegasi" },
      { label: "Lokasi", value: "Kawasan Q, sayap timur" },
    ],
    hours: "Fleksibel sesuai jadwal acara",
    roomTypesLabel: "Jenis Ruangan",
    roomTypes: [
      {
        slug: "merbau",
        name: "Merbau",
        description:
          "Ruang pertemuan terbesar dengan penataan teater maupun klasikal dan karpet bermotif khas Q Hall.",
        image: {
          src: "/images/qhall-2.jpeg",
          alt: "Ruang Merbau dengan barisan kursi dan karpet bermotif merah",
        },
        size: "500 m2",
        capacity: "400 delegasi",
        features: [
          "Penataan teater, klasikal, atau banquet",
          "Layar LED dan tata suara",
          "Pintu akses langsung ke pre-function lounge",
        ],
      },
      {
        slug: "lontar",
        name: "Lontar",
        description:
          "Ruang jamuan dengan meja bundar untuk gala dinner, resepsi, dan makan malam delegasi.",
        image: {
          src: "/images/qhall-3.jpeg",
          alt: "Ruang Lontar dengan meja bundar dan karpet merah bermotif",
        },
        size: "380 m2",
        capacity: "300 tamu",
        features: [
          "Penataan banquet meja bundar",
          "Dekat dengan dapur katering",
          "Ruang transit untuk pengantin",
        ],
      },
      {
        slug: "pulai",
        name: "Pulai",
        description:
          "Ruang rapat dengan penataan meja kelas dan pencahayaan hangat untuk sesi paralel konferensi.",
        image: {
          src: "/images/qhall-4.jpeg",
          alt: "Ruang Pulai dengan penataan meja kelas dan lampu gantung",
        },
        size: "240 m2",
        capacity: "180 peserta",
        features: [
          "Penataan kelas atau U-shape",
          "Proyektor dan layar",
          "Koneksi ke ruang breakout lain",
        ],
      },
      {
        slug: "the-q-hall-lantai-1",
        name: "The Q Hall Lantai 1",
        description:
          "Hall utama di lantai dasar untuk pameran, konvensi, dan jamuan besar dengan plafon tinggi.",
        image: {
          src: "/images/qhall-6.jpeg",
          alt: "The Q Hall Lantai 1 dengan meja bundar, karpet merah, dan lampu gantung emas",
        },
        size: "1.200 m2",
        capacity: "1.200 tamu",
        features: [
          "Akses dock bongkar-muat",
          "Dapat digabung dengan ballroom utama",
          "Rigging dan listrik tiga fasa",
        ],
      },
      {
        slug: "mahoni",
        name: "Mahoni",
        description:
          "Ruang pertemuan dan jamuan dengan penataan meja bundar serta kursi berkain untuk acara privat.",
        image: {
          src: "/images/mahoni-1.jpeg",
          alt: "Ruang Mahoni dengan meja bundar dan kursi berkain merah muda",
        },
        size: "320 m2",
        capacity: "240 tamu",
        features: [
          "Penataan banquet dan seminar",
          "Proyektor dan panggung kecil",
          "Dapur terhubung dengan katering Q Hall",
        ],
      },
      {
        slug: "mahoni-outdoor",
        name: "Mahoni Outdoor",
        description:
          "Area semi-terbuka di sisi Mahoni untuk acara santai, ulang tahun, dan resepsi bertema taman.",
        image: {
          src: "/images/mahoni-2.jpeg",
          alt: "Ruang Mahoni Outdoor dengan dekorasi balon dan panggung acara",
        },
        size: "260 m2",
        capacity: "200 tamu",
        features: [
          "Panggung dekorasi fleksibel",
          "Sirkulasi udara terbuka",
          "Cocok untuk acara keluarga",
        ],
      },
    ],
    facilities: [],
  },
  {
    slug: "paradis-q",
    name: "Paradis-Q Waterpark",
    type: "Waterpark",
    tagline: "Kolam ombak, kolam arus, dan menara seluncuran setinggi 22 meter",
    summary:
      "Waterpark keluarga dengan lima area kolam utama, menara seluncuran, serta Food Corner dan Rooftop Q di dalam kawasan.",
    description: [
      "Paradis-Q Waterpark adalah jantung pengalaman liburan keluarga di kawasan Q. Lima area kolam utama melayani setiap usia, mulai dari kolam anak berkedalaman 20 cm hingga kolam ombak seluas 1.100 m2 dan menara seluncuran setinggi 22 meter.",
      "Seluruh area memakai sistem filtrasi sirkulasi tertutup dengan pemantauan kualitas air setiap dua jam, serta dijaga lifeguard bersertifikat Bronze Medallion yang berpatroli bergiliran.",
      "Fasilitas penunjang meliputi loker, ruang bilas air hangat, ruang laktasi, Food Corner, dan Rooftop Q yang menghadap langsung ke area kolam.",
    ],
    image: {
      src: "/images/hero-waterpark-pool.jpg",
      alt: "Kolam dengan seluncuran warna-warni dan pohon palem di Paradis-Q Waterpark",
    },
    gallery: [
      {
        src: "/images/hero-waterpark-pool.jpg",
        alt: "Kolam dengan seluncuran warna-warni dan pohon palem di Paradis-Q Waterpark",
      },
      {
        src: "/images/work-aquapark.jpg",
        alt: "Keluarga bermain di kolam dangkal dengan seluncuran merah",
      },
      {
        src: "/images/work-lagoon-pool.jpg",
        alt: "Kolam luas dengan air biru jernih dan pohon palem",
      },
      {
        src: "/images/service-waterpark.jpg",
        alt: "Kolam ramai pengunjung dengan seluncuran dan pohon palem",
      },
      {
        src: "/images/service-waterpark-alt.jpg",
        alt: "Menara seluncuran biru dan putih dengan lintasan berundak",
      },
      {
        src: "/images/paradis-q-1.jpeg",
        alt: "Area makan terbuka di dalam kawasan Paradis-Q Waterpark",
      },
      {
        src: "/images/service-restaurant.jpg",
        alt: "Area makan dengan meja dan kursi menghadap laut",
      },
      {
        src: "/images/q-rooftop-1.jpeg",
        alt: "Rooftop Q dengan lorong dekorasi bunga dan meja bundar",
      },
      {
        src: "/images/q-rooftop-2.jpeg",
        alt: "Area makan Rooftop Q dengan meja bundar berkain emas",
      },
      {
        src: "/images/q-rooftop-3.jpeg",
        alt: "Panggung acara dengan dekorasi bunga di Rooftop Q",
      },
      {
        src: "/images/q-rooftop-4-indoor.jpeg",
        alt: "Ruang makan indoor Rooftop Q dengan meja bundar dan area buffet",
      },
    ],
    features: [
      "Kolam ombak 1.100 m2 dengan gelombang terjadwal",
      "Kolam arus sepanjang 260 meter",
      "Menara seluncuran setinggi 22 meter",
      "Kolam anak dengan kedalaman 20 – 40 cm",
      "Lifeguard bersertifikat dengan pemantauan berkala",
      "Food Corner dan Rooftop Q di dalam kawasan",
    ],
    specs: [
      { label: "Luas kawasan", value: "3,4 hektar" },
      { label: "Jenis kolam", value: "5 area kolam" },
      { label: "Kapasitas harian", value: "4.500 pengunjung" },
      { label: "Jam operasional", value: "09.00 – 18.00 WITA" },
      { label: "Seluncuran tertinggi", value: "22 meter" },
      { label: "Lokasi", value: "Kawasan Q, sisi utara" },
    ],
    hours: "09.00 – 18.00 WITA",
    roomTypesLabel: "Jenis Kolam",
    roomTypes: [
      {
        slug: "kolam-anak",
        name: "Kolam Anak",
        description:
          "Kolam dangkal berpemanas surya dengan seluncuran kecil dan pengawasan lifeguard untuk balita.",
        image: {
          src: "/images/work-aquapark.jpg",
          alt: "Keluarga bermain di kolam dangkal dengan seluncuran merah",
        },
        size: "Kedalaman 20 – 40 cm",
        capacity: "Anak & balita",
        features: [
          "Air hangat dari pemanas surya",
          "Seluncuran kecil khusus anak",
          "Lifeguard siaga penuh",
        ],
      },
      {
        slug: "semi-olympic",
        name: "Semi Olympic",
        description:
          "Kolam ukuran semi olimpiade dengan enam lintasan untuk berenang serius maupun latihan ringan.",
        image: {
          src: "/images/work-lagoon-pool.jpg",
          alt: "Kolam luas dengan air biru jernih dan pohon palem",
        },
        size: "25 meter, 6 lintasan",
        capacity: "Dewasa & remaja",
        features: [
          "Kedalaman 1,2 – 1,5 meter",
          "Lintasan dengan penanda jelas",
          "Area start dan finis untuk latihan",
        ],
      },
      {
        slug: "kolam-arus",
        name: "Kolam Arus",
        description:
          "Lazy river sepanjang 260 meter yang mengelilingi kawasan hijau waterpark.",
        image: {
          src: "/images/service-waterpark.jpg",
          alt: "Kolam ramai pengunjung dengan seluncuran dan pohon palem",
        },
        size: "260 meter",
        capacity: "Semua usia",
        features: [
          "Arus tenang mengikuti jalur lingkar",
          "Ban pelampung tersedia",
          "Titik keluar di beberapa zona",
        ],
      },
      {
        slug: "kolam-ombak",
        name: "Kolam Ombak",
        description:
          "Kolam ombak seluas 1.100 m2 dengan gelombang terjadwal setiap sesi.",
        image: {
          src: "/images/hero-waterpark-pool.jpg",
          alt: "Kolam ombak dengan seluncuran warna-warni dan pohon palem",
        },
        size: "1.100 m2",
        capacity: "Semua usia",
        features: [
          "Gelombang terjadwal tiap sesi",
          "Kedalaman bertahap 0,3 – 1,5 meter",
          "Area duduk di tepi kolam",
        ],
      },
      {
        slug: "tower-slide",
        name: "Tower Slide",
        description:
          "Menara seluncuran setinggi 22 meter dengan racer slide dan bowl slide untuk pencari adrenalin.",
        image: {
          src: "/images/service-waterpark-alt.jpg",
          alt: "Menara seluncuran biru dan putih dengan lintasan berundak",
        },
        size: "Tinggi 22 meter",
        capacity: "Tinggi minimal 120 cm",
        features: [
          "Racer slide multi-lintasan",
          "Bowl slide untuk satu atau dua orang",
          "Pemeriksaan tinggi badan di pintu masuk",
        ],
      },
    ],
    facilities: [
      {
        slug: "food-corner",
        name: "Food Corner",
        type: "Food Court",
        description:
          "Food court dengan delapan tenant bertema nusantara dan area makan beratap untuk pengunjung waterpark.",
        image: {
          src: "/images/service-restaurant.jpg",
          alt: "Area makan dengan meja dan kursi menghadap laut",
        },
      },
      {
        slug: "rooftop-q",
        name: "Rooftop Q",
        type: "Rooftop Venue",
        description:
          "Rooftop serbaguna untuk acara privat, jamuan, dan pernikahan dengan pemandangan langsung ke area waterpark.",
        image: {
          src: "/images/q-rooftop-1.jpeg",
          alt: "Rooftop Q dengan lorong dekorasi bunga dan meja bundar",
        },
      },
    ],
  },
  {
    slug: "villa",
    name: "Villa Town House",
    type: "Villa",
    tagline: "Enam villa privat dua lantai dengan kolam dan dapur sendiri",
    summary:
      "Enam villa privat berukuran dua sampai empat kamar dengan kolam pribadi, dapur, dan layanan villa host.",
    description: [
      "Villa Town House terdiri dari enam unit privat dua lantai berukuran dua sampai empat kamar tidur, masing-masing dengan kolam pribadi, dapur, dan ruang makan sendiri.",
      "Setiap villa memiliki villa host yang mengatur kebutuhan tamu, mulai dari transportasi, katering, hingga penjadwalan aktivitas keluarga.",
      "Villa cocok untuk keluarga besar, grup kecil, maupun tamu yang menginap jangka panjang dengan kebutuhan privasi lebih.",
    ],
    image: {
      src: "/images/villa-5.jpeg",
      alt: "Fasad bangunan Villa Town House dua lantai berwarna oranye",
    },
    gallery: [
      {
        src: "/images/villa-5.jpeg",
        alt: "Fasad bangunan Villa Town House dua lantai berwarna oranye",
      },
      {
        src: "/images/villa-1.jpeg",
        alt: "Kamar villa dengan lemari kayu dan meja rias",
      },
      {
        src: "/images/villa-6.jpeg",
        alt: "Kamar villa dengan dua tempat tidur twin dan lantai kayu",
      },
      {
        src: "/images/villa-7.jpeg",
        alt: "Kamar anak villa dengan tempat tidur tingkat dan karpet warna-warni",
      },
      {
        src: "/images/villa-2.jpeg",
        alt: "Ruang keluarga villa dengan sofa kuning dan tangga kayu",
      },
      {
        src: "/images/villa-3.jpeg",
        alt: "Ruang makan villa dengan meja kayu dan dapur kecil",
      },
      {
        src: "/images/villa-4.jpeg",
        alt: "Balkon villa dengan railing besi menghadap taman dan kolam",
      },
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
      { label: "Fasilitas", value: "Kolam privat, dapur, villa host" },
      { label: "Lokasi", value: "Kawasan Q, sisi selatan" },
    ],
    hours: "Check-in 14.00 · Check-out 12.00",
    facilities: [],
  },
];

export function getUnitBySlug(slug: string) {
  return businessUnits.find((unit) => unit.slug === slug);
}

/** Absolute href helpers so every layer builds the same URLs. */
export function unitHref(unit: BusinessUnit) {
  return "/unit-bisnis/" + unit.slug;
}

/** Entries for the "Destinasi" navigation dropdown, in display order. */
export const businessUnitMenu: NavItem[] = businessUnits.map((unit) => ({
  label: unit.name,
  href: unitHref(unit),
}));
