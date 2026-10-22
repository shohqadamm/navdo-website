import { useEffect, useState, type FormEvent } from 'react'
import { AlertTriangle, CheckCircle2, Clock, Gift, Loader2, Lock, MapPin, Phone, Send } from 'lucide-react'
import { contacts, salesChannels } from '../data/content'
import { LeadNotConfiguredError, submitLead } from '../lib/leads'
import { formatPhone, isPhoneComplete, toE164 } from '../lib/phone'
import { Button, Logo, cx } from '../components/ui/primitives'
import { Field } from '../components/ui/Field'
import { UzumCoin } from '../components/ui/UzumCoin'

/**
 * Reklama uchun bitta blokli opt-in sahifa.
 * full  → /opt-in  : ism, telefon, mahsulot turi, savdo kanali
 * short → /opt-in2 : faqat ism va telefon
 * Arizalar asosiy formadek /api/lead → Telegram botga boradi (`page` maydoni bilan).
 */
export type OptInVariant = 'full' | 'short'

const pathFor: Record<OptInVariant, string> = { full: '/opt-in', short: '/opt-in2' }

const gives = [
  'Tovaringiz Uzum Market’da sotilish imkoniyati',
  'Komissiya va logistikadan keyin qoladigan taxminiy foyda',
  'Qaysi xizmat paketi sizga mosligi bo‘yicha tavsiya',
]

type Values = { name: string; phone: string; company: string; channel: string; website: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured'

const empty: Values = { name: '', phone: '', company: '', channel: '', website: '' }

function validate(v: Values, variant: OptInVariant): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Ismingizni kiriting'
  if (!isPhoneComplete(v.phone)) e.phone = 'Telefon raqamini to‘liq kiriting: +998 XX XXX XX XX'
  if (variant === 'full') {
    if (v.company.trim().length < 2) e.company = 'Mahsulot turini kiriting'
    if (!v.channel) e.channel = 'Hozirgi savdo kanalini tanlang'
  }
  return e
}

/** Reklama manbasi: ?utm_source=...&utm_campaign=... → "instagram/aprel" */
function readSource() {
  const q = new URLSearchParams(window.location.search)
  const src = [q.get('utm_source'), q.get('utm_campaign')].filter(Boolean).join('/')
  return (src || 'direct').slice(0, 40)
}

