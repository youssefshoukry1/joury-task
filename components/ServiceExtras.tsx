'use client'

import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, ChevronRight, CircleDollarSign, Layers3, PackageCheck, ScanLine, Wrench } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'
import GlassFolder from '@/components/ui/glass-folder-cards'

const inspections = {
  Waschmaschine: {
    image: 'washer-final-hd.png',
    points: [
      { title: 'Pumpe & Wasserwege', text: 'Wir prüfen Ablauf, Pumpe und Verbindungen auf Blockaden und undichte Stellen. So lässt sich stehendes Wasser gezielt einordnen.', x: 51, y: 83 },
      { title: 'Trommel & Antrieb', text: 'Lager, Riemen und Antrieb werden passend zum Fehlerbild untersucht. Geräusche und Vibrationen geben dabei wichtige Hinweise.', x: 34, y: 57 },
      { title: 'Elektronik & Bedienung', text: 'Fehlercodes, Kontakte und die Steuerung helfen uns zu verstehen, warum Programme aussetzen oder die Maschine nicht startet.', x: 23, y: 37 },
      { title: 'Dichtungen & Anschlüsse', text: 'Wir kontrollieren die betroffenen Dichtungen und Anschlüsse. Welche Teile ersetzt werden müssen, klären wir nach der Prüfung.', x: 15, y: 70 },
    ],
  },
  Kaffeemaschine: {
    image: 'coffee-final-hd.png',
    points: [
      { title: 'Pumpe & Druck', text: 'Wir prüfen, ob die Pumpe Wasser zuverlässig fördert und ob der Druckaufbau zum Fehlerbild passt.', x: 60, y: 66 },
      { title: 'Heizung & Temperatur', text: 'Heizung und Temperaturregelung werden untersucht, wenn das Wasser kalt bleibt oder die Maschine nicht richtig aufheizt.', x: 57, y: 44 },
      { title: 'Durchlauf & Brühgruppe', text: 'Wasserwege und Brühgruppe werden auf Ablagerungen und Störungen geprüft. Reinigung oder Reparatur stimmen wir mit Ihnen ab.', x: 32, y: 46 },
      { title: 'Dichtungen & Tank', text: 'Wir verfolgen den Wasserweg vom Tank bis zu den Verbindungen und grenzen die Ursache möglicher Leckagen ein.', x: 87, y: 39 },
    ],
  },
  Lautsprecher: {
    image: 'speaker-final-hd.png',
    points: [
      { title: 'Treiber & Klang', text: 'Wir hören genau hin und prüfen die betroffenen Treiber auf Aussetzer, Verzerrungen und mechanische Auffälligkeiten.', x: 63, y: 72 },
      { title: 'Signal & Anschlüsse', text: 'Eingänge, Kabelverbindungen und Kontakte werden passend zur Anschlussart geprüft. So grenzen wir Störungen im Signalweg ein.', x: 8, y: 57 },
      { title: 'Elektronik & Verstärker', text: 'Die Elektronik wird auf das beschriebene Fehlerbild untersucht. Mögliche Instandsetzungen besprechen wir nach der Diagnose.', x: 27, y: 53 },
      { title: 'Stromversorgung', text: 'Wir prüfen die Stromversorgung und bei passenden Modellen den Akku, wenn das Gerät nicht startet oder unerwartet ausgeht.', x: 27, y: 79 },
    ],
  },
}

