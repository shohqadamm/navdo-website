import { useEffect } from 'react'
import { gsap, markPageReady, reducedMotion, startScroll, stopScroll } from '../lib/smooth'

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * index.html dagi #boot loaderni yopadi.
 * Sayt qanchalik tez yuklanmasin, logo animatsiyasi doim oxirigacha o'ynaydi:
 * #boot ichidagi CSS animatsiyalarining o'zi tugashi kutiladi, keyin `holdMs` pauza.
 * Animatsiyalar umuman ishlamasa (masalan, fon vkladka) — `MAX_MS` dan keyin baribir yopiladi.
 */
export function Loader({ holdMs = 300 }: { holdMs?: number }) {
  useEffect(() => {
    const boot = document.getElementById('boot')
    if (!boot) {
      markPageReady()
      return
    }
    stopScroll()

    const MAX_MS = 4500
    const loaded = new Promise<void>((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', () => r(), { once: true })))
    const fonts = document.fonts?.ready ?? Promise.resolve()
    // Logo chizilishi, rang, strelka, yozuv va progress chizig'i — hammasi tugaguncha
    const animations =
      typeof boot.getAnimations === 'function'
        ? Promise.all(boot.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => undefined))).then(() => undefined)
        : wait(1800)
    const animationsDone = animations.then(() => wait(holdMs))
    const cap = wait(MAX_MS)

    let tl: gsap.core.Timeline | undefined
    let cancelled = false
    let fallback = 0

    Promise.race([Promise.all([loaded, fonts, animationsDone]), cap]).then(() => {
      if (cancelled) return
      const finish = () => {
        boot.remove()
        startScroll()
      }
      if (reducedMotion()) {
        markPageReady()
        finish()
        return
      }
      const parts = boot.querySelectorAll<HTMLElement>('.mark, .word, .bar')
      // CSS kirish animatsiyasi (forwards) inline opacity'dan ustun turadi — o'chirib, GSAP'ga beramiz
      gsap.set(parts, { animation: 'none', opacity: 1 })
      tl = gsap
        .timeline({ onComplete: finish })
        // Logo, matn va chiziq birga, bir xil tezlikda
        .to(parts, { y: -24, opacity: 0, duration: 0.35, ease: 'power2.in' })
        .add(markPageReady, '-=0.05')
        // Oq parda yuqoriga ko'tarilib sahifani ochadi
        .to(boot, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'power3.inOut' }, '<')
      // Zaxira: requestAnimationFrame to'xtagan bo'lsa (fon vkladka), loader baribir yopiladi
      fallback = window.setTimeout(() => {
        if (!boot.isConnected) return
        tl?.kill()
        markPageReady()
        finish()
      }, 1200)
    })

    return () => {
      cancelled = true
      tl?.kill()
      window.clearTimeout(fallback)
    }
  }, [holdMs])

  return null
}
