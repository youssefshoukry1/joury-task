'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export default function WrenchWrittenHeading() {
  const root = useRef<HTMLHeadingElement>(null)
  const visible = useInView(root, { amount: .8, margin: '0px 0px -70px 0px' })
  const reduced = useReducedMotion()
  return <h2 ref={root} className="section-title relative w-fit max-w-full !text-[clamp(1.7rem,3.5vw,3.25rem)]" aria-label={"Drei Schritte. Ein gutes Gef\u00fchl."}>
    {['Drei Schritte.', 'Ein gutes Gef\u00fchl.'].map((line, lineIndex) => <span aria-hidden="true" key={lineIndex} className={`block w-fit whitespace-nowrap ${lineIndex ? 'text-[#258454]' : ''}`}>
      {line.split(' ').map((word, wordIndex) => <motion.span key={wordIndex} className="inline-block whitespace-pre" initial={{ opacity: 0, filter: 'blur(9px)', y: 6 }} animate={visible || reduced ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(9px)', y: 6 }} transition={{ duration: reduced ? 0 : .85, delay: reduced ? 0 : .15 + lineIndex * .5 + wordIndex * .16, ease: [.22, 1, .36, 1] }}>{wordIndex ? ' ' : ''}{word}</motion.span>)}
    </span>)}
  </h2>
}
