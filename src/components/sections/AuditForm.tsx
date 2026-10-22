import { useEffect, useId, useState, type FormEvent } from 'react'
import { AlertTriangle, CheckCircle2, Clock, Loader2, Phone, Send } from 'lucide-react'
import { contacts, salesChannels, type PackageId } from '../../data/content'
import { LeadNotConfiguredError, submitLead } from '../../lib/leads'
import { AUDIT_EVENT, type AuditDetail } from '../../lib/scroll'
import { formatPhone, isPhoneComplete, toE164 } from '../../lib/phone'
import { Button, Reveal, cx } from '../ui/primitives'
import { Field } from '../ui/Field'

type Values = { name: string; phone: string; company: string; channel: string; packageInterest: string; website: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured'

const packageOptions: { value: '' | PackageId; label: string }[] = [
  { value: '', label: 'Hali bilmayman' },
  { value: 'start', label: 'Start' },
  { value: 'kalit', label: 'Kalit topshirish' },
]

const auditGives = [
  'Tovaringizning Uzum Market’da sotilish imkoniyati',
  'Komissiya va logistikadan keyingi taxminiy foyda',
  'Qaysi paket mosligi bo‘yicha tavsiya',
]

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Ismingizni kiriting'
  if (!isPhoneComplete(v.phone)) e.phone = 'Telefon raqamini to‘liq kiriting: +998 XX XXX XX XX'
  if (v.company.trim().length < 2) e.company = 'Kompaniya yoki mahsulot turini kiriting'
  if (!v.channel) e.channel = 'Hozirgi savdo kanalini tanlang'
  return e
}

const empty: Values = { name: '', phone: '', company: '', channel: '', packageInterest: '', website: '' }

export function AuditForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [source, setSource] = useState('direct')
  const uid = useId()

  // Paket kartochkasidagi CTA bosilganda paketni oldindan tanlash
  useEffect(() => {
    const onAudit = (e: Event) => {
      const d = (e as CustomEvent<AuditDetail>).detail
      setSource(d.source)
      if (d.packageId) setValues((v) => ({ ...v, packageInterest: d.packageId! }))
      setStatus((s) => (s === 'success' ? s : 'idle'))
    }
    window.addEventListener(AUDIT_EVENT, onAudit)
    return () => window.removeEventListener(AUDIT_EVENT, onAudit)
  }, [])

  const set = (k: keyof Values) => (val: string) => {
    const next = { ...values, [k]: k === 'phone' ? formatPhone(val) : val }
    setValues(next)
    if (touched) setErrors(validate(next))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`lead-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      await submitLead({
        name: values.name.trim(),
        phone: toE164(values.phone),
        company: values.company.trim(),
        channel: values.channel,
        packageInterest: values.packageInterest || 'unknown',
        source,
        website: values.website,
        page: '/',
      })
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof LeadNotConfiguredError ? 'not-configured' : 'error')
    }
  }

  const aria = (k: keyof Values) => ({
    id: `lead-${k}`,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `lead-${k}-error` : undefined,
  })

  return (
    <section id="audit" aria-labelledby="audit-title" className="curve-top bg-brand-600 py-20 text-white lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow !text-brand-100">
            <span aria-hidden className="h-0.5 w-6 rounded-full bg-gold" />
            Bepul audit
          </p>
          <h2 id="audit-title" className="mt-4 text-h2 font-bold">
            30–40 daqiqada tovaringiz Uzumda qancha foyda qoldirishini bilib oling
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Arizani qoldiring — qisqa anketa uchun qo‘ng‘iroq qilamiz va sexingizga tashrif vaqtini kelishamiz. Auditdan keyin
            aniq hisob-kitob bilan yozma taklif olasiz.
          </p>

          <ul className="mt-10 space-y-4">
            {auditGives.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[17px]">
                <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Clock aria-hidden className="h-4 w-4" /> 30–40 daqiqa
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">Bepul</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">Samarqand viloyati</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-4xl bg-white p-6 text-ink shadow-2xl sm:p-10">
            {status === 'success' ? (
              <div role="status" className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckCircle2 aria-hidden className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">Arizangiz qabul qilindi</h3>
                <p className="mt-3 max-w-sm text-ink-500">
                  Rahmat, {values.name.trim()}! Tez orada {values.phone} raqamiga qo‘ng‘iroq qilib, audit vaqtini kelishamiz.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button as="a" href={contacts.telegram.href} target="_blank" rel="noopener noreferrer" variant="secondary">
                    Telegram: {contacts.telegram.label}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setValues(empty)
                      setTouched(false)
                      setErrors({})
                      setStatus('idle')
                    }}
                  >
                    Yangi ariza
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-note`}>
                <h3 className="text-xl font-bold tracking-tight">Bepul auditga yozilish</h3>
                {/* Honeypot: botlar to'ldiradi, odamlar ko'rmaydi */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Sayt
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => set('website')(e.target.value)}
                    />
                  </label>
                </div>
                <p id={`${uid}-note`} className="mt-1 text-sm text-ink-400">
                  Barcha maydonlar majburiy, paketdan tashqari.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field id="lead-name" label="Ismingiz" error={errors.name}>
                    <input
                      {...aria('name')}
                      className="field"
                      autoComplete="name"
                      placeholder="Ism"
                      value={values.name}
                      onChange={(e) => set('name')(e.target.value)}
                    />
                  </Field>
                  <Field id="lead-phone" label="Telefon" error={errors.phone}>
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
                  <div className="sm:col-span-2">
                    <Field
                      id="lead-company"
                      label="Kompaniya yoki mahsulot turi"
                      error={errors.company}
                      hint="Masalan: “Tekstil sexi — choyshab to‘plamlari”"
                    >
                      <input
                        {...aria('company')}
                        className="field"
                        autoComplete="organization"
                        placeholder="Kompaniya / mahsulot"
                        value={values.company}
                        onChange={(e) => set('company')(e.target.value)}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field id="lead-channel" label="Hozirgi savdo kanali" error={errors.channel}>
                      <select
                        {...aria('channel')}
                        className={cx('field appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%236B7280%27 stroke-width=%272%27><path d=%27M4 6l4 4 4-4%27/></svg>")] bg-[right_1rem_center] bg-no-repeat pr-10', !values.channel && 'text-ink-300')}
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
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-sm font-semibold text-ink-700">Qaysi paket qiziqtiradi?</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {packageOptions.map((o) => (
                        <label
                          key={o.value || 'none'}
                          className={cx(
                            'flex cursor-pointer items-center justify-center rounded-xl border px-2 py-3 text-center text-[13px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 sm:text-sm',
                            values.packageInterest === o.value
                              ? 'border-brand-600 bg-brand-50 text-brand-700'
                              : 'border-line text-ink-500 hover:border-ink-300',
                          )}
                        >
                          <input
                            type="radio"
                            name="packageInterest"
                            value={o.value}
                            checked={values.packageInterest === o.value}
                            onChange={() => set('packageInterest')(o.value)}
                            className="sr-only"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
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

                <Button type="submit" size="lg" className="mt-8 w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> Yuborilmoqda…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden className="h-4 w-4" /> Bepul auditga yozilish
                    </>
                  )}
                </Button>
                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ink-400">
                  <Phone aria-hidden className="h-3.5 w-3.5" /> Yoki qo‘ng‘iroq qiling:{' '}
                  <a href={contacts.phoneHref} className="font-semibold text-ink">
                    {contacts.phoneDisplay}
                  </a>
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
