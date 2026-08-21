// This script generates the category-specific form pages from the template
// Run with: node form/generate.js
const fs = require("fs");
const path = require("path");

const template = fs.readFileSync(path.join(__dirname, "_template.html"), "utf8");

function generate(filename, config) {
    let content = template;
    content = content.split("__TITLE__").join(config.title);
    content = content.split("__ICON__").join(config.icon);
    content = content.split("__LABEL__").join(config.label);
    content = content.split("__HEADING__").join(config.heading);
    content = content.split("__DESC__").join(config.desc);
    content = content.split("__CAT__").join(config.cat);
    content = content.split("__CONFIG__").join(config.config);
    fs.writeFileSync(path.join(__dirname, filename), content, "utf8");
    console.log("Generated: " + filename);
}

const LANGUAGE_OPTIONS = [
    { value: "az", text: "Azərbaycan" },
    { value: "en", text: "English" },
    { value: "ru", text: "Русский" },
    { value: "tr", text: "Türkçe" }
];

const BUSINESS_EVENT_TYPES = [
    { value: "konfrans", text: "Konfrans" },
    { value: "seminar", text: "Seminar" },
    { value: "workshop", text: "Workshop" },
    { value: "sirket-terbiri", text: "Şirkət tədbiri" },
    { value: "lansman", text: "Lansman" },
    { value: "qala-gecesi", text: "Qala gecəsi" }
];

