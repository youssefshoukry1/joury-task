'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Search, MessagesSquare, Leaf, ShieldCheck, ArrowUpRight } from 'lucide-react'

const items = [
  { icon: Search, title: 'Genau hinsehen.', label: 'Sorgfalt', text: 'Wir gehen der Ursache auf den Grund, bevor wir eine Reparatur empfehlen.' },
  { icon: MessagesSquare, title: 'Verständlich erklären.', label: 'Klarheit', text: 'Sie erfahren, was Ihrem Gerät fehlt und welche Möglichkeiten es gibt.' },
  { icon: Leaf, title: 'Sinnvoll erhalten.', label: 'Bewusstsein', text: 'Gemeinsam schauen wir, wann eine Reparatur eine gute Alternative zum Neukauf ist.' },
]

export default function Stats() {
  const reduced = useReducedMotion()
  return <section id="stats" className="bg-[#faf9f6] px-4 py-14 md:px-8 md:py-20">
    <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[32px] border border-[#dce5dc] bg-white lg:grid-cols-[.9fr_1.1fr] md:rounded-[40px]">
      <div className="relative flex flex-col justify-between overflow-hidden bg-[#103329] p-7 text-white md:p-12 lg:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full border-[55px] border-white/[.035]" />
        <div className="relative"><p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#a3e5b5]"><ShieldCheck size={15} />Das FixPro Prinzip</p><h2 className="mt-7 text-[clamp(2rem,3.5vw,3.2rem)] font-semibold leading-[1.12] tracking-[-.045em]">Technik verstehen.<br /><span className="text-[#a3e5b5]">Vertrauen verdienen.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#b5cbbd]">Ein gutes Gefühl entsteht durch die Art, wie wir mit Ihrem Gerät und Ihren Fragen umgehen.</p></div>
        <a href="#about" className="relative mt-10 inline-flex w-fit items-center gap-3 border-b border-[#a3e5b5]/40 pb-2 text-xs font-semibold text-[#a3e5b5] transition-colors hover:text-white">Die Menschen hinter FixPro<ArrowUpRight size={17} /></a>
      </div>
      <div className="px-6 py-3 md:px-10 md:py-4">
        {items.map(({ icon: Icon, title, label, text }, index) => <motion.article key={title} initial={reduced ? false : { opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .3 }} transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : index * .1, ease: [.22, 1, .36, 1] }} className="flex gap-5 border-b border-[#e8eee9] py-7 last:border-b-0 md:gap-6 md:py-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4e5d8] bg-[#f0f6f1] text-[#258454]"><motion.span className="inline-flex" animate={reduced ? { rotate: 0 } : { rotate: [0, 20, -20, 12, -12, 0] }} transition={{ duration: 1, delay: 5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}><Icon size={22} strokeWidth={1.6} /></motion.span></span>
          <div><p className="mb-2 text-[9px] font-semibold uppercase tracking-[.17em] text-[#71947b]">{label}</p><h3 className="text-xl font-semibold tracking-tight text-[#17372a]">{title}</h3><p className="mt-2 max-w-sm text-sm leading-7 text-[#718176]">{text}</p></div>
        </motion.article>)}
      </div>
    </div>
  </section>
}
