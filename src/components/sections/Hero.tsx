import { CheckCircle2, MapPin, Star, Timer, TrendingUp } from 'lucide-react'
import { useInView } from '../../hooks/useReveal'
import { AuditButton, Button, cx } from '../ui/primitives'
import { UzumCoin } from '../ui/UzumCoin'

// Brifdagi real raqam: jamoa boshqargan do'kon ~40 mln → ~400 mln so'm/oy.
// Oraliq ustunlar faqat o'sish yo'nalishini ko'rsatuvchi vizual.
const growth = [10, 14, 19, 27, 38, 52, 68, 84, 100]

function SalesPanel() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  return (
    <div ref={ref} className="rounded-3xl border border-line bg-white p-5 shadow-float sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-400">Oylik savdo · jamoamiz boshqargan do‘kon</p>
          <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            ~40 → ~400 <span className="text-base font-semibold text-ink-400">mln so‘m</span>
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
          <TrendingUp aria-hidden className="h-3.5 w-3.5" /> 10×
        </span>
      </div>
      <div className="mt-6 flex h-28 items-end gap-1.5 sm:h-32" aria-hidden>
        {growth.map((h, i) => (
          <div
            key={i}
            className={cx(
              'flex-1 rounded-t-md transition-[height] duration-1000 ease-out',
              i === growth.length - 1 ? 'bg-brand-600' : 'bg-brand-200',
            )}
            style={{ height: inView ? `${h}%` : '4%', transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-ink-300" aria-hidden>
        <span>Boshlanish</span>
        <span>Natija</span>
      </div>
    </div>
  )
}

function ProductCardMock() {
  return (
    <div className="w-[210px] rounded-2xl border border-line bg-white p-3 shadow-card sm:w-[230px]" aria-hidden>
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper">
        {/* Abstrakt tekstil mahsulot */}
        <div className="absolute inset-x-6 bottom-8 top-10 rounded-lg bg-brand-100" />
        <div className="absolute inset-x-6 bottom-8 top-[46%] rounded-b-lg bg-brand-200" />
        <div className="absolute inset-x-6 top-[58%] h-1.5 bg-white/70" />
        <div className="absolute inset-x-6 top-[66%] h-1.5 bg-white/70" />
        <span className="absolute left-2 top-2 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
          Infografika
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex gap-1">
          {['100% paxta', 'O‘lcham', 'Parvarish'].map((t) => (
            <span key={t} className="rounded bg-white/90 px-1 py-0.5 text-[8px] font-semibold text-ink-500">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2 w-4/5 rounded bg-ink/80" />
        <div className="h-2 w-3/5 rounded bg-line" />
        <div className="flex items-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
          <span className="ml-1 h-1.5 w-8 rounded bg-line" />
        </div>
        <div className="mt-2 h-8 rounded-lg bg-brand-600" />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      {/* Nozik grid fon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(#E5E7EB_1px,transparent_1px),linear-gradient(90deg,#E5E7EB_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)] opacity-60"
      />
      <div className="container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-500 shadow-card">
            <MapPin aria-hidden className="h-3.5 w-3.5 text-brand-600" />
            Samarqanddagi ishlab chiqaruvchi va ulgurji korxonalar uchun
          </p>
          <h1 id="hero-title" className="mt-6 text-display font-extrabold text-ink">
            Tovaringizni <span className="text-brand-600">Uzum Market</span> orqali butun O‘zbekistonga soting
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
            Do‘kon ochish, kartochkalar, foto, narx, reklama va hisobot — hammasini Navdo jamoasi qiladi. Siz faqat tovar
            berasiz, do‘kon esa doim korxonangiz nomida qoladi.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AuditButton source="hero" size="lg" />
            <Button as="a" href="#jarayon" variant="secondary" size="lg">
              Qanday ishlaymiz
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
            <li className="inline-flex items-center gap-2">
              <Timer aria-hidden className="h-4 w-4 text-brand-600" /> Audit 30–40 daqiqa
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 aria-hidden className="h-4 w-4 text-brand-600" /> Bepul
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 aria-hidden className="h-4 w-4 text-brand-600" /> Sotilish imkoniyati va foyda hisobi
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative pl-0 sm:pl-16">
            {/* Desktop/planshet: panelning chap chetida */}
            <UzumCoin className="absolute -left-12 top-1/2 z-10 hidden w-40 -translate-y-1/2 sm:block lg:-left-16 lg:w-44" />
            <SalesPanel />
          </div>
          <div className="relative -mt-3 flex items-end justify-between gap-4 sm:-mt-4">
            <div className="rotate-[-2deg]">
              <ProductCardMock />
            </div>
            {/* Mobil: mahsulot kartochkasi yonidagi bo'sh joyda */}
            <UzumCoin className="absolute -right-1 top-10 w-32 sm:hidden" />
            <div className="mb-6 hidden w-[220px] space-y-2 sm:block" aria-hidden>
              {['Hujjatlar tekshirildi', 'Kartochka to‘liq to‘ldirildi', 'Reklama ishga tushdi'].map((t, i) => (
                <div
                  key={t}
                  className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-3 text-[13px] font-semibold shadow-card"
                  style={{ marginLeft: `${i * 14}px` }}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-ink-300 sm:text-right">
            Namunaviy interfeys. Raqamlar — jamoa a’zolarining avvalgi tajribasidan, mijoz nomi oshkor qilinmaydi.
          </p>
        </div>
      </div>
    </section>
  )
}
