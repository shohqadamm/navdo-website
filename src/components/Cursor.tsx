import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/smooth'

/**
 * Awwwards uslubidagi kursor: nuqta (darhol) + halqa (kechikib, silliq).
 * mix-blend-difference — oq fonda to'q, ko'k fonda och ko'rinadi.
 * Holatlar:
 *  - havola/tugma ustida halqa kattalashadi, nuqta yo'qoladi
 *  - [data-cursor-label] (asosiy CTA) ustida — yozuvli to'liq doira
 *  - input/textarea/select ustida — yashiriladi (oddiy kursor)
 * Faqat sichqonchali qurilmalarda (pointer: fine) ishlaydi.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reducedMotion() || !dot.current || !ring.current || !label.current) return
    const d = dot.current
    const r = ring.current
    const l = label.current
    document.documentElement.classList.add('has-cursor')

    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'power3' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'power3' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3' })

    let state: 'default' | 'hover' | 'label' | 'hidden' = 'default'
    let visible = false

    const setState = (next: typeof state, text = '') => {
      if (next === state && next !== 'label') return
      state = next
      r.classList.toggle('is-label', next === 'label')
      if (next === 'label') l.textContent = text
      gsap.to(r, {
        width: next === 'label' ? 88 : next === 'hover' ? 64 : 36,
        height: next === 'label' ? 88 : next === 'hover' ? 64 : 36,
        opacity: next === 'hidden' ? 0 : 1,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      gsap.to(d, { scale: next === 'default' ? 1 : 0, opacity: next === 'hidden' ? 0 : 1, duration: 0.25, overwrite: 'auto' })
      gsap.to(l, { opacity: next === 'label' ? 1 : 0, scale: next === 'label' ? 1 : 0.6, duration: 0.3, overwrite: 'auto' })
    }

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      if (!visible) {
        visible = true
        gsap.set([d, r], { x: e.clientX, y: e.clientY })
        gsap.to([d, r], { opacity: 1, duration: 0.3 })
      }
    }

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (t.closest('input, textarea, select')) return setState('hidden')
      const labelled = t.closest<HTMLElement>('[data-cursor-label]')
      if (labelled) return setState('label', labelled.dataset.cursorLabel || '')
      if (t.closest('a, button, [role="tab"], label, [data-cursor]')) return setState('hover')
      setState('default')
    }

    const leaveWindow = () => {
      visible = false
      gsap.to([d, r], { opacity: 0, duration: 0.2 })
    }
    const down = () => gsap.to(r, { scale: 0.82, duration: 0.15 })
    const up = () => gsap.to(r, { scale: 1, duration: 0.35, ease: 'back.out(3)' })

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leaveWindow)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leaveWindow)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    // Wrapper'siz: mix-blend-difference sahifa fonining o'zi bilan aralashishi uchun
    <>
      <div ref={ring} aria-hidden className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} aria-hidden className="cursor-dot" />
    </>
  )
}
