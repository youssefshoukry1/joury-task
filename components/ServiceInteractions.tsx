'use client'

import SectionReveal from '@/components/SectionReveal'
import { ServiceInspection } from '@/components/ServiceExtras'
import DisplayCards from '@/components/ui/display-cards'
import { WebShotButton } from '@/components/ui/web-shot-button'
import { ArrowRight } from 'lucide-react'

export function ServiceAction() {
  return <WebShotButton className="service-action gentle-button" color="#fafaf8" reach={90} threads={4} onClick={() => document.getElementById('anfrage')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Reparatur anfragen<ArrowRight size={17} /></WebShotButton>
}

export default function ServiceInteractions({ device }: { device: string }) {
  return (
    <>
      <ServiceInspection device={device} />
      <SectionReveal><section id="service-einblicke" className="section-space bg-white"><div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div><p className="eyebrow">Vom ersten Kontakt an</p><h2 className="section-title">Ihr Anliegen.<br /><span className="text-[#258454]">Schritt für Schritt.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-stone-500">Drei klare Schritte auf dem Weg zur Reparatur. Unter „Details anzeigen“ erfahren Sie mehr zum jeweiligen Schritt.</p><div className="mt-8"><ServiceAction /></div></div><DisplayCards /></div></section></SectionReveal>
    </>
  )
}
