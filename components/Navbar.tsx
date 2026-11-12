'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { name: 'الرئيسية', href: '#' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'من نحن', href: '#about' },
  { name: 'آراء العملاء', href: '#stats' },
  { name: 'تواصل', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', value => setScrolled(value > 80))

  useEffect(() => {
    setScrolled(window.scrollY > 80)
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header dir="rtl" className={`${scrolled ? 'fixed' : 'absolute'} inset-x-0 top-0 z-50 px-4 py-3 md:px-8`}>
      <nav aria-label="التنقل الرئيسي" className={`mx-auto max-w-[1360px] rounded-[36px] transition-[background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none ${scrolled ? 'bg-slate-950/45 shadow-lg shadow-black/10 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="flex min-h-[72px] items-center justify-between gap-4 px-3 md:px-6">
          <a href="#" aria-label="FixPro — الرئيسية" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-300">
            <span className="relative block h-16 w-16 overflow-hidden">
              <Image src="/images/logo.png" alt="شعار فريق الصيانة" width={512} height={512} priority className="absolute -left-3 -top-3 h-[88px] w-[88px] max-w-none object-contain" />
            </span>
            <span className="text-xl font-extrabold tracking-wide text-white">FixPro</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-10">
            {links.map(link => <li key={link.href}><a href={link.href} className="rounded-sm py-3 text-base font-medium text-slate-200 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300">{link.name}</a></li>)}
          </ul>

          <div className="flex items-center gap-3">
            <a href="tel:+963999999999" className="inline-flex min-h-10 items-center justify-center rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 motion-reduce:transition-none">
              اتصل بنا
            </a>
            <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} className="rounded-lg p-2 text-white focus-visible:outline-2 focus-visible:outline-cyan-300 lg:hidden">
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {open && <ul id="mobile-navigation" className="mx-2 mt-2 space-y-1 rounded-xl bg-slate-950/90 p-3 backdrop-blur-xl lg:hidden">
          {links.map(link => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300">{link.name}</a></li>)}
        </ul>}
      </nav>
    </header>
  )
}
