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
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=85",
        description: { az: "Birlikdə yolculuğunuzun başlanğıcı", en: "The beginning of your journey together", ru: "Начало вашего совместного пути", tr: "Birlikte yolculuğunuzun başlangıcı" },
        count: 0
    },
    {
        id: "henna",
        icon: "🎶",
        image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=85",
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
        id: "amelia", name: "Amelia", category: "wedding", style: "Floral · Romantik",
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "SİZİ SEVGİ İLƏ DƏVƏT EDİRİK", names: ["Aysel", "Murad"], date: "12 · 09 · 2026", message: "Bəzi hekayələr kitablarda yazılır. Bizimki isə kiçik anlarda, paylaşılan gülüşlərdə və unudulmaz xatirələrdə yazıldı.", venue: "Crystal Hall", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "amour", name: "Amour", category: "wedding", style: "Romantik · Klassik",
        thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "THE WEDDING OF", names: ["Leyla", "Kamran"], date: "20 · 10 · 2026", message: "Hekayəmiz sadə bir salamla başladı və zaman keçdikcə gözəl bir hekayəyə çevrildi.", venue: "Marriott Hotel", location: "Bakı, Azərbaycan", theme: "amour" }
    },
    {
        id: "noir", name: "Noir", category: "wedding", style: "Lüks · Kinematik",
        thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "WEDDING COLLECTION", names: ["Nigar", "Elvin"], date: "15 · 11 · 2026", message: "Sevgi zamanı doping edir. Bizim hekayəmiz məhz belə başladı.", venue: "Four Seasons", location: "Bakı, Azərbaycan", theme: "noir" }
    },
    {
        id: "serena", name: "Serena", category: "wedding", style: "Lavanda · Zərif",
        thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "SİZİ DƏVƏT EDİRİK", names: ["Aytac", "Rəşad"], date: "05 · 12 · 2026", message: "Həyatımızın ən gözəl anlarını sizinlə paylaşmaq istəyirik.", venue: "Azure Hall", location: "Bakı, Azərbaycan", theme: "serena" }
    },
    {
        id: "garden", name: "Italian Garden", category: "wedding", style: "Baq · Təbiət",
        thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "TOY DƏVƏTNAMƏSİ", names: ["Günel", "Samir"], date: "28 · 06 · 2026", message: "Təbiətin qoynunda, çiçəklərin ətrində birlikdə addımlayacağıq.", venue: "Botanika Bağı", location: "Quba, Azərbaycan", theme: "default" }
    },
    {
        id: "editorial", name: "Editorial Love", category: "wedding", style: "Foto · Redaksiya",
        thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "luxury", packages: ["luxury"],
        preview: { eyebrow: "SAVE THE DATE", names: ["Laman", "Tural"], date: "10 · 09 · 2026", message: "Sevgi ilə dolu bir həyat bizə gözəl anlar bəxş edir.", venue: "Pullman Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "classic", name: "Classic", category: "engagement", style: "Klassik · Sadə",
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "NİŞAN DƏVƏTNAMƏSİ", names: ["Aygun", "Fərid"], date: "22 · 08 · 2026", message: "Birlikdə addımlayacağımız yeni həyatımızın başlanğıcında sizinlə bölüşmək istəyirik.", venue: "Park Hyatt", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "florence", name: "Florence", category: "birthday", style: "Şən · Rəngli",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "AD GÜNÜ MÜBARƏK", names: ["Sara"], date: "14 · 03 · 2026", message: "Həyatımdakı ən gözəl anları sizinlə bölüşmək istəyirəm!", venue: "Boulevard Hotel", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "aurora", name: "Aurora", category: "graduation", style: "Akademik · Zərif",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=90",
        minPackage: "basic", packages: ["basic", "premium", "luxury"],
        preview: { eyebrow: "MƏZUNİYYƏT", names: ["Ali"], date: "30 · 06 · 2026", message: "Uzun bir yolculuğun sonuna gəldik. Sizi bu sevincimi bölüşməyə dəvət edirəm.", venue: "ADA Universiteti", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "blossom", name: "Blossom", category: "birthday", style: "Video · Animasiyalı",
        thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=90",
        minPackage: "video", packages: ["video"],
        preview: { eyebrow: "AD GÜNÜN MÜBARƏK", names: ["Nigar"], date: "08 · 05 · 2026", message: "Bir yaş daha böyüdük! Gəlin birlikdə qeyd edək.", venue: "Fontanlar Bağı", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "executive", name: "Executive", category: "business", style: "Korporativ · Peşəkar",
        thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "BİZNES TƏDBİRİ", names: ["Tech Corp"], date: "25 · 09 · 2026", message: "İlin ən böyük biznes tədbirinə dəvət edirik.", venue: "JW Marriott", location: "Bakı, Azərbaycan", theme: "default" }
    },
    {
        id: "oriental", name: "Oriental Henna", category: "henna", style: "Şərqi · Lüks",
        thumbnail: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=600&q=85",
        cover: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1800&q=90",
        minPackage: "premium", packages: ["premium", "luxury"],
        preview: { eyebrow: "XINA GECƏSİ", names: ["Aysel"], date: "11 · 09 · 2026", message: "Xınamızda sizinlə birlikdə rəqs etmək istəyirik.", venue: "Şərq Sarayı", location: "Bakı, Azərbaycan", theme: "default" }
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
