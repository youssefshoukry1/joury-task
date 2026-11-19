'use client'

import SectionReveal from '@/components/SectionReveal'
import { ServiceInspection } from '@/components/ServiceExtras'
import DisplayCards from '@/components/ui/display-cards'
import ExplodedWasher from '@/components/ui/exploded-washer'
import { WebShotButton } from '@/components/ui/web-shot-button'
import { ArrowRight } from 'lucide-react'

export function ServiceAction() {
  return <WebShotButton className="service-action gentle-button" color="#fafaf8" reach={90} threads={4} onClick={() => document.getElementById('anfrage')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Reparatur anfragen<ArrowRight size={17} /></WebShotButton>
}

export default function ServiceInteractions({ device }: { device: string }) {
  return (
    <>
      <SectionReveal><section id="bauteile" className="section-space bg-[#faf9f6]"><div className="site-container grid items-center gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16"><div><p className="eyebrow">Mehr als ein Blick von außen</p><h2 className="section-title">Viele Teile.<br /><span className="text-[#258454]">Ein Zusammenspiel.</span></h2><p className="mt-6 text-sm leading-7 text-stone-500">Mechanik, Elektronik und Bedienung arbeiten zusammen. Die Animation macht sichtbar, warum wir bei der Fehlersuche genau hinschauen.</p><p className="mt-4 text-xs leading-6 text-[#78947f]">Entdecken Sie die Bauteile in Bewegung. Die Animation lässt sich jederzeit pausieren.</p></div><ExplodedWasher device={device} /></div></section></SectionReveal>
      <ServiceInspection device={device} />
      <SectionReveal><section id="service-einblicke" className="section-space bg-white"><div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div><p className="eyebrow">Vom ersten Kontakt an</p><h2 className="section-title">Ihr Anliegen.<br /><span className="text-[#258454]">Schritt für Schritt.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-stone-500">Drei klare Schritte auf dem Weg zur Reparatur. Unter „Details anzeigen“ erfahren Sie mehr zum jeweiligen Schritt.</p><div className="mt-8"><ServiceAction /></div></div><DisplayCards /></div></section></SectionReveal>
    </>
  )
}
