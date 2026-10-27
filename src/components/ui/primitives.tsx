import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useInView } from '../../hooks/useReveal'
import { goToAudit } from '../../lib/scroll'
import { gsap, reducedMotion } from '../../lib/smooth'
import type { PackageId } from '../../data/content'

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <img src="/navdo-mark.png" alt="" width={34} height={30} className="h-[30px] w-auto" />
      <span className="flex flex-col leading-none">
        <span className={cx('text-[21px] font-extrabold tracking-tight', inverted ? 'text-white' : 'text-brand-800')}>
          Navdo
        </span>
        <span className={cx('mt-0.5 text-[10px] font-medium tracking-wide', inverted ? 'text-white/60' : 'text-ink-400')}>
          yangi davr savdosi
        </span>
      </span>
    </span>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'

// Asosiy rang + hover'da kursor kirgan nuqtadan to'ladigan rang (--fill, .btn-fx)
const variants: Record<Variant, string> = {
  // Asosiy CTA — logodagi sariq; oq matn o'qilmaydi, shuning uchun to'q matn
  primary: 'bg-gold text-ink shadow-gold [--fill:#073A61] hover:text-white',
  secondary: 'bg-white text-ink border border-line [--fill:#0B5E9C] hover:border-brand-600 hover:text-white',
  ghost: 'text-ink [--fill:#EEF5FB]',
  inverse: 'bg-gold text-ink [--fill:#FFFFFF] hover:text-brand-800',
}

type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  size?: 'md' | 'lg'
  arrow?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>

/** Magnit: tugma kursorga tortiladi, ichidagi matn esa biroz ko'proq (chuqurlik hissi). */
function useMagnet<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const content = inner.current
    if (!el || !content || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const bx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const by = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const tx = gsap.quickTo(content, 'x', { duration: 0.6, ease: 'power3' })
    const ty = gsap.quickTo(content, 'y', { duration: 0.6, ease: 'power3' })

    const setOrigin = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--x', `${e.clientX - r.left}px`)
      el.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      bx(mx * 0.22)
      by(my * 0.35)
      tx(mx * 0.12)
      ty(my * 0.18)
    }
    const leave = (e: PointerEvent) => {
      setOrigin(e) // rang chiqib ketayotgan tomonga qisqaradi
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
      gsap.to(content, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
    }
    el.addEventListener('pointerenter', setOrigin)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointerenter', setOrigin)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return { ref, inner }
}

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  arrow,
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Comp: ElementType = as ?? 'button'
  const { ref, inner } = useMagnet<HTMLElement>()
  return (
    <Comp
      ref={ref}
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cx(
        'btn-fx group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60',
        size === 'lg' ? 'h-14 px-7 text-[15px]' : 'h-11 px-5 text-sm',
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span ref={inner} className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          // Ikki strelka: biri o'ngga chiqib ketadi, ikkinchisi chapdan kiradi
          <span aria-hidden className="relative inline-flex h-4 w-4 overflow-hidden">
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-x-[150%]" />
            <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-x-0" />
          </span>
        )}
      </span>
    </Comp>
  )
}

/** Bepul auditga olib boruvchi asosiy CTA. */
export function AuditButton({
  source,
  packageId,
  children = 'Bepul auditga yozilish',
  ...rest
}: { source: string; packageId?: PackageId; children?: ReactNode } & Omit<ButtonProps<'button'>, 'children' | 'onClick'>) {
  return (
    <Button arrow data-cursor-label="Yozilish →" onClick={() => goToAudit(source, packageId)} {...rest}>
      {children}
    </Button>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Comp = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <Comp ref={ref} className={cx('reveal', inView && 'is-visible', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  id,
  inverted,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  id?: string
  inverted?: boolean
}) {
  return (
    <Reveal className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <p className={cx('eyebrow', inverted && '!text-white/80')}>
        <span aria-hidden className="h-0.5 w-6 rounded-full bg-gold" />
        {eyebrow}
      </p>
      <h2 id={id} className={cx('mt-4 text-h2 font-bold', inverted ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      {lead && (
        <p className={cx('mt-5 text-lg leading-relaxed', inverted ? 'text-white/70' : 'text-ink-500')}>{lead}</p>
      )}
    </Reveal>
  )
}
