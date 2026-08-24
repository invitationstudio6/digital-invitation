-- =====================================================
-- LUNA — Supabase sxemi
-- Supabase Dashboard → SQL Editor → bu faylın hamısını çalıştır
-- =====================================================

-- 1) Admin dataları (şablonlar, dizaynlar, dəvətnamələr, tənzimləmələr)
create table if not exists luna_kv (
    key        text primary key,
    value      jsonb not null,
    updated_at timestamptz not null default now()
);

-- 2) Yayımlanmış dəvətnamələr (qonaqlar oxuyur — anon READ açıqdır)
create table if not exists luna_invitations (
    id         text primary key,
    value      jsonb not null,
    updated_at timestamptz not null default now()
);

-- 3) Müştəri sifarişləri (formalardan birbaşa gəlir — anon INSERT açıqdır)
create table if not exists luna_orders (
    id         uuid primary key default gen_random_uuid(),
    payload    jsonb not null,
    status     text not null default 'new',
    created_at timestamptz not null default now()
);

alter table luna_kv         enable row level security;
alter table luna_invitations enable row level security;
alter table luna_orders     enable row level security;

-- ---- luna_kv: yalnız daxil olmuş (authenticated) admin ----
drop policy if exists "kv admin read"   on luna_kv;
drop policy if exists "kv admin insert" on luna_kv;
drop policy if exists "kv admin update" on luna_kv;
drop policy if exists "kv admin delete" on luna_kv;
create policy "kv admin read"   on luna_kv for select to authenticated using (true);
create policy "kv admin insert" on luna_kv for insert to authenticated with check (true);
create policy "kv admin update" on luna_kv for update to authenticated using (true) with check (true);
create policy "kv admin delete" on luna_kv for delete to authenticated using (true);

-- Qonaq RSVP-ləri yaza bilsin (yalnız luna_rsvp_ prefiksi)
drop policy if exists "kv rsvp anon insert" on luna_kv;
create policy "kv rsvp anon insert" on luna_kv for insert to anon
    with check (key like 'luna_rsvp_%');

-- ---- luna_invitations: hamı oxuyur, yalnız admin yazır ----
drop policy if exists "inv public read" on luna_invitations;
drop policy if exists "inv admin insert" on luna_invitations;
drop policy if exists "inv admin update" on luna_invitations;
drop policy if exists "inv admin delete" on luna_invitations;
create policy "inv public read"   on luna_invitations for select to anon, authenticated using (true);
create policy "inv admin insert"  on luna_invitations for insert to authenticated with check (true);
create policy "inv admin update"  on luna_invitations for update to authenticated using (true) with check (true);
create policy "inv admin delete"  on luna_invitations for delete to authenticated using (true);

-- ---- luna_orders: hərkəs göndərir, yalnız admin oxuyur/dəyişir ----
drop policy if exists "orders anon insert" on luna_orders;
drop policy if exists "orders admin read"   on luna_orders;
drop policy if exists "orders admin update" on luna_orders;
create policy "orders anon insert"  on luna_orders for insert to anon with check (true);
create policy "orders admin read"   on luna_orders for select to authenticated using (true);
create policy "orders admin update" on luna_orders for update to authenticated using (true) with check (true);
