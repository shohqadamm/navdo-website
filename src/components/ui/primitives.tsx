import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useInView } from '../../hooks/useReveal'
import { goToAudit } from '../../lib/scroll'
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

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-float',
  secondary: 'bg-white text-ink border border-line hover:border-ink-300',
  ghost: 'text-ink hover:bg-paper',
  inverse: 'bg-white text-brand-800 hover:bg-brand-50',
}

type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  size?: 'md' | 'lg'
  arrow?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  arrow,
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Comp = as ?? 'button'
  return (
    <Comp
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={cx(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[.98] disabled:pointer-events-none disabled:opacity-60',
        size === 'lg' ? 'h-14 px-7 text-[15px]' : 'h-11 px-5 text-sm',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
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
    <Button arrow onClick={() => goToAudit(source, packageId)} {...rest}>
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
      <p className={cx('eyebrow', inverted && '!text-brand-200')}>
        <span aria-hidden className="h-px w-6 bg-current" />
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
