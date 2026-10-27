import { useRef, useState, type KeyboardEvent } from 'react'
import { MessageCircleQuestion } from 'lucide-react'
import { objections } from '../../data/content'
import { AuditButton, Reveal, SectionHeading, cx } from '../ui/primitives'

export function Objections() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (delta === undefined) return
    e.preventDefault()
    const next = (active + delta + objections.length) % objections.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="objections-title" className="curve-top bg-paper py-20 lg:py-28">
      <div className="container" data-scroll-scale="0.95">
        <SectionHeading
          id="objections-title"
          eyebrow="Ochiq gaplashamiz"
          title="Sizni o‘ylantirayotgan savollar"
          lead="Korxona egalari bizga eng ko‘p aytadigan gaplar va ularga to‘g‘ridan-to‘g‘ri javoblar."
        />

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div role="tablist" aria-label="E’tirozlar" aria-orientation="vertical" onKeyDown={onKey} className="flex flex-col gap-2">
            {objections.map((o, i) => (
              <button
                key={o.q}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`obj-tab-${i}`}
                aria-selected={active === i}
                aria-controls="obj-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={cx(
                  'rounded-2xl border px-5 py-4 text-left text-[17px] font-semibold transition-all',
                  active === i ? 'border-brand-700 bg-brand-700 text-white' : 'border-line bg-white text-ink-700 hover:border-ink-300',
                )}
              >
                {o.q}
              </button>
            )).flatMap((btn, i) =>
              i === active
                ? [
                    btn,
                    // Mobil/planshet: javob tanlangan savol ostida ko'rinadi
                    <div key="inline-answer" className="rounded-3xl bg-brand-600 p-6 text-white lg:hidden">
                      <p key={active} className="animate-[fadein_.35s_ease] leading-relaxed text-white/90">
                        {objections[active].a}
                      </p>
                      <div className="mt-6">
                        <AuditButton source={`objection-${active}`} variant="inverse">
                          Auditda gaplashamiz
                        </AuditButton>
                      </div>
                    </div>,
                  ]
                : [btn],
            )}
          </div>

          <div
            id="obj-panel"
            role="tabpanel"
            aria-labelledby={`obj-tab-${active}`}
            tabIndex={0}
            className="hidden flex-col rounded-4xl bg-brand-600 p-7 text-white sm:p-10 lg:sticky lg:top-28 lg:flex lg:self-start"
          >
            <MessageCircleQuestion aria-hidden className="h-8 w-8 text-gold" />
            <p className="mt-6 text-2xl font-bold tracking-tight">{objections[active].q}</p>
            <p key={active} className="mt-5 animate-[fadein_.35s_ease] text-lg leading-relaxed text-white/85">
              {objections[active].a}
            </p>
            <div className="mt-10">
              <AuditButton source={`objection-${active}`} variant="inverse">
                Auditda batafsil gaplashamiz
              </AuditButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
