import { ArrowDown, ArrowRight, Boxes, FileText, Store, Users2, BarChart3 } from 'lucide-react'
import { advantages, solutionItems } from '../../data/content'
import { AuditButton, Reveal, SectionHeading } from '../ui/primitives'

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center text-ink-300">
      <ArrowRight className="hidden h-6 w-6 lg:block" />
      <ArrowDown className="h-6 w-6 lg:hidden" />
    </div>
  )
}

export function Solution() {
  return (
    <section id="yechim" aria-labelledby="yechim-title" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          id="yechim-title"
          eyebrow="Yechim"
          title={
            <>
              Siz tovar berasiz. <span className="text-ink-300">Qolgan hammasini Navdo qiladi.</span>
            </>
          }
          lead="Navdo — ishlab chiqaruvchi va ulgurji korxonalarning tovarlarini Uzum Market’ga chiqarib, savdosini yo‘lga qo‘yadigan jamoa. Tovarni sotib olib qayta sotmaymiz: do‘kon va tovar sizniki."
        />

        <Reveal className="mt-14 grid items-stretch gap-4 lg:grid-cols-[0.8fr_auto_1.5fr_auto_0.8fr]">
          {/* Korxona */}
          <div className="card flex flex-col p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Korxona</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 font-semibold">
                <Boxes aria-hidden className="h-5 w-5 text-brand-600" /> Tovar
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <FileText aria-hidden className="h-5 w-5 text-brand-600" /> Hujjatlar
              </li>
            </ul>
            <p className="mt-auto pt-6 text-sm text-ink-400">Sizdan shu xolos.</p>
          </div>

          <Connector />

          {/* Navdo */}
          <div className="rounded-3xl bg-brand-600 p-6 text-white shadow-float sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Navdo jamoasi</p>
              <img src="/navdo-mark.png" alt="" className="h-7 w-auto rounded bg-white p-1" />
            </div>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {solutionItems.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <Connector />

          {/* Natija */}
          <div className="card flex flex-col p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Natija</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 font-semibold">
                <Store aria-hidden className="h-5 w-5 text-brand-600" /> Korxona nomidagi do‘kon
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <Users2 aria-hidden className="h-5 w-5 text-brand-600" /> Butun O‘zbekiston xaridorlari
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <BarChart3 aria-hidden className="h-5 w-5 text-brand-600" /> Shaffof hisob
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 60} className="bg-white p-6 sm:p-8">
              <p className="text-sm font-bold text-brand-600">0{i + 1}</p>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-500">{a.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <AuditButton source="solution" size="lg">
            Tovarim uchun hisob-kitob olish
          </AuditButton>
        </Reveal>
      </div>
    </section>
  )
}
