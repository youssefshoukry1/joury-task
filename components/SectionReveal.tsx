'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function SectionReveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      data-section-reveal
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 'some', margin: '0px 0px -110px 0px' }}
      transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
