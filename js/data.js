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
        description: { az: "Ən gözəl gününüz üçün zərif dəvətnamələr", en: "Elegant invitations for your most beautiful day", ru: "Изящные приглашения для самого прекрасного дня", tr: "En güzel gününüz için zarif davetiyeler" },
        count: 0
    },
    {
        id: "engagement",
        icon: "💍",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
        description: { az: "Birlikdə yolculuğunuzun başlanğıcı", en: "The beginning of your journey together", ru: "Начало вашего совместного пути", tr: "Birlikte yolculuğunuzun başlangıcı" },
        count: 0
    },
    {
        id: "henna",
        icon: "🎶",
        image: "https://images.unsplash.com/photo-1596394723269-e2c2e8a3df3e?auto=format&fit=crop&w=800&q=85",
        description: { az: "Xına gecəniz üçün ənənəvi və müasir dizaynlar", en: "Traditional and modern designs for your henna night", ru: "Традиционные и современные дизайны для хны", tr: "Kına geceniz için geleneksel ve modern tasarımlar" },
        count: 0
    },
    {
        id: "birthday",
        icon: "🎂",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=85",
        description: { az: "Xüsusi doğum günü üçün yaradıcı dəvətnamələr", en: "Creative invitations for your special birthday", ru: "Креативные приглашения для вашего дня рождения", tr: "Özel doğum gününüz için yaratıcı davetiyeler" },
        count: 0
    },
    {
        id: "graduation",
        icon: "🎓",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=85",
        description: { az: "Məzuniyyət nailiyyətinizi qeyd edin", en: "Celebrate your graduation achievement", ru: "Отпразднуйте свой выпускной", tr: "Mezuniyet başarınızı kutlayın" },
        count: 0
    },
    {
        id: "baby-shower",
        icon: "👶",
        image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=85",
        description: { az: "Körpənizi qarşılamaq üçün şirin dəvətnamələr", en: "Sweet invitations to welcome your little one", ru: "Сладкие приглашения для встречи малыша", tr: "Minik bebeğinizi karşılamak için tatlı davetiyeler" },
        count: 0
    },
    {
        id: "business",
        icon: "💼",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=85",
        description: { az: "Korporativ tədbirlər və biznes görüşləri", en: "Corporate events and business gatherings", ru: "Корпоративные мероприятия и деловые встречи", tr: "Kurumsal etkinlikler ve iş toplantıları" },
        count: 0
    },
    {
        id: "other",
        icon: "✨",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
        description: { az: "Digər xüsusi tədbirlər üçün dəvətnamələr", en: "Invitations for other special events", ru: "Приглашения для других особых мероприятий", tr: "Diğer özel etkinlikler için davetiyeler" },
        count: 0
    }
];

