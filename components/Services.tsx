'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Wrench } from 'lucide-react'

const services = [
  { title: 'Waschmaschinen', image: '/images/washer-technician-cutout.png', alt: 'Servicetechniker repariert eine Waschmaschine am geöffneten Wartungsfach', text: 'Die Wäsche wartet? Wir schauen nach, warum Ihre Maschine nicht mehr mitmacht.', tags: ['Abpumpen', 'Schleudern', 'Elektronik'], category: 'Reparatur & Fehlersuche', tone: 'dark' },
  { title: 'Kaffeemaschinen', image: '/images/image-removebg-preview (3).png', alt: 'Servicetechnikerin repariert eine geöffnete Espressomaschine', text: 'Ihr Morgen verdient guten Kaffee. Wir kümmern uns um Druck, Wärme und Durchlauf.', tags: ['Druck', 'Heizung', 'Durchlauf'], category: 'Reparatur & Wartung', tone: 'cream' },
  { title: 'Lautsprecher', image: '/images/image-removebg-preview (1).png', alt: 'Audiotechniker repariert die Elektronik eines Lautsprechers', text: 'Mehr Musik, weniger Aussetzer. Wir prüfen Klang, Anschlüsse und Stromversorgung.', tags: ['Klang', 'Anschlüsse', 'Verstärker'], category: 'Reparatur & Klangprüfung', tone: 'mint' },
]

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <section id="services" className="section-space bg-[#faf9f6]">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Unsere Leistungen</p>
            <h2 className="section-title">Wir reparieren.<br /><span className="text-[#258454]">Sie genießen den Alltag.</span></h2>
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

                <div className="relative my-5 h-[270px] overflow-hidden rounded-[20px] lg:h-[285px]">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 85vw, 28vw" className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#123a2c]/80 px-3 py-1.5 text-[9px] font-medium text-white backdrop-blur-sm"><Wrench size={12} aria-hidden="true" />Reparaturservice</span>
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
