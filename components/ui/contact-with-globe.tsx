'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { Mail, Phone, ArrowRight, Pause, Play } from 'lucide-react'
import { useRepairRequest, type RepairDevice } from '@/components/RepairRequestProvider'

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    let stopped = false
    let visible = false
    let frame = 0
    let previous = 0
    let angle = -12
    let countries: Parameters<ReturnType<typeof geoPath>>[0] | undefined
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)
    const draw = (time: number) => {
      if (stopped) return
      if (visible || !previous) {
        if (!paused && !reduced && previous) angle += Math.min(time - previous, 40) * .006
        const projection = geoOrthographic().scale(265).translate([300, 295]).rotate([angle, -18])
        const path = geoPath(projection, context)
        context.clearRect(0, 0, 600, 600)
        context.strokeStyle = '#bbd7c5'
        context.lineWidth = .6
        context.beginPath(); path(geoGraticule10()); context.stroke()
        if (countries) {
          context.beginPath(); path(countries)
          context.fillStyle = '#d5e8db'; context.fill()
          context.strokeStyle = '#258454'; context.lineWidth = .7; context.stroke()
        }
        context.beginPath(); path({ type: 'Sphere' }); context.strokeStyle = '#69a980'; context.stroke()
      }
      previous = time
      frame = requestAnimationFrame(draw)
    }
    fetch('/maps/countries.json').then(response => response.json()).then(data => { if (!stopped) countries = data }).catch(() => {})
    frame = requestAnimationFrame(draw)
    return () => { stopped = true; observer.disconnect(); cancelAnimationFrame(frame) }
  }, [paused, reduced])
  return <div><div className="relative h-52 overflow-hidden text-zinc-500"><canvas ref={canvasRef} width={600} height={600} role="img" aria-label="Rotierender Globus" className="absolute left-0 top-0 aspect-square w-full" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-50 to-transparent" /></div><button type="button" onClick={() => setPaused(value => !value)} className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-zinc-500 hover:text-rose-500 motion-reduce:hidden">{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? 'Globus fortsetzen' : 'Globus pausieren'}</button></div>
}

const fieldClass = 'w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10'
const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500'

export default function ContactWithGlobe() {
  const { device, setDevice } = useRepairRequest()
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `Guten Tag FixPro,\n\nName: ${data.get('name')}\nE-Mail: ${data.get('email')}\nGerät: ${device}\nOrt / PLZ: ${data.get('area')}\n\n${data.get('message')}\n\nVielen Dank!`
    window.location.href = `mailto:contact@fixpro.com?subject=${encodeURIComponent(`Reparaturanfrage: ${device}`)}&body=${encodeURIComponent(body)}`
  }
  return <section id="anfrage" className="relative overflow-hidden bg-zinc-50 py-20 text-zinc-900"><span id="contact" className="absolute top-0 scroll-mt-28" aria-hidden="true" /><div className="site-container"><div className="mb-12 flex flex-col items-center gap-4 text-center"><span className="rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-sm font-medium text-rose-500">Kontakt</span><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Sprechen wir über Ihr Gerät.</h2><p className="max-w-md text-base leading-7 text-zinc-500">Erzählen Sie uns, was nicht mehr funktioniert. Gemeinsam finden wir den nächsten Schritt.</p></div><div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2"><div className="flex min-w-0 flex-col gap-6"><div><h3 className="text-xl font-semibold">Direkt in Kontakt</h3><p className="mt-1 max-w-xs text-sm leading-relaxed text-zinc-500">Fragen zum Gerät oder zur Reparatur? Wir hören Ihnen zu.</p></div><div className="flex flex-col gap-3">{[{ Icon: Mail, label: 'contact@fixpro.com', href: 'mailto:contact@fixpro.com' }, { Icon: Phone, label: '+963 999 999 999', href: 'tel:+963999999999' }].map(({ Icon, label, href }) => <a key={href} href={href} className="group flex w-fit items-center gap-3 text-sm text-zinc-500 transition-colors hover:text-zinc-900"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 transition-colors group-hover:border-rose-300 group-hover:bg-rose-50"><Icon size={14} className="text-zinc-400 group-hover:text-rose-500" /></span>{label}</a>)}</div><Globe /></div><form onSubmit={submit} className="flex min-w-0 flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"><div><h3 className="mb-1 text-lg font-semibold">Ihre Nachricht</h3><p className="text-sm text-zinc-500">Ein paar Angaben helfen uns, Ihr Anliegen zu verstehen.</p></div><div aria-hidden="true" className="h-4 w-full text-neutral-400" style={{ backgroundImage: 'radial-gradient(circle, currentColor .8px, transparent .8px)', backgroundSize: '6px 100%', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} /><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="contact-name" className={labelClass}>Ihr Name</label><input id="contact-name" name="name" required autoComplete="name" placeholder="Vor- und Nachname" className={fieldClass} /></div><div><label htmlFor="repair-area" className={labelClass}>Ort / PLZ</label><input id="repair-area" name="area" required autoComplete="postal-code" placeholder="Ihr Ort oder Ihre PLZ" className={fieldClass} /></div></div><div><label htmlFor="contact-email" className={labelClass}>E-Mail-Adresse</label><input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="name@beispiel.de" className={fieldClass} /></div><div><label htmlFor="repair-device" className={labelClass}>Ihr Gerät</label><select id="repair-device" value={device} onChange={event => setDevice(event.target.value as RepairDevice)} className={fieldClass}>{['Waschmaschine', 'Kaffeemaschine', 'Lautsprecher', 'Anderes Gerät'].map(item => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="contact-message" className={labelClass}>Nachricht</label><textarea id="contact-message" name="message" required rows={4} placeholder="Marke, Modell und was Ihnen aufgefallen ist …" className={`${fieldClass} resize-y`} /></div><button type="submit" className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a3e5b5] hover:text-[#071e26] focus-visible:bg-[#a3e5b5] focus-visible:text-[#071e26]">Anfrage vorbereiten<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button><p className="text-xs leading-5 text-zinc-500">Öffnet einen E-Mail-Entwurf. Sie bestätigen den Versand in Ihrem E-Mail-Programm.</p></form></div></div></section>
}
