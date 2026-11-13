'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Wrench } from 'lucide-react'

const services = [
  { title: 'Waschmaschinen', image: '/images/User_attachment1.png', text: 'Die Wäsche wartet? Wir schauen nach, warum Ihre Maschine nicht mehr mitmacht.', tags: ['Abpumpen', 'Schleudern', 'Elektronik'], category: 'Für einen entspannten Alltag', tone: 'dark' },
  { title: 'Kaffeemaschinen', image: '/images/User_attachment2.png', text: 'Ihr Morgen verdient guten Kaffee. Wir kümmern uns um Druck, Wärme und Durchlauf.', tags: ['Druck', 'Heizung', 'Durchlauf'], category: 'Für Ihren Lieblingsmoment', tone: 'cream' },
  { title: 'Lautsprecher', image: '/images/pa-speaker.png', text: 'Mehr Musik, weniger Aussetzer. Wir prüfen Klang, Anschlüsse und Stromversorgung.', tags: ['Klang', 'Anschlüsse', 'Verstärker'], category: 'Für den richtigen Sound', tone: 'mint' },
]

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <section id="services" className="section-space bg-[#faf9f6]">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Unsere Leistungen</p>
            <h2 className="section-title">Was wir wieder<br /><span className="text-[#258454]">zum Laufen bringen.</span></h2>
          </div>
          <div className="max-w-xs pb-1">
            <p className="text-sm leading-7 text-stone-500">Drei Gerätewelten. Ein Anspruch: genau hinsehen und eine passende Lösung finden.</p>
            <a href="#anfrage" className="mt-4 inline-flex items-center gap-3 text-xs font-semibold text-[#16804a]">Welches Gerät braucht Ihre Hilfe?<ArrowRight size={16} /></a>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const dark = service.tone === 'dark'
            return (
              <motion.article
                key={service.title}
                initial={reduced ? false : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.13 }}
                whileHover={reduced ? undefined : { y: -7 }}
                className={`group relative flex flex-col overflow-hidden rounded-[30px] border p-5 lg:p-7 ${dark ? 'border-[#14372e] bg-[#123a2c] text-white' : service.tone === 'cream' ? 'border-[#e9e2d7] bg-[#f2ece2] text-[#293c30]' : 'border-[#d6e6dc] bg-[#e4efe7] text-[#293c30]'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-3 py-1.5 text-[9px] font-medium uppercase tracking-widest ${dark ? 'border-white/20 text-[#b0cfbc]' : 'border-[#47694e]/15 text-[#58735f]'}`}>{service.category}</span>
                  <span className={`text-[11px] ${dark ? 'text-white/35' : 'text-[#64806c]/60'}`}>0{index + 1}</span>
                </div>

                <div className="relative my-5 flex h-[260px] items-center justify-center lg:h-[285px]">
                  <span aria-hidden="true" className={`absolute h-52 w-52 rounded-full ${dark ? 'bg-[#28523b]' : 'bg-white/50'}`} />
                  <span aria-hidden="true" className={`absolute inset-x-10 bottom-3 h-4 rounded-[100%] blur-md ${dark ? 'bg-black/25' : 'bg-[#34513a]/15'}`} />
                  <Image src={service.image} alt={service.title} width={320} height={320} sizes="(max-width: 768px) 75vw, 28vw" className="relative h-[240px] w-auto max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none lg:h-[260px]" />
                  <span aria-hidden="true" className={`absolute bottom-3 right-1 flex h-10 w-10 -rotate-12 items-center justify-center rounded-xl border shadow-sm ${dark ? 'border-[#4f715b] bg-[#224b34] text-[#a6e5b7]' : 'border-white bg-white/85 text-[#16804a]'}`}><Wrench size={17} /></span>
                </div>

                <h3 className="text-[26px] font-semibold tracking-tight">{service.title}</h3>
                <p className={`mt-3 min-h-[84px] text-sm leading-7 ${dark ? 'text-[#b0c8b9]' : 'text-[#687b6b]'}`}>{service.text}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{service.tags.map(tag => <span key={tag} className={`rounded-full px-2.5 py-1 text-[9px] ${dark ? 'bg-white/[.07] text-[#accbb7]' : 'bg-white/60 text-[#6c7e70]'}`}>{tag}</span>)}</div>
                <a href="#anfrage" className={`mt-7 flex items-center justify-between border-t pt-5 text-sm font-semibold ${dark ? 'border-white/15 text-[#a3e5b5]' : 'border-[#688871]/15 text-[#206b42]'}`}>
                  Reparatur anfragen
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${dark ? 'bg-[#a3e5b5] text-[#163c26] group-hover:bg-white' : 'bg-white text-[#236b43] group-hover:bg-[#236b43] group-hover:text-white'}`}><ArrowUpRight size={18} /></span>
                </a>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs leading-6 text-stone-500"><span className="h-1.5 w-1.5 rounded-full bg-[#49a96d]" />Ihr Gerät ist nicht dabei?<a href="#anfrage" className="font-semibold text-[#16804a] underline underline-offset-4">Fragen kostet erst mal nur eine Nachricht.</a></div>
      </div>
    </section>
  )
}
