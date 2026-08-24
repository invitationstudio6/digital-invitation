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
