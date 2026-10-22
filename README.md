# Navdo — landing page

React 19 + TypeScript + Vite + Tailwind CSS 3 + Lucide.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ papkasiga production build
npm run preview  # build natijasini ko'rish
```

## Tuzilma

- `src/data/content.ts` — saytdagi barcha matnlar (brif asosida). Matnni shu yerda o'zgartiring.
- `src/components/sections/` — 13 ta blok (Header → Footer).
- `src/components/ui/primitives.tsx` — Button, AuditButton, Reveal, SectionHeading, Logo.
- `src/lib/leads.ts` — forma yuborish.
- `src/lib/scroll.ts` — CTA → formaga scroll va paketni oldindan tanlash.

## Arizalar → Telegram bot

Forma `POST /api/lead` ga yuboradi. Server arizani tekshiradi va Telegram botga xabar qiladi.
Bot tokeni faqat serverda turadi, brauzerga chiqmaydi.

- `server/lead.ts` — tekshirish, honeypot, Telegram xabarini yozish va yuborish.
- `api/lead.ts` — Vercel Function (production).
- `vite.config.ts` — `npm run dev` va `npm run preview` da ham `/api/lead` ishlaydi.

### Sozlash

1. @BotFather'da `/newbot` orqali bot yarating va tokenni oling.
2. Botni arizalar keladigan guruhga qo'shing (yoki botga o'zingiz `/start` yozing).
3. `https://api.telegram.org/bot<TOKEN>/getUpdates` ochib, `"chat":{"id":...}` ni oling.
4. Lokal: `.env.example` dan `.env` nusxa oling va `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` ni yozing.
5. Vercel: Settings → Environment Variables ga shu ikkisini qo'shing va qayta deploy qiling (pastga qarang).

`VITE_` prefiksi **qo'ymang**, aks holda token brauzer kodiga tushib qoladi.

### Server javoblari

| Holat | Javob | Formada |
|---|---|---|
| Yuborildi | 200 | Muvaffaqiyat ekrani |
| Token / chat_id yo'q yoki API topilmadi | 503 / 404 | "Ariza yuborilmadi" + telefon va Telegram |
| Noto'g'ri ma'lumot yoki honeypot | 400 | Xato xabari |
| Telegram rad etdi / javob bermadi | 502 | Xato xabari (sababi server logida) |

Boshqa hosting (Netlify, o'z serveringiz) ishlatilsa, `server/lead.ts` dagi `handleLead` ni
o'sha platformaning funksiyasiga ulang yoki `VITE_LEAD_ENDPOINT` bilan boshqa manzilni bering.

## Hosting (Vercel)

GitHub faqat kodni saqlaydi. GitHub Pages statik hosting bo'lgani uchun `/api/lead` u yerda ishlamaydi
(forma "ariza yuborilmadi" deydi). Bot ishlashi uchun Vercel ishlating — bepul tarif yetarli:

1. vercel.com → GitHub bilan kiring → **Add New → Project** → `navdo-website` ni tanlang.
2. Framework: **Vite** (avtomatik aniqlanadi). Build: `npm run build`, Output: `dist`. Root Directory: `./`.
3. **Environment Variables**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` → **Deploy**.
4. Saytdan test ariza yuboring — Telegram guruhga kelishi kerak.
5. Domen: Project → Settings → Domains → `navdo.uz` qo'shing va ko'rsatilgan DNS yozuvlarini
   domen provayderingizda kiriting.

Har `git push` dan keyin Vercel saytni avtomatik yangilaydi. Env o'zgartirilsa — **Redeploy** qiling.

## Keyin to'ldirish kerak

- Asoschi va jamoa fotosuratlari (`Team.tsx`, hozir monogramma).
- Mijozlar fikri — birinchi video-fikr tayyor bo'lgach (`Results.tsx` dagi izoh bloki o'rniga).
- Boshqargan do'konlar soni, jami sotilgan tovarlar (brifda "To'ldirish kerak").
- OG rasm (`index.html`) va analitika (Meta Pixel / GA) — ixtiyoriy.
