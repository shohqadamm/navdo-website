import { useEffect, useRef } from 'react'
import { cx } from './primitives'
import { gsap, reducedMotion } from '../../lib/smooth'

// Fluent Emoji 3D (Microsoft, MIT) — public/icons/*.webp, 160 px
export type IconName =
  | 'chart-down' | 'package' | 'eyes' | 'store' | 'briefcase' | 'money-wings'
  | 'ice' | 'cart' | 'hourglass' | 'receipt'
  | 'puzzle' | 'card-index' | 'money-bag' | 'magnifier'
  | 'handshake' | 'bar-chart' | 'department-store' | 'camera' | 'check' | 'truck' | 'chart-up'
  | 'rocket' | 'key' | 'shield' | 'trophy' | 'gift' | 'memo' | 'stopwatch' | 'pin' | 'lock'

const sizes = {
  sm: 'h-12 w-12 rounded-2xl p-2',
  md: 'h-16 w-16 rounded-[20px] p-2.5',
  lg: 'h-24 w-24 rounded-[28px] p-3.5',
}

/**
 * Uzum menyusidagi kabi 3D ikonka: yumshoq "squircle" ichida.
 * Ko'ringanda "otilib" chiqadi, keyin sekin suzadi; sichqoncha bilan 3D egiladi.
 */
export function Icon3D({
  name,
  size = 'md',
  tile = true,
  className,
}: {
  name: IconName
  size?: keyof typeof sizes
  /** false — fonsiz, faqat ikonka (rangli bloklar ichida) */
  tile?: boolean
  className?: string
}) {
  const wrap = useRef<HTMLSpanElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = wrap.current
    const icon = img.current
    if (!el || !icon || reducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(icon, { transformPerspective: 500 })
      // Ko'rinish maydoniga kirganda: kichik va burilgan holatdan "pop"
      // (qobiqda — ichki ikonkaning suzish/egilishi bilan to'qnashmasin)
      gsap.from(el, {
        scale: 0.4,
        rotate: -18,
        y: 16,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
      // Doimiy yengil suzish — har bir ikonka o'z ritmida; ekrandan chiqsa pauza
      gsap.to(icon, {
        y: -5,
        rotate: 3,
        duration: 1.8 + Math.random() * 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random(),
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
      })
    }, el)

    // Sichqoncha bilan 3D egilish (tilt)
    const rx = gsap.quickTo(icon, 'rotationX', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(icon, 'rotationY', { duration: 0.5, ease: 'power3' })
    const sc = gsap.quickTo(icon, 'scale', { duration: 0.4, ease: 'back.out(3)' })
    const host = (el.closest('[data-icon-host]') as HTMLElement | null) ?? el
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / r.width
      const py = (e.clientY - (r.top + r.height / 2)) / r.height
      ry(gsap.utils.clamp(-28, 28, px * 40))
      rx(gsap.utils.clamp(-28, 28, -py * 40))
    }
    const enter = () => sc(1.14)
    const leave = () => {
      rx(0)
      ry(0)
      sc(1)
    }
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerenter', enter)
    host.addEventListener('pointerleave', leave)

    return () => {
      ctx.revert()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerenter', enter)
      host.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <span
      ref={wrap}
      aria-hidden
      className={cx(
        'inline-flex shrink-0 items-center justify-center [perspective:500px]',
        sizes[size],
        tile && 'bg-gradient-to-b from-white to-brand-50 shadow-[inset_0_1px_0_#fff,0_8px_20px_-10px_rgba(11,94,156,.35)] ring-1 ring-brand-100',
        className,
      )}
    >
      <img
        ref={img}
        src={`/icons/${name}.webp`}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-contain drop-shadow-[0_6px_8px_rgba(17,24,39,.18)] will-change-transform"
      />
    </span>
  )
}
