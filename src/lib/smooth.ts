import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Butun sayt uchun bitta Lenis; harakat cheklangan bo'lsa — null (oddiy scroll) */
export let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (lenis || reducedMotion()) return
  // Header uchun joy CSS'dagi `scroll-padding-top` dan olinadi (Lenis uni o'zi hisobga oladi)
  lenis = new Lenis({ duration: 1.15, anchors: true, autoRaf: false })
  // ScrollTrigger Lenis bilan bir xil kadrda yangilanadi
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()

// Loader tugaganini bildiradi: hero intro va scroll effektlari shundan keyin boshlanadi
let readyResolve!: () => void
export const pageReady = new Promise<void>((r) => (readyResolve = r))
export const markPageReady = () => readyResolve()
