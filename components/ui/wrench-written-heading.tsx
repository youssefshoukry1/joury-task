'use client'

import Image from 'next/image'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function WrenchWrittenHeading() {
  const root = useRef<HTMLHeadingElement>(null)
  const first = useRef<HTMLSpanElement>(null)
  const second = useRef<HTMLSpanElement>(null)
  const [size, setSize] = useState({ first: 0, second: 0, line: 0 })
  const visible = useInView(root, { amount: 1, margin: '0px 0px -70px 0px' })
  const reduced = useReducedMotion()
  const progress = useMotionValue(0)
  const clipFirst = useTransform(progress, [0, .43, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)'])
  const clipSecond = useTransform(progress, [0, .53, .96, 1], ['inset(0 100% 0 0)', 'inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)'])
  const x = useTransform(progress, [0, .43, .46, .53, .96, 1], [0, size.first, size.first, 0, size.second, size.second + 12])
  const y = useTransform(progress, [0, .46, .53, 1], [size.line * .7, size.line * .7, size.line * 1.7, size.line * 1.7])
  const opacity = useTransform(progress, [0, .03, .96, 1], [0, 1, 1, 0])
  const rotate = useTransform(progress, [0, .2, .43, .49, .53, .75, 1], [-48, -43, -48, -68, -48, -43, -48])
  useEffect(() => {
    const measure = () => setSize({ first: first.current?.offsetWidth || 0, second: second.current?.offsetWidth || 0, line: first.current?.offsetHeight || 0 })
    const observer = new ResizeObserver(measure)
    if (root.current) observer.observe(root.current)
    measure()
    document.fonts.ready.then(measure)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (reduced) { progress.set(1); return }
    if (!visible) { progress.set(0); return }
    const controls = animate(progress, 1, { duration: 3.6, delay: .25, ease: 'linear' })
    return () => controls.stop()
  }, [visible, reduced, progress])
  return <h2 ref={root} className="section-title relative w-fit max-w-full !text-[clamp(1.7rem,3.5vw,3.25rem)]" aria-label="Drei Schritte. Ein gutes Gefühl.">
    <motion.span aria-hidden="true" className="block w-fit whitespace-nowrap" style={{ clipPath: reduced ? undefined : clipFirst }}><span ref={first} className="inline-block">Drei Schritte.</span></motion.span>
    <motion.span aria-hidden="true" className="block w-fit whitespace-nowrap text-[#258454]" style={{ clipPath: reduced ? undefined : clipSecond }}><span ref={second} className="inline-block">Ein gutes Gefühl.</span></motion.span>
    {!reduced && <motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-6 w-24 origin-[8px_12px] md:h-7 md:w-28" style={{ x, y, opacity, rotate }}><Image src="/images/User%20attachment.png" alt="" fill sizes="112px" className="object-contain" style={{ maskImage: 'url("/images/User%20attachment.png")', maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center", maskMode: "luminance" }} /></motion.span>}
  </h2>
}
