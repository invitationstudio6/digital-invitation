/* =====================================================
   LUNA DATA LAYER
   Central data store for templates, categories, packages
   ===================================================== */

/* ----- CATEGORIES ----- */
const LUNA_CATEGORIES = [
    {
        id: "wedding",
        icon: "💒",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Ən gözəl gününüz üçün zərif dəvətnamələr", en: "Elegant invitations for your most beautiful day", ru: "Изящные приглашения для самого прекрасного дня", tr: "En güzel gününüz için zarif davetiyeler" },
        tagline: { az: "Əbədi sevginin başlanğıcı", en: "Where forever begins", ru: "Где начинается вечность", tr: "Sonsuzluğun başladığı yer" },
        palette: { bg: "#F5EDE3", bgAlt: "#EDE3D5", accent: "#C4A882", text: "#3E2518", muted: "#8A6E5E", gradient: "linear-gradient(135deg, #F5EDE3, #EDE3D5, #E8D8C8)" },
        typography: { heading: "'Playfair Display', serif", body: "'Cormorant Garamond', serif", accent: "'Great Vibes', cursive" },
        decorations: ["floral", "gold-lines", "soft-glow"],
        count: 0
    },
    {
        id: "engagement",
        icon: "💍",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Birlikdə yolculuğunuzun başlanğıcı", en: "The beginning of your journey together", ru: "Начало вашего совместного пути", tr: "Birlikte yolculuğunuzun başlangıcı" },
        tagline: { az: "Sevgi ilə deyilən ilk \u201CB\u0259li\u201D", en: "The first yes of forever", ru: "Первое да навсегда", tr: "Sonsuzluğun ilk eveti" },
        palette: { bg: "#FBF0F3", bgAlt: "#F5E6EB", accent: "#C88A9A", text: "#4A2A32", muted: "#8A6A72", gradient: "linear-gradient(135deg, #FBF0F3, #F5E6EB, #F0DCE3)" },
        typography: { heading: "'Playfair Display', serif", body: "'Cormorant Garamond', serif", accent: "'Great Vibes', cursive" },
        decorations: ["hearts", "ribbons", "soft-glow"],
        count: 0
    },
    {
        id: "henna",
        icon: "🎶",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Xına gecəniz üçün ənənəvi və müasir dizaynlar", en: "Traditional and modern designs for your henna night", ru: "Традиционные и современные дизайны для хны", tr: "Kına geceniz için geleneksel ve modern tasarımlar" },
        tagline: { az: "Ənənənin rəngi, sevginin naxışı", en: "The color of tradition, the pattern of love", ru: "Цвет традиции, узор любви", tr: "Geleneğin rengi, sevginin deseni" },
        palette: { bg: "#F5EDE0", bgAlt: "#EDE4D5", accent: "#C89860", text: "#3E2518", muted: "#8A6E5E", gradient: "linear-gradient(135deg, #F5EDE0, #EDE4D5, #E8D8C0)" },
        typography: { heading: "'Playfair Display', serif", body: "'Cormorant Garamond', serif", accent: "'Great Vibes', cursive" },
        decorations: ["ornate", "gold-lines", "warm-glow"],
        count: 0
    },
    {
        id: "birthday",
        icon: "🎂",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Xüsusi doğum günü üçün yaradıcı dəvətnamələr", en: "Creative invitations for your special birthday", ru: "Креативные приглашения для вашего дня рождения", tr: "Özel doğum gününüz için yaratıcı davetiyeler" },
        tagline: { az: "Həyatın ən şirin anları", en: "The sweetest moments of life", ru: "Самые сладкие моменты жизни", tr: "Hayatın en tatlı anları" },
        palette: { bg: "#FFF8F0", bgAlt: "#FFF0E2", accent: "#E8A870", text: "#3E2518", muted: "#8A6E5E", gradient: "linear-gradient(135deg, #FFF8F0, #FFF0E2, #FFE8D0)" },
        typography: { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif", accent: "'Montserrat', sans-serif" },
        decorations: ["balloons", "confetti", "stars"],
        count: 0
    },
    {
        id: "graduation",
        icon: "🎓",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Məzuniyyət nailiyyətinizi qeyd edin", en: "Celebrate your graduation achievement", ru: "Отпразднуйте свой выпускной", tr: "Mezuniyet başarınızı kutlayın" },
        tagline: { az: "Gələcəyin ilk addımı", en: "The first step into your future", ru: "Первый шаг в будущее", tr: "Geleceğe ilk adım" },
        palette: { bg: "#F4F6F8", bgAlt: "#E8ECF0", accent: "#6080A0", text: "#1A2A3A", muted: "#6A7A8A", gradient: "linear-gradient(135deg, #F4F6F8, #E8ECF0, #DCE4EC)" },
        typography: { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif", accent: "'Montserrat', sans-serif" },
        decorations: ["stars", "lines", "academic"],
        count: 0
    },
    {
        id: "baby-shower",
        icon: "👶",
        image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Körpənizi qarşılamaq üçün şirin dəvətnamələr", en: "Sweet invitations to welcome your little one", ru: "Сладкие приглашения для встречи малыша", tr: "Minik bebeğinizi karşılamak için tatlı davetiyeler" },
        tagline: { az: "Balaca bir möcüzə yolda", en: "A little miracle is on the way", ru: "Маленькое чудо в пути", tr: "Minik bir mucize yolda" },
        palette: { bg: "#FFF8F5", bgAlt: "#FFF0EA", accent: "#E8A090", text: "#3E2518", muted: "#8A6E5E", gradient: "linear-gradient(135deg, #FFF8F5, #FFF0EA, #FFE8E0)" },
        typography: { heading: "'Playfair Display', serif", body: "'Cormorant Garamond', serif", accent: "'Great Vibes', cursive" },
        decorations: ["clouds", "stars", "soft-glow"],
        count: 0
    },
    {
        id: "business",
        icon: "💼",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Korporativ tədbirlər və biznes görüşləri", en: "Corporate events and business gatherings", ru: "Корпоративные мероприятия и деловые встречи", tr: "Kurumsal etkinlikler ve iş toplantıları" },
        tagline: { az: "Peşəkar tədbirlər, zərif dəvətlər", en: "Professional events, elegant invitations", ru: "Профессиональные мероприятия, элегантные приглашения", tr: "Profesyonel etkinlikler, zarif davetiyeler" },
        palette: { bg: "#F0F2F4", bgAlt: "#E4E8EC", accent: "#506070", text: "#1A2028", muted: "#6A7078", gradient: "linear-gradient(135deg, #F0F2F4, #E4E8EC, #D8DEE4)" },
        typography: { heading: "'Montserrat', sans-serif", body: "'DM Sans', sans-serif", accent: "'Montserrat', sans-serif" },
        decorations: ["lines", "geometric", "minimal"],
        count: 0
    },
    {
        id: "other",
        icon: "✨",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
        heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=90",
        description: { az: "Digər xüsusi tədbirlər üçün dəvətnamələr", en: "Invitations for other special events", ru: "Приглашения для других особых мероприятий", tr: "Diğer özel etkinlikler için davetiyeler" },
        tagline: { az: "Hər anın öz dəvəti var", en: "Every moment deserves its own invitation", ru: "Каждый момент заслуживает своего приглашения", tr: "Her anın kendi davetiyesi var" },
        palette: { bg: "#F5EDE3", bgAlt: "#EDE3D5", accent: "#C4A882", text: "#3E2518", muted: "#8A6E5E", gradient: "linear-gradient(135deg, #F5EDE3, #EDE3D5, #E8D8C8)" },
        typography: { heading: "'Cormorant Garamond', serif", body: "'DM Sans', sans-serif", accent: "'Italiana', serif" },
        decorations: ["stars", "soft-glow", "minimal"],
        count: 0
    }
];

/* ----- PACKAGES ----- */
const LUNA_PACKAGES = [
    {
        id: "video",
        name: "Video Dəvətnamə",
        price: 20,
        currency: "AZN",
        tagline: "Animasiyalı video dəvətnamə",
        features: [
            "Video dəvətnamə",
            "Cütlüyün adı",
            "Tarix və saat",
            "Məkan",
            "Müştərinin fotoları",
            "Fon musiqisi",
            "Animasiya və keçidlər"
        ],
        formFields: ["names", "date", "time", "venue", "location", "message", "videoFile"]
    },
    {
        id: "basic",
        name: "Basic",
        price: 25,
        currency: "AZN",
        tagline: "Sadə və zərif rəqəmsal dəvətnamə",
        features: [
            "Digital invitation",
            "Cütlüyün adları",
            "Tarix və saat",
            "Məkan + Google Maps",
            "Countdown",
            "6 foto"
        ],
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown"]
    },
    {
        id: "premium",
        name: "Premium",
        price: 40,
        currency: "AZN",
        featured: true,
        tagline: "Ən çox tövsiyə olunan paket",
        features: [
            "Basic paketdə olan hər şey +",
            "RSVP forması",
            "Qonaq sayı",
            "Qonaqdan mesaj",
            "Rəng və üslub seçimi",
            "8 foto qaleryası",
            "\"Our Story\" bölməsi"
        ],
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown", "rsvp", "map", "gallery", "story"]
    },
    {
        id: "luxury",
        name: "Luxury",
        price: 60,
        currency: "AZN",
        tagline: "Daha xüsusi və premium görünüş",
        features: [
            "Fərdiləşdirilmiş dizayn",
            "Cütlüyə xüsusi mətn",
            "Foto qalerya",
            "Countdown",
            "Google Maps",
            "RSVP",
            "Qonaq sayı",
            "Mesaj bölməsi",
            "Musiqi"
        ],
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown", "rsvp", "map", "gallery", "music", "story"]
    }
];

/* ----- TEMPLATES ----- */
const LUNA_TEMPLATES = [
    {
        id: "amelia", name: "Amelia", category: "wedding", style: "Floral · Romantik", galleryStyle: "masonry", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "floral" },
        preview: { eyebrow: "SİZİ SEVGİ İLƏ DƏVƏT EDİRİK", names: ["Aysel", "Murad"], date: "12 · 09 · 2026", message: "Bəzi hekayələr kitablarda yazılır. Bizimki isə kiçik anlarda, paylaşılan gülüşlərdə və unudulmaz xatirələrdə yazıldı.", venue: "Crystal Hall", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "amour", name: "Amour", category: "wedding", style: "Romantik · Klassik", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "THE WEDDING OF", names: ["Leyla", "Kamran"], date: "20 · 10 · 2026", message: "Hekayəmiz sadə bir salamla başladı və zaman keçdikcə gözəl bir hekayəyə çevrildi.", venue: "Marriott Hotel", location: "Bakı, Azərbaycan", theme: "amour" }
    },
    {
        id: "noir", name: "Noir", category: "wedding", style: "Lüks · Kinematik", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-style-luxury", backgroundStyle: "dark", openingType: "editorial-card" },
        preview: { eyebrow: "WEDDING COLLECTION", names: ["Nigar", "Elvin"], date: "15 · 11 · 2026", message: "Sevgi zamanı doping edir. Bizim hekayəmiz məhz belə başladı.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "serena", name: "Serena", category: "wedding", style: "Lavanda · Zərif", galleryStyle: "polaroid", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ DƏVƏT EDİRİK", names: ["Aytac", "Rəşad"], date: "05 · 12 · 2026", message: "Həyatımızın ən gözəl anlarını sizinlə paylaşmaq istəyirik.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "garden", name: "Italian Garden", category: "wedding", style: "Baq · Təbiət", galleryStyle: "collage", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Günel", "Samir"], date: "28 · 06 · 2026", message: "Təbiətin qoynunda, çiçəklərin ətrində birlikdə addımlayacağıq.", venue: "Botanika Bağı", location: "Quba, Azərbaycan", theme: "default" }
    },
    {
        id: "royal-gold", name: "Royal Gold", category: "wedding", style: "Qızıl · Lüks", galleryStyle: "editorial", openingStyle: "golden-ring",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "dark", openingType: "golden-ring" },
        preview: { eyebrow: "QIZIL SARAY DƏVƏTNAMƏSİ", names: ["Nərmin", "Tahir"], date: "18 · 07 · 2026", message: "Qızıl üzükdə parıldayan sevgimiz, ürəyimizin ən dərin yerində əbədi qalacaq.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "royal-gold" }
    },
    {
        id: "blossom", name: "Blossom", category: "wedding", style: "Origami · Zərif", galleryStyle: "masonry", openingStyle: "origami-lotus",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "floral", openingType: "origami-lotus" },
        preview: { eyebrow: "ÇİÇƏK AÇAN DƏVƏT", names: ["Aytac", "Elvin"], date: "05 · 08 · 2026", message: "Lotos çiçəyi kimi açılan sevgimiz, zərif və əbədi olacaq.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "blossom" }
    },
    {
        id: "editorial", name: "Editorial Love", category: "wedding", style: "Foto · Redaksiya", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","story","details","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "default", openingType: "fullscreen-photo" },
        preview: { eyebrow: "SAVE THE DATE", names: ["Laman", "Tural"], date: "10 · 09 · 2026", message: "Sevgi ilə dolu bir həyat bizə gözəl anlar bəxş edir.", venue: "Pullman Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "luxe-gold", name: "Luxe Gold", category: "wedding", style: "Lüks · Qızıl", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Nərmin", "Tahir"], date: "18 · 07 · 2026", message: "Qızıl parıltıda başlanan sevgimiz, əbədi olaraq parlayacaq.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "velvet-rose", name: "Velvet Rose", category: "wedding", style: "Zərif · Çəhrayı", galleryStyle: "masonry", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ SEVGİ İLƏ DƏVƏT EDİRİK", names: ["Günay", "Elçin"], date: "25 · 08 · 2026", message: "Məxmər gül kimi zərif, sevgimiz isə əbədi olacaq.", venue: "Park Hyatt", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "minimal-white", name: "Minimal White", category: "wedding", style: "Minimal · Ağ", galleryStyle: "slider", openingStyle: "minimal-reveal",
        animationStyle: "minimal",
        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","details","gallery","rsvp","story","countdown"], heroType: "hero-style-minimal", backgroundStyle: "minimal", openingType: "minimal" },
        preview: { eyebrow: "THE WEDDING OF", names: ["Səbinə", "Rəhim"], date: "03 · 10 · 2026", message: "Sadəlik gözəlliyin ən ali formasıdır. Bizim hekayəmiz də belə başladı.", venue: "JW Marriott", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "vintage-romance", name: "Vintage Romance", category: "wedding", style: "Vintage · Romantic", galleryStyle: "polaroid", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "DƏVƏTNAMƏ", names: ["Lamiyə", "Orxan"], date: "21 · 06 · 2026", message: "Keçmişin gözəlliyini bu günə daşıyırıq, gələcəyə isə birlikdə addım atırıq.", venue: "Şərq Sarayı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "black-gold", name: "Black & Gold", category: "wedding", style: "Qara · Qızıl", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "WEDDING COLLECTION", names: ["Fidan", "Cavid"], date: "07 · 11 · 2026", message: "Zəriflik və gücü bir arada yaşayacağımız gecəyə dəvət edirik.", venue: "Crystal Hall", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "soft-blush", name: "Soft Blush", category: "wedding", style: "Zərif · Çəhrayı", galleryStyle: "masonry", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ DƏVƏT EDİRİK", names: ["Aynur", "Kənan"], date: "14 · 09 · 2026", message: "Çəhrayı buludların altında, sevgi ilə dolu bir gecə sizi gözləyir.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "botanical", name: "Botanical", category: "wedding", style: "Botanik · Yaşıl", galleryStyle: "collage", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","rsvp","countdown"], heroType: "hero-style-botanical", backgroundStyle: "default", openingType: "envelope" },
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Ülviyyə", "Murad"], date: "19 · 05 · 2026", message: "Yaşıl yarpaqların arasında, təbiətin qucağında birlikdə addımlayacağıq.", venue: "Botanika Bağı", location: "Şamaxı, Azərbaycan", theme: "default" }
    },
    {
        id: "modern-classic", name: "Modern Classic", category: "wedding", style: "Müasir · Klassik", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","details","gallery","rsvp","countdown","story"], heroType: "hero-style-minimal", backgroundStyle: "minimal", openingType: "minimal" },
        preview: { eyebrow: "THE WEDDING OF", names: ["Leyla", "Anar"], date: "02 · 10 · 2026", message: "Klassik dəyərlər, müasir ruhla birləşir. Bizim hekayəmiz belə.", venue: "Marriott Hotel", location: "Bakı, Azərbaycan", theme: "amour" }
    },
    {
        id: "enchanted", name: "Enchanted", category: "wedding", style: "Sehirli · Romantik", galleryStyle: "masonry", openingStyle: "fullscreen-photo",
        animationStyle: "romantic",
        thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "SEHIRLİ DƏVƏT", names: ["Samirə", "Elvin"], date: "23 · 08 · 2026", message: "Sehirli bir gecədə, ulduzların altında əbədi sevgimizi qeyd edəcəyik.", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "classic", name: "Classic", category: "engagement", style: "Klassik · Sadə", galleryStyle: "editorial", openingStyle: "envelope",
        animationStyle: "minimal",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "NİŞAN DƏVƏTNAMƏSİ", names: ["Aygun", "Fərid"], date: "22 · 08 · 2026", message: "Birlikdə addımlayacağımız yeni həyatımızın başlanğıcında sizinlə bölüşmək istəyirik.", venue: "Park Hyatt", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "romantic-bloom", name: "Romantic Bloom", category: "engagement", style: "Romantik · Çiçəkli", galleryStyle: "masonry", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "NİŞAN DƏVƏTNAMƏSİ", names: ["Nərmin", "Orxan"], date: "15 · 07 · 2026", message: "Çiçəklərin açdığı kimi, sevgimiz də hər gün daha da gözəlləşir.", venue: "Crystal Hall", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "elegant-pearl", name: "Elegant Pearl", category: "engagement", style: "Zərif · Inci", galleryStyle: "polaroid", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "DƏVƏTNAMƏ", names: ["Gülnar", "Tural"], date: "28 · 09 · 2026", message: "İnci kimi nadir və dəyərli olan sevgimizi sizinlə bölüşmək istəyirik.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "modern-chic", name: "Modern Chic", category: "engagement", style: "Müasir · Şik", galleryStyle: "grid", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "NİŞAN MƏCLİSİ", names: ["Aytac", "Ceyhun"], date: "06 · 10 · 2026", message: "Müasir dünyada, klassik sevgi ilə bir yoldaşlıq başladırıq.", venue: "Pullman Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "soft-rose", name: "Soft Rose", category: "engagement", style: "Zərif · Gül", galleryStyle: "masonry", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ DƏVƏT EDİRİK", names: ["Leyla", "Samir"], date: "12 · 11 · 2026", message: "Gül iyində, zəriflik dolu bir nişan mərasimi sizi gözləyir.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "florence", name: "Florence", category: "birthday", style: "Şən · Rəngli", galleryStyle: "collage", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-centered", backgroundStyle: "default", openingType: "fullscreen-photo" },
        preview: { eyebrow: "AD GÜNÜ MÜBARƏK", names: ["Sara"], date: "14 · 03 · 2026", message: "Həyatımdakı ən gözəl anları sizinlə bölüşmək istəyirəm!", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "blossom", name: "Blossom", category: "birthday", style: "Video · Animasiyalı", galleryStyle: "grid", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "video", packages: ["video"],
        preview: { eyebrow: "AD GÜNÜN MÜBARƏK", names: ["Nigar"], date: "08 · 05 · 2026", message: "Bir yaş daha böyüdük! Gəlin birlikdə qeyd edək.", venue: "Fontanlar Bağı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "elegant-birthday", name: "Elegant Birthday", category: "birthday", style: "Zərif · Ad Günü", galleryStyle: "editorial", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "AD GÜNÜN MÜBARƏK", names: ["Aysel"], date: "19 · 04 · 2026", message: "Həyatımın ən gözəl gününü sizinlə birlikdə qeyd etmək istəyirəm.", venue: "JW Marriott", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "luxury-birthday", name: "Luxury Birthday", category: "birthday", style: "Lüks · Ziyafət", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "BÜTÜN ZİYAFƏTÇİLƏR DƏVƏT OLUNUR", names: ["Kəmalə"], date: "22 · 12 · 2026", message: "İlin ən lüks ad gününə hamınızı dəvət edirəm!", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "kids-party", name: "Kids Party", category: "birthday", style: "Uşaq · Şən", galleryStyle: "collage", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "ŞƏN AD GÜNÜ", names: ["Zəhra"], date: "10 · 06 · 2026", message: "Bir il daha böyüdük! Gəlin birlikdə oynayıb əylənək!", venue: "Fun City", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "aurora", name: "Aurora", category: "graduation", style: "Akademik · Zərif", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "MƏZUNİYYƏT", names: ["Ali"], date: "30 · 06 · 2026", message: "Uzun bir yolculuğun sonuna gəldik. Sizi bu sevincimi bölüşməyə dəvət edirəm.", venue: "ADA Universiteti", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "modern-grad", name: "Modern Grad", category: "graduation", style: "Müasir · Məzuniyyət", galleryStyle: "grid", openingStyle: "minimal-reveal",
        animationStyle: "minimal",
        thumbnail: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "MƏZUNİYYƏT MƏRASİMİ", names: ["Nigar"], date: "15 · 07 · 2026", message: "Yeni bir başlanğıcın ardından gələn nailiyyətimi sizinlə bölüşmək istəyirəm.", venue: "Bakı Dövlət Universiteti", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "luxury-grad", name: "Luxury Grad", category: "graduation", style: "Lüks · Akademik", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "MƏZUNİYYƏT ZİYAFƏTİ", names: ["Elçin"], date: "20 · 06 · 2026", message: "Uğurlu bir yolculuğun sonunda, ən gözəl nailiyyətimi qeyd edirəm.", venue: "Park Hyatt", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "sweet-arrival", name: "Sweet Arrival", category: "baby-shower", style: "Şirin · Körpə", galleryStyle: "polaroid", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "KÖRPƏ MƏCLİSİ", names: ["Leyla"], date: "05 · 08 · 2026", message: "Balaca mələyimizi qarşılamağa hazırlaşırıq. Sizi də dəvət edirik!", venue: "Marriott Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "little-prince", name: "Little Prince", category: "baby-shower", style: "Şahzadə · Zərif", galleryStyle: "editorial", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "BALACA ŞAHZADƏ", names: ["Elvin"], date: "18 · 09 · 2026", message: "Balaca şahzadəmizin gəlişini qeyd etməyə hazırlanırıq.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "amour" }
    },
    {
        id: "executive", name: "Executive", category: "business", style: "Korporativ · Peşəkar", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "business",
        thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "BİZNES TƏDBİRİ", names: ["Tech Corp"], date: "25 · 09 · 2026", message: "İlin ən böyük biznes tədbirinə dəvət edirik.", venue: "JW Marriott", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "conference", name: "Conference", category: "business", style: "Konfrans · Rəsmi", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "business",
        thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "İNNOVASİYA KONFRANSI", names: ["AZ Tech Summit"], date: "14 · 11 · 2026", message: "Texnologiya və innovasiya sahəsində ən son yenilikləri müzakirə edəcəyik.", venue: "Bakı Kongres Mərkəzi", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "networking", name: "Networking", category: "business", style: "Şəbəkə · Müasir", galleryStyle: "grid", openingStyle: "minimal-reveal",
        animationStyle: "business",
        thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "ŞƏBƏKƏ GECƏSİ", names: ["Baku Business Club"], date: "08 · 10 · 2026", message: "Yeni tanışlıqlar və iş imkanları üçün şəbəkə gecəsinə dəvət edirik.", venue: "Pullman Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    /* ===== DIGITAL BUSINESS CARDS ===== */
    {
        id: "digital-card", name: "Digital Business Card", category: "business", style: "Digital · Vizit Kart", galleryStyle: "grid", openingStyle: "minimal-reveal",
        animationStyle: "business",
        thumbnail: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "DIGITAL VİZİT KART", names: ["Əli Həsənov"], date: "", message: "Mənimlə əlaqə saxlayın. Bütün məlumatlarım bir toxunuşda.", venue: "Tech Corp", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "qr-contact", name: "QR Contact Card", category: "business", style: "QR · Əlaqə Kartı", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "QR ƏLAQƏ KARTI", names: ["Luna Studio"], date: "", message: "QR kodu skan edin və bütün məlumatlarımı telefonunuza saxlayın.", venue: "Digital", location: "Azərbaycan", theme: "default" }
    },
    {
        id: "corporate-profile", name: "Corporate Profile", category: "business", style: "Korporativ · Profil", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "KORPORATİV PROFİL", names: ["AzTech Holdinqs"], date: "", message: "Şirkətimiz haqqında ətraflı məlumat. Xidmətlərimiz, əlaqə və daha çoxu.", venue: "Bakı, Azərbaycan", location: "Bakı", theme: "default" }
    },
    {
        id: "oriental", name: "Oriental Henna", category: "henna", style: "Şərqi · Lüks", galleryStyle: "masonry", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "XINA GECƏSİ", names: ["Aysel"], date: "11 · 09 · 2026", message: "Xınamızda sizinlə birlikdə rəqs etmək istəyirik.", venue: "Şərq Sarayı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "traditional-henna", name: "Traditional Henna", category: "henna", style: "Ənənəvi · Klassik", galleryStyle: "collage", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "ƏNƏNƏVİ XINA GECƏSİ", names: ["Günay"], date: "20 · 08 · 2026", message: "Ənənəvi xına gecəmizdə sizinlə birlikdə rəqs edib, əylənəcəyik.", venue: "İçərişəhər Sarayı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "anniversary", name: "Anniversary", category: "other", style: "İldönüm · Zərif", galleryStyle: "masonry", openingStyle: "envelope",
        animationStyle: "romantic",
        thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "İLDÖNÜMÜMÜZ MÜBARƏK", names: ["Aysel", "Murad"], date: "12 · 09 · 2026", message: "Birlikdə keçirdiyimiz hər il bizim üçün ən qiymətli hədiyyədir.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "celebration", name: "Celebration", category: "other", style: "Celebration · Şən", galleryStyle: "collage", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "XÜSUSİ QİYD EDİRİK", names: ["Ali və Aysəl"], date: "30 · 12 · 2026", message: "İlin sonunda birlikdə qeyd etmək üçün sizləri dəvət edirik!", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    /* ===== INTERACTIVE EXPERIENCES ===== */
    {
        id: "venue-journey", name: "Venue Journey", category: "wedding", style: "Kinematik · Interaktiv", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        experienceType: "interactive", interactionType: "scrollJourney",
        preview: { eyebrow: "INTERACTIVE EXPERIENCE", names: ["Aysel", "Murad"], date: "12 · 09 · 2026", message: "Qonaqlarınızı elegant bir toy məkanı səyahətinə dəvət edin.", venue: "Crystal Hall", location: "Bakı, Azərbaycan", theme: "noir" },
        scenes: [
            {
                id: "venue-entrance", type: "scene", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.5), rgba(26,20,16,.75))",
                animation: { enter: "fadeIn", duration: 1000 },
                particles: "dust",
                content: { eyebrow: "", title: "{{bride}} & {{groom}}", subtitle: "A special day is waiting for you...", hint: "Scroll to enter ▼" },
                elements: [{ type: "line", class: "deco-line-h", style: "width:60px;left:50%;top:20%;transform:translateX(-50%)" }]
            },
            {
                id: "stairs", type: "scene", className: "scene-stairs3d",
                background: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.3), rgba(26,20,16,.6))",
                animation: { enter: "slide-up", duration: 1200 },
                content: { eyebrow: "", title: "Xoş gəlmisiniz", subtitle: "Qonaqlarımızı qarşılayırıq...", hint: "Scroll to continue ▼" },
                elements: [{ type: "circle", class: "deco-circle", style: "width:120px;height:120px;right:10%;top:15%;border-color:rgba(196,168,130,.15)" }],
                countdown: "{{dateLong}}"
            },
            {
                id: "wedding-hall", type: "scene", className: "scene-theatre",
                background: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.4), rgba(26,20,16,.55))",
                animation: { enter: "zoom", duration: 1500 },
                particles: "petals",
                content: { eyebrow: "", title: "Toy Zalı", subtitle: "Gözəl bəzədilmiş məkan...", hint: "Scroll to continue ▼" }
            },
            {
                id: "couple-table", type: "scene", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.45), rgba(26,20,16,.7))",
                animation: { enter: "fade", duration: 1000 },
                particles: "candles",
                content: { eyebrow: "", title: "{{bride}} & {{groom}}", subtitle: "{{dateLong}}", hint: "Scroll to reveal ▼" }
            },
            {
                id: "reveal", type: "invitation-reveal", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.6), rgba(26,20,16,.85))",
                animation: { enter: "reveal", duration: 1200 },
                content: { eyebrow: "THE WEDDING OF", title: "{{bride}} & {{groom}}", subtitle: "{{dateLong}}", cta: "OPEN INVITATION" }
            }
        ]
    },
    {
        id: "envelope-reveal", name: "Envelope Reveal", category: "wedding", style: "Zərif · Klassik", galleryStyle: "editorial", openingStyle: "elegant",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        experienceType: "interactive", interactionType: "clickJourney",
        preview: { eyebrow: "INTERACTIVE EXPERIENCE", names: ["Leyla", "Kamran"], date: "20 · 10 · 2026", message: "Qonaqlarınıza zərif bir zərf təcrübəsi yaşatın.", venue: "Marriott Hotel", location: "Bakı, Azərbaycan", theme: "amour" },
        scenes: [
            {
                id: "bg", type: "scene", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(62,37,24,.6), rgba(62,37,24,.8))",
                animation: { enter: "fadeIn", duration: 1000 },
                particles: "dust",
                content: { eyebrow: "YOU ARE INVITED", title: "{{bride}} & {{groom}}", hint: "Tap to continue ▼" }
            },
            {
                id: "envelope", type: "scene", className: "scene-envelope",
                background: "linear-gradient(135deg, #F5EDE3, #EDE3D5)",
                overlay: "none",
                animation: { enter: "zoom", duration: 1200 },
                content: { eyebrow: "", title: "", hint: "Tap to open ▼" },
                envelope: { seal: "L", names: "{{bride}} & {{groom}}", date: "{{dateLong}}" }
            },
            {
                id: "ribbon-opening", type: "scene", className: "scene-ribbon",
                background: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
                overlay: "none",
                animation: { enter: "fadeIn", duration: 1000 },
                content: { eyebrow: "CELEBRATION", title: "{{bride}} & {{groom}}", subtitle: "{{dateLong}}", hint: "Tap to continue ▼" }
            },
            {
                id: "card-reveal", type: "scene", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(62,37,24,.5), rgba(62,37,24,.8))",
                animation: { enter: "slide-up", duration: 1000 },
                content: { eyebrow: "TOY DƏVƏTNAMƏSİ", title: "{{bride}} & {{groom}}", subtitle: "{{dateLong}}", hint: "Tap to open ▼" }
            },
            {
                id: "reveal", type: "invitation-reveal", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(62,37,24,.6), rgba(62,37,24,.9))",
                animation: { enter: "reveal", duration: 1200 },
                content: { eyebrow: "THE WEDDING OF", title: "{{bride}} & {{groom}}", subtitle: "{{dateLong}}", cta: "OPEN INVITATION" }
            }
        ]
    },
    {
        id: "party-journey", name: "Party Journey", category: "birthday", style: "Şən · İnteraktiv", galleryStyle: "collage", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        experienceType: "interactive", interactionType: "clickJourney",
        preview: { eyebrow: "INTERACTIVE EXPERIENCE", names: ["Leyla"], date: "15 · 08 · 2026", message: "Doğum gününüzü interaktiv bir təcrübə ilə qeyd edin.", venue: "Park Venue", location: "Bakı, Azərbaycan", theme: "florence" },
        scenes: [
            {
                id: "party-entrance", type: "scene", className: "scene-party",
                background: "linear-gradient(135deg, #2a1a3e, #1a1a2e)",
                overlay: "none",
                animation: { enter: "fadeIn", duration: 800 },
                particles: "dust",
                content: { eyebrow: "", title: "{{celebrant}}", subtitle: "Şənliyə xoş gəldiniz!", hint: "Tap to enter ▼" }
            },
            {
                id: "decorations", type: "scene", className: "scene-party",
                background: "linear-gradient(135deg, #3e1a2a, #2e1a3e)",
                overlay: "none",
                animation: { enter: "slide-up", duration: 1000 },
                content: { eyebrow: "", title: "Ad Günün Mübarək!", subtitle: "{{age}} yaşın qutlu olsun!", hint: "Tap to continue ▼" }
            },
            {
                id: "cake", type: "scene", className: "scene-cake",
                background: "linear-gradient(135deg, #1a2a1e, #1a1a2e)",
                overlay: "none",
                animation: { enter: "zoom", duration: 1200 },
                content: { eyebrow: "", title: "{{celebrant}}", subtitle: "{{dateLong}}", hint: "Tap to continue ▼" }
            },
            {
                id: "reveal", type: "invitation-reveal", className: "scene-party",
                background: "linear-gradient(135deg, #2a1a3e, #1a1a2e)",
                overlay: "none",
                animation: { enter: "reveal", duration: 1200 },
                content: { eyebrow: "HAPPY BIRTHDAY", title: "{{celebrant}}", subtitle: "{{dateLong}}", cta: "OPEN INVITATION" }
            }
        ]
    },
    {
        id: "conference-journey", name: "Conference Journey", category: "business", style: "Korporativ · İnteraktiv", galleryStyle: "grid", openingStyle: "minimal",
        animationStyle: "business",
        thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        experienceType: "interactive", interactionType: "clickJourney",
        preview: { eyebrow: "INTERACTIVE EXPERIENCE", names: ["Tech Corp"], date: "25 · 11 · 2026", message: "Korporativ tədbirinizi interaktiv təcrübə ilə təqdim edin.", venue: "Convention Center", location: "Bakı, Azərbaycan", theme: "minimal-white" },
        scenes: [
            {
                id: "building", type: "scene", className: "scene-corporate",
                background: "linear-gradient(135deg, #0a1628, #16213e)",
                overlay: "none",
                animation: { enter: "fadeIn", duration: 800 },
                content: { eyebrow: "", title: "{{companyName}}", subtitle: "{{eventName}}", hint: "Tap to enter ▼" }
            },
            {
                id: "conference-room", type: "scene", className: "scene-corporate",
                background: "linear-gradient(135deg, #0a0a1a, #1a1a3e)",
                overlay: "none",
                animation: { enter: "slide-left", duration: 1000 },
                content: { eyebrow: "", title: "{{eventName}}", subtitle: "{{dateLong}}", hint: "Tap to continue ▼" }
            },
            {
                id: "screen", type: "scene", className: "scene-corporate",
                background: "linear-gradient(135deg, #0a0a14, #141428)",
                overlay: "none",
                animation: { enter: "zoom", duration: 1200 },
                content: { eyebrow: "", title: "{{companyName}}", subtitle: "{{eventName}} · {{dateLong}}", hint: "Tap to continue ▼" },
                screen: { title: "{{eventName}}", detail: "{{dateLong}} · {{time}} · {{venue}}" }
            },
            {
                id: "reveal", type: "scene", className: "scene-corporate",
                background: "linear-gradient(135deg, #0a1628, #16213e)",
                overlay: "none",
                animation: { enter: "reveal", duration: 1200 },
                content: { eyebrow: "{{companyName}}", title: "{{eventName}}", subtitle: "{{dateLong}}", cta: "VIEW EVENT DETAILS" }
            }
        ]
    },

    /* =====================================================
       SIGNATURE COLLECTION — SIX DISTINCT OPENING STORIES
       royal-seal · grand-curtain · garden-bloom
       velvet-luxe · fiesta-pop · starry-dream
    ===================================================== */

    {
        id: "royal-seal", name: "Royal Seal", category: "wedding", style: "Zarf · Mum Mührü", galleryStyle: "masonry", openingStyle: "wax-seal",
        animationStyle: "classic",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "default", openingType: "wax-seal" },
        preview: { eyebrow: "MÖHRÜ QIRIN", names: ["Zöhrə", "Fərhad"], date: "06 · 06 · 2026", message: "Möhürlənmiş bir vəd — qırx illik sevgi hekayəsinin ilk səhifəsi.", venue: "Shah Palace", location: "Bakı, Azərbaycan", theme: "royal-wax" }
    },
    {
        id: "grand-curtain", name: "Grand Curtain", category: "engagement", style: "Teatr · Perde", galleryStyle: "fullscreen", openingStyle: "curtain-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-style-editorial", backgroundStyle: "dark", openingType: "curtain" },
        preview: { eyebrow: "PƏRDƏ AÇILIR", names: ["Nərgiz", "Rauf"], date: "18 · 07 · 2026", message: "İki ürəyin səhnəsində əbədi duet başlayır.", venue: "Nizami Kino Mərkəzi", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "garden-bloom", name: "Garden Bloom", category: "henna", style: "Çiçək · Kağız", galleryStyle: "collage", openingStyle: "floral-paper",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","details","gallery","countdown","rsvp","story"], heroType: "hero-style-botanical", backgroundStyle: "floral", openingType: "floral-paper" },
        preview: { eyebrow: "ÇİÇƏKLƏR AÇIR", names: ["Xanım"], date: "12 · 09 · 2026", message: "Xınanın qızıllığı çiçəklərin zərifliyi ilə birləşir.", venue: "Xına Sarayı", location: "Bakı, Azərbaycan", theme: "henna" }
    },
    {
        id: "velvet-luxe", name: "Velvet Luxe", category: "wedding", style: "Məxmər · İpək", galleryStyle: "editorial", openingStyle: "luxury-silk",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","gallery","countdown","details","rsvp"], heroType: "hero-style-luxury", backgroundStyle: "dark", openingType: "luxury-romance" },
        preview: { eyebrow: "SEVGİNİN İPEKİ", names: ["Lalə", "Seymur"], date: "03 · 10 · 2026", message: "Məxmər gecənin ortasında parlayan ən gözəl ulduz sensən.", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "romantic-bloom" }
    },
    {
        id: "fiesta-pop", name: "Fiesta Pop", category: "birthday", style: "Rəngarəng · Müasir", galleryStyle: "polaroid", openingStyle: "confetti-burst",
        animationStyle: "playful",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","countdown","details","rsvp","story"], heroType: "hero-centered", backgroundStyle: "default", openingType: "celebration-pop" },
        preview: { eyebrow: "PARTIYA BAŞLAYIR", names: ["Kamran"], date: "14 · 11 · 2026", message: "Konfetilər hazır, musiqi səslənir — 30 yaş xoş gəlmisin!", venue: "Park Inn Roof", location: "Bakı, Azərbaycan", theme: "kids-party" }
    },
    {
        id: "starry-dream", name: "Starry Dream", category: "engagement", style: "Ulduzlu Gecə · Nağıl", galleryStyle: "slider", openingStyle: "shooting-star",
        animationStyle: "dreamy",
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","story","details","countdown","rsvp"], heroType: "hero-style-dark", backgroundStyle: "dark", openingType: "starry-night" },
        preview: { eyebrow: "ULDUZA TOXUN", names: ["Aysu", "Elgün"], date: "21 · 08 · 2026", message: "Bir kayan yıldız gördük ve o gece sonsuzluğa söz verdik.", venue: "Qız Qalası Terası", location: "Bakı, Azərbaycan", theme: "enchanted" }
    },
    {
        id: "typewriter-elegance", name: "Typewriter Elegance", category: "wedding", style: "Vintage · Redaksiya", galleryStyle: "editorial", openingStyle: "typewriter",
        animationStyle: "typewriter",
        thumbnail: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "vintage", openingType: "typewriter" },
        preview: { eyebrow: "REDaksIYA SEVGİ", names: ["Elvin", "Leyla"], date: "15 · 10 · 2026", message: "Hər söz, hər sətir — sevgimizin dəqiq yazısı.", venue: "Kitab Evi", location: "Bakı, Azərbaycan", theme: "vintage-romance" }
    },
    {
        id: "candlelight-gold", name: "Candlelight Gold", category: "wedding", style: "Münaşir · Altın", galleryStyle: "masonry", openingStyle: "candlelight",
        animationStyle: "candlelight",
        thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-style-luxury", backgroundStyle: "dark", openingType: "candlelight" },
        preview: { eyebrow: "ŞAMDAN IŞIĞI", names: ["Aysel", "Murad"], date: "20 · 12 · 2026", message: "Qaranlıqdə parlayan tek bir şam — bizim sevgimiz.", venue: "Şamdan Zalı", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "winter-drift", name: "Winter Drift", category: "wedding", style: "Qış · Buzlu Zəriflik", galleryStyle: "collage", openingStyle: "winter-drift",
        animationStyle: "winter",
        thumbnail: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        layoutConfig: { sectionOrder: ["hero","gallery","story","details","countdown","rsvp"], heroType: "hero-style-dark", backgroundStyle: "floral", openingType: "winter-drift" },
        preview: { eyebrow: "QIŞ KARLAYIR", names: ["Nigar", "Farid"], date: "25 · 01 · 2027", message: "Qarıncı qarın altında, istiliklə dolu iki ürək.", venue: "Buz Sarayı", location: "Şamaxı, Azərbaycan", theme: "enchanted" }
    },
    {
        id: "royal-scroll", name: "Royal Scroll", category: "engagement", style: "Şahi · Pergament", galleryStyle: "fullscreen", openingStyle: "royal-scroll",
        animationStyle: "royal",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "dark", openingType: "royal-scroll" },
        preview: { eyebrow: "ŞAHİ DÖVRƏ", names: ["Şahzadə", "Şahzadə"], date: "01 · 03 · 2027", message: "Pergament üzərində yazılmış əbədi bir vəd.", venue: "Şah Sarayı", location: "Bakı, Azərbaycan", theme: "royal-wax" }
    },
    {
        id: "velvet-stage", name: "Velvet Stage", category: "wedding", style: "Teatr · Məxmər Pərdə", galleryStyle: "slider", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#7b2438", secondaryColor: "#d9a441", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "dark", openingType: "curtain" },
        preview: { eyebrow: "PƏRDƏ AÇILIR", names: ["Nurlan", "Fidan"], date: "18 · 10 · 2026", message: "Həyat səhnəsində ən gözəl rol — yanınızda oynadığım rol oldu.", venue: "Nizami Kino Mərkəzi", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "spotlight", name: "Spotlight", category: "engagement", style: "Səhnə · Qızıl İşıq", galleryStyle: "collage", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#1c2541", secondaryColor: "#e0b354", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "dark", openingType: "curtain" },
        preview: { eyebrow: "PROJEKTOR SİZƏ DOĞRU", names: ["Aysel", "Kamran"], date: "07 · 11 · 2026", message: "İki ürək bir səhnəyə çıxdı və qalan bütün səhnələr birlikdə oynanılacaq.", venue: "Buta Palace", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "showtime", name: "Showtime", category: "birthday", style: "Sirki · Qırmızı Pərdə", galleryStyle: "masonry", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        design: { primaryColor: "#8f1d1d", secondaryColor: "#f2c14e", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-center", backgroundStyle: "floral", openingType: "curtain" },
        preview: { eyebrow: "ŞOU BAŞLAYIR!", names: ["Zöhrə"], date: "03 · 10 · 2026", message: "Pərdə açılır, şənlik başlayır — ad günü şousuna sizi də görək!", venue: "Park Bulvar", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "grand-premiere", name: "Grand Premiere", category: "wedding", style: "Teatr · Böyük Premyera", galleryStyle: "slider", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        design: { primaryColor: "#6e1423", secondaryColor: "#caa04c", font: "Playfair Display" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-style-luxury", backgroundStyle: "dark", openingType: "curtain" },
        preview: { eyebrow: "PREMYERA GÜNÜ", names: ["Lalə", "Tural"], date: "11 · 12 · 2026", message: "Ən böyük premyeramız — ömürlük bir filmin ilk kadrları.", venue: "Heydar Aliyev Palace", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "backstage-henna", name: "Backstage Henna", category: "henna", style: "Teatr · Xına Səhnəsi", galleryStyle: "collage", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#7a1f3d", secondaryColor: "#e8a13d", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-center", backgroundStyle: "floral", openingType: "curtain" },
        preview: { eyebrow: "XINA GECƏSİNƏ BÜTÜN SƏHNƏ", names: ["Günay"], date: "24 · 10 · 2026", message: "Qırmızı pərdə arxasında son subay gecəsi — şousa dəvətlisiniz!", venue: "Çınar Plaza", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "launch-stage", name: "Launch Stage", category: "business", style: "Korporativ · Səhnə Açılışı", galleryStyle: "fullscreen", openingStyle: "curtain",
        animationStyle: "curtain",
        thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#0f2b46", secondaryColor: "#39a0ed", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","details","gallery","countdown","rsvp","story"], heroType: "hero-style-dark", backgroundStyle: "dark", openingType: "curtain" },
        preview: { eyebrow: "BÖYÜK AÇILIŞ", names: ["NovaTech Summit"], date: "08 · 10 · 2026", message: "Yeni məhsulumuzun təqdimatında iştirakınızı gözləyirik.", venue: "Baku Expo Center", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "grand-staircase", name: "Grand Staircase", category: "wedding", style: "Saray · Mərmər Piləkən", galleryStyle: "editorial", openingStyle: "stairs",
        animationStyle: "stairs",
        thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        design: { primaryColor: "#8d7249", secondaryColor: "#f3ead7", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "floral", openingType: "stairs" },
        preview: { eyebrow: "PİLƏKƏNLƏ YUXARI", names: ["Nargiz", "Seymur"], date: "19 · 09 · 2026", message: "Hər piləkən bir xatirə — ən gözəlinə sizinlə addımlayacağıq.", venue: "Shah Palace Hotel", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "ascend", name: "Ascend", category: "engagement", style: "Nişan · Qızılgül Piləkləri", galleryStyle: "polaroid", openingStyle: "stairs",
        animationStyle: "stairs",
        thumbnail: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#9d5c4f", secondaryColor: "#ecd9c6", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "floral", openingType: "stairs" },
        preview: { eyebrow: "BİRlikdə YUXARI", names: ["Aysu", "Rəvan"], date: "05 · 12 · 2026", message: "Nişan piləklərimizdə yerinizi ayırın — sevgi yuxarı qalxır.", venue: "Intourist Hotel", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "steps-to-success", name: "Steps to Success", category: "graduation", style: "Məzun · Akademik Piləkən", galleryStyle: "slider", openingStyle: "stairs",
        animationStyle: "stairs",
        thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium"],
        design: { primaryColor: "#1b2a49", secondaryColor: "#d4af37", font: "Playfair Display" },
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-style-dark", backgroundStyle: "dark", openingType: "stairs" },
        preview: { eyebrow: "MƏZUNİYYET MƏRASİMİ", names: ["Elnur"], date: "20 · 06 · 2026", message: "Beş ilin zəhməti bu gün piləkənlə zirvəyə çatır — qoşulun!", venue: "ADA University", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "sealed-with-love", name: "Sealed With Love", category: "wedding", style: "Klassik · Möhürlü Zərf", galleryStyle: "masonry", openingStyle: "wax-seal",
        animationStyle: "wax-seal",
        thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#5c1a1a", secondaryColor: "#d8c29a", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "floral", openingType: "wax-seal" },
        preview: { eyebrow: "MÖHÜRLÜ DƏVƏTNAMƏ", names: ["Xanım", "Orxan"], date: "02 · 10 · 2026", message: "Möhürü sındırın və hekayəmizin ilk səhifəsini açın.", venue: "JW Marriott Absheron", location: "Bakı, Azərbaycan", theme: "royal-wax" }
    },
    {
        id: "starry-vow", name: "Starry Vow", category: "engagement", style: "Romantik · Ulduzlu Gecə", galleryStyle: "fullscreen", openingStyle: "starry-night",
        animationStyle: "starry-night",
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#101b33", secondaryColor: "#b9c6e3", font: "Playfair Display" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","countdown","details","rsvp"], heroType: "hero-style-dark", backgroundStyle: "dark", openingType: "starry-night" },
        preview: { eyebrow: "ULDUZLAR ALTINDA", names: ["Zarifa", "Kamal"], date: "17 · 07 · 2026", message: "Ulduzların şahidi olduğu andı birlikdə yaşayaq.", venue: "Qala Altı Restoran", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "grand-door", name: "Grand Door", category: "wedding", style: "Baxış · Böyük Qapı", galleryStyle: "collage", openingStyle: "door",
        animationStyle: "door",
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#1e3d34", secondaryColor: "#c9a86a", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "dark", openingType: "door" },
        preview: { eyebrow: "QAPINI AÇ", names: ["Aytən", "Fuad"], date: "28 · 11 · 2026", message: "Yeni həyatımızın qapısı sizin üçün açılır.", venue: "Four Seasons Baku", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "love-letter", name: "Love Letter", category: "wedding", style: "Klassik · Möhürlü Məktub", galleryStyle: "slider", openingStyle: "envelope-seal",
        animationStyle: "envelope-seal",
        thumbnail: "https://images.unsplash.com/photo-1522673607200-8d1d38c61bbe?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1522673607200-8d1d38c61bbe?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#7a4a2b", secondaryColor: "#b03a3a", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","gallery","details","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "floral", openingType: "envelope-seal" },
        preview: { eyebrow: "MƏKTUBU AÇ", names: ["Səbinə", "Elvin"], date: "14 · 02 · 2027", message: "Möhürü qırın və ürək sözlərimizi ilk oxuyan siz olun.", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "unwrap-gift", name: "Unwrap the Gift", category: "birthday", style: "Şənlik · Hədiyyə Lentlə", galleryStyle: "collage", openingStyle: "ribbon",
        animationStyle: "ribbon",
        thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium"],
        design: { primaryColor: "#a83a63", secondaryColor: "#caa04c", font: "Playfair Display" },
        layoutConfig: { sectionOrder: ["hero","gallery","details","countdown","rsvp","story"], heroType: "hero-style-dark", backgroundStyle: "floral", openingType: "ribbon" },
        preview: { eyebrow: "HƏDİYYƏNİ AÇ!", names: ["Nuray"], date: "09 · 09 · 2026", message: "Lenti çək və sürprizlə dolu gecəyə başla!", venue: "Cafe City", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "manor-door", name: "Manor Door", category: "engagement", style: "Rustik · Taxta Qapı", galleryStyle: "editorial", openingStyle: "wood-door",
        animationStyle: "wood-door",
        thumbnail: "https://images.unsplash.com/photo-1487530811176-3780de880392?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1487530811176-3780de880392?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#5d4037", secondaryColor: "#c9a86a", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "dark", openingType: "wood-door" },
        preview: { eyebrow: "QAPINI DÖYƏRƏK GİRİN", names: ["Leyla", "Murad"], date: "22 · 05 · 2027", message: "Taxta qapının arxasında bizim gələcəyimizə açılan yol var.", venue: "Şahdağ Resort", location: "Qusar, Azərbaycan", theme: "noir" }
    },
    {
        id: "magic-reveal", name: "Magic Reveal", category: "wedding", style: "Sihir · Qızıl Toz", galleryStyle: "collage", openingStyle: "magic-wand",
        animationStyle: "magic-wand",
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#2a1a3e", secondaryColor: "#c8a8ff", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-center", backgroundStyle: "dark", openingType: "magic-wand" },
        preview: { eyebrow: "SƏHİR BARMAQ UCUNDA", names: ["Aysəl", "Murad"], date: "15 · 06 · 2027", message: "Sihirli an — sevgimizin ən gözəl sehrini sizinlə bölüşürük.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "glow-entrance", name: "Glow Entrance", category: "wedding", style: "İşıq · Parlaq Qapı", galleryStyle: "fullscreen", openingStyle: "glowing-door",
        animationStyle: "glowing-door",
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#1a1008", secondaryColor: "#ffd070", font: "Marcellus" },
        layoutConfig: { sectionOrder: ["hero","details","gallery","countdown","rsvp","story"], heroType: "hero-style-dark", backgroundStyle: "dark", openingType: "glowing-door" },
        preview: { eyebrow: "İŞIQ QAPISI", names: ["Nigar", "Elvin"], date: "20 · 09 · 2027", message: "Qapı arxasında bizi gözləyən işıqlı gələcək.", venue: "JW Marriott", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "forest-walk", name: "Forest Walk", category: "wedding", style: "Meşə · Yarpaqlar Arasında", galleryStyle: "editorial", openingStyle: "ancient-forest",
        animationStyle: "ancient-forest",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        design: { primaryColor: "#0e160c", secondaryColor: "#a0d080", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-botanical", backgroundStyle: "default", openingType: "ancient-forest" },
        preview: { eyebrow: "QƏDİMDİ MEŞƏDƏ", names: ["Leyla", "Tural"], date: "05 · 08 · 2027", message: "Meşənin qoynunda, yarpaqların pıçıltısı ilə sevgimizi elan edirik.", venue: "Şirvanşah Hotel", location: "Şamaxı, Azərbaycan", theme: "floral" }
    },
    {
        id: "story-book", name: "Story Book", category: "wedding", style: "Kitab · Qədim Hekayə", galleryStyle: "collage", openingStyle: "old-book",
        animationStyle: "old-book",
        thumbnail: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        design: { primaryColor: "#2a1a08", secondaryColor: "#d4af37", font: "Cormorant Garamond" },
        layoutConfig: { sectionOrder: ["hero","story","details","gallery","countdown","rsvp"], heroType: "hero-style-editorial", backgroundStyle: "vintage", openingType: "old-book" },
        preview: { eyebrow: "HEKAYƏMİZ", names: ["Aysəl", "Murad"], date: "12 · 04 · 2027", message: "Həyatımızın ən gözəl hekayəsi — ilk səhifəsini sizinlə açırıq.", venue: "Fairmont Baku", location: "Bakı, Azərbaycan", theme: "default" }
    }
];

/* ----- VIDEO INVITATIONS ----- */
/* A video invitation is its own product type — the video IS the invitation.
   No cover page, no envelope, no template system involved. */
var LUNA_VIDEO_INVITATIONS = JSON.parse(localStorage.getItem("luna_video_invitations") || "[]");

/* Normalize an admin/catalog video record into a clean, documented shape:
   { id, type:"video", category, title, description, videoUrl, thumbnailUrl, price, active, featured, order } */
function lunaNormalizeVideo(v) {
    v = v || {};
    var price = parseFloat(v.price);
    return {
        id: v.id || ("vid_" + Date.now() + "_" + Math.floor(Math.random() * 1e4)),
        type: "video",
        category: v.category || "other",
        title: v.title || v.name || "Video Dəvətnamə",
        description: v.description || "",
        videoUrl: (v.url || v.videoUrl || "").trim(),
        thumbnailUrl: (v.thumbnail || v.thumbnailUrl || "").trim(),
        price: (isNaN(price) || price <= 0) ? 20 : price,
        language: v.language || "az",
        active: v.active !== false,
        featured: !!v.featured,
        order: parseInt(v.order, 10) || 0
    };
}

/* Read the live admin catalog (fresh from localStorage on every call). */
function lunaGetActiveVideos() {
    var raw = [];
    try { raw = JSON.parse(localStorage.getItem("luna_video_invitations") || "[]"); } catch(e) {}
    return raw.map(lunaNormalizeVideo)
        .filter(function(v) { return v.active && v.videoUrl; })
        .sort(function(a,b) { return a.order - b.order; });
}

/* The studio's curated built-in video invitations (files live in media/videos).
   They are merged into luna_video_invitations idempotently by id so they show up
   in the admin "Video Dəvətnamələr" panel and the client-form picker on every
   device. Admin can still edit / feature / toggle-active / delete them. */
var LUNA_BUILTIN_VIDEOS = [
    { id:"vb_elegant_wedding", category:"wedding", title:"Elegant Toy Videosu", description:"Qara & bej elegant toy video dəvətnaməsi.", price:20, order:1, featured:true, active:true, url:"media/videos/elegant-wedding.mp4" },
    { id:"vb_watercolor_wedding", category:"wedding", title:"Akvarel Çiçək Toy Videosu", description:"Yaşıl & çəhrayı pastel akvarel çiçək toy video dəvətnaməsi.", price:20, order:2, featured:true, active:true, url:"media/videos/watercolor-wedding.mp4" },
    { id:"vb_indian_wedding", category:"wedding", title:"Ənənəvi Toy Videosu", description:"Bej & qəhvəyi ənənəvi animasiyalı toy video dəvətnaməsi.", price:20, order:3, featured:false, active:true, url:"media/videos/indian-wedding.mp4" },
    { id:"vb_floral_wedding", category:"wedding", title:"Çiçəkli Toy Videosu", description:"Qəhvəyi çiçəkli toy virtual video dəvətnaməsi.", price:20, order:4, featured:false, active:true, url:"media/videos/floral-wedding.mp4" },
    { id:"vb_golden_birthday", category:"birthday", title:"Qızıl Balonlar Ad Günü Videosu", description:"Parlaq qızıl balonlu ad günü partisi virtual video dəvətnaməsi.", price:20, order:5, featured:true, active:true, url:"media/videos/golden-balloons-birthday.mp4" },
    { id:"vb_princess_birthday", category:"birthday", title:"Prenses Nağıl Ad Günü Videosu", description:"Çəhrayı pastel şahzadə nağıl & fantaziya ad günü video dəvətnaməsi.", price:20, order:6, featured:false, active:true, url:"media/videos/princess-fairy-birthday.mp4" },
    { id:"vb_castle_birthday", category:"birthday", title:"Akvarel Qala Ad Günü Videosu", description:"Çəhrayı illustrasiyalı akvarel qala ad günü mobil video dəvətnaməsi.", price:20, order:7, featured:false, active:true, url:"media/videos/watercolor-castle-birthday.mp4" },
    { id:"vb_playful_birthday", category:"birthday", title:"Şən Ad Günü Videosu", description:"Çəhrayı & ağ şən ad günü kartı videosu.", price:20, order:8, featured:false, active:true, url:"media/videos/playful-birthday.mp4" },
    { id:"vb_red_birthday", category:"birthday", title:"Qırmızı Kollaj Ad Günü Videosu", description:"Qırmızı kollaj ad günü arzusu animasiya videosu.", price:20, order:9, featured:false, active:true, url:"media/videos/red-collage-birthday.mp4" }
];
try {
    (function lunaSeedBuiltinVideos(){
        var now = JSON.parse(localStorage.getItem("luna_video_invitations") || "[]");
        var ids = {}; now.forEach(function(v){ if(v && v.id) ids[v.id] = 1; });
        var added = [];
        LUNA_BUILTIN_VIDEOS.forEach(function(bv){ if(!ids[bv.id]){ now.push(bv); ids[bv.id] = 1; added.push(bv); } });
        if(added.length){ now.sort(function(a,b){ return (a.order||0) - (b.order||0); }); localStorage.setItem("luna_video_invitations", JSON.stringify(now)); }
    })();
} catch(e) {}

/* ----- BUILT-IN GREETING / DƏVƏT CARDS -----
   Card invitation designs shipped with the site; seeded into
   luna_greeting_cards only when missing. kind: invitation/thankyou/distribution */
var LUNA_BUILTIN_CARDS = [
    { id:"cd_wedding_garden_arch", kind:"invitation", title:"Garden Arch · Toy", description:"Mavi, ağ və yaşıl akvarel bağ tağı toy dəvət kartı.", image:"media/cards/wedding-garden-arch.png", active:true, featured:true, order:1 },
    { id:"cd_wedding_lace_floral", kind:"invitation", title:"Lace Floral · Nikah", description:"Qəhvəyi və bej krujeva çiçəkli nikah dəvət kartı.", image:"media/cards/wedding-lace-floral.png", active:true, order:2 },
    { id:"cd_wedding_traditional", kind:"invitation", title:"Ənənəvi Toy", description:"Krem və qırmızı ənənəvi toy dəvət kartı.", image:"media/cards/wedding-traditional-cream.png", active:true, order:3 },
    { id:"cd_birthday_jungle", kind:"invitation", title:"Jungle Safari · 1 Yaş", description:"Yaşıl və ağ illustrasiyalı cəngəllik safari 1-ci ad günü dəvət kartı.", image:"media/cards/birthday-jungle-wild.png", active:true, featured:true, order:4 },
    { id:"cd_birthday_safari", kind:"invitation", title:"Akvarel Safari · 1 Yaş", description:"Yaşıl və ağ akvarel cəngəllik safari ilk ad günü dəvət kartı.", image:"media/cards/birthday-safari-watercolor.png", active:true, order:5 },
    { id:"cd_henna_modern", kind:"invitation", title:"Müasir Xına", description:"Müasir xına gecəsi dəvət kartı.", image:"media/cards/henna-modern.png", active:true, featured:true, order:6 }
];
try {
    (function lunaSeedBuiltinCards(){
        var now = JSON.parse(localStorage.getItem("luna_greeting_cards") || "[]");
        var ids = {}; now.forEach(function(c){ if(c && c.id) ids[c.id] = 1; });
        var added = [];
        LUNA_BUILTIN_CARDS.forEach(function(bc){ if(!ids[bc.id]){ now.push(bc); ids[bc.id] = 1; added.push(bc); } });
        if(added.length){ now.sort(function(a,b){ return (a.order||0) - (b.order||0); }); localStorage.setItem("luna_greeting_cards", JSON.stringify(now)); }
    })();
} catch(e) {}

/* Media helpers — single shared implementations (mp4/webm file, YouTube, Vimeo) */
function lunaMediaKind(url) {
    url = (url || "").trim();
    if (!url) return "none";
    if (/^data:video\//i.test(url) || /^blob:/i.test(url)) return "file";
    if (/youtu\.?be/i.test(url)) return "yt";
    if (/vimeo\.com/i.test(url)) return "vm";
    if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)) return "file";
    return "none";
}
function lunaMediaYouTubeId(url) {
    var m = (url || "").match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);
    return m ? m[1] : "";
}
function lunaMediaVimeoId(url) {
    var m = (url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : "";
}
/* Poster image for a video record. thumbnailUrl is OPTIONAL — when missing we
   fall back to the YouTube still (if any) and otherwise let the browser paint
   the video's own first frame via preload="metadata". Never a fake cover page. */
function lunaVideoPoster(v) {
    if (v.thumbnailUrl) return v.thumbnailUrl;
    var yt = lunaMediaYouTubeId(v.videoUrl);
    return yt ? "https://i.ytimg.com/vi/" + yt + "/hqdefault.jpg" : "";
}

/* ----- HELPER FUNCTIONS ----- */
function lunaGetTemplatesByCategory(categoryId) {
    return LUNA_TEMPLATES.filter(function(t) { return t.category === categoryId; });
}

function lunaGetTemplateById(templateId) {
    return LUNA_TEMPLATES.find(function(t) { return t.id === templateId; }) || null;
}

function lunaGetPackageById(packageId) {
    return LUNA_PACKAGES.find(function(p) { return p.id === packageId; }) || null;
}

function lunaGetCategoryById(categoryId) {
    return LUNA_CATEGORIES.find(function(c) { return c.id === categoryId; }) || null;
}

function lunaGetFeaturedVideos() {
    return LUNA_VIDEO_INVITATIONS.filter(function(v) { return v.featured && v.active; });
}

function lunaSaveVideoInvitation(video) {
    LUNA_VIDEO_INVITATIONS.push(video);
    localStorage.setItem("luna_video_invitations", JSON.stringify(LUNA_VIDEO_INVITATIONS));
}

function lunaDeleteVideoInvitation(id) {
    LUNA_VIDEO_INVITATIONS = LUNA_VIDEO_INVITATIONS.filter(function(v) { return v.id !== id; });
    localStorage.setItem("luna_video_invitations", JSON.stringify(LUNA_VIDEO_INVITATIONS));
}

/* =====================================================
   CATEGORY-SPECIFIC PRICING
   Different price boxes per category (birthday, business
   cards/QR, etc. have their own pricing)
===================================================== */
const LUNA_CATEGORY_PRICING = {
    wedding:       { video: 20, basic: 25, premium: 40, luxury: 60 },
    engagement:    { video: 20, basic: 25, premium: 40, luxury: 60 },
    henna:         { video: 20, basic: 25, premium: 40, luxury: 60 },
    birthday:      { video: 20, basic: 20, premium: 35, luxury: 55 },
    graduation:    { video: 20, basic: 20, premium: 35, luxury: 55 },
    "baby-shower": { video: 20, basic: 20, premium: 35, luxury: 55 },
    business:      { video: 20, basic: 20, premium: 40, luxury: 65 },
    other:         { video: 20, basic: 25, premium: 40, luxury: 60 }
};

/* Standalone digital products with their own price boxes */
const LUNA_EXTRA_PRODUCTS = [
    {
        id: "business-card",
        icon: "💳",
        name: "Digital Business Card",
        price: 15,
        currency: "AZN",
        category: "business",
        design: "digital-card",
        description: {
            az: "Şəxsi digital vizit kartınız — bütün əlaqə məlumatlarınız bir toxunuşda.",
            en: "Your personal digital business card — all your contacts in one tap.",
            ru: "Ваша цифровая визитка — все контакты в одно касание.",
            tr: "Kişisel dijital kartvizitiniz — tüm iletişim bilgileriniz tek dokunuşta."
        }
    },
    {
        id: "qr-card",
        icon: "📱",
        name: "QR Contact Card",
        price: 15,
        currency: "AZN",
        category: "business",
        design: "qr-contact",
        description: {
            az: "QR kodu ilə əlaqə kartı — skan edin və məlumatları telefonunuza saxlayın.",
            en: "Contact card with QR code — scan and save details to your phone.",
            ru: "Контактная карта с QR-кодом — отсканируйте и сохраните.",
            tr: "QR kodlu iletişim kartı — tarayın ve telefonunuza kaydedin."
        }
    },
    {
        id: "video",
        icon: "🎬",
        name: "Video Invitation",
        price: 20,
        currency: "AZN",
        category: "video",
        design: "video",
        description: {
            az: "Animasiyalı video dəvətnamə — qonaqlarınızı heyrətləndirin.",
            en: "Animated video invitation — impress your guests.",
            ru: "Анимированное видео-приглашение — впечатлите гостей.",
            tr: "Animasyonlu video davetiye — misafirlerinizi etkileyin."
        }
    }
];

/* Get category-aware price for a package (falls back to base package price) */
function lunaGetCategoryPrice(categoryId, packageId) {
    var table = LUNA_CATEGORY_PRICING[categoryId] || LUNA_CATEGORY_PRICING.wedding;
    if (table && (typeof table[packageId] === "number")) return table[packageId];
    var pkg = lunaGetPackageById(packageId);
    return pkg ? pkg.price : null;
}

function lunaGetExtraProductById(productId) {
    return LUNA_EXTRA_PRODUCTS.find(function(p) { return p.id === productId; }) || null;
}

/* =====================================================
   ADMIN PACKAGE CONFIG OVERRIDE
   Applies admin-managed prices (luna_package_config)
   on top of the built-in defaults, site-wide.
===================================================== */
(function lunaApplyPackageConfig() {
    var cfg;
    try { cfg = JSON.parse(localStorage.getItem("luna_package_config") || "{}"); } catch(e) { return; }

    if (cfg.packages && typeof LUNA_PACKAGES !== "undefined") {
        LUNA_PACKAGES.forEach(function(p) {
            if (cfg.packages[p.id] != null && !isNaN(cfg.packages[p.id])) p.price = cfg.packages[p.id];
        });
    }
    if (cfg.categoryPricing) {
        Object.keys(cfg.categoryPricing).forEach(function(catId) {
            if (!LUNA_CATEGORY_PRICING[catId]) LUNA_CATEGORY_PRICING[catId] = {};
            Object.keys(cfg.categoryPricing[catId]).forEach(function(pkgId) {
                var val = cfg.categoryPricing[catId][pkgId];
                if (val != null && !isNaN(val)) LUNA_CATEGORY_PRICING[catId][pkgId] = val;
            });
        });
    }
    if (cfg.extras) {
        LUNA_EXTRA_PRODUCTS.forEach(function(x) {
            if (cfg.extras[x.id] != null && !isNaN(cfg.extras[x.id])) x.price = cfg.extras[x.id];
        });
    }

    /* Admin-created extra categories appear site-wide */
    if (Array.isArray(cfg.customCategories)) {
        cfg.customCategories.forEach(function(cc) {
            if (!cc || !cc.id || !cc.nameAz) return;
            if (!LUNA_CATEGORIES.some(function(c) { return c.id === cc.id; })) {
                LUNA_CATEGORIES.push({
                    id: cc.id,
                    icon: cc.icon || "✦",
                    image: cc.image || "",
                    heroImage: cc.heroImage || cc.image || "",
                    description: { az: cc.descAz || cc.nameAz, en: cc.descEn || cc.nameEn || cc.nameAz },
                    tagline: { az: cc.taglineAz || "", en: cc.taglineEn || "" }
                });
                if (cfg.categoryPricing[cc.id]) {
                    LUNA_CATEGORY_PRICING[cc.id] = Object.assign({}, LUNA_CATEGORY_PRICING[cc.id] || {}, cfg.categoryPricing[cc.id]);
                }
            }
        });
    }

    /* Admin-edited category previews (image/hero/tagline/description) */
    var cp;
    try { cp = JSON.parse(localStorage.getItem("luna_category_previews") || "{}"); } catch(e) { cp = {}; }
    Object.keys(cp).forEach(function(catId) {
        var cat = LUNA_CATEGORIES.find(function(c) { return c.id === catId; });
        if (!cat) return;
        var ov = cp[catId];
        if (ov.image) cat.image = ov.image;
        if (ov.heroImage) cat.heroImage = ov.heroImage;
        cat.description = cat.description || {};
        cat.tagline = cat.tagline || {};
        if (ov.descAz) cat.description.az = ov.descAz;
        if (ov.descEn) cat.description.en = ov.descEn;
        if (ov.taglineAz) cat.tagline.az = ov.taglineAz;
        if (ov.taglineEn) cat.tagline.en = ov.taglineEn;
    });
})();

/* =====================================================
   FORMSPREE — CLIENT FORM ORDER NOTIFICATIONS
   Change this endpoint to your dedicated "order" form.
===================================================== */
const LUNA_FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpzyklb";

/* =====================================================
   GLOBAL TEMPLATE MERGER
   Merges built-in + admin designs + custom templates
===================================================== */
function lunaGetAllTemplates() {
    var templates = (typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES.slice() : [];

    /* Admin overrides for built-in templates (name/category/thumbnail/packages/active/…) */
    var tplOv = {};
    try { tplOv = JSON.parse(localStorage.getItem("luna_template_overrides") || "{}"); } catch(e) {}
    if (tplOv && Object.keys(tplOv).length) {
        templates = templates.map(function(t) {
            var ov = tplOv[t.id];
            if (!ov) return t;
            var merged = Object.assign({}, t, ov);
            merged.id = t.id;
            return merged;
        });
    }

    try {
        var adminDesigns = JSON.parse(localStorage.getItem("luna_designs") || "[]");
        if (Array.isArray(adminDesigns)) {
            adminDesigns.forEach(function(d) {
                if (d && d.id && d.name) {
                    templates.push({
                        id: String(d.id),
                        name: d.name,
                        category: d.category || "other",
                        style: d.style || "",
                        description: d.description || "",
                        thumbnail: d.thumbnail || d.image || "",
                        cover: d.cover || d.thumbnail || d.image || "",
                        minPackage: d.minPackage || d.package || "basic",
                        packages: d.packages || [d.minPackage || d.package || "basic"],
                        preview: d.preview || null,
                        layoutConfig: d.layoutConfig || null,
                        openingType: d.openingType || null,
                        animationType: d.animationType || null,
                        video: d.video || "",
                        illustrations: d.illustrations || [],
                        featured: !!d.featured,
                        active: d.active !== false,
                        showOnHomepage: d.showOnHomepage !== false,
                        order: d.order || 0,
                        design: d.design || null
                    });
                }
            });
        }
        var customTemplates = JSON.parse(localStorage.getItem("luna_custom_templates") || "[]");
        if (Array.isArray(customTemplates)) {
            customTemplates.forEach(function(t) {
                if (t && t.id && t.name && t.active !== false) {
                    templates.push({
                        id: t.id,
                        name: t.name,
                        category: t.category || "other",
                        style: t.style || "",
                        description: t.description || "",
                        thumbnail: t.thumbnail || t.cover || "",
                        cover: t.cover || t.thumbnail || "",
                        minPackage: (t.packages && t.packages[0]) || "basic",
                        packages: t.packages || ["basic"],
                        preview: t.preview || null,
                        layoutConfig: t.layoutConfig || null,
                        openingType: t.openingType || null,
                        animationType: t.animationType || null,
                        video: t.video || "",
                        illustrations: t.illustrations || [],
                        featured: !!t.featured,
                        active: t.active !== false,
                        showOnHomepage: t.showOnHomepage !== false,
                        order: t.order || 0,
                        design: t.design || null
                    });
                }
            });
        }
    } catch(e) {}
    /* Sort Order controls display order site-wide */
    templates.sort(function(a, b) { return (a.order || 0) - (b.order || 0); });
    return templates.filter(function(t) { return t.active !== false; });
}

/* =====================================================
   UNIQUE PER-TEMPLATE COLOR IDENTITY
   Every template gets a stable, distinct 2-colour palette
   so the şablon pickers no longer all look the same.
   - Uses tpl.design.{primaryColor,secondaryColor} when present.
   - Otherwise derives a deterministic, well-spread hue from the id
     (golden-ratio hue stepping) so duplicates never collide.
   Shared by index.html grid + client-form template picker.
===================================================== */
function lunaTplHash(id) {
    var h = 0, s = String(id || "");
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
}
function lunaHslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    var m = l - c / 2, r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    function to(v) { v = Math.round((v + m) * 255); var hex = v.toString(16); return hex.length === 1 ? "0" + hex : hex; }
    return "#" + to(r) + to(g) + to(b);
}
/* Returns {c1, c2}: two harmonically-related colours for a template. */
function lunaTemplatePalette(tpl) {
    var id = (tpl && tpl.id) || "";
    if (tpl && tpl.design && tpl.design.primaryColor) {
        return { c1: tpl.design.primaryColor, c2: tpl.design.secondaryColor || tpl.design.primaryColor };
    }
    /* Deterministic well-spread hue from id (golden angle 137.5°). */
    var seed = (lunaTplHash(id) % 360 + 360) % 360;
    var hue = (seed + 137.5 * (Math.floor(seed / 25) + 1)) % 360;
    var hue2 = (hue + 42) % 360;
    return {
        c1: lunaHslToHex(hue, 45, 58),
        c2: lunaHslToHex(hue2, 40, 72)
    };
}
/* Opening badge (emoji + label) — single source for both pages. */
function lunaOpeningInfo(tpl) {
    var meta = {
        "curtain":{"emoji":"🎭","label":"Pərdə açılışı"},"stairs":{"emoji":"🪜","label":"Pilləkən"},"door":{"emoji":"🚪","label":"Qapı"},
        "wax-seal":{"emoji":"🕯️","label":"Möhür"},"starry-night":{"emoji":"✨","label":"Ulduzlu"},"celebration-pop":{"emoji":"🎉","label":"Şənlik"},
        "floral-paper":{"emoji":"🌸","label":"Çiçək"},"luxury-romance":{"emoji":"👑","label":"Lüks"},"envelope-seal":{"emoji":"✉️","label":"Zərf"},
        "ribbon":{"emoji":"🎀","label":"Lent"},"wood-door":{"emoji":"🪵","label":"Taxta qapı"},"typewriter":{"emoji":"⌨️","label":"Makina"},
        "candlelight":{"emoji":"🕯️","label":"Şam"},"winter-drift":{"emoji":"❄️","label":"Qar"},"royal-scroll":{"emoji":"📜","label":"Tür"},
        "magic-wand":{"emoji":"🪄","label":"Sehir"},"glowing-door":{"emoji":"🚪✨","label":"İşıq qapı"},"ancient-forest":{"emoji":"🌲","label":"Meşə"},
        "old-book":{"emoji":"📖","label":"Köhnə kitab"}
    };
    var type = null;
    if (tpl) {
        if (tpl.layoutConfig && tpl.layoutConfig.openingType) type = tpl.layoutConfig.openingType;
        else if (tpl.openingType) type = tpl.openingType;
    }
    var alias = {
        "floral-reveal":"floral-paper","editorial-reveal":"envelope-seal","luxury-reveal":"luxury-romance",
        "envelope-reveal":"envelope-seal","stairs-reveal":"stairs","wax-reveal":"wax-seal","curtain-reveal":"curtain",
        "ribbon-reveal":"ribbon","door-reveal":"door","wood-door-reveal":"wood-door","starry-reveal":"starry-night",
        "celebration-reveal":"celebration-pop","candlelight-reveal":"candlelight","winter-reveal":"winter-drift",
        "royal-reveal":"royal-scroll","typewriter-reveal":"typewriter","magic-reveal":"magic-wand","glow-door":"glowing-door",
        "forest-walk":"ancient-forest","book-reveal":"old-book","fullscreen-photo":"curtain","editorial-card":"envelope-seal"
    };
    if (type && alias[type]) type = alias[type];
    if (type && meta[type]) return meta[type];
    for (var key in alias) {
        if (tpl && tpl.style && tpl.style.toLowerCase().indexOf(key.replace("-reveal", "")) !== -1 && meta[alias[key]]) return meta[alias[key]];
    }
    return null;
}

/* =====================================================
   HOMEPAGE TEMPLATES
   Active + Show on Homepage enabled, Featured first,
   then by Sort Order. Used by index.html design grid.
===================================================== */
function lunaGetHomepageTemplates() {
    return lunaGetAllTemplates()
        .filter(function(t) { return t.showOnHomepage !== false; })
        .sort(function(a, b) {
            if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
            return (a.order || 0) - (b.order || 0);
        });
}

/* Count templates per category */
LUNA_CATEGORIES.forEach(function(cat) {
    cat.count = LUNA_TEMPLATES.filter(function(t) { return t.category === cat.id; }).length;
});

/* =====================================================
   SEED SAMPLE DATA
   Initializes localStorage with sample designs, templates, etc.
   Only runs once (checks luna_seeded_v1 flag)
===================================================== */
function seedSampleData(){
    /* Whole body guarded: blocked localStorage must never break page init */
    try {
    if(localStorage.getItem("luna_seeded_v1")) return;
        /* Seed admin designs into luna_designs if empty */
        var existingDesigns = JSON.parse(localStorage.getItem("luna_designs") || "[]");
        if(!existingDesigns.length){
            var sampleDesigns = LUNA_TEMPLATES.map(function(t){
                return {
                    id: t.id,
                    name: t.name,
                    category: t.category,
                    style: t.style || "",
                    animationType: t.animationStyle || t.animationType || t.openingType || "",
                    openingType: t.openingType || t.animationType || "",
                    thumbnail: t.thumbnail || "",
                    cover: t.cover || "",
                    minPackage: t.minPackage,
                    packages: t.packages,
                    description: t.preview ? t.preview.message : "",
                    url: "",
                    illustrations: t.illustrations || [],
                    video: "",
                    active: true,
                    createdAt: new Date().toISOString()
                };
            });
            localStorage.setItem("luna_designs", JSON.stringify(sampleDesigns));
        }

        /* Seed category previews if empty */
        var existingPreviews = JSON.parse(localStorage.getItem("luna_category_previews") || "{}");
        if(!Object.keys(existingPreviews).length){
            var previews = {};
            LUNA_CATEGORIES.forEach(function(cat){
                previews[cat.id] = {
                    image: cat.image,
                    heroImage: cat.heroImage,
                    descAz: (cat.description && cat.description.az) || "",
                    descEn: (cat.description && cat.description.en) || "",
                    taglineAz: (cat.tagline && cat.tagline.az) || "",
                    taglineEn: (cat.tagline && cat.tagline.en) || ""
                };
            });
            localStorage.setItem("luna_category_previews", JSON.stringify(previews));
        }

        /* Video invitations — no auto-seeding; admin adds videos via admin panel */

        /* Seed form config if empty */
        if(!localStorage.getItem("luna_form_config")){
            var formConfig = {
                titleAz: "Dəvətnaməni birlikdə yazaq.",
                titleEn: "Let's write your invitation together.",
                descAz: "Adlar, tarix, məkan və hekayənizi əlavə edin.",
                descEn: "Add names, date, venue and your story.",
                submitBtnAz: "Göndər",
                submitBtnEn: "Send",
                submitBtnRu: "Отправить",
                submitBtnTr: "Gönder",
                successMsgAz: "Təşəkkürlər! Dəvətnaməniz hazırlanır.",
                successMsgEn: "Thank you! Your invitation is being prepared.",
                successMsgRu: "Спасибо! Ваше приглашение готовится.",
                successMsgTr: "Teşekkürler! Davetiyeniz hazırlanıyor.",
                formspreeEndpoint: "https://formspree.io/f/mqpzyklb",
                stepTitles: [],
                fieldConfig: {},
                pkgAddons: {},
                customFields: [],
                productTypes: [
                    { id: "invitation", nameAz: "Dəvətnamə", nameEn: "Invitation", nameRu: "Приглашение", nameTr: "Davetiye", fields: ["names","date","time","venue","location","message","images"] },
                    { id: "digital-card", nameAz: "Digital Vizitkart", nameEn: "Digital Business Card", nameRu: "Цифровая визитка", nameTr: "Dijital Kartvizit", fields: ["name","company","title","phone","email","website","address","note"] },
                    { id: "qr-card", nameAz: "QR Əlaqə Kartı", nameEn: "QR Contact Card", nameRu: "QR Контактная карта", nameTr: "QR İletişim Kartı", fields: ["name","company","title","phone","email","website","address","note"] }
                ],
                categoryVisibility: LUNA_CATEGORIES.reduce(function(acc, cat){ acc[cat.id] = true; return acc; }, {}),
                pricing: {}
            };
            localStorage.setItem("luna_form_config", JSON.stringify(formConfig));
        }

        /* Seed package config if empty */
        if(!localStorage.getItem("luna_package_config")){
            var pkgConfig = {
                packages: { video: 20, basic: 25, premium: 40, luxury: 65 },
                categoryPricing: LUNA_CATEGORY_PRICING,
                extras: LUNA_EXTRA_PRODUCTS.reduce(function(acc, p){ acc[p.id] = p.price; return acc; }, {}),
                customCategories: []
            };
            localStorage.setItem("luna_package_config", JSON.stringify(pkgConfig));
        }

        /* Seed invitation theme if empty */
        if(!localStorage.getItem("luna_invitation_theme")){
            var theme = {
                accent: "#C4A882",
                bgTint: "#F5EDE3",
                font: "",
                radius: 0,
                btnStyle: "",
                openingType: "envelope",
                waxColor: "#B04A3A",
                waxInitial: "",
                effect: ""
            };
            localStorage.setItem("luna_invitation_theme", JSON.stringify(theme));
        }

        localStorage.setItem("luna_seeded_v1", "true");
        console.log("Luna sample data seeded");
    } catch(e) {
        console.warn("Seed sample data failed", e);
    }
}
