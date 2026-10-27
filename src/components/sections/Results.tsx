import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { results } from '../../data/content'
import { useInView } from '../../hooks/useReveal'
import { AuditButton, Reveal, SectionHeading } from '../ui/primitives'
import { Icon3D } from '../ui/Icon3D'

/** 40 mln → 400 mln so'm: brifdagi yagona aniq o'sish raqami. */
function GrowthCompare() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const [n, setN] = useState(40)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(400)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400)
      setN(Math.round(40 + 360 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView])

  return (
    <div ref={ref} data-icon-host className="relative rounded-4xl border border-line bg-white p-7 sm:p-10">
      <Icon3D name="chart-up" size="lg" className="absolute right-6 top-6 sm:right-8 sm:top-8" />
      <p className="max-w-[60%] text-sm font-semibold text-ink-400">Jamoamiz boshqargan bitta do‘kon — oylik savdo</p>
      <div className="mt-8 space-y-5">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-ink-500">Boshida</span>
            <span className="font-bold">~40 mln so‘m</span>
          </div>
          <div className="mt-2 h-4 rounded-full bg-paper">
            <div className="h-full w-[10%] rounded-full bg-ink-300" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-ink-500">Keyin</span>
            <span className="font-bold tabular-nums text-brand-700">~{n} mln so‘m</span>
          </div>
          <div className="mt-2 h-4 rounded-full bg-paper">
            <div
              className="h-full rounded-full bg-brand-600 transition-[width] duration-[1400ms] ease-out"
              style={{ width: inView ? '100%' : '10%' }}
            />
          </div>
        </div>
      </div>
      <p className="mt-8 text-[64px] font-extrabold leading-none tracking-tighter text-brand-600 sm:text-[88px]">10×</p>
      <p className="mt-2 text-ink-500">o‘sish</p>
    </div>
  )
}

export function Results() {
  return (
    <section id="natijalar" aria-labelledby="natijalar-title" className="curve-top bg-paper py-20 lg:py-28">
      <div className="container" data-scroll-scale="0.94">
        <SectionHeading
          id="natijalar-title"
          eyebrow="Natijalar va tajriba"
          title="Gapga emas, raqamga ishonasiz. Biz ham."
          lead="Navdo 2026-yilda ochilgan, lekin jamoa a’zolari Uzum Market’da 2 yildan ortiq savdo qilgan va ishlab chiqaruvchi hamda savdo korxonalarining do‘konlarini boshqargan."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <GrowthCompare />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.slice(1).map((r, i) => (
              <Reveal key={r.label} delay={i * 70} className="card flex flex-col p-6 sm:p-7">
                <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">{r.value}</p>
                <p className="mt-1 font-semibold text-brand-700">{r.label}</p>
                <p className="mt-auto pt-6 text-sm leading-relaxed text-ink-500">{r.detail}</p>
              </Reveal>
            ))}
            <Reveal delay={210} className="card flex flex-col p-6 sm:p-7">
              <p className="text-sm font-semibold text-ink-400">Toifalar tajribasi</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {['Kosmetika va gigiyena', 'Tekstil', 'Boshqa toifalar'].map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1.5 text-sm font-medium">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink-500">
                <Lock aria-hidden className="h-4 w-4 shrink-0 text-ink-300" />
                Mijoz nomlari oshkor qilinmaydi.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-ink-300/60 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-2xl">
            <p className="font-semibold">Nega mijozlar fikri yo‘q?</p>
            <p className="mt-1 text-ink-500">
              Kompaniya yangi va birinchi mijoz bilan ish endi boshlanmoqda. Soxta sharh qo‘ymaymiz — o‘rniga ish uslubimiz va
              jamoa tajribasini ochiq ko‘rsatamiz. Har bir tovarda natija turlicha bo‘ladi.
            </p>
          </div>
          <AuditButton source="results" className="shrink-0">
            Tovarim natijasini hisoblash
          </AuditButton>
        </Reveal>
      </div>
    </section>
  )
}
