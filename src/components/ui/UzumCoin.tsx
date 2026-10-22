import { useEffect, useRef } from 'react'
import { cx } from './primitives'

// Qalinlik: tasvirning orqasiga qorong'iroq nusxalar qatlami (CSS 3D "ekstruziya")
const DEPTH_LAYERS = 7
const LAYER_GAP = 1.6 // px

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Uzum Market 3D tangasi. Scroll bo'yicha silliq aylanadi (lerp),
 * bo'sh turganda yengil "suzadi". Ekrandan chiqsa rAF to'xtaydi.
 */
export function UzumCoin({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const coin = useRef<HTMLDivElement>(null)
  const shadow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el || !coin.current || !shadow.current) return
    const coinEl = coin.current
    const shadowEl = shadow.current

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      coinEl.style.transform = 'rotateX(8deg) rotateY(-20deg)'
      return
    }

    // Joriy (silliqlangan) qiymat va scroll'dan kelgan maqsad
    const cur = { p: 0 }
    let target = 0
    let frame = 0
    let running = false
    const start = performance.now()

    const readScroll = () => {
      // 0 — sahifa tepasi, 1 — hero bir ekran balandligiga scroll qilingan
      target = Math.min(1.2, Math.max(0, window.scrollY / Math.max(400, window.innerHeight)))
    }

    const render = (now: number) => {
      cur.p = lerp(cur.p, target, 0.075)
      const t = (now - start) / 1000
      const p = cur.p

      const floatY = Math.sin(t * 1.3) * 6
      const rotY = -24 + p * 70 + Math.sin(t * 0.8) * 4
      const rotX = 12 - p * 26 + Math.cos(t * 1.1) * 2
      const rotZ = -6 + p * 14
      const y = p * 90 + floatY
      const s = 1 - p * 0.12

      coinEl.style.transform = `translate3d(0, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${s})`
      // Soya tanga ko'tarilganda kichrayadi va xiralashadi
      const lift = (floatY + 6) / 12
      shadowEl.style.transform = `translate3d(${p * 10}px, ${p * 90}px, 0) scale(${0.85 + lift * 0.15 - p * 0.15})`
      shadowEl.style.opacity = String(0.55 - lift * 0.15 - p * 0.2)

      frame = requestAnimationFrame(render)
    }

    const play = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(render)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    readScroll()
    cur.p = target
    window.addEventListener('scroll', readScroll, { passive: true })
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()))
    io.observe(el)

    return () => {
      pause()
      io.disconnect()
      window.removeEventListener('scroll', readScroll)
    }
  }, [])

  return (
    <div ref={wrap} className={cx('pointer-events-none select-none [perspective:900px]', className)} aria-hidden>
      <div className="relative aspect-square w-full">
        <div
          ref={shadow}
          className="absolute -bottom-6 left-[12%] h-[14%] w-[76%] rounded-[50%] bg-[#4B1FB8] opacity-50 blur-xl"
        />
        <div ref={coin} className="relative h-full w-full will-change-transform [transform-style:preserve-3d]">
          {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
            <img
              key={i}
              src="/uzum-logo.webp"
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full"
              style={{
                transform: `translateZ(${-(i + 1) * LAYER_GAP}px)`,
                filter: `brightness(${0.62 - i * 0.03}) saturate(1.2)`,
              }}
            />
          ))}
          <img
            src="/uzum-logo.webp"
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full drop-shadow-[0_18px_30px_rgba(75,31,184,0.35)]"
          />
        </div>
      </div>
    </div>
  )
}
