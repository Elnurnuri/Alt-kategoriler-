import { MainCategory, Product } from '../types';

import heroBannerImg from '../assets/images/hero_category_banner_1791295097415.jpg';
import laptopsImg from '../assets/images/subcat_laptops_tech_1791295110855.jpg';
import audioImg from '../assets/images/subcat_audio_sound_1791295124522.jpg';
import smartwatchImg from '../assets/images/subcat_smartwatch_wearable_1791295135906.jpg';
import camerasImg from '../assets/images/subcat_cameras_photo_1791295147090.jpg';

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'elektronik',
    name: 'Elektronik & Bilişim',
    slug: 'elektronik-bilisim',
    tagline: 'Gelişmiş mühendislik, ultra taşınabilir iş istasyonları ve üst düzey ses teknolojisi',
    iconName: 'Cpu',
    heroImage: heroBannerImg,
    subcategories: [
      {
        id: 'bilgisayar-laptop',
        name: 'Dizüstü & Masaüstü Bilgisayarlar',
        slug: 'dizustu-masaustu-bilgisayarlar',
        description: 'Ultra hafif ultrabook modellerinden stüdyo sınıfı iş istasyonlarına ve yüksek FPS oyuncu bilgisayarlarına kadar geniş ürün yelpazesi.',
        itemCount: 148,
        image: laptopsImg,
        featured: true,
        bannerHighlight: 'Yeni Nesil M3 & Intel Core Ultra İşlemcili Modeller',
        buyingGuide: 'Hafiflik ve 18+ saat pil ömrü için Ultrabook; 3D render ve mühendislik simülasyonları için RTX 4080+ GPU ve en az 32GB RAM tercih edin.',
        childCategories: [
          { id: 'ultrabook', name: 'Ultra Taşınabilir Laptoplar', count: 54 },
          { id: 'gaming-laptop', name: 'Oyuncu Laptopları (RTX Serisi)', count: 42 },
          { id: 'workstation', name: 'Mobil İş İstasyonları', count: 28 },
          { id: 'desktop-mini', name: 'Masaüstü & Mini PC', count: 24 }
        ],
        popularBrands: ['Apple', 'Dell', 'Lenovo', 'Asus', 'Razer']
      },
      {
        id: 'ses-kulaklik',
        name: 'Ses Sistemleri & Kulaklıklar',
        slug: 'ses-sistemleri-kulakliklar',
        description: 'Kayıpsız stüdyo akustiği, aktif gürültü engelleme (ANC) teknolojisi ve yüksek çözünürlüklü Hi-Res kablosuz ses deneyimi.',
        itemCount: 96,
        image: audioImg,
        featured: true,
        bannerHighlight: 'Stüdyo Referans ve ANC Kulaklıklarda Özel İndirimler',
        buyingGuide: 'Seyahat ve ofis odaklı kullanım için hibrit ANC destekli kulak üstü modeller; spor için IPX7 tere dayanıklı TWS kulak içi seçenekler önerilir.',
        childCategories: [
          { id: 'anc-headphones', name: 'Kulak Üstü ANC Kulaklıklar', count: 38 },
          { id: 'tws-earbuds', name: 'Kablosuz TWS Kulak İçi', count: 32 },
          { id: 'studio-monitors', name: 'Masaüstü Stüdyo Hoparlörleri', count: 16 },
          { id: 'dac-amps', name: 'DAC & Taşınabilir Amfiler', count: 10 }
        ],
        popularBrands: ['Sony', 'Sennheiser', 'Bose', 'Bang & Olufsen', 'Audio-Technica']
      },
      {
        id: 'akilli-saat',
        name: 'Akıllı Saat & Giyilebilir Teknoloji',
        slug: 'akilli-saat-giyilebilir-teknoloji',
        description: 'Titanyum kasa tasarımı, safir kristal cam, EKG ve SpO2 sensörleri ile kapsamlı sağlık ve antrenman telemetrisi.',
        itemCount: 82,
        image: smartwatchImg,
        featured: true,
        bannerHighlight: 'Titanyum Kasa & Çift Frekanslı GPS Modelleri',
        buyingGuide: 'Açık hava sporları için safir cam ve çoklu uydu GNSS destekli modeller; şehir içi kullanım için hücresel (eSIM) bağlantılı saatler idealdir.',
        childCategories: [
          { id: 'smartwatch-premium', name: 'Premium Titanyum Saatler', count: 26 },
          { id: 'fitness-tracker', name: 'Spor & Aktivite Bileklikleri', count: 24 },
          { id: 'hybrid-watch', name: 'Klasik Tasarımlı Hibrit Saatler', count: 18 },
          { id: 'watch-straps', name: 'Örgü & Deri Kordon Aksesuarları', count: 14 }
        ],
        popularBrands: ['Garmin', 'Apple', 'Samsung', 'Suunto', 'Withings']
      },
      {
        id: 'fotograf-kamera',
        name: 'Fotoğraf, Video & Sinema',
        slug: 'fotograf-video-sinema',
        description: 'Tam kare (Full-frame) aynasız gövdeler, sinematik prime lensler, profesyonel 3 eksenli gimbal ve aydınlatma ekipmanları.',
        itemCount: 64,
        image: camerasImg,
        featured: true,
        bannerHighlight: '4K/120fps ve 8K RAW Kayıt Destekli Aynasız Sistemler',
        buyingGuide: 'Düşük ışık performansı ve doğal alan derinliği için tam kare aynasız sensör; seyahat vloggerları için ise kompakt APS-C ve dahili IBIS tercih edin.',
        childCategories: [
          { id: 'mirrorless-cameras', name: 'Full-Frame Aynasız Gövdeler', count: 22 },
          { id: 'prime-lenses', name: 'Sinematik Prime & Zoom Lensler', count: 24 },
          { id: 'gimbals-stabilizers', name: '3 Eksenli Gimbal & Rig Sistemleri', count: 10 },
          { id: 'studio-lighting', name: 'Bi-Color Sürekli Stüdyo Işıkları', count: 8 }
        ],
        popularBrands: ['Sony', 'Fujifilm', 'Canon', 'Leica', 'DJI']
      }
    ]
  },
  {
    id: 'ev-ofis',
    name: 'Ev & Çalışma Alanı',
    slug: 'ev-calisma-alani',
    tagline: 'Ergonomik çalışma mobilyaları, mimari masa aydınlatmaları ve minimal mekan düzenleyicileri',
    iconName: 'Home',
    heroImage: laptopsImg,
    subcategories: [
      {
        id: 'ergonomik-sandalyeler',
        name: 'Ergonomik Çalışma Koltukları',
        slug: 'ergonomik-calisma-koltuklari',
        description: 'Omurga destekli nefes alabilir fileli çalışma koltukları ve ayarlanabilir bel destek mekanizmaları.',
        itemCount: 45,
        image: laptopsImg,
        childCategories: [
          { id: 'mesh-chairs', name: 'Nefes Alabilir File Koltuklar', count: 20 },
          { id: 'executive-leather', name: 'Doğal Deri Yönetici Koltukları', count: 15 },
          { id: 'kneeling-active', name: 'Aktif Denge Tabureleri', count: 10 }
        ],
        popularBrands: ['Herman Miller', 'Steelcase', 'Ergohuman', 'Haworth']
      },
      {
        id: 'calisma-masalari',
        name: 'Elektrikli Yükseklik Ayarlı Masalar',
        slug: 'elektrikli-yukseklik-ayarli-masalar',
        description: 'Çift motorlu sessiz mekanizmalı masif ceviz ve meşe tablalı akıllı ayakta çalışma masaları.',
        itemCount: 38,
        image: heroBannerImg,
        childCategories: [
          { id: 'standing-desks', name: 'Çift Motorlu Ayakta Çalışma Masaları', count: 18 },
          { id: 'solid-wood', name: 'Masif Meşe & Ceviz Tablalar', count: 12 },
          { id: 'cable-mgmt', name: 'Entegre Kablo Düzenleme Kanalları', count: 8 }
        ],
        popularBrands: ['Felik', 'Fully', 'Uplift', 'ErgoStand']
      }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // Laptops
  {
    id: 'prod-macbook-pro-16',
    name: 'MacBook Pro 16 inç M3 Max (36GB RAM / 1TB SSD)',
    brand: 'Apple',
    mainCategoryId: 'elektronik',
    subcategoryId: 'bilgisayar-laptop',
    childCategoryId: 'ultrabook',
    price: 134999,
    originalPrice: 142999,
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    badge: 'Katalog Yıldızı',
    image: laptopsImg,
    specs: [
      { label: 'İşlemci', value: 'Apple M3 Max (14 Çekirdek CPU)' },
      { label: 'Bellek', value: '36 GB Birleşik Bellek' },
      { label: 'Depolama', value: '1 TB NVMe SSD' },
      { label: 'Ekran', value: '16.2 inç Liquid Retina XDR (120Hz ProMotion)' },
      { label: 'Pil Ömrü', value: '22 Saate Kadar' }
    ],
    description: 'En zorlu iş akışları, 8K video montajı ve 3D simülasyonlar için tasarlanan 16 inç MacBook Pro, sektör lideri güç verimliliği sunar.',
    warranty: '2 Yıl Apple Türkiye Garantili'
  },
  {
    id: 'prod-dell-xps-14',
    name: 'Dell XPS 14 9440 Intel Core Ultra 7 (32GB / RTX 4050)',
    brand: 'Dell',
    mainCategoryId: 'elektronik',
    subcategoryId: 'bilgisayar-laptop',
    childCategoryId: 'ultrabook',
    price: 89450,
    originalPrice: 96000,
    rating: 4.7,
    reviewsCount: 64,
    inStock: true,
    image: laptopsImg,
    specs: [
      { label: 'İşlemci', value: 'Intel Core Ultra 7 155H' },
      { label: 'Ekran Kartı', value: 'NVIDIA RTX 4050 6GB GDDR6' },
      { label: 'Bellek', value: '32 GB LPDDR5X' },
      { label: 'Ekran', value: '14.5 inç 3.2K OLED 120Hz Dokunmatik' }
    ],
    description: 'CNC işlenmiş alüminyum ve Gorilla Glass 3 cam avuç içi dayanağı ile ultra şık ve kompakt gövdede stüdyo performansı.',
    warranty: '2 Yıl Yerinde Destek Garantili'
  },
  {
    id: 'prod-rog-zephyrus-g16',
    name: 'Asus ROG Zephyrus G16 OLED (Intel Ultra 9 / RTX 4080)',
    brand: 'Asus',
    mainCategoryId: 'elektronik',
    subcategoryId: 'bilgisayar-laptop',
    childCategoryId: 'gaming-laptop',
    price: 119900,
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    badge: 'Yeni Nesil OLED',
    image: laptopsImg,
    specs: [
      { label: 'İşlemci', value: 'Intel Core Ultra 9 185H' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4080 12GB' },
      { label: 'Ekran', value: '16 inç 2.5K 240Hz ROG Nebula OLED' },
      { label: 'Ağırlık', value: '1.85 kg Ultra Hafif Kasa' }
    ],
    description: 'Sadece 1.85 kg ağırlığında, alüminyum yekpare gövdeye sığdırılmış saf oyun ve yapay zeka grafik gücü.',
    warranty: '2 Yıl Asus Türkiye Garantili'
  },
  {
    id: 'prod-lenovo-thinkpad-p1',
    name: 'Lenovo ThinkPad P1 Gen 6 İş İstasyonu (64GB / RTX 4070)',
    brand: 'Lenovo',
    mainCategoryId: 'elektronik',
    subcategoryId: 'bilgisayar-laptop',
    childCategoryId: 'workstation',
    price: 128500,
    originalPrice: 135000,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    image: laptopsImg,
    specs: [
      { label: 'İşlemci', value: 'Intel Core i9-13900H vPro' },
      { label: 'Bellek', value: '64 GB DDR5 ECC Destekli' },
      { label: 'Depolama', value: '2 TB PCIe Gen4 SSD' },
      { label: 'Sertifika', value: 'ISV AutoCAD, Maya, SolidWorks Onaylı' }
    ],
    description: 'Kurumsal mühendisler, veri bilimciler ve CAD tasarımcıları için askeri standartlarda test edilmiş mobil iş istasyonu.',
    warranty: '3 Yıl Premier Kurumsal Destek'
  },

  // Audio & Headphones
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Premium ANC Kablosuz Kulaklık',
    brand: 'Sony',
    mainCategoryId: 'elektronik',
    subcategoryId: 'ses-kulaklik',
    childCategoryId: 'anc-headphones',
    price: 14890,
    originalPrice: 16500,
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    badge: 'Çok Satan',
    image: audioImg,
    specs: [
      { label: 'Gürültü Engelleme', value: 'Entegre İşlemci V1 + HD QN1 (8 Mikrofon)' },
      { label: 'Ses Çözünürlüğü', value: 'LDAC Hi-Res Audio Wireless' },
      { label: 'Pil', value: '30 Saat (3 Dakika Şarjla 3 Saat Çalma)' },
      { label: 'Bağlantı', value: 'Çok Noktalı Bluetooth 5.2' }
    ],
    description: 'İki işlemci ve sekiz mikrofonla güçlendirilen sektör standardı akıllı gürültü engelleme ve kristal netliğinde telefon görüşmeleri.',
    warranty: '2 Yıl Sony Eurasia Garantili'
  },
  {
    id: 'prod-sennheiser-momentum-4',
    name: 'Sennheiser Momentum 4 Wireless Akustik Kulaklık',
    brand: 'Sennheiser',
    mainCategoryId: 'elektronik',
    subcategoryId: 'ses-kulaklik',
    childCategoryId: 'anc-headphones',
    price: 13750,
    originalPrice: 15200,
    rating: 4.9,
    reviewsCount: 184,
    inStock: true,
    image: audioImg,
    specs: [
      { label: 'Sürücü', value: '42mm Odiyofil Dereceli Dönüştürücü' },
      { label: 'Pil Ömrü', value: 'Rakipsiz 60 Saat Kesintisiz Çalma' },
      { label: 'Kodekler', value: 'aptX Adaptive, AAC, SBC' },
      { label: 'Özellik', value: 'Şeffaflık Modu ve Smart Pause' }
    ],
    description: 'İmza Sennheiser akustik ses profili, dinamik bas yanıtı ve tek şarjla tam 60 saat kullanım sağlayan devasa pil.',
    warranty: '2 Yıl Bircom Türkiye Garantili'
  },
  {
    id: 'prod-bose-quietcomfort-ultra',
    name: 'Bose QuietComfort Ultra Uzamsal Sesli Kulaklık',
    brand: 'Bose',
    mainCategoryId: 'elektronik',
    subcategoryId: 'ses-kulaklik',
    childCategoryId: 'anc-headphones',
    price: 18990,
    rating: 4.7,
    reviewsCount: 95,
    inStock: true,
    badge: 'Uzamsal Ses',
    image: audioImg,
    specs: [
      { label: 'Teknoloji', value: 'Bose Immersive Audio (Uzamsal Akustik)' },
      { label: 'Özelleştirme', value: 'CustomTune Kişisel Kulak Kalibrasyonu' },
      { label: 'Konfor', value: 'Ultra Yumuşak Protein Deri Yastıklar' }
    ],
    description: 'Bose Immersive Audio ile sesi kafanızın içinden çıkarıp önünüzdeki sahnede çalıyormuş hissi veren devrimsel derinlik.',
    warranty: '2 Yıl Bose Yetkili Distribütör'
  },
  {
    id: 'prod-sennheiser-ie600',
    name: 'Sennheiser IE 600 Zirkonyum Gövdeli Kulak İçi Monitör',
    brand: 'Sennheiser',
    mainCategoryId: 'elektronik',
    subcategoryId: 'ses-kulaklik',
    childCategoryId: 'tws-earbuds',
    price: 29800,
    rating: 5.0,
    reviewsCount: 28,
    inStock: false,
    badge: 'Odiyofil Sınıfı',
    image: audioImg,
    specs: [
      { label: 'Kasa Malzemesi', value: '3D Baskı Amorf Zirkonyum ZR01' },
      { label: 'Sürücü', value: '7mm TrueResponse Dinamik Dönüştürücü' },
      { label: 'Frekans Yanıtı', value: '4 Hz – 46.500 Hz' }
    ],
    description: 'Havacılık ve uzay sanayisinde kullanılan aşınmaz amorf zirkonyum gövde ve çift rezonatör odası ile benzersiz berraklık.',
    warranty: '2 Yıl Distribütör Garantili'
  },

  // Smartwatches
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 Titanyum Kasa (49mm / Alpine Loop)',
    brand: 'Apple',
    mainCategoryId: 'elektronik',
    subcategoryId: 'akilli-saat',
    childCategoryId: 'smartwatch-premium',
    price: 45999,
    originalPrice: 48999,
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    badge: 'Dayanıklı Kasa',
    image: smartwatchImg,
    specs: [
      { label: 'Kasa', value: 'Havacılık Sınıfı 49mm Titanyum' },
      { label: 'Parlaklık', value: '3000 Nit Ultra Parlak Retina Ekran' },
      { label: 'Su Dayanıklılığı', value: '100m Suya Dayanıklı & 40m Dalış Bilgisayarı' },
      { label: 'GPS', value: 'Hassas Çift Frekanslı L1 + L5 GPS' }
    ],
    description: 'Zorlu doğa koşulları, okyanus dalışları ve maraton koşuları için tasarlanan en yetenekli ve sağlam akıllı saat.',
    warranty: '2 Yıl Apple Türkiye Garantili'
  },
  {
    id: 'prod-garmin-epix-pro',
    name: 'Garmin Epix Pro Gen 2 Sapphire Titanium (51mm)',
    brand: 'Garmin',
    mainCategoryId: 'elektronik',
    subcategoryId: 'akilli-saat',
    childCategoryId: 'smartwatch-premium',
    price: 49500,
    rating: 4.9,
    reviewsCount: 76,
    inStock: true,
    badge: '31 Gün Pil',
    image: smartwatchImg,
    specs: [
      { label: 'Ekran', value: '1.4 inç Canlı AMOLED Safir Kristal' },
      { label: 'Pil Ömrü', value: 'Akıllı Saat Modunda 31 Güne Kadar' },
      { label: 'Aydınlatma', value: 'Dahili Çok Modlu LED Fener' },
      { label: 'Harita', value: 'Önceden Yüklü TopoActive Dünya Haritaları' }
    ],
    description: 'Göz alıcı AMOLED ekran, safir cam, titanyum çerçeve ve 31 güne varan akıllı saat pil ömrü ile zirve performansı.',
    warranty: '2 Yıl Baytekin Garmin Garantili'
  },
  {
    id: 'prod-samsung-galaxy-watch-ultra',
    name: 'Samsung Galaxy Watch Ultra 47mm Titanyum LTE',
    brand: 'Samsung',
    mainCategoryId: 'elektronik',
    subcategoryId: 'akilli-saat',
    childCategoryId: 'smartwatch-premium',
    price: 38499,
    originalPrice: 42999,
    rating: 4.7,
    reviewsCount: 110,
    inStock: true,
    image: smartwatchImg,
    specs: [
      { label: 'Gövde', value: 'Yastık Tasarımlı 4. Sınıf Titanyum' },
      { label: 'Yapay Zeka', value: 'Galaxy AI Enerji Skoru ve Sağlık Takibi' },
      { label: 'Dayanıklılık', value: '10 ATM ve MIL-STD-810H Askeri Standart' }
    ],
    description: 'Zorlu maceralar için 55°C sıcaklık ve 9000 metre irtifaya kadar test edilmiş 3nm işlemcili Galaxy amiral gemisi.',
    warranty: '2 Yıl Samsung Türkiye Garantili'
  },

  // Cameras & Optics
  {
    id: 'prod-sony-a7-iv',
    name: 'Sony Alpha 7 IV Tam Kare Aynasız Gövde',
    brand: 'Sony',
    mainCategoryId: 'elektronik',
    subcategoryId: 'fotograf-kamera',
    childCategoryId: 'mirrorless-cameras',
    price: 88500,
    originalPrice: 94000,
    rating: 4.9,
    reviewsCount: 145,
    inStock: true,
    badge: 'Hibrit Standart',
    image: camerasImg,
    specs: [
      { label: 'Sensör', value: '33.0 Megapiksel Exmor R BSI CMOS' },
      { label: 'Video', value: '4K 60p 10-Bit 4:2:2 All-Intra & S-Cinetone' },
      { label: 'Otomatik Odaklama', value: '759 Noktalı Gerçek Zamanlı Göz/Kuş AF' },
      { label: 'Stabilizasyon', value: '5.5 Kademeli 5 Eksenli Gövde İçi IBIS' }
    ],
    description: 'Fotoğraf ve video üreticileri için sınırları kaldıran mükemmel renk bilimi, 33MP çözünürlük ve S-Cinetone sinema profili.',
    warranty: '2 Yıl Sony Eurasia Garantili'
  },
  {
    id: 'prod-fujifilm-x-t5',
    name: 'Fujifilm X-T5 Aynasız Fotoğraf Makinesi (Gövde)',
    brand: 'Fujifilm',
    mainCategoryId: 'elektronik',
    subcategoryId: 'fotograf-kamera',
    childCategoryId: 'mirrorless-cameras',
    price: 68900,
    rating: 4.8,
    reviewsCount: 92,
    inStock: true,
    badge: 'Film Simülasyonu',
    image: camerasImg,
    specs: [
      { label: 'Sensör', value: '40.2 Megapiksel X-Trans CMOS 5 HR' },
      { label: 'Enstantane', value: '1/180.000 Elektronik Enstantane Hızı' },
      { label: 'Tasarım', value: 'Klasik Kadranlı Analog Kontrol Mimarisi' },
      { label: 'Film Profilleri', value: '19 Efsanevi Fujifilm Film Simülasyonu' }
    ],
    description: 'Analog kadran hissi, 40MP detay zenginliği ve efsanevi renk bilimi ile saf fotoğrafçılık tutkunlarının tercihi.',
    warranty: '2 Yıl Fujifilm Türkiye Garantili'
  },
  {
    id: 'prod-sony-fe-50mm-gm',
    name: 'Sony FE 50mm f/1.2 G Master Portre Lensi',
    brand: 'Sony',
    mainCategoryId: 'elektronik',
    subcategoryId: 'fotograf-kamera',
    childCategoryId: 'prime-lenses',
    price: 74900,
    originalPrice: 79900,
    rating: 5.0,
    reviewsCount: 48,
    inStock: true,
    image: camerasImg,
    specs: [
      { label: 'Diyafram', value: 'f/1.2 Ultra Hızlı Dairesel 11 Bıçak' },
      { label: 'Motor', value: 'Dörtlü XD Lineer Odaklama Motoru' },
      { label: 'Kaplama', value: 'Nano AR Kaplama II (Parlama Önleyici)' }
    ],
    description: 'Kusursuz köşe-keskinliği, krema gibi bokeh etkisi ve sessiz hızlı otomatik netleme ile G Master serisinin zirvesi.',
    warranty: '2 Yıl Sony Eurasia Garantili'
  },
  {
    id: 'prod-dji-rs-3-pro',
    name: 'DJI RS 3 Pro Profesyonel El Gimbal Sabitleyici',
    brand: 'DJI',
    mainCategoryId: 'elektronik',
    subcategoryId: 'fotograf-kamera',
    childCategoryId: 'gimbals-stabilizers',
    price: 32400,
    rating: 4.8,
    reviewsCount: 60,
    inStock: true,
    image: camerasImg,
    specs: [
      { label: 'Taşıma Kapasitesi', value: '4.5 kg Test Edilmiş Yük' },
      { label: 'Gövde', value: 'Uzatılmış Yekpare Karbon Fiber Kollar' },
      { label: 'Otomatik Kilit', value: 'Otomatik Eksen Kilit Mekanizması' }
    ],
    description: 'Sinema kameralarını kolaylıkla dengeleyen karbon fiber konstrüksiyon ve otomatik kilit sistemi ile sette hız kazanın.',
    warranty: '2 Yıl Karacasulu DJI Garantili'
  }
];
