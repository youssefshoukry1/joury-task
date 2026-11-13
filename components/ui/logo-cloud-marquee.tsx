'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { FlowingLogos, type MarqueeItem } from './logo-cloud-marquee-utils/flowing-logos'

type LogoCloudMarqueeProps = {
  title: string
  description?: string
  data: MarqueeItem[]
  eyebrow?: string
  children?: ReactNode
  className?: string
}

export default function LogoCloudMarquee({ title, description, data, eyebrow, children, className }: LogoCloudMarqueeProps) {
  const reduced = useReducedMotion()

  return (
    <div className={clsx('relative w-full overflow-hidden', className)}>
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h2 aria-label={title} className="text-[clamp(2.1rem,4.3vw,3.7rem)] font-semibold leading-[1.12] tracking-[-.05em] text-[#1a3828]">
            {title.split(' ').map((word, index) => (
              <motion.span key={`${word}-${index}`} aria-hidden="true" initial={reduced ? false : { opacity: 0, filter: 'blur(6px)', y: 12 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .07, ease: 'easeOut' }} className={`mr-[.22em] inline-block ${index > 4 ? 'text-[#258454]' : ''}`}>{word}</motion.span>
            ))}
          </h2>
          {description && <motion.p initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : .25 }} className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#748176] md:text-base">{description}</motion.p>}
        </div>
        {children}
        <FlowingLogos data={data} className="mt-10 md:mt-12 [--duration:35s]" />
      </div>
    </div>
  )
}
