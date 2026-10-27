import { useEffect } from 'react'
import { gsap, pageReady, reducedMotion, ScrollTrigger } from '../lib/smooth'

/**
 * Scroll'ga bog'langan effektlar (data-atributlar orqali):
 *  data-scroll-scale="0.9"  — blok kirib kelayotganda shu masshtabdan 1 gacha kattalashadi
 *  data-scroll-zoom="1.08"  — blok o'tib ketayotganda kattalashib, xiralashadi
 *  data-parallax="-60"      — scroll davomida Y bo'yicha siljiydi (px)
 *  data-hero-out            — hero scroll bilan kichrayib, xiralashib ketadi
 */
export function useScrollFx() {
  useEffect(() => {
    if (reducedMotion()) return
    let ctx: gsap.Context | undefined
    let cancelled = false

    pageReady.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-scroll-scale]').forEach((el) => {
          const from = Number(el.dataset.scrollScale) || 0.9
          gsap.fromTo(
            el,
            { scale: from, transformOrigin: '50% 0%' },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: 0.6 } },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-scroll-zoom]').forEach((el) => {
          const to = Number(el.dataset.scrollZoom) || 1.08
          gsap.to(el, {
            scale: to,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'bottom 75%', end: 'bottom top', scrub: 0.6 },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.to(el, {
            y: Number(el.dataset.parallax) || -60,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })

        const hero = document.querySelector<HTMLElement>('[data-hero-out]')
        if (hero) {
          gsap.to(hero, {
            scale: 0.9,
            opacity: 0.2,
            y: 60,
            transformOrigin: '50% 0%',
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 },
          })
        }

        // Hero intro: loader yopilgach elementlar ketma-ket ko'tariladi
        gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
      })
      // Shriftlar/rasmlar joylashgach pozitsiyalarni qayta hisoblash
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])
}
