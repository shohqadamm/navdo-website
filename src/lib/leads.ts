// Bepul audit arizasini yuborish.
//
// Standart holatda ariza o'z serverimizdagi POST /api/lead ga ketadi (api/lead.ts),
// u esa Telegram botga yuboradi. Bot tokeni faqat serverda: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// Boshqa backend kerak bo'lsa — VITE_LEAD_ENDPOINT bilan almashtiring.
// Server sozlanmagan bo'lsa (503), forma muvaffaqiyat ko'rsatmaydi —
// foydalanuvchiga telefon va Telegram orqali bog'lanishni taklif qiladi.

export type LeadPayload = {
  name: string
  phone: string
  company: string
  channel: string
  packageInterest: string
  source: string
  /** Honeypot: odam uchun bo'sh qoladi */
  website: string
}

export class LeadNotConfiguredError extends Error {
  constructor() {
    super('Ariza qabul qiluvchi server sozlanmagan')
    this.name = 'LeadNotConfiguredError'
  }
}

const endpoint = (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) || '/api/lead'

export async function submitLead(payload: LeadPayload): Promise<void> {
  let res: Response
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Tarmoq xatosi')
  }
  // 404: API umuman yo'q (masalan, faqat statik hosting); 503: Telegram sozlanmagan
  if (res.status === 503 || res.status === 404) throw new LeadNotConfiguredError()
  if (!res.ok) throw new Error(`Server javobi: ${res.status}`)
}
