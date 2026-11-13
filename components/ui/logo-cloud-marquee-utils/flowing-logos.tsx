'use client'

import { useState } from 'react'
import { Pause, Play, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'

export type MarqueeItem = { name: string; image?: string; icon?: LucideIcon }

export function FlowingLogos({ data, className }: { data: MarqueeItem[]; className?: string }) {
  const [paused, setPaused] = useState(false)

  return (
    <div className={clsx('relative', className)}>
      <div className="fixpro-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="fixpro-marquee-track flex w-max" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {[0, 1].map(copy => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center gap-4 pr-4">
              {data.map(item => {
                const Icon = item.icon
                return (
                  <li key={item.name} className="flex min-h-16 shrink-0 items-center gap-3 rounded-full border border-[#dce8df] bg-white/80 px-6 py-4 text-sm font-semibold text-[#31563d]">
                    {item.image ? <img src={item.image} alt="" width={28} height={28} className="h-7 w-7 object-contain" /> : Icon ? <Icon size={21} strokeWidth={1.5} className="text-[#37885a]" aria-hidden="true" /> : null}
                    {item.name}
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Laufband fortsetzen' : 'Laufband pausieren'} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] text-[#708476] transition-colors hover:bg-white hover:text-[#21673e] motion-reduce:hidden">
          {paused ? <Play size={11} /> : <Pause size={11} />}{paused ? 'Fortsetzen' : 'Bewegung pausieren'}
        </button>
      </div>
    </div>
  )
}
