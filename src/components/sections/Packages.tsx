import { Check, Minus, KeyRound, Rocket } from 'lucide-react'
import { comparison, packages, type Cell } from '../../data/content'
import { AuditButton, Reveal, SectionHeading, cx } from '../ui/primitives'

function CellValue({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
        <Check className="h-3.5 w-3.5" aria-label="Bor" />
      </span>
    )
  if (v === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper text-ink-300">
        <Minus className="h-3.5 w-3.5" aria-label="Yo‘q" />
      </span>
    )
  return <span className="text-[13px] font-semibold text-ink sm:text-sm">{v}</span>
}

export function Packages() {
  return (
    <section id="paketlar" aria-labelledby="paketlar-title" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          id="paketlar-title"
          align="center"
          eyebrow="Xizmat paketlari"
          title="Ikki yo‘l: o‘zingiz yuritasiz yoki biz boshqaramiz"
          lead="Narx tovarlar soni, kartochkalar va tanlangan paketga bog‘liq. Bepul auditdan keyin aniq hisob-kitob bilan yozma taklif beramiz."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          {packages.map((p, i) => {
            const featured = p.id === 'kalit'
            const Icon = featured ? KeyRound : Rocket
            return (
              <Reveal
                key={p.id}
                delay={i * 80}
                className={cx(
                  'relative flex flex-col rounded-4xl p-7 sm:p-9',
                  featured ? 'bg-ink text-white shadow-float' : 'card',
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cx(
                      'flex h-12 w-12 items-center justify-center rounded-2xl',
                      featured ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-600',
                    )}
                  >
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  {featured && (
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">To‘liq boshqaruv</span>
                  )}
                </div>
                <h3 className="mt-8 text-3xl font-extrabold tracking-tight">{p.name}</h3>
                <p className={cx('mt-2 text-lg font-medium', featured ? 'text-white/80' : 'text-ink-700')}>{p.tagline}</p>
                <p className={cx('mt-3 text-sm', featured ? 'text-white/50' : 'text-ink-400')}>{p.forWhom}</p>

                <ul className={cx('mt-8 space-y-3 border-t pt-8', featured ? 'border-white/10' : 'border-line')}>
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check aria-hidden className={cx('mt-0.5 h-5 w-5 shrink-0', featured ? 'text-gold' : 'text-brand-600')} />
                      <span className={featured ? 'text-white/90' : 'text-ink-700'}>{h}</span>
                    </li>
                  ))}
                </ul>
                <p className={cx('mt-6 text-sm italic', featured ? 'text-white/50' : 'text-ink-400')}>{p.after}</p>

                <div className="mt-auto pt-8">
                  <AuditButton
                    source={`package-${p.id}`}
                    packageId={p.id}
                    variant={featured ? 'inverse' : 'primary'}
                    size="lg"
                    className="w-full"
                  >
                    {p.name} uchun taklif olish
                  </AuditButton>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Taqqoslash jadvali */}
        <Reveal className="mx-auto mt-16 max-w-5xl">
          <h3 className="text-center text-xl font-bold tracking-tight">Paketlarni taqqoslash</h3>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Start va Kalit topshirish paketlari taqqoslanishi</caption>
              <thead>
                <tr className="bg-paper text-sm">
                  <th scope="col" className="px-4 py-4 font-semibold text-ink-400 sm:px-6">
                    Xizmat
                  </th>
                  <th scope="col" className="w-[26%] px-2 py-4 text-center font-bold sm:w-[22%]">
                    Start
                  </th>
                  <th scope="col" className="w-[30%] px-2 py-4 text-center font-bold text-brand-700 sm:w-[24%]">
                    Kalit topshirish
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.row} className="border-t border-line">
                    <th scope="row" className="px-4 py-3.5 text-[13px] font-medium text-ink-700 sm:px-6 sm:text-[15px]">
                      {r.row}
                    </th>
                    <td className="px-2 py-3.5 text-center">
                      <CellValue v={r.start} />
                    </td>
                    <td className="bg-brand-50/50 px-2 py-3.5 text-center">
                      <CellValue v={r.kalit} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-ink-400">
            Qaysi paket mosligini bilmayapsizmi? Auditda tovaringiz va jamoangizdan kelib chiqib tavsiya beramiz.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
