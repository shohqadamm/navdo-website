import { Ban, Globe2, MapPin, Swords } from 'lucide-react'
import { teamSkills } from '../../data/content'
import { Reveal, SectionHeading } from '../ui/primitives'

const facts = [
  {
    icon: MapPin,
    title: 'Samarqanddamiz',
    text: 'Sexingizga kelamiz, tovarni joyida ko‘ramiz va suratga olamiz. Hozircha faqat Samarqand viloyati bilan ishlaymiz.',
  },
  {
    icon: Swords,
    title: 'Bir sohada — bitta korxona',
    text: 'Raqobatchingiz do‘konini boshqarmaymiz.',
  },
  {
    icon: Ban,
    title: 'Oziq-ovqat bilan ishlamaymiz',
    text: 'Asosiy yo‘nalish — tekstil, kiyim, kosmetika, maishiy kimyo. Istisnolar alohida ko‘riladi.',
  },
  {
    icon: Globe2,
    title: 'Keyingi qadam',
    text: 'Kelajakda Yandex Market, Ozon, Wildberries va Amazon’ga ham chiqaramiz.',
  },
]

export function Team() {
  return (
    <section aria-labelledby="team-title" className="bg-paper py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          id="team-title"
          eyebrow="Jamoa va kompaniya"
          title="4 kishilik mahalliy jamoa. Har biri Uzumda 2 yildan ortiq."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          {/* Asoschi */}
          <Reveal className="card flex flex-col gap-8 p-7 sm:flex-row sm:p-9">
            {/* TODO: asoschining haqiqiy fotosurati bilan almashtiring (public/team/shohqadam.jpg) */}
            <div
              className="flex aspect-square w-32 shrink-0 items-center justify-center rounded-3xl bg-brand-600 text-4xl font-extrabold text-white sm:w-40"
              role="img"
              aria-label="Shohqadam Ergashev"
            >
              ShE
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Asoschi</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">Shohqadam Ergashev</h3>
              <p className="mt-3 leading-relaxed text-ink-500">
                Brendning yuzi va mijozlar bilan asosiy aloqa. Bepul auditga yozilsangiz, siz bilan shaxsan uchrashadi va sexingizni
                ko‘radi.
              </p>
              <p className="mt-auto pt-6 text-sm font-semibold text-ink-700">“Navdo — yangi davr savdosi!”</p>
            </div>
          </Reveal>

          <Reveal delay={80} className="card p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Jamoa nima bilan ishlagan</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {teamSkills.map((s) => (
                <li key={s} className="rounded-full bg-paper px-4 py-2 text-sm font-semibold">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-4 gap-2" aria-hidden>
              {['01', '02', '03', '04'].map((n) => (
                <div key={n} className="flex aspect-square items-end rounded-2xl bg-brand-50 p-3 text-sm font-bold text-brand-700">
                  {n}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-300">Jamoa a’zolari fotosurati keyinroq qo‘shiladi.</p>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="rounded-3xl border border-line bg-white p-6">
              <f.icon aria-hidden className="h-6 w-6 text-brand-600" />
              <h3 className="mt-5 font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
