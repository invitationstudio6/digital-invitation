# Luna — Supabase Quruluşu (5 dəqiqə)

Paneli buluda qoşmaq üçün bu addımları icra et. Qoşulmadıqda sistem
tamamilə lokal rejimdə işləyir — heç nə pozulmur.

## 1. Layihə yarat
- https://supabase.com → Sign up → **New project**
- Ad: `luna`, region: yaxın (Frankfurt/Amsterdam), DB şifrəsini saxla

## 2. Cədvəlləri yarat
- Sol menyudan **SQL Editor** → New query
- `supabase/schema.sql` faylının **hamısını** kopyala → Run
- Nəticə: `luna_kv`, `luna_invitations`, `luna_orders` cədvəlləri yaradılır

## 3. Admin istifadəçisi yarat
- Sol menyudan **Authentication** → Users → **Add user**
  - **Create new user** seç
  - E-poçt + şifrə ver → ✅ *Auto Confirm User* işarəli olsun
- Bu e-poçt/şifrə panel giriş pəncərəsində işlədiləcək

## 4. Açarları panelə yaz
- **Project Settings** (dişli) → **API**
- İki dəyəri kopyala:
  - *Project URL* → `js/config.js` içindəki `url`
  - *anon public* key → `anonKey`
- Fayl belə görünəcək:

```js
window.LUNA_SUPABASE = {
    url: "https://abcdefgh.supabase.co",
    anonKey: "eyJhbGciOi..."
};
```

- Dəyişikliyi GitHub-a push et (canlı sayt üçün)

## 5. Giriş və sinxronizasiya
- Admin paneli aç → sol altda **"Bulud: giriş et"** düyməsinə klik
- Addım 3-dəki e-poçt/şifrə ilə daxil ol
- Çip yaşıl **"Bulud: sinxron ✓"** olur — hər şey avtomatik:
  - Panelə yazdığın hər dəyişiklik buluda gedir
  - Başqa cihazdan açsan eyni məlumatları görürsən
  - Müştəri formalardan sifariş göndərəndə **birbaşa sifarişlər bölməsinə düşür**
  - Müştəriyə verdiyin dəvətnamə linki **istənilən telefondan açılır** (404 yox)

## Necə işləyir?
| Məlumat | Yer | Kim görür |
|---|---|---|
| Şablonlar, dizaynlar, tənzimləmələr | `luna_kv` | yalnız sən |
| Yayımlanmış dəvətnamələr | `luna_invitations` | hamı (oxuma) |
| Müştəri sifarişləri | `luna_orders` | sən (göndərən hamı) |

Sinxron qaydası: son yazılan qalib (last-write-wins). İnternet olmasa
hər şey lokalda işləyir, qoşulanda avtomatik ötürülür.

## Qiymət
Supabase pulsuz planı bu layihə üçün birmənalı bəs edir
(500 MB bazа, 50K ayda aktiv istifadəçi).

## 6. Cütlük RSVP paneli (məxfilik) — klientlər üçün
Məqsəd: **qonaqlar/dəvətlilər heç bir RSVP siyahısını görməsin**,
cütlük isə **yalnız öz dəvətnaməsinin** siyahısını görsün. Bu,
Supabase Auth (magic-link) + RLS ilə təmin olunur.

### 6.1 Yeni cədvəli və siyasətləri quraşdır
- SQL Editor → New query → `supabase/rsvp-client-panel.sql` faylının hamısını Run et.
- Bu, `luna_owner_invitations` cədvəlini + aşağıdakıları yaradır:
  - Admin (rol=`admin`) `luna_kv`-də hər şeyi oxuya bilir
  - Cütlük yalnız öz `luna_rsvp_<id>__*` sətirlərini oxuya bilir
  - **Qonaq (anon) heç nə oxuya BİLMƏZ** — ancaq RSVP yaza bilir

### 6.2 Magic-link (Email) provider'ını aktivləşdir
- **Authentication** → Providers → **Email** → aktiv et
- "Sign up" qutusu varsa söndür (yalnız magic-link göndərmək üçün)

### 6.3 Admin istifadəçiyə `admin` rolunu ver
- **Authentication** → Users → admin istifadəçi → Edit
- **user_metadata** sahəsinə:
  ```json
  { "role": "admin" }
  ```
- Həmin admin **bir dəfə çıxıb yenidən daxil olmalıdır** (yeni session/JWT üçün).
  Cədvələ yalnız o admin yaza bilir.

### 6.4 Klient e-mailini təyin et
- Admin panel → müştəri sətri → **"Cütlük Girişi"** → e-maili yaz → Saxla.
- Bu, `luna_owner_invitations`-a yazılır.

### 6.5 Cütlük necə görür?
- Dəvətnamənin RSVP bölməsindəki **"Cütlük üçün RSVP (giriş)"** düyməsi,
  e-mailini yazıb "Giriş linki göndər" — e-poçta magic-link gəlir.
- Linki açanda avtomatik giriş olur və **yalnız öz** siyahısı açılır.
- Qonaq bu düyməni görsə belə — siyahını **görə bilməz**, çünki
  cütlüyün e-maili olmadan RLS heç nə qaytarmır.

