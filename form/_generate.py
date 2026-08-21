# -*- coding: utf-8 -*-
# One-time generator: transforms _template.html into category-specific form pages.
# Run: python3 form/_generate.py
import os

BASE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE, "_template.html"), "r", encoding="utf-8") as f:
    TEMPLATE = f.read()

def generate(filename, title, icon, label, heading, desc, cat, config):
    content = TEMPLATE
    content = content.replace("__TITLE__", title)
    content = content.replace("__ICON__", icon)
    content = content.replace("__LABEL__", label)
    content = content.replace("__HEADING__", heading)
    content = content.replace("__DESC__", desc)
    content = content.replace("__CAT__", cat)
    content = content.replace("__CONFIG__", config)
    with open(os.path.join(BASE, filename), "w", encoding="utf-8") as f:
        f.write(content)
    print("Generated: " + filename)

# ---------- ENGAGEMENT ----------
generate(
    "engagement.html",
    "Luna — Nişan Dəvətnaməsi",
    "💍",
    "Nişan Dəvətnaməsi",
    "Nişan mərasiminiz<br>üçün dəvətnamə.",
    "Gəlin və bəy adları, nişan tarixi və məlumatları əlavə edin.",
    "Nişan",
    """lunaFormEngine({category:'engagement',defaultDesign:'classic',fields:[{name:'bride',type:'text',labelI18n:'formBride',required:true,col:'half',placeholder:'Aygun',forPackages:['video','basic','premium','luxury']},{name:'groom',type:'text',labelI18n:'formGroom',required:true,col:'half',placeholder:'Fərid',forPackages:['video','basic','premium','luxury']}],storyField:true,messagePlaceholder:'Nişan mərasimimizə xoş gəlmisiniz...',buildId:function(v){return{primaryName:v.bride,invitationId:lunaCreateSlug(v.bride)+'-'+lunaCreateSlug(v.groom)}},buildData:function(d,v){d.bride=v.bride;d.groom=v.groom;d.story=lunaFormatStory(v.story||'')}});"""
)

# ---------- BIRTHDAY ----------
generate(
    "birthday.html",
    "Luna — Ad Günü Dəvətnaməsi",
    "🎂",
    "Ad Günü Dəvətnaməsi",
    "Ad gününü<br>qeyd edək!",
    "Ad günü sahibinin adı, yaş və məlumatları əlavə edin.",
    "Ad Günü",
    """lunaFormEngine({category:'birthday',defaultDesign:'florence',fields:[{name:'celebrant',type:'text',labelI18n:'formCelebrant',required:true,col:'half',placeholder:'Leyla',forPackages:['video','basic','premium','luxury']},{name:'age',type:'number',label:'Yaş',col:'half',placeholder:'25',forPackages:['premium','luxury']}],messagePlaceholder:'Ad günümüzdə yanımızda olmağınızı istəyirik...',buildId:function(v){return{primaryName:v.celebrant,invitationId:lunaCreateSlug(v.celebrant)}},buildData:function(d,v){d.celebrant=v.celebrant;d.age=v.age||''}});"""
)

# ---------- GRADUATION ----------
generate(
    "graduation.html",
    "Luna — Məzuniyyət Dəvətnaməsi",
    "🎓",
    "Məzuniyyət Dəvətnaməsi",
    "Məzuniyyətinizi<br>qeyd edək!",
    "Məzun adı, universitet və məzuniyyət məlumatlarını əlavə edin.",
    "Məzuniyyət",
    """lunaFormEngine({category:'graduation',defaultDesign:'aurora',fields:[{name:'graduate',type:'text',labelI18n:'formGraduate',required:true,col:'half',placeholder:'Ali',forPackages:['video','basic','premium','luxury']},{name:'school',type:'text',labelI18n:'formSchool',col:'half',placeholder:'ADA Universiteti',forPackages:['premium','luxury']},{name:'degree',type:'text',labelI18n:'formDegree',col:'full',placeholder:'Komputer elmləri',forPackages:['premium','luxury']}],messagePlaceholder:'Məzuniyyətimizi sizinlə birlikdə qeyd etmək istəyirik...',buildId:function(v){return{primaryName:v.graduate,invitationId:lunaCreateSlug(v.graduate)}},buildData:function(d,v){d.graduate=v.graduate;d.school=v.school||'';d.degree=v.degree||''}});"""
)

# ---------- BABY SHOWER ----------
generate(
    "baby-shower.html",
    "Luna — Körpə Partisi Dəvətnaməsi",
    "👶",
    "Körpə Partisi Dəvətnaməsi",
    "Balaca mələyimizi<br>qarşılayırıq!",
    "Valideyn adları və körpə partisi məlumatlarını əlavə edin.",
    "Körpə Partisi",
    """lunaFormEngine({category:'baby-shower',defaultDesign:'sweet-arrival',fields:[{name:'parentName',type:'text',label:'Valideyn adı',required:true,col:'half',placeholder:'Valideyn adı',forPackages:['video','basic','premium','luxury']},{name:'babyName',type:'text',label:'Körpə adı (opsional)',col:'half',placeholder:'Körpə adı',forPackages:['video','basic','premium','luxury']},{name:'dueDate',type:'date',label:'Gözlənilən doğum tarixi',col:'half',forPackages:['premium','luxury']}],messagePlaceholder:'Körpəmizin gəlişini birlikdə qeyd edək...',buildId:function(v){return{primaryName:v.parentName||v.babyName,invitationId:lunaCreateSlug(v.parentName||v.babyName)}},buildData:function(d,v){d.parentName=v.parentName;d.babyName=v.babyName||'';d.dueDate=v.dueDate||''}});"""
)

