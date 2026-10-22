import { useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, PackageCheck } from 'lucide-react'
import { steps } from '../../data/content'
import { AuditButton, Reveal, SectionHeading, cx } from '../ui/primitives'

/** 7 bosqich: klaviatura bilan boshqariladigan tablist (strelkalar, Home/End). */
export function Process() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const step = steps[active]

  const select = (i: number, focus = false) => {
    const next = (i + steps.length) % steps.length
    setActive(next)
    if (focus) tabs.current[next]?.focus()
  }

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: steps.length - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key], true)
    }
  }

  return (
    <section id="jarayon" aria-labelledby="jarayon-title" className="bg-paper py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="jarayon-title"
            eyebrow="Ish jarayoni"
            title="Shartnomadan birinchi sotuvgacha — 7 bosqich"
            lead="Isbotlangan uslub: hujjat → kartochka → to‘liq ma’lumot → reklama. Har bir bosqichning muddati va natijasi oldindan ma’lum."
          />
          {/* Progress */}
          <Reveal className="w-full max-w-xs">
            <div className="flex justify-between text-sm">
              <span className="text-ink-400">Bosqich</span>
              <span className="font-bold tabular-nums">
                {active + 1} / {steps.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand-600 transition-all duration-500"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div role="tablist" aria-label="Ish bosqichlari" aria-orientation="vertical" onKeyDown={onKey} className="space-y-1.5">
            {steps.map((s, i) => (
              <button
                key={s.title}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`step-tab-${i}`}
                aria-selected={active === i}
                aria-controls="step-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                className={cx(
                  'flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all sm:px-5',
                  active === i ? 'bg-white shadow-card' : 'hover:bg-white/60',
                )}
              >
                <span
                  className={cx(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                    i < active && 'bg-brand-100 text-brand-700',
                    i === active && 'bg-brand-600 text-white',
                    i > active && 'border border-line bg-white text-ink-400',
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cx('block font-semibold', active === i ? 'text-ink' : 'text-ink-500')}>{s.title}</span>
                </span>
                <span className="shrink-0 text-xs font-semibold text-ink-300">{s.when}</span>
              </button>
            ))}
          </div>

          <div
            id="step-panel"
            role="tabpanel"
            aria-labelledby={`step-tab-${active}`}
            tabIndex={0}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 sm:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 text-[180px] font-extrabold leading-none text-paper sm:text-[220px]">
              {active + 1}
            </span>
            <div key={active} className="relative animate-[fadein_.4s_ease]">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{step.when}</span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">{step.title}</h3>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-500">{step.text}</p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line px-4 py-3">
                <PackageCheck aria-hidden className="h-5 w-5 text-gold-600" />
                <span className="text-sm">
                  <span className="text-ink-400">Natija: </span>
                  <span className="font-semibold">{step.output}</span>
                </span>
              </div>
            </div>

            <div className="relative mt-auto flex items-center justify-between gap-4 pt-10">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  aria-label="Oldingi bosqich"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  aria-label="Keyingi bosqich"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white hover:bg-ink-700"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              {active === steps.length - 1 && <AuditButton source="process">Boshlash</AuditButton>}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-ink">Hamkorlik qanday boshlanadi</p>
          <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-500">
            {['Murojaat', 'Qisqa anketa', 'Sexga tashrif va bepul audit', 'Yozma taklif (aniq hisob bilan)', 'Shartnoma', 'Ish boshlanadi'].map(
              (t, i, arr) => (
                <li key={t} className="flex items-center gap-2">
                  <span className={cx('rounded-full px-3 py-1.5', i === 2 ? 'bg-brand-600 font-semibold text-white' : 'bg-paper')}>{t}</span>
                  {i < arr.length - 1 && <ChevronRight aria-hidden className="h-4 w-4 text-ink-300" />}
                </li>
              ),
            )}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
