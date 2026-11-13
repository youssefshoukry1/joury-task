'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
const links=[{name:'Startseite',href:'#'},{name:'Leistungen',href:'#services'},{name:'Über uns',href:'#about'},{name:'Ablauf',href:'#process'},{name:'FAQ',href:'#faq'},{name:'Kontakt',href:'#contact'}]
export default function Navbar(){
 const [open,setOpen]=useState(false)
 const [scrolled,setScrolled]=useState(false)
 const {scrollY}=useScroll()
 useMotionValueEvent(scrollY,'change',value=>setScrolled(value>80))
 useEffect(()=>{setScrolled(window.scrollY>80);const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[])
 return <header className={(scrolled?'fixed':'absolute')+' inset-x-0 top-0 z-50 px-4 py-4 md:px-8 md:py-4'}><nav aria-label="Hauptnavigation" className={'mx-auto max-w-[1320px] rounded-2xl px-4 transition-colors duration-300 md:px-6 '+(scrolled?'bg-white/90 text-stone-900 shadow-sm backdrop-blur-xl':'bg-transparent text-white')}>
 <div className="flex min-h-16 items-center justify-between gap-4"><a href="#" aria-label="FixPro Startseite" onClick={()=>setOpen(false)} className="flex items-center gap-1 text-xl font-bold tracking-tight"><Image src="/images/logo.png" alt="FixPro Logo" width={56} height={56} priority/>FixPro<span className="text-[#89e49d]">.</span></a><ul className="hidden items-center gap-8 lg:flex">{links.map(link=><li key={link.href}><a href={link.href} className="text-xs font-semibold uppercase tracking-wider opacity-80 transition-opacity hover:opacity-100">{link.name}</a></li>)}</ul><div className="flex items-center gap-3"><a href="tel:+963999999999" className="inline-flex items-center gap-2 rounded-lg bg-[#19a55d] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#13834a]"><span className="sm:hidden">Kontakt</span><span className="hidden sm:inline">Kontakt aufnehmen</span><ArrowUpRight size={15}/></a><button type="button" aria-label={open?'Menü schließen':'Menü öffnen'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(value=>!value)} className="p-2 lg:hidden">{open?<X size={22}/>:<Menu size={22}/>}</button></div></div>
 {open&&<ul id="mobile-navigation" className="absolute inset-x-5 top-full space-y-1 rounded-2xl bg-white p-4 text-stone-800 shadow-lg md:inset-x-12 lg:hidden">{links.map(link=><li key={link.href}><a href={link.href} onClick={()=>setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-stone-100">{link.name}</a></li>)}</ul>}
 </nav></header>
}