# ---------- HENNA ----------
generate(
    "henna.html",
    "Luna — Xına Dəvətnaməsi",
    "🎶",
    "Xına Dəvətnaməsi",
    "Xına gecəniz<br>üçün dəvətnamə.",
    "Gəlin adı, xına tarixi və məlumatları əlavə edin.",
    "Xına",
    """lunaFormEngine({category:'henna',defaultDesign:'oriental',fields:[{name:'bride',type:'text',labelI18n:'formBride',required:true,col:'half',placeholder:'Aysel',forPackages:['video','basic','premium','luxury']},{name:'groom',type:'text',labelI18n:'formGroom',col:'half',placeholder:'Rəşad',forPackages:['video','basic','premium','luxury']}],storyField:true,messagePlaceholder:'Xına gecəmizdə iştirak etməyinizi arzu edirik...',buildId:function(v){return{primaryName:v.bride,invitationId:lunaCreateSlug(v.bride)+(v.groom?'-'+lunaCreateSlug(v.groom):'')}},buildData:function(d,v){d.bride=v.bride;d.groom=v.groom||'';d.story=lunaFormatStory(v.story||'')}});"""
)

# ---------- OTHER ----------
generate(
    "other.html",
    "Luna — Digər Tədbir Dəvətnaməsi",
    "✨",
    "Digər Tədbir Dəvətnaməsi",
    "Xüsusi tədbiriniz<br>üçün dəvətnamə.",
    "Tədbir adı, tarix və məlumatları əlavə edin.",
    "Digər",
    """lunaFormEngine({category:'other',defaultDesign:'anniversary',fields:[{name:'eventName',type:'text',labelI18n:'formEventName',required:true,col:'half',placeholder:'Xüsusi tədbir',forPackages:['video','basic','premium','luxury']},{name:'hostName',type:'text',labelI18n:'formHost',col:'half',placeholder:'Əli Həsənov',forPackages:['basic','premium','luxury']},{name:'eventType',type:'text',label:'Tədbir növü',col:'full',placeholder:'Məs: Yölnamə, Ad günü...',forPackages:['premium','luxury']},{name:'description',type:'textarea',labelI18n:'formDescription',col:'full',placeholder:'Tədbir haqqında ətraflı...',rows:4,forPackages:['premium','luxury']},{name:'schedule',type:'textarea',label:'Tədbirin cədvəli',col:'full',placeholder:'Tədbirin cədvəli...',rows:4,forPackages:['premium','luxury']},{name:'contact',type:'text',labelI18n:'formContact',col:'full',placeholder:'+994 XX XXX XX XX',forPackages:['premium','luxury']}],messagePlaceholder:'Sizi xüsusi tədbirimizə dəvət edirik...',buildId:function(v){return{primaryName:v.eventName,invitationId:lunaCreateSlug(v.eventName)}},buildData:function(d,v){d.eventName=v.eventName;d.hostName=v.hostName||'';d.eventType=v.eventType||'';d.description=v.description||'';d.schedule=v.schedule||'';d.contact=v.contact||''}});"""
)

# ---------- BUSINESS ----------
generate(
    "business.html",
    "Luna — Biznes Dəvətnaməsi",
    "💼",
    "Biznes Dəvətnaməsi",
    "Biznes tədbiriniz<br>üçün dəvətnamə.",
    "Şirkət adı, tədbir və biznes məlumatlarını əlavə edin.",
    "Biznes",
    """lunaFormEngine({category:'business',defaultDesign:'conference',fields:[{name:'companyName',type:'text',labelI18n:'formCompanyName',required:true,col:'half',placeholder:'Tech Corp',forPackages:['video','basic','premium','luxury']},{name:'eventName',type:'text',labelI18n:'formEventName',required:true,col:'half',placeholder:'İllik konfrans',forPackages:['video','basic','premium','luxury']},{name:'eventType',type:'select',label:'Tədbir növü',col:'full',options:[{value:'konfrans',text:'Konfrans'},{value:'seminar',text:'Seminar'},{value:'workshop',text:'Workshop'},{value:'sirket-terbiri',text:'Şirkət tədbiri'},{value:'lansman',text:'Lansman'},{value:'qala-gecesi',text:'Qala gecəsi'}],forPackages:['video','basic','premium','luxury']},{name:'hostName',type:'text',labelI18n:'formHost',col:'half',placeholder:'Əli Həsənov',forPackages:['premium','luxury']},{name:'speakerName',type:'text',label:'Spiker / Təqdimatçı',col:'half',placeholder:'Ad Soyad',forPackages:['premium','luxury']},{name:'agenda',type:'textarea',labelI18n:'formAgenda',col:'full',placeholder:'09:00 - Qeydiyyat\\n10:00 - Açılış nitqi...',rows:5,forPackages:['premium','luxury']},{name:'dresscode',type:'text',label:'Dress Code',col:'half',placeholder:'Formal, Business Casual',forPackages:['premium','luxury']},{name:'website',type:'url',labelI18n:'formWebsite',col:'half',placeholder:'https://company.com',forPackages:['luxury']},{name:'contact',type:'text',labelI18n:'formContact',col:'full',placeholder:'+994 XX XXX XX XX',forPackages:['premium','luxury']}],messagePlaceholder:'Sizi Şirkətimizin tədbirinə dəvət edirik...',buildId:function(v){return{primaryName:v.companyName,invitationId:lunaCreateSlug(v.companyName)+'-'+lunaCreateSlug(v.eventName)}},buildData:function(d,v){d.companyName=v.companyName;d.eventName=v.eventName;d.eventType=v.eventType||'';d.hostName=v.hostName||'';d.speakerName=v.speakerName||'';d.agenda=v.agenda||'';d.dresscode=v.dresscode||'';d.website=v.website||'';d.contact=v.contact||'';d.address=v.address||''}});"""
)

print("Done.")