export function OptInPage({ variant }: { variant: OptInVariant }) {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    document.title = 'Bepul audit — Navdo | Tovaringiz Uzum’da qancha foyda beradi?'
    // Reklama sahifasi qidiruvda asosiy sayt bilan raqobat qilmasin
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])

  const set = (k: keyof Values) => (val: string) => {
    const next = { ...values, [k]: k === 'phone' ? formatPhone(val) : val }
    setValues(next)
    if (touched) setErrors(validate(next, variant))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(values, variant)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`optin-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      await submitLead({
        name: values.name.trim(),
        phone: toE164(values.phone),
        ...(variant === 'full' && { company: values.company.trim(), channel: values.channel }),
        source: readSource(),
        page: pathFor[variant],
        website: values.website,
      })
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof LeadNotConfiguredError ? 'not-configured' : 'error')
    }
  }

  const aria = (k: keyof Values) => ({
    id: `optin-${k}`,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `optin-${k}-error` : undefined,
  })

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-brand-50">
      {/* Uzum uslubidagi yumshoq yorug'lik — asosiy sayt hero'si bilan bir xil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.95),rgba(255,255,255,0)_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(175,205,232,.55),rgba(175,205,232,0)_65%)]"
      />

      <header className="container flex h-[72px] items-center justify-between">
        <a href="/" aria-label="Navdo — bosh sahifa">
          <Logo />
        </a>
        <a href={contacts.phoneHref} className="inline-flex items-center gap-2 text-sm font-semibold">
          <Phone aria-hidden className="h-4 w-4 text-gold-600" />
          <span className="hidden sm:inline">{contacts.phoneDisplay}</span>
          <span className="sm:hidden">Qo‘ng‘iroq</span>
        </a>
      </header>

      <main id="main" className="container flex flex-1 items-center py-8 lg:py-12">
        <section
          aria-labelledby="optin-title"
          className="grid w-full gap-8 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0"
        >
          {/* Offer: sarlavha. Mobilda tartib — sarlavha → forma → afzalliklar */}
          <div className="relative lg:self-end">
            <UzumCoin className="absolute -right-4 -top-24 hidden w-36 xl:block" />
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-500 shadow-card">
              <Gift aria-hidden className="h-3.5 w-3.5 text-gold-600" />
              Bepul audit · Samarqanddagi korxonalar uchun
            </p>
            <h1 id="optin-title" className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
              Tovaringiz <span className="text-brand-600">Uzum Market</span>’da qancha foyda keltirishini 30–40 daqiqada
              hisoblab beramiz
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              Raqamlarsiz qaror qilmang. Sexingizga kelib, tovaringizni ko‘ramiz va hisob-kitobni bepul tayyorlaymiz.
            </p>
          </div>

          {/* Forma */}
          <div className="relative overflow-hidden rounded-4xl bg-white p-6 shadow-float sm:p-9 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            {status === 'success' ? (
              <div role="status" className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                  <CheckCircle2 aria-hidden className="h-8 w-8" />
                </span>
                <h2 className="mt-6 text-2xl font-bold tracking-tight">Arizangiz qabul qilindi</h2>
                <p className="mt-3 max-w-sm text-ink-500">
                  Rahmat, {values.name.trim()}! Tez orada {values.phone} raqamiga qo‘ng‘iroq qilib, audit vaqtini kelishamiz.
                </p>
                <Button
                  as="a"
                  href={contacts.telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="mt-8"
                >
                  <Send aria-hidden className="h-4 w-4" /> Telegram: {contacts.telegram.label}
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit}>
                <h2 className="text-2xl font-bold tracking-tight">Bepul auditga yoziling</h2>
                <p className="mt-1 text-sm text-ink-400">
                  {variant === 'short'
                    ? 'Ism va raqamingizni qoldiring — o‘zimiz qo‘ng‘iroq qilamiz.'
                    : 'Ma’lumotlarni qoldiring — audit vaqtini kelishish uchun qo‘ng‘iroq qilamiz.'}
                </p>

                {/* Honeypot: botlar to'ldiradi, odamlar ko'rmaydi */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Sayt
                    <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website')(e.target.value)} />
                  </label>
                </div>

                <div className="mt-7 grid gap-5">
                  <Field id="optin-name" label="Ismingiz" error={errors.name}>
                    <input
                      {...aria('name')}
                      className="field"
                      autoComplete="name"
                      placeholder="Ism"
                      value={values.name}
                      onChange={(e) => set('name')(e.target.value)}
                    />
                  </Field>
                  <Field id="optin-phone" label="Telefon raqamingiz" error={errors.phone}>
                    <input
                      {...aria('phone')}
                      className="field"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+998 __ ___ __ __"
                      value={values.phone}
                      onChange={(e) => set('phone')(e.target.value)}
                    />
                  </Field>
                  {variant === 'full' && (
                    <>
                      <Field
                        id="optin-company"
                        label="Qanday mahsulot ishlab chiqarasiz yoki sotasiz?"
                        error={errors.company}
                        hint="Masalan: “Choyshab to‘plamlari” yoki “Maishiy kimyo”"
                      >
                        <input
                          {...aria('company')}
                          className="field"
                          autoComplete="organization"
                          placeholder="Mahsulot turi"
                          value={values.company}
                          onChange={(e) => set('company')(e.target.value)}
                        />
                      </Field>
                      <Field id="optin-channel" label="Hozir qayerda sotyapsiz?" error={errors.channel}>
                        <select
                          {...aria('channel')}
                          className={cx(
                            'field appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%236B7280%27 stroke-width=%272%27><path d=%27M4 6l4 4 4-4%27/></svg>")] bg-[right_1rem_center] bg-no-repeat pr-10',
                            !values.channel && 'text-ink-300',
                          )}
                          value={values.channel}
                          onChange={(e) => set('channel')(e.target.value)}
                        >
                          <option value="" disabled>
                            Tanlang
                          </option>
                          {salesChannels.map((c) => (
                            <option key={c} value={c} className="text-ink">
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </>
                  )}
                </div>

                {(status === 'error' || status === 'not-configured') && (
                  <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-semibold">
                        {status === 'not-configured'
                          ? 'Onlayn ariza hozircha ulanmagan — ariza yuborilmadi.'
                          : 'Arizani yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.'}
                      </p>
                      <p className="mt-1">
                        Hoziroq bog‘laning:{' '}
                        <a className="font-semibold underline" href={contacts.phoneHref}>
                          {contacts.phoneDisplay}
                        </a>{' '}
                        yoki Telegram{' '}
                        <a className="font-semibold underline" href={contacts.telegram.href} target="_blank" rel="noopener noreferrer">
                          {contacts.telegram.label}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> Yuborilmoqda…
                    </>
                  ) : (
                    'Bepul auditni olish'
                  )}
                </Button>
                <p className="mt-4 text-center text-xs text-ink-400">
                  Raqamingiz faqat audit vaqtini kelishish uchun ishlatiladi.
                </p>
              </form>
            )}
          </div>
          {/* Offer: afzalliklar */}
          <div className="lg:col-start-1 lg:row-start-2">
            <ul className="space-y-3 lg:mt-8">
              {gives.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[17px] font-medium">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  {g}
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2 text-sm text-ink-500">
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-card">
                <Clock aria-hidden className="h-4 w-4 text-brand-600" /> 30–40 daqiqa
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-card">
                <MapPin aria-hidden className="h-4 w-4 text-brand-600" /> Sexingizga kelamiz
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-card">
                <Lock aria-hidden className="h-4 w-4 text-brand-600" /> Ma’lumotlaringiz maxfiy
              </li>
            </ul>
          </div>

        </section>
      </main>

      <footer className="container py-6 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} Navdo · Uzum Market — uchinchi tomon platformasi. Navdo mustaqil xizmat ko‘rsatuvchi.
      </footer>
    </div>
  )
}
