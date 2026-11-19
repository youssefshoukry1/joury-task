'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown, WashingMachine, Coffee, Speaker, ArrowRight } from 'lucide-react'
import { repairServices } from '@/lib/services'

const links = [{ name: 'Startseite', href: '/' }, { name: 'Leistungen', href: '/#services' }, { name: 'Über uns', href: '/#about' }, { name: 'Ablauf', href: '/#process' }, { name: 'FAQ', href: '/#faq' }, { name: 'Kontakt', href: '/#contact' }]
const icons = [WashingMachine, Coffee, Speaker]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const nav = useRef<HTMLElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()
  const { scrollY } = useScroll()
  const close = () => { setOpen(false); setServicesOpen(false) }
  useMotionValueEvent(scrollY, 'change', value => setScrolled(value > 80))
  useEffect(() => {
    setScrolled(window.scrollY > 80)
    const outside = (event: PointerEvent) => { if (!nav.current?.contains(event.target as Node)) { setOpen(false); setServicesOpen(false) } }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false); setServicesOpen(false)
      if (open) nav.current?.querySelector<HTMLButtonElement>('button[aria-controls$="-mobile"]')?.focus()
      else if (servicesOpen) trigger.current?.focus()
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open, servicesOpen])

  const serviceItems = repairServices.map((service, index) => {
    const Icon = icons[index]
    return <li key={service.slug}><Link href={`/leistungen/${service.slug}`} onClick={close} className="group flex items-start gap-3 rounded-2xl border border-transparent p-4 text-white transition-colors hover:border-white/10 hover:bg-[#23533c] focus-visible:bg-[#23533c]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a3e5b5]"><Icon size={21} strokeWidth={1.5} /></span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{service.title}</span><span className="mt-1 block text-[11px] leading-5 text-[#afc8b8]">{service.tags.join(' \u00b7 ')}</span></span><ArrowUpRight size={14} className="mt-1 shrink-0 text-[#91b49d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
    </Link></li>
  })

  return <header className={`${scrolled ? 'fixed' : 'absolute'} inset-x-0 top-0 z-50 px-4 py-4 md:px-8`}>
    <nav ref={nav} aria-label="Hauptnavigation" className={`mx-auto max-w-[1320px] rounded-2xl px-4 transition-colors duration-300 md:px-6 ${scrolled ? 'bg-white/90 text-stone-900 shadow-sm backdrop-blur-xl' : 'bg-transparent text-white'}`}>
      <div className="flex min-h-16 items-center justify-between gap-2 sm:gap-4">
        <Link href="/" aria-label="FixPro Startseite" onClick={close} className="flex items-center gap-1 text-xl font-bold tracking-tight"><Image src="/images/logo.png" alt="FixPro Logo" width={56} height={56} className="h-10 w-10 sm:h-14 sm:w-14" priority />FixPro<span className="text-[#89e49d]">.</span></Link>
        <ul className="hidden items-center gap-8 lg:flex">{links.map(link => <li key={link.href} className={link.name === 'Leistungen' ? 'relative' : undefined}
          onPointerEnter={event => { if (link.name === 'Leistungen' && event.pointerType === 'mouse') setServicesOpen(true) }}
          onPointerLeave={() => { if (link.name === 'Leistungen') setServicesOpen(false) }}
          onBlur={event => { if (link.name === 'Leistungen' && !event.currentTarget.contains(event.relatedTarget as Node)) setServicesOpen(false) }}>
          {link.name === 'Leistungen' ? <>
            <button ref={trigger} type="button" aria-expanded={servicesOpen} aria-controls={`${id}-services`} onClick={() => setServicesOpen(value => !value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setServicesOpen(true); requestAnimationFrame(() => document.getElementById(`${id}-services`)?.querySelector<HTMLAnchorElement>('a')?.focus()) } }} className="flex cursor-pointer items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider opacity-90 hover:opacity-100">{link.name}<ChevronDown size={13} className={`transition-transform motion-reduce:transition-none ${servicesOpen ? 'rotate-180' : ''}`} /></button>
            {servicesOpen && <div id={`${id}-services`} className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2">
              <div className="overflow-hidden rounded-[24px] border border-white/15 bg-[#102c25]/[.98] p-5 text-white shadow-[0_24px_65px_-20px_rgba(4,30,18,.5)] backdrop-blur-xl">
                <p className="mb-3 px-4 text-[9px] font-semibold uppercase tracking-[.18em] text-[#88b397]">Reparatur & Fehlersuche</p>
                <ul className="grid grid-cols-2 gap-2">{serviceItems}<li><Link href="/#services" onClick={close} className="group flex h-full items-center gap-3 rounded-2xl bg-white/[.04] p-4 text-sm font-semibold text-[#a3e5b5] transition-colors hover:bg-[#23533c]">Alle Leistungen ansehen<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></Link></li></ul>
              </div>
            </div>}
          </> : <Link href={link.href} onFocus={() => setServicesOpen(false)} className="text-xs font-semibold uppercase tracking-wider opacity-80 transition-opacity hover:opacity-100">{link.name}</Link>}
        </li>)}</ul>
        <div className="flex items-center gap-2 sm:gap-3"><a href="tel:+963999999999" className="gentle-button inline-flex items-center gap-2 rounded-lg bg-[#19a55d] px-3 py-3 sm:px-5 text-xs font-semibold text-white transition-colors hover:bg-[#13834a]"><span className="sm:hidden">Kontakt</span><span className="hidden sm:inline">Kontakt aufnehmen</span><ArrowUpRight size={15} /></a><button type="button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls={`${id}-mobile`} onClick={() => { setOpen(!open); setServicesOpen(false) }} className="cursor-pointer p-2 lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {open && <ul id={`${id}-mobile`} className="absolute inset-x-5 top-full max-h-[calc(100dvh-120px)] space-y-1 overflow-y-auto rounded-2xl bg-white p-4 text-stone-800 shadow-lg md:inset-x-12 lg:hidden">{links.map(link => <li key={link.href}>{link.name === 'Leistungen' ? <>
        <button type="button" aria-expanded={servicesOpen} aria-controls={`${id}-mobile-services`} onClick={() => setServicesOpen(!servicesOpen)} className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm hover:bg-[#e8f2eb]">Leistungen<ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} /></button>
        {servicesOpen && <ul id={`${id}-mobile-services`} className="my-2 space-y-1 rounded-2xl bg-[#102c25] p-2">{serviceItems}<li><Link href="/#services" onClick={close} className="block rounded-xl px-4 py-3 text-xs font-semibold text-[#a3e5b5] hover:bg-[#23533c]">Alle Leistungen ansehen →</Link></li></ul>}
      </> : <Link href={link.href} onClick={close} className="block rounded-xl px-4 py-3 text-sm hover:bg-stone-100">{link.name}</Link>}</li>)}</ul>}
    </nav>
  </header>
}
