// Bepul audit arizasini tekshirib, Telegram botga yuboradi.
// Faqat serverda ishlaydi: bot tokeni brauzerga hech qachon chiqmaydi.
// Vercel funksiyasi (api/lead.ts) va Vite dev-server (vite.config.ts) shu modulni ishlatadi.

export type LeadEnv = {
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
}

export type LeadResult = { status: number; body: { ok: boolean; error?: string } }

const MAX = { name: 80, company: 160, channel: 80, source: 40 }

const packageNames: Record<string, string> = {
  start: 'Start',
  kalit: 'Kalit topshirish',
  unknown: 'Hali bilmaydi',
}

type Lead = {
  name: string
  phone: string
  company: string
  channel: string
  packageInterest: string
  source: string
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function parseLead(input: unknown): Lead | null {
  if (!input || typeof input !== 'object') return null
  const o = input as Record<string, unknown>
  // Honeypot: odam ko'rmaydigan maydon to'ldirilgan bo'lsa — bot
  if (str(o.website, 200)) return null

  const lead: Lead = {
    name: str(o.name, MAX.name),
    phone: str(o.phone, 20),
    company: str(o.company, MAX.company),
    channel: str(o.channel, MAX.channel),
    packageInterest: str(o.packageInterest, 20),
    source: str(o.source, MAX.source),
  }
  if (lead.name.length < 2 || lead.company.length < 2 || !lead.channel) return null
  if (!/^\+998\d{9}$/.test(lead.phone)) return null
  if (!(lead.packageInterest in packageNames)) lead.packageInterest = 'unknown'
  return lead
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function formatPhone(p: string) {
  const d = p.slice(4)
  return `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
}

export function formatLeadMessage(lead: Lead, now = new Date()) {
  const time = now.toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent', dateStyle: 'short', timeStyle: 'short' })
  return [
    '<b>🆕 Bepul audit — yangi ariza</b>',
    '',
    `<b>Ism:</b> ${esc(lead.name)}`,
    // Telegram raqamni o'zi bosiladigan qiladi; tel: havolalarini Bot API qabul qilmaydi
    `<b>Telefon:</b> ${formatPhone(lead.phone)}`,
    `<b>Kompaniya / mahsulot:</b> ${esc(lead.company)}`,
    `<b>Savdo kanali:</b> ${esc(lead.channel)}`,
    `<b>Paket:</b> ${packageNames[lead.packageInterest]}`,
    '',
    `<i>Manba: ${esc(lead.source || 'direct')} · ${time}</i>`,
  ].join('\n')
}

export async function handleLead(input: unknown, env: LeadEnv): Promise<LeadResult> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return { status: 503, body: { ok: false, error: 'not_configured' } }
  }
  const lead = parseLead(input)
  if (!lead) return { status: 400, body: { ok: false, error: 'invalid' } }

  try {
    const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: formatLeadMessage(lead),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      // Token yoki chat_id xato bo'lsa shu yerga tushadi — server logida ko'rinadi
      console.error('[lead] Telegram xatosi', res.status, await res.text())
      return { status: 502, body: { ok: false, error: 'telegram_failed' } }
    }
  } catch (err) {
    console.error('[lead] Telegram so‘rovi bajarilmadi', err)
    return { status: 502, body: { ok: false, error: 'telegram_unreachable' } }
  }
  return { status: 200, body: { ok: true } }
}
