import { useState } from 'react'
import { Check } from 'lucide-react'
import { problems } from '../../data/content'
import { AuditButton, Reveal, SectionHeading, cx } from '../ui/primitives'

/** Interaktiv: foydalanuvchi o'ziga tegishli holatlarni belgilaydi. */
export function Problems() {
  const [picked, setPicked] = useState<number[]>([])
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))

  return (
    <section id="muammo" aria-labelledby="muammo-title" className="curve-top bg-paper py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="muammo-title"
            eyebrow="Tanish holatmi?"
            title="Tovar bor, sifat bor. Lekin savdo kutilganidek emas."
            lead="Siz bu sahifadasiz — demak, quyidagi holatlardan kamida bittasi sizga tanish. O‘zingizga tegishlilarini belgilang."
          />
          <Reveal className="lg:pb-2">
            <p className="text-sm text-ink-400" aria-live="polite">
              Belgilandi: <span className="font-bold text-ink">{picked.length}</span> / {problems.length}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const on = picked.includes(i)
            return (
              <Reveal as="li" key={p.title} delay={i * 50}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(i)}
                  className={cx(
                    'group flex h-full w-full flex-col rounded-3xl border p-6 text-left transition-all duration-200',
                    on ? 'border-brand-600 bg-white shadow-float' : 'border-line bg-white hover:border-ink-300',
                  )}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="text-xs font-semibold text-ink-300">0{i + 1}</span>
                    <span
                      className={cx(
                        'flex h-7 w-7 items-center justify-center rounded-full border transition-colors',
                        on ? 'border-brand-600 bg-brand-600 text-white' : 'border-line text-transparent group-hover:border-ink-300',
                      )}
                    >
                      <Check aria-hidden className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="mt-8 text-lg font-bold tracking-tight">{p.title}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.text}</span>
                </button>
              </Reveal>
            )
          })}
        </ul>

        <div
          className={cx(
            'mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl p-6 transition-colors sm:flex-row sm:items-center sm:p-8',
            picked.length ? 'bg-brand-600 text-white' : 'border border-dashed border-line bg-white',
          )}
          aria-live="polite"
        >
          <p className={cx('max-w-xl text-lg font-semibold', !picked.length && 'text-ink-500')}>
            {picked.length === 0
              ? 'Holatni belgilang — biz uni bepul auditda raqamlar bilan tahlil qilamiz.'
              : `${picked.length} ta holat sizga tanish. Bepul auditda aynan shular bo‘yicha tovaringiz Uzum’da qancha sotilishi va qancha foyda qoldirishi mumkinligini hisoblaymiz.`}
          </p>
          <AuditButton source="problems" variant={picked.length ? 'inverse' : 'primary'} className="shrink-0">
            Vaziyatimni tahlil qiling
          </AuditButton>
        </div>
      </div>
    </section>
  )
}
