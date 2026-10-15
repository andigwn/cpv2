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
    name: "Qubu Suites Hotel",
    type: "Hotel & Suites",
    tagline:
      "Qubu Suites Hotel menghadirkan pengalaman menginap yang memadukan kenyamanan modern dengan ketenangan alam, menciptakan ruang untuk beristirahat, bersantai, dan menikmati setiap momen dengan lebih bermakna.",
    homeTagline:
      "88 kamar yang memadukan kenyamanan modern dengan suasana tenang. Tempat terbaik untuk beristirahat setelah seharian beraktivitas.",
    summary:
      "Nikmati pengalaman menginap istimewa di Qubu Suites Hotel, dengan kamar nyaman, balkon privat, dan fasilitas lengkap untuk bersantai bersama keluarga.",
    description: [
      "Qubu Suites Hotel menghadirkan pengalaman menginap yang nyaman dengan lima pilihan tipe kamar, mulai dari Deluxe, Deluxe with View, Suite Room, Family Suite, hingga Qubu Grand Suite.",
      "Setiap kamar dirancang dengan suasana yang modern dan nyaman, dilengkapi balkon privat serta fasilitas yang mendukung kebutuhan Anda selama menginap. Pilihan ruang yang beragam membuat Qubu Suites cocok untuk perjalanan bisnis, liburan bersama keluarga, maupun menikmati waktu untuk beristirahat.",
      "Tak hanya menawarkan kenyamanan menginap, Qubu Suites juga dilengkapi berbagai fasilitas dalam satu kawasan, mulai dari restoran, wellness & spa, kids Club, hingga ruang hiburan dan meeting room. Semua dirancang agar Anda dapat menikmati lebih banyak pengalaman tanpa perlu jauh dari kenyamanan hotel.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Kamar Hotel Qubu Suites dengan tempat tidur king dan panel kayu ukir",
    },
    // Sudut kiri frame masih kosong, jadi kolom copy hero tidak menimpa objek.
    heroImage: {
      src: "/images/qubu-suites-2.jpeg",
      alt: "Interior suite Hotel Qubu Suites dengan meja kerja dan jendela besar",
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
      "88 kamar dalam lima tipe",
      "Balkon privat di setiap tipe kamar",
      "Paradis-Q Waterpark",
      "Embun Resto",
      "Qubik Bar dan Entertainment Room",
      "Wellness & Spa dan Kids Club",
    ],
    specs: [
      { label: "Jumlah Kamar", value: "88 Kamar" },
      { label: "Tipe Kamar", value: "5 Tipe Kamar" },
      { label: "Luas Kamar", value: "27m2 – 75m2" },
      { label: "Check In / Out", value: "14:00/12:00 WIB" },
      {
        label: "Fasilitas",
        value:
          "Paradis-Q Waterpark, Embun Resto, Qubik Bar, entertain room, Wellness & Spa, kids club.",
      },
    ],
    hours: "Resepsionis 24 jam",
    roomTypesLabel: "Jenis Kamar",
    roomTypesNoun: "kamar",
    roomTypes: [
      {
        slug: "deluxe",
        name: "Deluxe Room",
        description:
          "Deluxe Room dirancang untuk menghadirkan kenyamanan yang dapat dinikmati oleh setiap tamu. Dilengkapi pilihan  tempat  tidur  Double  atau  Twin  yang  nyaman,  kamar mandi modern, area kerja yang fungsional, Smart TV 43 inci, serta  akses  internet  berkecepatan  tinggi.",
        image: {
          src: "/images/qubu-suites-2.jpeg",
          alt: "Kamar Deluxe dengan tempat tidur king dan meja kerja menghadap jendela",
        },
        images: [
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Kamar Deluxe dengan tempat tidur king dan meja kerja menghadap jendela",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Ruang tamu Deluxe dengan sofa, meja makan, dan televisi",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Kamar Deluxe dengan sofa dan jendela lebar",
          },
        ],
        size: "27m2",
        bed: "Double atau Twin size bed",
        capacity: "2 Tamu",
        view: "Street view / Garden view",
        location: "Lantai 1",
        countRoom: "24 Kamar",
      },
      {
        slug: "deluxe-with-view",
        name: "Deluxe with View",
        description:
          "Deluxe Room with View menghadirkan pengalaman menginap yang lebih istimewa di lantai 2 dan 3, dengan pemandangan dari kamar yang dapat dinikmati selama menginap. Dilengkapi pilihan tempat tidur Queen atau Twin, kamar mandi modern, Smart TV 43 inci, area kerja, serta akses internet berkecepatan tinggi.",
        image: {
          src: "/images/qubu-suites-1.jpeg",
          alt: "Kamar Deluxe with View dengan tempat tidur king dan panel kayu ukir",
        },
        images: [
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Kamar Deluxe with View dengan tempat tidur king dan panel kayu ukir",
          },
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Kamar Deluxe with View dengan meja kerja dan jendela besar",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Deluxe with View dengan panel kepala tempat tidur bergelombang",
          },
        ],
        size: "27m2",
        bed: "Double atau Twin size bed",
        capacity: "2 Tamu",
        view: "Pool view / Nature view",
        location: "Lantai 2 & Lantai 3",
        countRoom: "50 Kamar",
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Suite Room menghadirkan ruang yang luas dan elegan, dirancang untuk memberikan kenyamanan lebih bagi tamu yang menginginkan pengalaman menginap yang istimewa. Dilengkapi dengan living room dan pantry, memberikan ruang yang nyaman untuk bersantai maupun menikmati waktu bersama.",
        image: {
          src: "/images/qubu-suites-4.jpeg",
          alt: "Ruang tamu Suite Room dengan sofa dan meja makan",
        },
        images: [
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Ruang tamu Suite Room dengan sofa dan meja makan",
          },
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Kamar Suite Room dengan tempat tidur king dan panel kayu ukir",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Suite Room dengan panel kepala tempat tidur bergelombang",
          },
        ],
        size: "48m2",
        bed: "Double size bed",
        capacity: "2 Tamu",
        view: "Pool view / Nature view",
        location: "Lantai 1, 2 dan 3",
        countRoom: "6 Kamar",
      },
      {
        slug: "family-suite",
        name: "Family Suite",
        description:
          "Family Suite menghadirkan ruang yang luas dan nyaman, dirancang khusus untuk keluarga yang ingin menikmati waktu bersama dengan lebih leluasa. Dilengkapi dengan dua kamar tidur dan dua kamar mandi, memberikan privasi dan kenyamanan bagi setiap anggota keluarga. Pilihan tepat untuk keluarga besar yang menginginkan ruang yang nyaman dan praktis selama menginap.",
        image: {
          src: "/images/qubu-suites-3.jpeg",
          alt: "Dapur kecil dan area minibar di Family Suite Hotel Qubu Suites",
        },
        images: [
          {
            src: "/images/qubu-suites-3.jpeg",
            alt: "Dapur kecil dan area minibar di Family Suite Hotel Qubu Suites",
          },
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Kamar Family Suite dengan meja kerja dan jendela besar",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Ruang tamu Family Suite dengan sofa dan meja makan",
          },
        ],
        size: "75m2",
        bed: "Double & Twin Size bed",
        capacity: "4 Tamu",
        view: "Pool view / Nature view",
        location: "Lantai 1 & Lantai 2",
        countRoom: "3 Kamar",
      },
      {
        slug: "qubu-grand-suite",
        name: "Qubu Grand Suite",
        description:
          "Qubu Grand Suite merupakan tipe kamar paling luas dan eksklusif di Qubu Suites Hotel, menghadirkan ruang yang elegan dengan fasilitas premium untuk pengalaman menginap yang istimewa. Dilengkapi bathtub dengan pemandangan langsung ke waterpark, living room yang nyaman, serta walk-in closet yang luas, setiap ruang dirancang untuk memberikan kenyamanan dan privasi dalam satu pengalaman yang berkelas.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Qubu Grand Suite dengan area duduk dan tempat tidur menghadap jendela besar",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Qubu Grand Suite dengan area duduk dan tempat tidur menghadap jendela besar",
          },
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Kamar Qubu Grand Suite dengan tempat tidur king dan panel kayu ukir",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Ruang tamu Qubu Grand Suite dengan sofa dan meja makan",
          },
        ],
        size: "75m2",
        bed: "Double & Twin Size bed",
        capacity: "4 Tamu",
        view: "Pool / Nature / forest view",
        location: "Lantai 3",
        countRoom: "1 Kamar",
      },
    ],
    facilities: [
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
        type: "Entertainment Room",
        description:
          "Ruang hiburan untuk bersantai dan berkumpul, baik untuk mengisi waktu luang setelah seharian beraktivitas maupun berkumpul bersama sebelum beristirahat.",
        highlights: [
          "Hiburan di dalam hotel. Praktis dan mudah diakses selama Anda menginap.",
          "Cocok untuk berkumpul. Sesuai untuk keluarga, teman, maupun rombongan.",
          "Suasana nyaman dan santai. Pas untuk melepas lelah setelah perjalanan.",
        ],
        image: {
          src: "/images/work-lobby.jpg",
          alt: "Ruang santai dengan sofa merah dan meja kayu",
        },
      },
      {
        slug: "kids-club",
        name: "Kids Club",
        type: "Kids Club",
        description:
          "Ruang bermain yang menyenangkan untuk si kecil, cocok dijadikan tempat bermain setelah check-in, di sela agenda keluarga, atau sebelum waktu istirahat malam.",
        highlights: [
          "Suasana ceria dan ramah anak.",
          "Tempat bermain di dalam hotel.",
          "Pas untuk liburan keluarga.",
        ],
        note: "Anak-anak sebaiknya didampingi orang tua atau pendamping selama bermain.",
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
    tagline:
      "Hotel Q menghadirkan suasana santai dengan sentuhan modern dan aksen lokal. Dengan 38 kamar dalam berbagai pilihan tipe, nikmati ruang yang nyaman untuk beristirahat dan recharge.",
    homeTagline:
      "Hotel bintang 4 dengan suasana santai, sentuhan modern, dan aksen lokal. Pilihan menginap hangat untuk liburan maupun perjalanan dinas.",
    summary:
      "Hotel Q menawarkan suasana santai dengan sentuhan gaya hidup modern yang dipadukan dengan aksen lokal. Dengan 38 kamar dalam berbagai pilihan tipe, Hotel Q menjadi tempat yang nyaman untuk beristirahat dan menikmati waktu dengan lebih tenang.",
    description: [
      "Hotel Q adalah bangunan utama kawasan Q dan pintu masuk bagi sebagian besar tamu. Tersedia lima tipe kamar: Superior, Superior Plus, Premier, Premier Plus, dan Suite Room.",
      "Lobby berkonsep atrium menghubungkan resepsionis, lobby lounge, dan pusat informasi wisata bagi tamu yang baru tiba di kawasan Q.",
      "Fasilitas penunjang meliputi kolam dewasa dan kolam anak, pusat kebugaran, meeting room, serta jalur pejalan kaki beratap menuju The Q Hall dan Paradis-Q.",
    ],
    image: {
      src: "/images/hotel-q-1.jpeg",
      alt: "Fasad Hotel Q dengan lapisan kisi geometris merah dan putih",
    },
    heroImage: {
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
      "Kolam dewasa dan kolam anak",
      "Meeting room untuk pertemuan kecil",
      "Pusat kebugaran 24 jam",
      "Lobby lounge dan pusat informasi wisata",
      "Jalur pejalan kaki beratap ke The Q Hall dan Paradis-Q",
    ],
    specs: [
      { label: "Jumlah Kamar", value: "38 Kamar" },
      { label: "Tipe Kamar", value: "5 Tipe Kamar" },
      { label: "Luas Kamar", value: "18-45m2" },
      { label: "Check In / Out", value: "14:00/12:00 WIB" },
      { label: "Fasilitas Unggulan", value: "Paradis-Q Waterpark" },
    ],
    hours: "Resepsionis 24 jam",
    roomTypesLabel: "Jenis Kamar",
    roomTypesNoun: "kamar",
    roomTypes: [
      {
        slug: "superior",
        name: "Superior Room",
        description:
          "Nikmati kenyamanan yang sederhana namun tetap berkesan, dengan ruang yang dirancang untuk menghadirkan pengalaman menginap yang tenang dan praktis.",
        image: {
          src: "/images/hotel-q-2.jpeg",
          alt: "Kamar Superior Hotel Q dengan tempat tidur besar dan handuk berbentuk gajah",
        },
        images: [
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Kamar Superior Hotel Q dengan tempat tidur besar dan handuk berbentuk gajah",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Kamar Superior dengan sofa, tempat tidur besar, dan jendela lebar",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Superior dengan panel kepala tempat tidur bergelombang",
          },
        ],
        size: "21m2",
        bed: "Double atau Twin Size bed",
        capacity: "2 Tamu",
        view: "Lotus / Teras field / City view",
        location: "Lantai 1, 2 dan 3",
        countRoom: "Double (17 Kamar) / Twin (11 Kamar)",
      },
      {
        slug: "superior-plus",
        name: "Superior Plus",
        description:
          "Rasakan ruang yang lebih luas dan kenyamanan yang lebih lengkap, ideal untuk beristirahat setelah menikmati berbagai pengalaman di Hotel Q.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Kamar Superior Plus dengan sofa, tempat tidur besar, dan jendela lebar",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Kamar Superior Plus dengan sofa, tempat tidur besar, dan jendela lebar",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Kamar Superior Plus dengan tempat tidur besar",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Superior Plus dengan panel kepala tempat tidur bergelombang",
          },
        ],
        size: "24m2",
        bed: "Double atau Twin Size bed",
        capacity: "2 Tamu",
        view: "Lotus / Teras field / City view",
        location: "Lantai 2 dan 3",
        countRoom: "Double (4 Kamar) / Twin (2 Kamar)",
      },
      {
        slug: "premier",
        name: "Premier Room",
        description:
          "Hadir dengan ruang yang lebih lapang dan suasana yang lebih nyaman, Premier Room menawarkan pengalaman menginap yang lebih istimewa untuk setiap perjalanan.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Kamar Premier dengan tempat tidur besar dan panel kepala tempat tidur bergelombang",
        },
        images: [
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Premier dengan tempat tidur besar dan panel kepala tempat tidur bergelombang",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Kamar Premier dengan sofa dan jendela lebar",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Kamar Premier dengan tempat tidur besar dan dekorasi handuk",
          },
        ],
        size: "36m2",
        bed: "Double atau Twin Size bed",
        capacity: "2 Tamu",
        view: "Lotus / Teras field / City view",
        location: "Lantai 2 dan 3",
        countRoom: "Double (2 Kamar)",
      },
      {
        slug: "premier-plus",
        name: "Premier Plus",
        description:
          "Lebih luas, lebih nyaman, dan dirancang untuk memberikan ruang bagi Anda untuk bersantai dan menikmati waktu selama berada di Hotel Q.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Kamar Premier Plus dengan sofa dan tempat tidur menghadap jendela besar",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Kamar Premier Plus dengan sofa dan tempat tidur menghadap jendela besar",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Kamar Premier Plus dengan tempat tidur besar dan panel bergelombang",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Kamar Premier Plus dengan tempat tidur besar dan dekorasi handuk",
          },
        ],
        size: "45m2",
        bed: "Double atau Twin Size bed",
        capacity: "2 Tamu",
        view: "Lotus / Teras field / City view",
        location: "Lantai 3",
        countRoom: "King Bed (1 Kamar)",
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Nikmati pengalaman menginap yang lebih lengkap dengan ruang yang luas dan area untuk bersantai, menciptakan suasana yang nyaman untuk menikmati momen bersama orang terdekat.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Suite Room dengan tempat tidur besar dan area duduk di Hotel Q",
        },
        images: [
          {
            src: "/images/work-suite.jpg",
            alt: "Suite Room dengan tempat tidur besar dan area duduk di Hotel Q",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Ruang tamu Suite Room dengan sofa dan jendela lebar",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Kamar Suite Room Hotel Q dengan tempat tidur besar",
          },
        ],
        size: "40m2",
        bed: "Double atau Twin Size bed",
        capacity: "2 Tamu",
        view: "Lotus / Teras field / City view",
        location: "Lantai 2",
        countRoom: "King Bed (1 Kamar)",
      },
    ],
    // No supporting facilities of its own: the meeting room it shares is published on the
    // Qubu Suites page, so the band is dropped from this page rather than duplicated.
    facilities: [],
    showFacilitiesSection: false,
  },
  {
    slug: "qhall",
    name: "The Q Hall Ballroom and Convention Center",
    type: "Ballroom and Convention Center",
    tagline:
      "Dengan kapasitas hingga 2.000 tamu, The Q Hall Convention Center hadir sebagai ruang yang fleksibel untuk berbagai momen, mulai dari wedding, konferensi, meeting, seminar, workshop, hingga gathering.",
    homeTagline:
      "Ballroom dengan kapasitas hingga 2.000 tamu. Siap untuk pernikahan, konferensi, seminar, hingga gathering perusahaan.",
    summary:
      "Ruang yang luas dan nyaman untuk konferensi, pameran, dan pernikahan Anda, didukung tim event yang siap mendampingi dari perencanaan hingga hari acara.",
    description: [
      "Ballroom utama The Q Hall seluas 1.340 m² dirancang tanpa pilar, sehingga seluruh tamu Anda dapat menikmati acara dengan pandangan yang leluasa. Bila jumlah tamu lebih kecil, ballroom dapat dibagi menjadi tiga ruang yang berdiri sendiri.",
      "Kami juga menyediakan enam ruang pertemuan dengan ukuran dan kapasitas berbeda untuk sesi paralel, jamuan, maupun acara privat Anda.",
      "Tim event kami membantu menyiapkan kebutuhan teknis, katering hingga ribuan porsi, serta akomodasi bagi peserta yang menginap di Hotel Q dan Hotel Qubu Suites. Dengan begitu, Anda dapat memusatkan perhatian pada isi acara.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "Fasad The Q Hall Convention Center dengan kanopi kawat dekoratif",
    },
    heroImage: {
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
      "VIP Room / Ruang Naratama. Area khusus untuk tamu spesial. Dapat digunakan sebagai ruang transit ataupun persiapan bagi tamu spesial Anda.",
      "Layar LED Videotron, sistem audio, dan rigging terintegrasi. Mendukung produksi acara berskala besar.",
      "Katering hingga ribuan pax dengan dapur halal. Memberi kenyamanan bagi seluruh tamu Anda.",
    ],
    specs: [
      { label: "Luas ballroom utama", value: "1.340 m²" },
      { label: "Pilihan ruang pertemuan", value: "6 ruangan" },
      { label: "Kapasitas penataan banquet", value: "2.000 pax" },
    ],
    hours: "Jadwal dapat disesuaikan dengan kebutuhan Anda",
    roomTypesLabel: "Pilihan Ruangan",
    roomTypesNoun: "ruangan",
    roomTypes: [
      {
        slug: "lontar",
        name: "Lontar",
        description:
          "Ruang jamuan nyaman untuk meeting, resepsi, dan makan malam delegasi. Berletak dekat dengan entrance QHall.",
        image: {
          src: "/images/qhall-3.jpeg",
          alt: "Ruang Lontar dengan meja bundar dan karpet merah bermotif",
        },
        images: [
          {
            src: "/images/qhall-3.jpeg",
            alt: "Ruang Lontar dengan meja bundar dan karpet merah bermotif",
          },
          {
            src: "/images/qhall-6.jpeg",
            alt: "Ruang jamuan dengan meja bundar dan lampu gantung emas",
          },
          {
            src: "/images/qhall-2.jpeg",
            alt: "Ruang Lontar dengan penataan kursi dan karpet bermotif merah",
          },
        ],
        size: "204 m²",
      },
      {
        slug: "merbau",
        name: "Merbau",
        description:
          "Ruang rapat dengan pencahayaan hangat untuk sesi konferensi Anda. Penataan dapat berupa classroom, teater, atau U-shape, dengan proyektor dan layar.",
        image: {
          src: "/images/qhall-2.jpeg",
          alt: "Ruang Merbau dengan barisan kursi dan karpet bermotif merah",
        },
        images: [
          {
            src: "/images/qhall-2.jpeg",
            alt: "Ruang Merbau dengan barisan kursi dan karpet bermotif merah",
          },
          {
            src: "/images/qhall-4.jpeg",
            alt: "Ruang Merbau dengan penataan meja kelas dan lampu gantung",
          },
          {
            src: "/images/qhall-6.jpeg",
            alt: "Ruang Merbau dengan meja bundar, karpet merah, dan lampu gantung emas",
          },
        ],
        size: "306 m²",
      },
      {
        slug: "pulai",
        name: "Pulai",
        description:
          "Ruang pertemuan terluas, dengan penataan teater, standing, atau banquet sesuai kebutuhan Anda. Dapat dilengkapi dengan layar LED Videotron dan sound system.",
        image: {
          src: "/images/qhall-4.jpeg",
          alt: "Ruang Pulai dengan penataan meja kelas dan lampu gantung",
        },
        images: [
          {
            src: "/images/qhall-4.jpeg",
            alt: "Ruang Pulai dengan penataan meja kelas dan lampu gantung",
          },
          {
            src: "/images/qhall-2.jpeg",
            alt: "Ruang Pulai dengan barisan kursi dan karpet merah",
          },
          {
            src: "/images/qhall-3.jpeg",
            alt: "Ruang Pulai dengan meja bundar dan karpet bermotif",
          },
        ],
        size: "740 m²",
      },
      {
        slug: "the-q-hall-lantai-1",
        name: "The Q Hall Lantai 1",
        description:
          "Hall utama yang terbesar di lantai dasar hasil gabungan ke 3 ruangan untuk pameran, konvensi, dan jamuan besar. Tersedia akses dock bongkar-muat dan rigging.",
        image: {
          src: "/images/qhall-6.jpeg",
          alt: "The Q Hall Lantai 1 dengan meja bundar, karpet merah, dan lampu gantung emas",
        },
        images: [
          {
            src: "/images/qhall-6.jpeg",
            alt: "The Q Hall Lantai 1 dengan meja bundar, karpet merah, dan lampu gantung emas",
          },
          {
            src: "/images/qhall-3.jpeg",
            alt: "The Q Hall Lantai 1 dengan meja bundar dan karpet merah",
          },
          {
            src: "/images/qhall-4.jpeg",
            alt: "The Q Hall Lantai 1 dengan penataan meja kelas",
          },
        ],
        size: "1.340 m²",
      },
      {
        slug: "mahoni",
        name: "Mahoni",
        description:
          "Ruang yang nyaman untuk seminar maupun jamuan privat Anda, dengan penataan banquet atau seminar. Dilengkapi proyektor dan panggung kecil siap untuk menyempurnakan acara Anda.",
        image: {
          src: "/images/mahoni-1.jpeg",
          alt: "Ruang Mahoni dengan meja bundar dan kursi berkain merah muda",
        },
        images: [
          {
            src: "/images/mahoni-1.jpeg",
            alt: "Ruang Mahoni dengan meja bundar dan kursi berkain merah muda",
          },
          {
            src: "/images/mahoni-2.jpeg",
            alt: "Ruang Mahoni dengan dekorasi acara dan panggung",
          },
          {
            src: "/images/qhall-5.jpeg",
            alt: "Ruang jamuan dengan lorong dekorasi bunga dan lampu gantung",
          },
        ],
        size: "368 m²",
      },
      {
        slug: "mahoni-outdoor",
        name: "Mahoni Outdoor",
        description:
          "Area semi terbuka dengan sirkulasi udara alami, sesuai untuk ulang tahun, acara keluarga, dan resepsi privat bertema taman. Panggung dekorasi dapat disesuaikan dengan konsep Anda.",
        image: {
          src: "/images/mahoni-2.jpeg",
          alt: "Ruang Mahoni Outdoor dengan dekorasi balon dan panggung acara",
        },
        images: [
          {
            src: "/images/mahoni-2.jpeg",
            alt: "Ruang Mahoni Outdoor dengan dekorasi balon dan panggung acara",
          },
          {
            src: "/images/mahoni-1.jpeg",
            alt: "Ruang Mahoni Outdoor dengan meja bundar dan kursi berkain",
          },
          {
            src: "/images/qhall-5.jpeg",
            alt: "Area semi-terbuka dengan lorong dekorasi bunga",
          },
        ],
        size: "442 m²",
      },
    ],
    facilities: [],
    sectionCopy: {
      heroCtaLabel: "Konsultasikan Acara Anda",
      heroNote: "Jadwal dapat disesuaikan dengan kebutuhan Anda",
      profile: {
        eyebrow: "Sekilas The Q Hall",
        title: "Ruang yang mendukung acara Anda berjalan dengan baik",
      },
      rooms: {
        eyebrow: "Pilihan Ruangan",
        title: "Pilihan ruangan sesuai kebutuhan acara Anda",
        description:
          "Setiap ruangan memiliki ukuran, kapasitas, dan fasilitas yang berbeda agar sesuai dengan acara Anda.",
        ctaLabel: "Tanyakan Ketersediaan",
      },
      facilities: {
        eyebrow: "Fasilitas Pendukung",
        title: "Fasilitas lainnya untuk kelancaran acara Anda",
        description:
          "Perlengkapan lainnya yang tersedia sehingga acara Anda menjadi lebih berkesan.",
      },
      gallery: {
        eyebrow: "Galeri",
        title: "Galeri The Q Hall Ballroom Convention Center",
        description:
          "Lihat tampilan hall kami sebagai gambaran untuk perencanaan acara terbaik Anda.",
      },
      closing: {
        title: "Siap merencanakan acara Anda?",
        description:
          "Sampaikan tanggal, jumlah tamu, dan konsep acara yang Anda inginkan. Tim Q Hall kami akan sigap menyiapkan acara Anda menjadi yang tak terlupakan.",
        ctaLabel: "Hubungi Kami Sekarang",
      },
    },
  },
  {
    slug: "paradis-q",
    name: "Paradis-Q Waterpark",
    type: "Waterpark",
    tagline:
      "Saatnya seru-seruan di Paradis-Q Waterpark! Rasakan keseruan wave pool, nikmati berbagai wahana air, berenang di area yang rindang, atau sekadar santai di gazebo bersama keluarga.",
    homeTagline:
      "Waterpark keluarga dengan wave pool, kiddy pool, area rindang, dan gazebo untuk bersantai bersama orang tersayang.",
    summary:
      "Destinasi rekreasi air untuk keluarga, menghadirkan beragam kolam dan wahana air untuk berbagai usia. Temukan keseruan di Paradis Q Waterpark, dengan beragam pengalaman air melalui lima kolam dengan keseruan yang berbeda hingga merasakan sensasi wahana yang menantang. Dilengkapi area bersantai dan pilihan kuliner. Jadikan hari lebih seru dengan berenang di Paradis Q Waterpark.",
    description: [
      "Destinasi rekreasi air untuk keluarga, menghadirkan beragam kolam dan wahana air untuk berbagai usia. Temukan keseruan di Paradis Q Waterpark, dengan beragam pengalaman air melalui lima kolam dengan keseruan yang berbeda hingga merasakan sensasi wahana yang menantang.",
      "Dilengkapi area bersantai dan pilihan kuliner. Jadikan hari lebih seru dengan berenang di Paradis Q Waterpark.",
    ],
    image: {
      src: "/images/thower_slide_1.jpg",
      alt: "Menara seluncur warna-warni setinggi 22 meter di Paradis-Q Waterpark",
    },
    // Bidikan landscape terlebar di kawasan: menara, seluncur, dan kolam dalam satu frame.
    heroImage: {
      src: "/images/thower_slide_1.jpg",
      alt: "Menara seluncur dan kolam utama Paradis-Q Waterpark",
    },
    gallery: [
      {
        src: "/images/thower_slide_1.jpg",
        alt: "Menara seluncuran warna-warni dengan lintasan kuning, biru, dan hijau",
      },
      {
        src: "/images/kolam_ombak_2.jpg",
        alt: "Pengunjung bermain di kolam ombak dengan ban pelampung hijau",
      },
      {
        src: "/images/kolam_arus_1.jpg",
        alt: "Alur kolam arus di antara bebatuan dan tanaman hijau",
      },
      {
        src: "/images/kolam_anak_1.jpg",
        alt: "Struktur bermain air dengan seluncuran kecil dan ember tumpah di kolam anak",
      },
      {
        src: "/images/semi_olympic_2.jpg",
        alt: "Lintasan kolam semi olimpiade dengan tali pembatas dan pengunjung berenang",
      },
      {
        src: "/images/thower_slide_2.jpg",
        alt: "Seluncuran menara dengan cipratan air dan tema tebing batu",
      },
      {
        src: "/images/thower_slide_3.jpg",
        alt: "Tampak luas kawasan waterpark dengan menara seluncuran dan kolam",
      },
      {
        src: "/images/kolam_ombak_1.jpg",
        alt: "Kolam ombak dengan gelombang dan pohon palem di tepian",
      },
      {
        src: "/images/kolam_ombak_3.jpg",
        alt: "Kolam ombak ramai pengunjung di bawah pohon palem",
      },
      {
        src: "/images/kolam_arus_2.jpg",
        alt: "Pengunjung mengapung di kolam arus dengan ban pelampung kuning",
      },
      {
        src: "/images/kolam_arus_3.jpg",
        alt: "Alur kolam arus yang berkelok di antara bebatuan",
      },
      {
        src: "/images/kolam_anak_2.jpg",
        alt: "Kolam anak dengan ember tumpah dan seluncuran kecil",
      },
      {
        src: "/images/kolam_anak_3.jpg",
        alt: "Ember raksasa menuangkan air di area bermain kolam anak",
      },
      {
        src: "/images/semi_olympic_1.jpg",
        alt: "Kolam semi olimpiade dengan pengunjung berenang dan dek bermotif",
      },
      {
        src: "/images/semi_olympic_3.jpg",
        alt: "Kolam luas menghadap bangunan dan taman tropis",
      },
    ],
    features: [
      "Lima kolam dengan keseruan yang berbeda",
      "Wahana air menantang untuk sensasi penuh",
      "Area bersantai dan pilihan kuliner",
    ],
    specs: [
      { label: "Jumlah Kolam", value: "5 Kolam" },
      { label: "Harga", value: "Weekday 75.000 & Weekend 125.000" },
      { label: "Jam Operasional", value: "09:00 – 17:00 WIB" },
      { label: "Masuk Gratis", value: "Lansia 60+ & Anak <80 CM" },
    ],
    hours: "09:00 – 17:00 WIB",
    roomTypesLabel: "Jenis Kolam",
    roomTypesNoun: "kolam",
    roomTypes: [
      {
        slug: "kolam-anak",
        name: "Kolam Anak",
        description: "Kolam anak dengan berbagai wahana seru dan tong air raksasa yang ikonik.",
        image: {
          src: "/images/kolam_anak_1.jpg",
          alt: "Struktur bermain air dengan seluncur kecil dan ember tumpah di kolam anak",
        },
        images: [
          {
            src: "/images/kolam_anak_1.jpg",
            alt: "Struktur bermain air dengan seluncur kecil dan ember tumpah di kolam anak",
          },
          {
            src: "/images/kolam_anak_2.jpg",
            alt: "Kolam anak dengan ember tumpah dan seluncur kecil",
          },
          {
            src: "/images/kolam_anak_3.jpg",
            alt: "Ember raksasa menuangkan air di area bermain kolam anak",
          },
        ],
        size: "40 CM",
        capacity: "Anak & Balita",
        specLabels: { size: "Kedalaman Kolam", capacity: "Kategori Kolam" },
      },
      {
        slug: "kolam-arus",
        name: "Kolam Arus",
        description:
          "Kolam arus ditengah suasana hijau yang asri dengan aliran tenang untuk bersantai mengikuti arus.",
        image: {
          src: "/images/kolam_arus_1.jpg",
          alt: "Alur kolam arus di antara bebatuan dan tanaman hijau",
        },
        images: [
          {
            src: "/images/kolam_arus_1.jpg",
            alt: "Alur kolam arus di antara bebatuan dan tanaman hijau",
          },
          {
            src: "/images/kolam_arus_2.jpg",
            alt: "Pengunjung mengapung di kolam arus dengan ban pelampung kuning",
          },
          {
            src: "/images/kolam_arus_3.jpg",
            alt: "Alur kolam arus yang berkelok di antara bebatuan",
          },
        ],
        size: "120 CM",
        capacity: "Umum",
        specLabels: { size: "Kedalaman Kolam", capacity: "Kategori Kolam" },
      },
      {
        slug: "semi-olympic",
        name: "Semi Olympic",
        description: "Kolam semi Olympic yang nyaman untuk menikmati waktu berenang lebih tenang.",
        image: {
          src: "/images/semi_olympic_2.jpg",
          alt: "Lintasan kolam semi olimpiade dengan tali pembatas dan pengunjung berenang",
        },
        images: [
          {
            src: "/images/semi_olympic_2.jpg",
            alt: "Lintasan kolam semi olimpiade dengan tali pembatas dan pengunjung berenang",
          },
          {
            src: "/images/semi_olympic_1.jpg",
            alt: "Kolam semi olimpiade dengan pengunjung berenang dan dek bermotif",
          },
          {
            src: "/images/semi_olympic_3.jpg",
            alt: "Kolam semi olimpiade menghadap bangunan dan taman tropis",
          },
        ],
        size: "80 CM – 2 M",
        capacity: "Remaja & Dewasa",
        specLabels: { size: "Kedalaman Kolam", capacity: "Kategori Kolam" },
      },
      {
        slug: "kolam-ombak",
        name: "Kolam Ombak",
        description:
          "Kolam ombak ikonik dengan gelombang yang hadir berkala, menghadirkan sensasi seru dan tak terduga.",
        image: {
          src: "/images/kolam_ombak_2.jpg",
          alt: "Pengunjung bermain di kolam ombak dengan ban pelampung hijau",
        },
        images: [
          {
            src: "/images/kolam_ombak_2.jpg",
            alt: "Pengunjung bermain di kolam ombak dengan ban pelampung hijau",
          },
          {
            src: "/images/kolam_ombak_1.jpg",
            alt: "Kolam ombak dengan gelombang dan pohon palem di tepian",
          },
          {
            src: "/images/kolam_ombak_3.jpg",
            alt: "Kolam ombak ramai pengunjung di bawah pohon palem",
          },
        ],
        size: "0 – 2 M",
        capacity: "Umum",
        specLabels: { size: "Kedalaman Kolam", capacity: "Kategori Kolam" },
      },
      {
        slug: "tower-slide",
        name: "Kolam Seluncuran",
        description: "Kolam seluncuran dengan lintasan ekstrem untuk pengalaman penuh adrenalin.",
        image: {
          src: "/images/thower_slide_1.jpg",
          alt: "Menara seluncur warna-warni dengan kolam di bawahnya",
        },
        images: [
          {
            src: "/images/thower_slide_1.jpg",
            alt: "Menara seluncur warna-warni dengan kolam di bawahnya",
          },
          {
            src: "/images/thower_slide_2.jpg",
            alt: "Seluncuran menara dengan cipratan air dan tema tebing batu",
          },
          {
            src: "/images/thower_slide_3.jpg",
            alt: "Tampak luas kawasan waterpark dengan menara seluncur dan kolam",
          },
        ],
        size: "80 CM",
        capacity: "Umum",
        specLabels: { size: "Kedalaman Kolam", capacity: "Kategori Kolam" },
      },
    ],
    facilities: [
      {
        slug: "rooftop-q",
        name: "Rooftop Q",
        type: "Rooftop Venue",
        description:
          "Rooftop Q area dengan pemandangan langsung ke waterpark dengan area indoor dan semi outdoor, cocok untuk berbagai jenis event.",
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
    tagline:
      "Destinasi penginapan di Qubu Resort yang terdiri dari empat villa dua lantai, cocok untuk keluarga besar maupun tamu dengan kebutuhan privasi lebih.",
    homeTagline:
      "Empat villa dua lantai untuk keluarga besar atau rombongan yang menginginkan privasi lebih.",
    summary:
      "Destinasi penginapan di Qubu Resort yang terdiri dari empat villa dua lantai, cocok untuk keluarga besar maupun tamu dengan kebutuhan privasi lebih.",
    description: [
      "Destinasi penginapan di Qubu Resort yang terdiri dari empat villa dua lantai, cocok untuk keluarga besar maupun tamu dengan kebutuhan privasi lebih.",
    ],
    image: {
      src: "/images/villa-5.jpeg",
      alt: "Fasad bangunan Villa Town House dua lantai berwarna oranye",
    },
    heroImage: {
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
      "2 Kamar + 1 Kamar Anak",
      "Mini Chiller",
      "Ruang Tamu",
      "AC & Bebas Asap Rokok",
      "Air Panas",
      "Balkon Lantai 2",
      "Dapur + Sarapan Gratis untuk 6 Orang",
      "6 Tiket Masuk Paradis-Q Waterpark",
      "Wi-Fi Gratis",
      "Antar-Jemput Bandara/A Yani Gratis",
    ],
    specs: [
      { label: "Jumlah Villa", value: "4 Unit" },
      { label: "Jumlah Kamar", value: "3 Kamar" },
      { label: "Check-In / Out", value: "14:00 / 12:00 WIB" },
    ],
    hours: "Check-In 14:00 · Check-Out 12:00",
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

/** Link to one section of a destination page. The anchor is rendered on the page itself,
 *  so the menu reveals content that already exists instead of opening a second page. */
export function unitAnchorHref(unit: BusinessUnit, anchor: string) {
  return unitHref(unit) + "#" + anchor;
}

/**
 * The "Fasilitas pendukung" entries of a destination, for its navbar submenu.
 *
 * Deliberately narrow: only the supporting-facility cards become submenu rows — not the
 * room/venue/pool types and not the gallery, which are long lists better reached by
 * scrolling. Because the list is derived from `facilities` itself, only the destinations
 * that actually publish those cards (Qubu Suites, Paradis-Q Waterpark) grow a submenu;
 * the rest keep a plain menu row that opens their page.
 */
export function unitFacilityMenu(unit: BusinessUnit): NavItem[] {
  return unit.facilities.map((facility) => ({
    label: facility.name,
    href: unitAnchorHref(unit, facility.slug),
  }));
}
