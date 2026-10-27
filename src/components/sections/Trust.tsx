import { Check, X } from 'lucide-react'
import { guarantees } from '../../data/content'
import { Reveal, SectionHeading } from '../ui/primitives'
import { Icon3D } from '../ui/Icon3D'

const clauses = [
  { n: '2.1', t: '“Sof foyda” hisoblash formulasi', d: 'oldindan yoziladi' },
  { n: '2.2', t: 'Tovar tannarxi', d: 'shartnomada qayd etiladi' },
  { n: '3.4', t: 'Do‘kon va kartochkalar egasi', d: 'korxona' },
  { n: '4.1', t: 'Tannarx va savdo ma’lumotlari', d: 'maxfiy' },
  { n: '5.2', t: 'Ish muddatlari', d: 'kelishiladi' },
]

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="curve-top bg-white py-20 lg:py-28">
      <div data-scroll-scale="0.9" className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Shartnoma vizuali */}
        <Reveal className="relative order-2 lg:order-1">
          <div aria-hidden data-parallax="-40" className="absolute inset-4 -rotate-3 rounded-3xl border border-line bg-paper" />
          <figure className="relative rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8" aria-label="Shartnoma asosiy bandlari (namuna)">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Xizmat shartnomasi</p>
                <p className="mt-1 font-bold">Navdo × Korxona</p>
              </div>
              <Icon3D name="shield" size="sm" />
            </div>
            <ul className="divide-y divide-line">
              {clauses.map((c) => (
                <li key={c.n} className="flex items-center gap-4 py-4">
                  <span className="w-8 shrink-0 text-xs font-semibold tabular-nums text-ink-300">{c.n}</span>
                  <span className="flex-1 text-[15px] font-medium">{c.t}</span>
                  <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">{c.d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-end justify-between gap-6 pt-4">
              <div className="flex-1 border-t border-dashed border-ink-300 pt-2 text-xs text-ink-400">Navdo</div>
              <div className="flex-1 border-t border-dashed border-ink-300 pt-2 text-xs text-ink-400">Korxona</div>
            </div>
            <figcaption className="mt-5 text-[11px] text-ink-300">Bandlar raqami shartli — ko‘rgazmali namuna.</figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="trust-title"
            eyebrow="Ishonch va shaffoflik"
            title="Hamma narsa oldindan yoziladi"
            lead="Aldanib qolish yoki pulni behuda sarflashdan qo‘rqish tabiiy. Shuning uchun ish faqat shartnoma asosida boshlanadi."
          />

          <Reveal delay={80} className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-ink-400">Kafolatlaymiz</p>
            <ul className="mt-4 space-y-3">
              {guarantees.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[17px] font-medium">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex items-start gap-3 rounded-2xl bg-paper p-5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink-400">
              <X aria-hidden className="h-3.5 w-3.5" />
            </span>
            <p className="text-ink-500">
              <span className="font-semibold text-ink">Kafolatlamaymiz: savdo hajmini.</span> Buni hech kim halol kafolatlay
              olmaydi. Kim kafolat bersa — ehtiyot bo‘ling.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
