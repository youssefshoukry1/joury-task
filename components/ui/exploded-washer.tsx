'use client'

import { Layers3 } from 'lucide-react'
import Image from 'next/image'

const animations: Record<string, { gif: string; final: string; poster: string; ratio: string }> = {
  Waschmaschine: { gif: 'washing_machine_animation_large.gif', final: 'washer-final-hd.png', poster: 'washer-exploded-removebg-preview.png', ratio: '347 / 267' },
  Kaffeemaschine: { gif: 'espresso_machine_large.gif', final: 'coffee-final-hd.png', poster: 'Espresso_Machine-removebg-preview.png', ratio: '358 / 349' },
  Lautsprecher: { gif: 'portable_speaker_animation_large.gif', final: 'speaker-final-hd.png', poster: 'Bluetooth_Speaker-removebg-preview.png', ratio: '358 / 267' },
}

export default function ExplodedWasher({ device = 'Waschmaschine' }: { device?: string }) {
  const animation = animations[device] ?? animations.Waschmaschine
  return (
    <div className="overflow-hidden rounded-[30px] border border-[#d9e6dc] bg-[#ecf3ee]">
      <div className="flex items-center justify-between gap-4 px-6 pt-6"><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#5c7c66]"><Layers3 size={15} />Ein Blick ins Innere</span><span className="rounded-full bg-white/70 px-3 py-1.5 text-[9px] text-[#6e8c77]">{device}</span></div>
      <div className="relative w-full" style={{ aspectRatio: animation.ratio }}><Image src={`/images/${animation.final}`} alt={`${device}: Bauteile in auseinandergebauter Ansicht`} fill sizes="(max-width: 768px) 90vw, 55vw" className="object-contain" /></div>
      <p className="px-6 pb-5 text-xs text-[#5c7c66]">Alle Bauteile im Blick</p>
    </div>
  )
}
