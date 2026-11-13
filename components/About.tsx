'use client'

import Image from 'next/image'
import { ArrowUpRight, HeartHandshake, Leaf, Wrench, MessagesSquare, Search, ClipboardCheck } from 'lucide-react'
import LogoCloudMarquee from '@/components/ui/logo-cloud-marquee'

const values = [
  { name: 'Persönliche Beratung', icon: HeartHandshake },
  { name: 'Sorgfältige Diagnose', icon: Search },
  { name: 'Verständliche Antworten', icon: MessagesSquare },
  { name: 'Reparieren statt ersetzen', icon: Leaf },
  { name: 'Ein Auge fürs Detail', icon: Wrench },
  { name: 'Gemeinsam entscheiden', icon: ClipboardCheck },
]

export default function About() {
  return (
    <section id="about" className="section-space bg-[#f4f8f3]">
      <LogoCloudMarquee
        eyebrow="Die Menschen hinter FixPro"
        title="Gute Hände für Ihr Gerät. Ein offenes Ohr für Sie."
        description="Technik gehört zu Ihrem Alltag. Vertrauen gehört zu unserem Handwerk. Wir nehmen uns Zeit für beides."
        data={values}
      >
        <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#dce8df] bg-white md:mt-12 md:grid-cols-[1.05fr_1fr] md:rounded-[36px]">
          <div className="relative min-h-[280px] md:min-h-[350px]">
            <Image src="/images/repair-team-hero.png" alt="FixPro Techniker bei der Reparatur von Haushaltsgeräten" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover object-[85%_center]" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-medium text-[#31563d]"><span className="h-1.5 w-1.5 rounded-full bg-[#2c9a58]" />Mit Sorgfalt bei der Sache.</span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf5ee]"><Wrench size={21} className="text-[#258454]" strokeWidth={1.5} /></span>
            <h3 className="text-2xl font-semibold leading-snug tracking-tight text-[#1a3828]">Ihr Alltag ist uns<br />nicht egal.</h3>
            <p className="mt-4 text-sm leading-7 text-[#748176]">Ob die erste Tasse Kaffee oder die nächste Ladung Wäsche: Wir wissen, was ein funktionierendes Gerät bedeutet. Deshalb schauen wir genau hin und erklären Ihnen die Möglichkeiten.</p>
            <a href="#anfrage" className="mt-6 inline-flex items-center gap-3 self-start text-sm font-semibold text-[#258454]">Sprechen wir über Ihr Gerät<ArrowUpRight size={17} /></a>
          </div>
        </div>
      </LogoCloudMarquee>
    </section>
  )
}