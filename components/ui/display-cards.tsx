'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Search, Wrench, ChevronDown } from 'lucide-react'

const steps = [
  { icon: MessageCircle, title: 'Ihre Anfrage', description: 'Gerät und Fehler kennenlernen.', detail: 'Sie nennen uns Marke, Modell und Ihre Beobachtungen. Gemeinsam klären wir den nächsten Schritt.', label: 'Schritt 01' },
  { icon: Search, title: 'Die Diagnose', description: 'Genau hinsehen. Klar besprechen.', detail: 'Wir grenzen die Ursache ein und sprechen mit Ihnen über die passenden Reparaturmöglichkeiten.', label: 'Schritt 02' },
  { icon: Wrench, title: 'Die Reparatur', description: 'Vereinbarte Arbeiten. Funktionstest.', detail: 'Nach Ihrer Zustimmung folgen die vereinbarten Arbeiten. Zum Abschluss wird die Funktion geprüft.', label: 'Schritt 03' },
]

export default function DisplayCards() {
  const [active, setActive] = useState<number | null>(0)
  const id = useId()
  const reduced = useReducedMotion()
  return (
    <ol className="space-y-4" aria-label="Ihr Reparaturablauf">
      {steps.map(({ icon: Icon, title, description, detail, label }, index) => {
        const open = active === index
        return <li key={title} className={`overflow-hidden rounded-[24px] border transition-colors duration-300 ${open ? 'border-[#276546] bg-[#163e2b] text-white' : 'border-[#dce8df] bg-[#f4f8f3] text-[#2d4835]'}`}>
          <h3><button id={`${id}-step-${index}`} type="button" onClick={() => setActive(open ? null : index)} aria-expanded={open} aria-controls={`${id}-panel-${index}`} className="group flex w-full cursor-pointer items-start gap-4 p-5 text-left sm:p-6">
            <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${open ? 'bg-[#a3e5b5] text-[#163e2b]' : 'bg-[#e1eee3] text-[#258454]'}`}><Icon size={21} strokeWidth={1.6} /></span>
            <span className="min-w-0 flex-1"><span className={`mb-1 block text-[9px] font-semibold uppercase tracking-[.15em] ${open ? 'text-[#a3d9b4]' : 'text-[#718e79]'}`}>{label}</span><span className="block text-lg font-semibold">{title}</span><span className={`mt-2 block text-xs font-normal leading-6 ${open ? 'text-[#b9d1c1]' : 'text-[#6a8070]'}`}>{description}</span>
              <span className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors ${open ? 'border-white/20 text-[#b8ecc6] group-hover:bg-white/10' : 'border-[#bfd8c5] text-[#21673e] group-hover:bg-[#dceee0]'}`}>{open ? 'Details schließen' : 'Details anzeigen'}<ChevronDown size={13} className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} /></span>
            </span>
          </button></h3>
          <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-step-${index}`}>
            <AnimatePresence initial={false}>{open && <motion.div key="detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .3, ease: [.22, 1, .36, 1] }} className="overflow-hidden"><p className="mx-5 border-t border-white/15 py-5 text-sm leading-7 text-[#c5decd] sm:mx-6">{detail}</p></motion.div>}</AnimatePresence>
          </div>
        </li>
      })}
    </ol>
  )
}
