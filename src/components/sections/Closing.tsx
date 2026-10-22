import { useEffect, useState } from 'react'
import { Camera, Phone, Plus, Send } from 'lucide-react'
import { contacts, faq, nav } from '../../data/content'
import { AuditButton, Logo, Reveal, SectionHeading, cx } from '../ui/primitives'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="savollar" aria-labelledby="faq-title" className="curve-top bg-white py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Ko‘p beriladigan savollar" />
          <Reveal delay={80} className="mt-8 text-ink-500">
            Javob topmadingizmi? Qo‘ng‘iroq qiling:{' '}
            <a href={contacts.phoneHref} className="font-semibold text-ink underline decoration-line underline-offset-4">
              {contacts.phoneDisplay}
            </a>
          </Reveal>
        </div>
        <Reveal as="ul" className="divide-y divide-line border-y border-line">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-tight"
                  >
                    {f.q}
                    <span
                      className={cx(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                        isOpen ? 'rotate-45 border-brand-600 bg-brand-600 text-white' : 'border-line',
                      )}
                    >
                      <Plus aria-hidden className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cx('grid transition-[grid-template-rows] duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                >
                  <div className="overflow-hidden" hidden={!isOpen}>
                    <p className="max-w-2xl pb-6 leading-relaxed text-ink-500">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="pb-20 lg:pb-28">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-4xl bg-brand-600 px-6 py-16 text-center text-white sm:px-12 lg:py-24">
          <img src="/navdo-mark.png" alt="" aria-hidden className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-[0.07] sm:w-96" />
          <p className="eyebrow !text-gold">Navdo — yangi davr savdosi</p>
          <h2 id="final-title" className="mx-auto mt-5 max-w-3xl text-h2 font-bold">
            Tovaringiz omborda emas, butun O‘zbekiston bo‘ylab xaridorda bo‘lsin
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            Birinchi qadam — bepul audit. 30–40 daqiqada sotilish imkoniyati va taxminiy foydani hisoblab beramiz.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <AuditButton source="final" variant="inverse" size="lg" />
            <a
              href={contacts.phoneHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 px-7 font-semibold hover:bg-white/5"
            >
              <Phone aria-hidden className="h-4 w-4" /> {contacts.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="curve-top bg-paper pb-28 pt-14 lg:pb-14">
      <div className="container grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            Samarqand viloyatidagi ishlab chiqaruvchi va ulgurji korxonalarning tovarlarini Uzum Market’ga chiqaramiz va savdosini
            yo‘lga qo‘yamiz.
          </p>
        </div>
        <nav aria-label="Pastki navigatsiya">
          <p className="text-sm font-semibold">Bo‘limlar</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-500">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#audit" className="hover:text-ink">
                Bepul audit
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">Aloqa</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={contacts.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-brand-600">
                <Phone aria-hidden className="h-4 w-4 text-brand-600" /> {contacts.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contacts.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-600"
              >
                <Send aria-hidden className="h-4 w-4 text-brand-600" /> Telegram {contacts.telegram.label}
              </a>
            </li>
            <li>
              <a
                href={contacts.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-600"
              >
                <Camera aria-hidden className="h-4 w-4 text-brand-600" /> Instagram {contacts.instagram.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-ink-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Navdo. {contacts.site}</p>
        <p>Uzum Market — uchinchi tomon platformasi. Navdo mustaqil xizmat ko‘rsatuvchi.</p>
      </div>
    </footer>
  )
}

/** Mobil sticky CTA: hero'dan keyin chiqadi, forma ko'ringanda yashirinadi. */
export function MobileStickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let formVisible = false
    const form = document.getElementById('audit')
    const io = new IntersectionObserver(([e]) => {
      formVisible = e.isIntersecting
      update()
    })
    if (form) io.observe(form)
    const update = () => setShow(window.scrollY > window.innerHeight * 0.7 && !formVisible)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-xl transition-transform duration-300 lg:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
      aria-hidden={!show}
    >
      <div className="flex gap-2">
        <a
          href={contacts.phoneHref}
          aria-label={`Qo‘ng‘iroq qilish: ${contacts.phoneDisplay}`}
          tabIndex={show ? 0 : -1}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line"
        >
          <Phone aria-hidden className="h-5 w-5 text-brand-600" />
        </a>
        <AuditButton source="sticky-mobile" className="h-12 flex-1" tabIndex={show ? 0 : -1}>
          Bepul auditga yozilish
        </AuditButton>
      </div>
    </div>
  )
}
