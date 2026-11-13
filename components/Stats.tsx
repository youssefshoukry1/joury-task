'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Search, MessagesSquare, Leaf, ShieldCheck, ArrowUpRight } from 'lucide-react'
const items = [
  { icon: Search, title: 'Gründliche Prüfung', text: 'Die Ursache verstehen, bevor es an die Reparatur geht.' },
  { icon: MessagesSquare, title: 'Klare Abstimmung', text: 'Die nächsten Schritte gemeinsam besprechen.' },
  { icon: Leaf, title: 'Bewusst reparieren', text: 'Eine sinnvolle Alternative zum schnellen Neukauf.' },
]
export default function Stats() {
  const reduced = useReducedMotion()

  return (
    <section id="stats" className="bg-[#faf9f6] px-4 py-14 md:px-8 md:py-20">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] border border-[#dce8df] bg-[#eaf3ec] p-6 text-[#17372a] md:rounded-[44px] md:p-12 lg:p-14"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full border-[45px] border-white/25" />
        <div className="relative grid items-end gap-6 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#427955]"><ShieldCheck size={15} />Das FixPro Prinzip</p>
            <h2 className="mt-5 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-.05em]">Ein gutes Gefühl.<br /><span className="text-[#228353]">Vom ersten Schritt an.</span></h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-[#5f7465]">Ihr Gerät verdient Aufmerksamkeit. Sie verdienen klare Antworten. Wir bringen beides zusammen.</p>
            <a href="#process" className="mt-4 inline-flex items-center gap-3 text-xs font-semibold text-[#21673e]">So arbeiten wir<ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="relative mt-9 grid gap-4 md:mt-11 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.12 }}
              whileHover={reduced ? undefined : { y: -5 }}
              className="rounded-[24px] border border-white/80 bg-white/85 p-6 shadow-[0_8px_25px_-20px_rgba(20,65,40,0.3)] md:p-7"
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ee]"><Icon size={23} strokeWidth={1.6} className="text-[#248454]" /></span>
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-[#718176]">{text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