/* ===== HELPER: serialize config object to inline JS ===== */
function conf(obj) {
    return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/* ===== ENGAGEMENT ===== */
generate("engagement.html", {
    title: "Luna — Nişan Dəvətnaməsi",
    icon: "💍",
    label: "Nişan Dəvətnaməsi",
    heading: "Nişan mərasiminiz<br>üçün dəvətnamə.",
    desc: "Gəlin və bəy adları, nişan tarixi və məlumatları əlavə edin.",
    cat: "Nişan",
    config: "lunaFormEngine({category:'engagement',defaultDesign:'classic',fields:[{name:'bride',type:'text',labelI18n:'formBride',required:true,col:'half',placeholder:'Aygun',forPackages:['video','basic','premium','luxury']},{name:'groom',type:'text',labelI18n:'formGroom',required:true,col:'half',placeholder:'Fərid',forPackages:['video','basic','premium','luxury']}],storyField:true,messagePlaceholder:'Nişan mərasimimizə xoş gəlmisiniz...',buildId:function(v){return{primaryName:v.bride,invitationId:lunaCreateSlug(v.bride)+'-'+lunaCreateSlug(v.groom)}},buildData:function(d,v){d.bride=v.bride;d.groom=v.groom;d.story=lunaFormatStory(v.story||'')}});"
});

/* ===== BIRTHDAY ===== */
generate("birthday.html", {
    title: "Luna — Ad Günü Dəvətnaməsi",
    icon: "🎂",
    label: "Ad Günü Dəvətnaməsi",
    heading: "Ad gününü<br>qeyd edək!",
    desc: "Ad günü sahibinin adı, yaş və məlumatları əlavə edin.",
    cat: "Ad Günü",
    config: "lunaFormEngine({category:'birthday',defaultDesign:'florence',fields:[{name:'celebrant',type:'text',labelI18n:'formCelebrant',required:true,col:'half',placeholder:'Leyla',forPackages:['video','basic','premium','luxury']},{name:'age',type:'number',label:'Yaş',col:'half',placeholder:'25',forPackages:['premium','luxury']}],messagePlaceholder:'Ad günümüzdə yanımızda olmağınızı istəyirik...',buildId:function(v){return{primaryName:v.celebrant,invitationId:lunaCreateSlug(v.celebrant)}},buildData:function(d,v){d.celebrant=v.celebrant;d.age=v.age||''}});"
});

/* ===== GRADUATION ===== */
generate("graduation.html", {
    title: "Luna — Məzuniyyət Dəvətnaməsi",
    icon: "🎓",
    label: "Məzuniyyət Dəvətnaməsi",
    heading: "Məzuniyyətinizi<br>qeyd edək!",
    desc: "Məzun adı, universitet və məzuniyyət məlumatlarını əlavə edin.",
    cat: "Məzuniyyət",
    config: "lunaFormEngine({category:'graduation',defaultDesign:'aurora',fields:[{name:'graduate',type:'text',labelI18n:'formGraduate',required:true,col:'half',placeholder:'Ali',forPackages:['video','basic','premium','luxury']},{name:'school',type:'text',labelI18n:'formSchool',col:'half',placeholder:'ADA Universiteti',forPackages:['premium','luxury']},{name:'degree',type:'text',labelI18n:'formDegree',col:'full',placeholder:'Komputer elmləri',forPackages:['premium','luxury']}],messagePlaceholder:'Məzuniyyətimizi sizinlə birlikdə qeyd etmək istəyirik...',buildId:function(v){return{primaryName:v.graduate,invitationId:lunaCreateSlug(v.graduate)}},buildData:function(d,v){d.graduate=v.graduate;d.school=v.school||'';d.degree=v.degree||''}});"
});

/* ===== BABY SHOWER ===== */
generate("baby-shower.html", {
    title: "Luna — Körpə Partisi Dəvətnaməsi",
    icon: "👶",
    label: "Körpə Partisi Dəvətnaməsi",
    heading: "Balaca mələyimizi<br>qarşılayırıq!",
    desc: "Valideyn adları və körpə partisi məlumatlarını əlavə edin.",
    cat: "Körpə Partisi",
    config: "lunaFormEngine({category:'baby-shower',defaultDesign:'sweet-arrival',fields:[{name:'parentName',type:'text',label:'Valideyn adı',required:true,col:'half',placeholder:'Valideyn adı',forPackages:['video','basic','premium','luxury']},{name:'babyName',type:'text',label:'Körpə adı (opsional)',col:'half',placeholder:'Körpə adı',forPackages:['video','basic','premium','luxury']},{name:'dueDate',type:'date',label:'Gözlənilən doğum tarixi',col:'half',forPackages:['premium','luxury']}],messagePlaceholder:'Körpəmizin gəlişini birlikdə qeyd edək...',buildId:function(v){return{primaryName:v.parentName||v.babyName,invitationId:lunaCreateSlug(v.parentName||v.babyName)}},buildData:function(d,v){d.parentName=v.parentName;d.babyName=v.babyName||'';d.dueDate=v.dueDate||''}});"
});

/* ===== HENNA ===== */
generate("henna.html", {
    title: "Luna — Xına Dəvətnaməsi",
    icon: "🎶",
    label: "Xına Dəvətnaməsi",
    heading: "Xına gecəniz<br>üçün dəvətnamə.",
    desc: "Gəlin adı, xına tarixi və məlumatları əlavə edin.",
    cat: "Xına",
    config: "lunaFormEngine({category:'henna',defaultDesign:'oriental',fields:[{name:'bride',type:'text',labelI18n:'formBride',required:true,col:'half',placeholder:'Aysel',forPackages:['video','basic','premium','luxury']},{name:'groom',type:'text',labelI18n:'formGroom',col:'half',placeholder:'Rəşad',forPackages:['video','basic','premium','luxury']}],storyField:true,messagePlaceholder:'Xına gecəmizdə iştirak etməyinizi arzu edirik...',buildId:function(v){return{primaryName:v.bride,invitationId:lunaCreateSlug(v.bride)+(v.groom?'-'+lunaCreateSlug(v.groom):'')}},buildData:function(d,v){d.bride=v.bride;d.groom=v.groom||'';d.story=lunaFormatStory(v.story||'')}});"
});

/* ===== OTHER ===== */
generate("other.html", {
    title: "Luna — Digər Tədbir Dəvətnaməsi",
    icon: "✨",
    label: "Digər Tədbir Dəvətnaməsi",
    heading: "Xüsusi tədbiriniz<br>üçün dəvətnamə.",
    desc: "Tədbir adı, tarix və məlumatları əlavə edin.",
    cat: "Digər",
    config: "lunaFormEngine({category:'other',defaultDesign:'anniversary',fields:[{name:'eventName',type:'text',labelI18n:'formEventName',required:true,col:'half',placeholder:'Xüsusi tədbir',forPackages:['video','basic','premium','luxury']},{name:'hostName',type:'text',labelI18n:'formHost',col:'half',placeholder:'Əli Həsənov',forPackages:['basic','premium','luxury']},{name:'eventType',type:'text',label:'Tədbir növü',col:'full',placeholder:'Məs: Yölnamə, Ad günü...',forPackages:['premium','luxury']},{name:'description',type:'textarea',labelI18n:'formDescription',col:'full',placeholder:'Tədbir haqqında ətraflı...',rows:4,forPackages:['premium','luxury']},{name:'schedule',type:'textarea',label:'Tədbirin cədvəli',col:'full',placeholder:'Tədbirin cədvəli...',rows:4,forPackages:['premium','luxury']},{name:'contact',type:'text',labelI18n:'formContact',col:'full',placeholder:'+994 XX XXX XX XX',forPackages:['premium','luxury']}],messagePlaceholder:'Sizi xüsusi tədbirimizə dəvət edirik...',buildId:function(v){return{primaryName:v.eventName,invitationId:lunaCreateSlug(v.eventName)}},buildData:function(d,v){d.eventName=v.eventName;d.hostName=v.hostName||'';d.eventType=v.eventType||'';d.description=v.description||'';d.schedule=v.schedule||'';d.contact=v.contact||''}});"
});

/* ===== BUSINESS (maintain existing custom business form fields) ===== */
generate("business.html", {
    title: "Luna — Biznes Dəvətnaməsi",
    icon: "💼",
    label: "Biznes Dəvətnaməsi",
    heading: "Biznes tədbiriniz<br>üçün dəvətnamə.",
    desc: "Şirkət adı, tədbir və biznes məlumatlarını əlavə edin.",
    cat: "Biznes",
    config: "lunaFormEngine({category:'business',defaultDesign:'conference',fields:[{name:'companyName',type:'text',labelI18n:'formCompanyName',required:true,col:'half',placeholder:'Tech Corp',forPackages:['video','basic','premium','luxury']},{name:'eventName',type:'text',labelI18n:'formEventName',required:true,col:'half',placeholder:'İllik konfrans',forPackages:['video','basic','premium','luxury']},{name:'eventType',type:'select',label:'Tədbir növü',col:'full',options:" + conf(BUSINESS_EVENT_TYPES) + ",forPackages:['video','basic','premium','luxury']},{name:'hostName',type:'text',labelI18n:'formHost',col:'half',placeholder:'Əli Həsənov',forPackages:['premium','luxury']},{name:'speakerName',type:'text',label:'Spiker / Təqdimatçı',col:'half',placeholder:'Ad Soyad',forPackages:['premium','luxury']},{name:'agenda',type:'textarea',labelI18n:'formAgenda',col:'full',placeholder:'09:00 - Qeydiyyat\\n10:00 - Açılış nitqi...',rows:5,forPackages:['premium','luxury']},{name:'dresscode',type:'text',label:'Dress Code',col:'half',placeholder:'Formal, Business Casual',forPackages:['premium','luxury']},{name:'website',type:'url',labelI18n:'formWebsite',col:'half',placeholder:'https://company.com',forPackages:['luxury']},{name:'contact',type:'text',labelI18n:'formContact',col:'full',placeholder:'+994 XX XXX XX XX',forPackages:['premium','luxury']}],messagePlaceholder:'Sizi Şirkətimizin tədbirinə dəvət edirik...',buildId:function(v){return{primaryName:v.companyName,invitationId:lunaCreateSlug(v.companyName)+'-'+lunaCreateSlug(v.eventName)}},buildData:function(d,v){d.companyName=v.companyName;d.eventName=v.eventName;d.eventType=v.eventType||'';d.hostName=v.hostName||'';d.speakerName=v.speakerName||'';d.agenda=v.agenda||'';d.dresscode=v.dresscode||'';d.website=v.website||'';d.contact=v.contact||'';d.address=v.address||''}});"
});