'use client'

import { useState } from 'react'
import { ArrowRight, Phone, Pause, Play, Wrench } from 'lucide-react'
import MatrixRain from '@/components/ui/matrix-rain'

export default function ContactBanner() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="px-4 pb-7 pt-8 md:px-8 md:pt-12">
      <div className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-[30px] border border-[#36543e] bg-[#0b2119] md:rounded-[40px]">
        <MatrixRain paused={paused} background="#0b2119" color="#58b87c" highlight="#9be5b4" characters="0123456789" density={0.5} speed={0.35} fontSize={19} glow={2} pointerResponse={false} trail={0.8} className="pointer-events-none !absolute inset-0 -z-20 h-full w-full opacity-40" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,33,25,.96)_0%,rgba(11,33,25,.85)_42%,rgba(11,33,25,.25)_100%)]" />
        <div className="flex flex-wrap items-center justify-between gap-9 p-7 pb-16 md:p-12 md:pb-16 lg:p-14 lg:pb-16">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8be7a2]"><Wrench size={14} />Ihr Gerät. Unser nächster Handgriff.</p>
            <h2 className="text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.12] tracking-[-.045em]">Lassen Sie uns<br /><span className="text-[#8be7a2]">das Problem angehen.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#b2c9ba]">Ein kurzer Kontakt ist der Anfang. Beschreiben Sie uns, was Ihr Gerät braucht – wir besprechen den Rest mit Ihnen.</p>
          </div>
          <div className="flex flex-col items-start gap-5">
            <a href="#anfrage" className="primary-button">Reparatur anfragen<ArrowRight size={17} /></a>
            <a href="tel:+963999999999" className="flex items-center gap-2 text-sm text-[#c0d6c8]"><Phone size={15} />+963 999 999 999</a>
          </div>
        </div>
        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Hintergrundanimation fortsetzen' : 'Hintergrundanimation pausieren'} aria-pressed={paused} className="absolute bottom-5 right-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b2119]/80 px-3 py-2 text-[10px] text-[#a7c2af] hover:bg-[#21402c] motion-reduce:hidden md:right-10">{paused ? <Play size={11} /> : <Pause size={11} />}{paused ? 'Fortsetzen' : 'Animation pausieren'}</button>
      </div>
    </div>
  )
}
