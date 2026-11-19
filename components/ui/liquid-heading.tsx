'use client'

import { useEffect, useId, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export default function LiquidHeading() {
  const id = useId().replace(/:/g, '')
  const root = useRef<HTMLHeadingElement>(null)
  const displacement = useRef<SVGFEDisplacementMapElement>(null)
  const noise = useRef<SVGFETurbulenceElement>(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()
  const visible = useInView(root, { amount: .8, margin: '0px 0px -80px 0px' })
  const play = () => {
    cancelAnimationFrame(frame.current)
    if (reduced) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1500, 1)
      const strength = 24 * Math.pow(1 - progress, 2) * Math.sin(Math.min(progress * 5, 1) * Math.PI / 2)
      displacement.current?.setAttribute('scale', String(strength))
      noise.current?.setAttribute('baseFrequency', `${.012 + progress * .004} ${.045 + Math.sin(progress * 8) * .008}`)
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }
  useEffect(() => {
    if (visible) play()
    else { cancelAnimationFrame(frame.current); displacement.current?.setAttribute('scale', '0') }
    return () => cancelAnimationFrame(frame.current)
    // The animation restarts only when entering the viewport or changing motion preference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced])
  return <>
    <svg aria-hidden="true" width="0" height="0" className="absolute"><defs><filter id={id} x="-15%" y="-35%" width="130%" height="170%" colorInterpolationFilters="sRGB"><feTurbulence ref={noise} type="fractalNoise" baseFrequency=".012 .045" numOctaves={2} seed={8} result="noise" /><feDisplacementMap ref={displacement} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
    <h2 ref={root} onPointerEnter={play} onPointerDown={play} className="mt-5 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-.05em]" style={{ filter: reduced ? undefined : `url(#${id})` }}>Ein gutes Gefühl.<br /><span className="text-[#228353]">Vom ersten Schritt an.</span></h2>
  </>
}
