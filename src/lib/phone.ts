/** +998 XX XXX XX XX formatlash: faqat 9 ta milliy raqam saqlanadi. */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('998')) d = d.slice(3)
  d = d.slice(0, 9)
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return parts.length ? `+998 ${parts.join(' ')}` : ''
}

export const phoneDigits = (v: string) => v.replace(/\D/g, '').replace(/^998/, '')

export const isPhoneComplete = (v: string) => phoneDigits(v).length === 9

/** Server kutgan ko'rinish: +998XXXXXXXXX */
export const toE164 = (v: string) => `+998${phoneDigits(v)}`