export function ServiceInspection({ device }: { device: string }) {
  const data = inspections[device as keyof typeof inspections] ?? inspections.Waschmaschine
  const [selected, setSelected] = useState(0)
  const reduced = useReducedMotion()
  const imageRef = useRef<HTMLDivElement>(null)
  const visible = useInView(imageRef, { amount: .3 })
  const id = useId()
  const point = data.points[selected]

  return <SectionReveal><section id="pruefumfang" className="px-4 py-12 md:px-8 md:py-16">
    <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#0b2724] text-white">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 p-7 md:p-12">
        <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#9de5b4]">Was wir prüfen</p><h2 className="section-title">Jedes Detail zählt.<br /><span className="text-[#9de5b4]">Wir schauen genauer hin.</span></h2></div>
        <p className="flex max-w-[230px] items-start gap-3 text-xs leading-6 text-[#a9c2b6]"><ScanLine size={22} className="mt-1 shrink-0 text-[#9de5b4]" />Wählen Sie einen Prüfpunkt und entdecken Sie, worauf wir achten.</p>
      </div>
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div ref={imageRef} className="relative isolate flex min-h-[320px] items-center bg-[#dfebe2] p-5 sm:min-h-[440px] md:p-9">
          <div className="relative aspect-square w-full">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-[#77a68a]/20" />
            <div aria-hidden="true" className="absolute inset-[22%] rounded-full border border-[#77a68a]/20" />
            <Image src={`/images/${data.image}`} alt={`${device}: Bauteile und Prüfpunkte`} fill sizes="(max-width: 1024px) 90vw, 48vw" className="object-contain" />
            <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <motion.path key={selected} d={`M${point.x},${point.y} L${Math.min(point.x + 10, 92)},${Math.max(point.y - 14, 8)} H96`} fill="none" stroke="#237847" strokeWidth=".35" strokeDasharray="1 1" initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: .65 }} />
            </svg>
            {data.points.map((item, index) => <motion.button key={item.title} type="button" aria-label={`${index + 1}. ${item.title}`} aria-pressed={selected === index} aria-controls={`${id}-detail`} onClick={() => setSelected(index)} style={{ left: `${item.x}%`, top: `${item.y}%` }} className={`absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#dfebe2] text-xs font-bold shadow-md ${selected === index ? 'bg-[#174e32] text-white' : 'bg-white text-[#174e32]'}`} animate={{ scale: reduced || selected !== index ? 1 : [1, 1.15, 1] }} transition={{ duration: .5 }}>{index + 1}</motion.button>)}
          </div>
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-transparent via-[#56ae75]/20 to-transparent" initial={false} animate={visible && !reduced ? { top: ['0%', '85%'], opacity: [0, 1, 0] } : { top: '0%', opacity: 0 }} transition={{ duration: 2, ease: 'easeInOut' }} />
          <span className="absolute bottom-4 left-5 rounded-full bg-white/85 px-3 py-2 text-[9px] text-[#466b53]">Illustrative Prüfpunkte · je nach Modell</span>
        </div>
        <div className="p-6 md:p-10">
          <div className="space-y-2">{data.points.map((item, index) => <button key={item.title} type="button" aria-expanded={selected === index} aria-controls={`${id}-detail`} onClick={() => setSelected(index)} className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors ${selected === index ? 'border-[#9de5b4]/50 bg-[#164333]' : 'border-white/10 hover:bg-white/5'}`}><span className={`text-xs ${selected === index ? 'text-[#9de5b4]' : 'text-[#6f9583]'}`}>0{index + 1}</span><span className="flex-1 text-sm font-semibold">{item.title}</span><ChevronRight size={16} className={selected === index ? 'text-[#9de5b4]' : 'text-[#6f9583]'} /></button>)}</div>
          <div id={`${id}-detail`} aria-live="polite" aria-atomic="true" className="mt-6 min-h-[175px] rounded-2xl border border-white/10 bg-white/[.035] p-5">
            <AnimatePresence mode="wait" initial={false}><motion.div key={selected} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: .22 }}><p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#9de5b4]"><Check size={13} />Prüfpunkt 0{selected + 1}</p><h3 className="text-lg font-semibold">{point.title}</h3><p className="mt-3 text-xs leading-6 text-[#afc8bb]">{point.text}</p></motion.div></AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section></SectionReveal>
}

const decisions = [
  { icon: Layers3, title: 'Der Zustand.', caption: 'Mehr als eine Jahreszahl', text: 'Wie wurde das Gerät genutzt? Wie ist sein Gesamtzustand? Wir betrachten das ganze Gerät und den konkreten Defekt.' },
  { icon: PackageCheck, title: 'Die Ersatzteile.', caption: 'Was ist möglich?', text: 'Sind passende Teile erhältlich? Lässt sich das betroffene Bauteil instand setzen? Die Diagnose zeigt, welche Möglichkeiten bestehen.' },
  { icon: CircleDollarSign, title: 'Der Aufwand.', caption: 'Eine klare Grundlage', text: 'Arbeitsaufwand und mögliche Ersatzteile gehören zusammen. Wir besprechen die Optionen, bevor Sie sich für weitere Arbeiten entscheiden.' },
]

const folderDetails = [
  [
    { name: 'Gesamtzustand', text: 'Wir betrachten Verschleiß, Pflege und den allgemeinen Zustand Ihres Geräts.' },
    { name: 'Nutzung', text: 'Wie häufig wird das Gerät genutzt? Ihre Beobachtungen helfen, den Defekt einzuordnen.' },
    { name: 'Fehlerbild', text: 'Ein einzelner Defekt sagt nicht alles über das Gerät aus. Wir suchen nach der konkreten Ursache.' },
  ],
  [
    { name: 'Verfügbarkeit', text: 'Wir klären, ob passende Ersatzteile für Ihr Modell erhältlich sind.' },
    { name: 'Instandsetzung', text: 'Je nach Bauteil und Fehler kann auch eine Instandsetzung infrage kommen.' },
    { name: 'Möglichkeiten', text: 'Nach der Diagnose besprechen wir mit Ihnen, welche Reparaturmöglichkeiten bestehen.' },
  ],
  [
    { name: 'Arbeitszeit', text: 'Diagnose und Reparaturaufwand hängen vom Fehlerbild und der Zugänglichkeit der Bauteile ab.' },
    { name: 'Ersatzteile', text: 'Benötigte Teile fließen in die Einschätzung des gesamten Reparaturaufwands ein.' },
    { name: 'Abstimmung', text: 'Sie entscheiden auf einer klaren Grundlage. Weitere Arbeiten stimmen wir vorher mit Ihnen ab.' },
  ],
]

function DecisionFolder({ index }: { index: number }) {
  const [selected, setSelected] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const item = decisions[index]
  const details = folderDetails[index]
  const palettes = [['#102c22', '#3e7754', '#b1ddb9'], ['#70725a', '#c7c4a4', '#f6ead1'], ['#205b48', '#87bfa3', '#e1f1df']]
  return <div className="flex min-w-0 flex-col items-center">
    <GlassFolder label={item.title.replace('.', '')} meta="3 Perspektiven" action="none" width={280} appearDelay={index * 160}
      art={{ style: 'streak', colors: palettes[index], gloss: .25, warp: 1.6, scale: .7 }} seed={index + 7}
      files={details.map(file => ({ name: file.name, meta: 'FixPro' }))}
      onOpenChange={open => { if (!open) setSelected(null) }} onFileSelect={(_, file) => setSelected(file)}
      className="repair-folder" />
    <div className="relative z-10 mt-3 w-full rounded-[22px] border border-white/80 bg-white/55 p-5 text-left md:p-6" aria-live="polite" aria-atomic="true">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-[#818c77]">0{index + 1} / {item.caption}</p>
      <AnimatePresence mode="wait" initial={false}><motion.div key={selected ?? 'intro'} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }} className="min-h-[130px]">
        <h3 className="mt-3 text-lg font-semibold text-[#263f2c]">{selected === null ? item.title : details[selected].name}</h3>
        <p className="mt-3 text-sm leading-7 text-[#7b796c]">{selected === null ? item.text : details[selected].text}</p>
      </motion.div></AnimatePresence>
    </div>
  </div>
}

export function RepairDecision({ device }: { device: string }) {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: root, offset: ['start .85', 'end .45'] })
  return <section ref={root} id="reparieren-oder-ersetzen" className="px-4 py-12 md:px-8 md:py-16">
    <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[36px] border border-[#e7dfd2] bg-[#f1eadf]">
      <SectionReveal><div className="p-7 text-center md:px-12 md:pb-10 md:pt-14"><p className="eyebrow">Reparieren oder ersetzen?</p><h2 className="section-title">Eine zweite Chance.<br /><span className="text-[#258454]">Wenn sie sinnvoll ist.</span></h2><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#7b796c]">Bei Ihrem Gerät zählt das Zusammenspiel dieser drei Fragen. Die Diagnose schafft die Grundlage für Ihre Entscheidung.</p><ArrowDown size={20} className="mx-auto mt-6 text-[#258454]" /></div></SectionReveal>
      <div className="relative px-6 pb-8 md:px-12 md:pb-12">
        <div aria-hidden="true" className="absolute left-12 right-12 top-0 hidden h-px bg-[#d8ccba] md:block"><motion.div className="h-full origin-left bg-[#258454]" style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>
        <p className="mb-3 text-center text-[10px] tracking-wide text-[#7b796c]">Ordner öffnen und eine Karte auswählen.</p>
        <div className="grid gap-x-7 gap-y-8 md:grid-cols-3">{decisions.map((item, index) => <DecisionFolder key={item.title} index={index} />)}</div>
      </div>
      <SectionReveal><div className="flex flex-wrap items-center justify-between gap-6 bg-[#173c2d] p-7 text-white md:px-12 md:py-9"><div className="flex items-start gap-4"><Wrench size={24} className="mt-1 shrink-0 text-[#9de5b4]" /><div><p className="text-lg font-semibold">Erst verstehen. Dann entscheiden.</p><p className="mt-2 text-xs leading-6 text-[#b0c8b8]">{device}: Lassen Sie uns gemeinsam auf das Fehlerbild schauen.</p></div></div><a href="#anfrage" className="gentle-button inline-flex items-center gap-4 rounded-full bg-[#a3e5b5] px-6 py-4 text-xs font-semibold text-[#173c2d]">Gerät prüfen lassen<ArrowUpRight size={17} /></a></div></SectionReveal>
    </div>
  </section>
}