/* ----- PACKAGES ----- */
const LUNA_PACKAGES = [
    {
        id: "video",
        name: "Video",
        price: 20,
        currency: "AZN",
        featured: false,
        tagline: { az: "Animasiyalı video dəvətnamə", en: "Animated video invitation", ru: "Анимированное видео-приглашение", tr: "Animasyonlu video davetiye" },
        features: {
            designChoice: false,
            personalInfo: true,
            shareLink: true,
            countdown: false,
            maps: false,
            rsvp: false,
            gallery: false,
            music: false,
            story: false,
            animations: false,
            videoBackground: true
        },
        formFields: ["names", "date", "time", "venue", "location", "message", "videoFile"],
        featureLabels: {
            az: { designChoice: "Dizayn seçimi", personalInfo: "Fərdi məlumatlar", shareLink: "Paylaşım linki", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Qalereya", music: "Musiqi", story: "Hekayə", animations: "Animasiyalar", videoBackground: "Video fon" },
            en: { designChoice: "Design choice", personalInfo: "Personal info", shareLink: "Share link", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Gallery", music: "Music", story: "Story", animations: "Animations", videoBackground: "Video background" },
            ru: { designChoice: "Выбор дизайна", personalInfo: "Личная информация", shareLink: "Ссылка", countdown: "Обратный отсчёт", maps: "Google Maps", rsvp: "RSVP", gallery: "Галерея", music: "Музыка", story: "История", animations: "Анимации", videoBackground: "Видео фон" },
            tr: { designChoice: "Tasarım seçimi", personalInfo: "Kişisel bilgi", shareLink: "Paylaşım linki", countdown: "Geri sayım", maps: "Google Maps", rsvp: "RSVP", gallery: "Galeri", music: "Müzik", story: "Hikaye", animations: "Animasyonlar", videoBackground: "Video arka plan" }
        }
    },
    {
        id: "basic",
        name: "Basic",
        price: 25,
        currency: "AZN",
        featured: false,
        tagline: { az: "Sadə və zərif", en: "Simple & elegant", ru: "Простое и элегантное", tr: "Basit ve zarif" },
        features: {
            designChoice: true,
            personalInfo: true,
            shareLink: true,
            countdown: false,
            maps: false,
            rsvp: false,
            gallery: false,
            music: false,
            story: false,
            animations: false,
            videoBackground: false
        },
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown", "rsvp", "map"],
        featureLabels: {
            az: { designChoice: "Dizayn seçimi", personalInfo: "Fərdi məlumatlar", shareLink: "Paylaşım linki", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Qalereya", music: "Musiqi", story: "Hekayə", animations: "Animasiyalar", videoBackground: "Video fon" },
            en: { designChoice: "Design choice", personalInfo: "Personal info", shareLink: "Share link", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Gallery", music: "Music", story: "Story", animations: "Animations", videoBackground: "Video background" },
            ru: { designChoice: "Выбор дизайна", personalInfo: "Личная информация", shareLink: "Ссылка", countdown: "Обратный отсчёт", maps: "Google Maps", rsvp: "RSVP", gallery: "Галерея", music: "Музыка", story: "История", animations: "Анимации", videoBackground: "Видео фон" },
            tr: { designChoice: "Tasarım seçimi", personalInfo: "Kişisel bilgi", shareLink: "Paylaşım linki", countdown: "Geri sayım", maps: "Google Maps", rsvp: "RSVP", gallery: "Galeri", music: "Müzik", story: "Hikaye", animations: "Animasyonlar", videoBackground: "Video arka plan" }
        }
    },
    {
        id: "premium",
        name: "Premium",
        price: 40,
        currency: "AZN",
        featured: true,
        tagline: { az: "Ən populyar seçim", en: "Most popular choice", ru: "Самый популярный выбор", tr: "En popüler seçim" },
        features: {
            designChoice: true,
            personalInfo: true,
            shareLink: true,
            countdown: true,
            maps: true,
            rsvp: true,
            gallery: true,
            music: false,
            story: false,
            animations: true,
            videoBackground: false
        },
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown", "rsvp", "map", "gallery", "story", "agenda"],
        featureLabels: {
            az: { designChoice: "Dizayn seçimi", personalInfo: "Fərdi məlumatlar", shareLink: "Paylaşım linki", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Qalereya", music: "Musiqi", story: "Hekayə", animations: "Animasiyalar", videoBackground: "Video fon" },
            en: { designChoice: "Design choice", personalInfo: "Personal info", shareLink: "Share link", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Gallery", music: "Music", story: "Story", animations: "Animations", videoBackground: "Video background" },
            ru: { designChoice: "Выбор дизайна", personalInfo: "Личная информация", shareLink: "Ссылка", countdown: "Обратный отсчёт", maps: "Google Maps", rsvp: "RSVP", gallery: "Галерея", music: "Музыка", story: "История", animations: "Анимации", videoBackground: "Видео фон" },
            tr: { designChoice: "Tasarım seçimi", personalInfo: "Kişisel bilgi", shareLink: "Paylaşım linki", countdown: "Geri sayım", maps: "Google Maps", rsvp: "RSVP", gallery: "Galeri", music: "Müzik", story: "Hikaye", animations: "Animasyonlar", videoBackground: "Video arka plan" }
        }
    },
    {
        id: "luxury",
        name: "Luxury",
        price: 65,
        currency: "AZN",
        featured: false,
        tagline: { az: "Tam premium təcrübə", en: "Full premium experience", ru: "Полный премиальный опыт", tr: "Tam premium deneyim" },
        features: {
            designChoice: true,
            personalInfo: true,
            shareLink: true,
            countdown: true,
            maps: true,
            rsvp: true,
            gallery: true,
            music: true,
            story: true,
            animations: true,
            videoBackground: false
        },
        formFields: ["names", "date", "time", "venue", "location", "message", "countdown", "rsvp", "map", "gallery", "music", "story", "agenda", "animations"],
        featureLabels: {
            az: { designChoice: "Dizayn seçimi", personalInfo: "Fərdi məlumatlar", shareLink: "Paylaşım linki", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Qalereya", music: "Musiqi", story: "Hekayə", animations: "Animasiyalar", videoBackground: "Video fon" },
            en: { designChoice: "Design choice", personalInfo: "Personal info", shareLink: "Share link", countdown: "Countdown", maps: "Google Maps", rsvp: "RSVP", gallery: "Gallery", music: "Music", story: "Story", animations: "Animations", videoBackground: "Video background" },
            ru: { designChoice: "Выбор дизайна", personalInfo: "Личная информация", shareLink: "Ссылка", countdown: "Обратный отсчёт", maps: "Google Maps", rsvp: "RSVP", gallery: "Галерея", music: "Музыка", story: "История", animations: "Анимации", videoBackground: "Видео фон" },
            tr: { designChoice: "Tasarım seçimi", personalInfo: "Kişisel bilgi", shareLink: "Paylaşım linki", countdown: "Geri sayım", maps: "Google Maps", rsvp: "RSVP", gallery: "Galeri", music: "Müzik", story: "Hikaye", animations: "Animasyonlar", videoBackground: "Video arka plan" }
        }
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
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Günel", "Samir"], date: "28 · 06 · 2026", message: "Təbiətin qoynunda, çiçəklərin ətrində birlikdə addımlayacağıq.", venue: "Botanika Bağı", location: "Quba, Azərbaycan", theme: "default" }
    },
    {
        id: "editorial", name: "Editorial Love", category: "wedding", style: "Foto · Redaksiya", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "SAVE THE DATE", names: ["Laman", "Tural"], date: "10 · 09 · 2026", message: "Sevgi ilə dolu bir həyat bizə gözəl anlar bəxş edir.", venue: "Pullman Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "luxe-gold", name: "Luxe Gold", category: "wedding", style: "Lüks · Qızıl", galleryStyle: "fullscreen", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Ülviyyə", "Murad"], date: "19 · 05 · 2026", message: "Yaşıl yarpaqların arasında, təbiətin qucağında birlikdə addımlayacağıq.", venue: "Botanika Bağı", location: "Şamaxı, Azərbaycan", theme: "default" }
    },
    {
        id: "modern-classic", name: "Modern Classic", category: "wedding", style: "Müasir · Klassik", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
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
        thumbnail: "https://images.unsplash.com/photo-1545232979-8bf9822d6622?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1545232979-8bf9822d6622?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ DƏVƏT EDİRİK", names: ["Leyla", "Samir"], date: "12 · 11 · 2026", message: "Gül iyində, zəriflik dolu bir nişan mərasimi sizi gözləyir.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "florence", name: "Florence", category: "birthday", style: "Şən · Rəngli", galleryStyle: "collage", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "AD GÜNÜ MÜBARƏK", names: ["Sara"], date: "14 · 03 · 2026", message: "Həyatımdakı ən gözəl anları sizinlə bölüşmək istəyirəm!", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "blossom", name: "Blossom", category: "birthday", style: "Video · Animasiyalı", galleryStyle: "grid", openingStyle: "fullscreen-photo",
        animationStyle: "modern",
        thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=90",
        minPackage: "video", packages: ["video"],
        preview: { eyebrow: "AD GÜNÜN MÜBARƏK", names: ["Nigar"], date: "08 · 05 · 2026", message: "Bir yaş daha böyüdük! Gəlin birlikdə qeyd edək.", venue: "Fontanlar Bağı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "elegant-birthday", name: "Elegant Birthday", category: "birthday", style: "Zərif · Ad Günü", galleryStyle: "editorial", openingStyle: "luxury-reveal",
        animationStyle: "luxury",
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "ŞƏN AD GÜNÜ", names: ["Zəhra"], date: "10 · 06 · 2026", message: "Bir il daha böyüdük! Gəlin birlikdə oynayıb əylənək!", venue: "Fun City", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "aurora", name: "Aurora", category: "graduation", style: "Akademik · Zərif", galleryStyle: "editorial", openingStyle: "editorial-reveal",
        animationStyle: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "MƏZUNİYYƏT", names: ["Ali"], date: "30 · 06 · 2026", message: "Uzun bir yolculuğun sonuna gəldik. Sizi bu sevincimi bölüşməyə dəvət edirəm.", venue: "ADA Universiteti", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "modern-grad", name: "Modern Grad", category: "graduation", style: "Müasir · Məzuniyyət", galleryStyle: "grid", openingStyle: "minimal-reveal",
        animationStyle: "minimal",
        thumbnail: "https://images.unsplash.com/photo-1627556704190-316a4b57b649?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1627556704190-316a4b57b649?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1596394723269-e2c2e8a3df3e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1596394723269-e2c2e8a3df3e?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "XINA GECƏSİ", names: ["Aysel"], date: "11 · 09 · 2026", message: "Xınamızda sizinlə birlikdə rəqs etmək istəyirik.", venue: "Şərq Sarayı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "traditional-henna", name: "Traditional Henna", category: "henna", style: "Ənənəvi · Klassik", galleryStyle: "collage", openingStyle: "floral-reveal",
        animationStyle: "floral",
        thumbnail: "https://images.unsplash.com/photo-1596394723269-e2c2e8a3df3e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1596394723269-e2c2e8a3df3e?auto=format&fit=crop&w=1800&q=90",
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
                id: "stairs", type: "scene", className: "scene-stairs",
                background: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.3), rgba(26,20,16,.6))",
                animation: { enter: "slide-up", duration: 1200 },
                content: { eyebrow: "", title: "Xoş gəlmisiniz", subtitle: "Qonaqlarımızı qarşılayırıq...", hint: "Scroll to continue ▼" },
                elements: [{ type: "circle", class: "deco-circle", style: "width:120px;height:120px;right:10%;top:15%;border-color:rgba(196,168,130,.15)" }]
            },
            {
                id: "wedding-hall", type: "scene", className: "scene-hall",
                background: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=1800&q=90",
                overlay: "linear-gradient(to bottom, rgba(26,20,16,.4), rgba(26,20,16,.55))",
                animation: { enter: "zoom", duration: 1500 },
                particles: "petals",
                content: { eyebrow: "", title: "Toy Zalı", subtitle: "Gözəl bəzədilmiş məkan...", hint: "Scroll to continue ▼" }
            },
            {
                id: "couple-table", type: "scene", className: "scene-venue",
                background: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=90",
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
        thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90",
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
                id: "reveal", type: "invitation-reveal", className: "scene-corporate",
                background: "linear-gradient(135deg, #0a1628, #16213e)",
                overlay: "none",
                animation: { enter: "reveal", duration: 1200 },
                content: { eyebrow: "{{companyName}}", title: "{{eventName}}", subtitle: "{{dateLong}}", cta: "VIEW EVENT DETAILS" }
            }
        ]
    }
];

/* ----- VIDEO INVITATIONS ----- */
var LUNA_VIDEO_INVITATIONS = JSON.parse(localStorage.getItem("luna_video_invitations") || "[]");

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

/* Count templates per category */
LUNA_CATEGORIES.forEach(function(cat) {
    cat.count = LUNA_TEMPLATES.filter(function(t) { return t.category === cat.id; }).length;
});