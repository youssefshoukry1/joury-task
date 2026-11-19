'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function FallingText({ text, className = '' }: { text: string; className?: string }) {
  const reduced = useReducedMotion()
  let letterIndex = 0
  return <motion.span
    aria-label={text}
    className={`block ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: .8, margin: '0px 0px -60px 0px' }}
  >
    {text.split(' ').map((word, wordIndex) => <span aria-hidden="true" key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
      {wordIndex > 0 && <span className="inline-block whitespace-pre"> </span>}
      {Array.from(word).map((letter, index) => {
        const order = letterIndex++
        return <motion.span
          key={index}
          className="relative inline-block"
          variants={{ hidden: { opacity: 0, y: reduced ? 0 : -55, rotate: reduced ? 0 : (order % 2 ? 9 : -9), scale: reduced ? 1 : .9 }, visible: { opacity: 1, y: 0, rotate: 0, scale: 1 } }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 155, damping: 14, mass: .8, delay: order * .035 }}
        >{letter}</motion.span>
      })}
    </span>)}
  </motion.span>
}
