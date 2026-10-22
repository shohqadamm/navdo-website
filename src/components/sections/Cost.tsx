import { losses } from '../../data/content'
import { AuditButton, Reveal, SectionHeading } from '../ui/primitives'

export function Cost() {
  return (
    <section aria-labelledby="cost-title" className="curve-top bg-brand-600 py-20 text-white lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="cost-title"
            inverted
            eyebrow="Kutishning narxi"
            title="Har oy kechikish — boshqa birovning savdosi"
            lead="Muammo o‘z-o‘zidan hal bo‘lmaydi. Kanal ochilmagan har bir oy sizga quyidagilarga tushadi."
          />
          <Reveal delay={120} className="mt-10">
            <AuditButton source="cost" variant="inverse" size="lg">
              Yo‘qotishni to‘xtatish
            </AuditButton>
          </Reveal>
        </div>

        <ol className="border-t border-white/10">
          {losses.map((l, i) => (
            <Reveal as="li" key={l.title} delay={i * 60} className="grid grid-cols-[auto_1fr] gap-6 border-b border-white/10 py-8 sm:gap-10">
              <span className="text-4xl font-extrabold tabular-nums text-white/20 sm:text-5xl">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{l.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-white/60">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
