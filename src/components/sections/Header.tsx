import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { contacts, nav } from '../../data/content'
import { AuditButton, Logo, cx } from '../ui/primitives'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Joriy bo'limni navigatsiyada belgilash
  useEffect(() => {
    // 'top' (hero) ham kuzatiladi — tepaga qaytilganda belgi tozalanadi
    const sections = ['top', ...nav.map((n) => n.id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-line bg-white/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Asosiy kontentga o‘tish
      </a>
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="Navdo — bosh sahifa" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Asosiy navigatsiya" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-white/70 p-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cx(
                    'block rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active === item.id ? 'bg-brand-600 text-white' : 'text-ink-500 hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contacts.phoneHref}
            className="hidden items-center gap-2 px-3 text-sm font-semibold text-ink xl:inline-flex"
          >
            <Phone aria-hidden className="h-4 w-4 text-brand-600" />
            {contacts.phoneDisplay}
          </a>
          <AuditButton source="header" className="hidden sm:inline-flex">
            Bepul audit
          </AuditButton>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobil navigatsiya" className="container py-6">
          <ul className="divide-y divide-line">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 text-2xl font-semibold tracking-tight"
                >
                  <span className="text-xs font-medium text-ink-300">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <AuditButton source="mobile-menu" size="lg" onClickCapture={() => setOpen(false)}>
              Bepul auditga yozilish
            </AuditButton>
            <a
              href={contacts.phoneHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line font-semibold"
            >
              <Phone aria-hidden className="h-4 w-4 text-brand-600" /> {contacts.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
