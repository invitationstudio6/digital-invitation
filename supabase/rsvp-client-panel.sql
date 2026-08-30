-- =====================================================
-- LUNA — CÜTLÜK RSVP PANELİ (klientlər üçün)
--
-- Məqsəd: qonaqlar/dəvətli HEÇ BİR RSVP siyahısını görməsin,
-- cütlük (klient) isə YALNIZ ÖZ dəvətnaməsinin RSVP-lərini görsün.
--
-- Tələb olunan addımlar:
--   1) Bu faylı SUPABASE Dashboard → SQL Editor → Run et.
--      (Əvvəl supabase/schema.sql artıq çalışdırılmış olmalıdır.)
--   2) Authentication → Sign In / Up → Email → "Email" (magic-link)
--      provider'ı aktivləşdir. Magic Link / OTP maili göndəriləcək.
--   3) ADMIN istifadəçiyə "admin" rolunu ver (aşağıda 6-cı bölmə):
--      Auth → Users → admin-ə bax → Edit → user_metadata-ə:
--          {"role":"admin"}  əlavə et  (və ya app_metadata-ə)
--        Sonra heç olmasa bir dəfə admin kimi daxil olub çıx.
--   4) Admin paneldə hər müştəriyə "Cütlük Girişi" ilə
--      klient-in e-mailini təyin et.
--
-- Qeyd: Rol ancaq JWT-də görünür — buna görə rol claim
-- dəyişəndən sonra istifadəçi YENİDƏN daxil olmalıdır.
-- =====================================================

-- ---- 1) Cütlük (klient) sahib cədvəli ----
create table if not exists luna_owner_invitations (
    invitation_id text primary key,
    email         text not null,
    updated_at    timestamptz not null default now()
);

alter table luna_owner_invitations enable row level security;

-- ---- 2) luna_owner_invitations siyasətləri ----
-- Admin idarə edir (email təyin/çıxarır), cütlük yalnız öz sətirini oxuya bilər.
drop policy if exists "owner admin all"        on luna_owner_invitations;
drop policy if exists "owner client read own"  on luna_owner_invitations;

create policy "owner admin all" on luna_owner_invitations
    for all to authenticated
    using (coalesce(auth.jwt() -> 'user_metadata' ->> 'role', auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    with check (coalesce(auth.jwt() -> 'user_metadata' ->> 'role', auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "owner client read own" on luna_owner_invitations
    for select to authenticated
    using (email = lower(auth.jwt() ->> 'email'));

-- ---- 3) luna_kv oxuma siyasətləri (MÜHÜM: məxfilik) ----
-- Köhnə "kv admin read" (bütün authenticated oxuyur) ROLE-a görə ayırırıq:
--   - Admin: hər şeyi oxuya bilər
--   - Cütlük (qeyri-admin): yalnız ÖZ luna_rsvp_<id>__* açarlarını oxuya bilər
--   - Anon/qonaq: heç nə oxuya BİLMƏZ (yalnız yaza bilər — aşağıda)
drop policy if exists "kv admin read" on luna_kv;
create policy "kv admin read" on luna_kv
    for select to authenticated
    using (coalesce(auth.jwt() -> 'user_metadata' ->> 'role', auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Cütlük öz RSVP-lərini oxuyur (email-ə bağlı dəvətnamə id-si ilə)
drop policy if exists "kv owner read own rsvp" on luna_kv;
create policy "kv owner read own rsvp" on luna_kv
    for select to authenticated
    using (
        key like 'luna_rsvp_%__%'
        and exists (
            select 1 from luna_owner_invitations oi
            where oi.email = lower(auth.jwt() ->> 'email')
              and key like 'luna_rsvp_' || oi.invitation_id || '__%'
        )
    );

-- Qonaq anon INSERT toxunulmazdır (schema.sql-də artıq var), amma təhlükəsizlik üçün
-- oxuma siyasəti anon üçün YOXDUR (default deny) — heç bir dəyişiklik lazım deyil.
-- Cədvəl səviyyəsində anon SELECT verilmiş siyasətlərlə bloklanır.

-- ---- 4) ADMIN rolunu ver (birdəfəlik) ----
-- Dashboard → Authentication → Users → ADMIN istifadəçi → Edit →
-- "user_metadata" sahəsinə aşağıdakı JSON-u yazıb Save et:
--     { "role": "admin" }
-- Sonra həmin admin yeni session alması üçün bir dəfə çıxıb YENİDƏN daxil olmalıdır
-- (rol claim yalnız yeni JWT-də görünür).
--
-- Fayldakı bütün siyasətlər rol claim'ləri user_metadata-dan (və ehtiyat olaraq
-- app_metadata-dan) oxuyur, buna görə ayrıca trigger tələb olunmur.
