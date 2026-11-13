import Image from 'next/image'
import { ArrowRight, Check, ShieldCheck, Phone } from 'lucide-react'

export default function RepairJourney() {
  return (
    <section aria-label="FixPro Reparaturservice" className="relative isolate overflow-hidden bg-[#071823] text-white">
      <Image src="/images/repair-team-hero.png" alt="Zwei FixPro Servicetechniker bei der Reparatur einer Kaffeemaschine und einer Waschmaschine" fill priority sizes="100vw" className="-z-20 object-cover object-[65%_center] md:object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,20,30,0.98)_0%,rgba(5,20,30,0.94)_28%,rgba(5,20,30,0.65)_50%,rgba(5,20,30,0.12)_80%)] max-md:bg-[linear-gradient(90deg,rgba(5,20,30,0.96),rgba(5,20,30,0.75))]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#071823] to-transparent" />
      <div className="mx-auto max-w-[1320px] px-6 pb-16 pt-36 md:min-h-[740px] md:px-10 md:pb-20 md:pt-44 lg:px-12">
        <div className="max-w-[640px]">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#84dfa1]/25 bg-[#0a252d]/70 px-4 py-2 text-[11px] font-medium text-stone-200"><ShieldCheck size={14} className="text-[#83df9b]" />Sorgfältige Reparaturen. Persönlicher Service.<span aria-hidden="true" className="ml-1 h-1.5 w-1.5 rounded-full bg-[#26bd70]" /></p>
          <h1 className="text-[clamp(2.5rem,4.9vw,4.5rem)] font-bold leading-[1.05] tracking-[-.055em]">Ihr Gerät.<br /><span className="text-[#89e49d]">In guten Händen.</span><br />Zurück im Alltag.</h1>
          <p className="mt-7 max-w-[510px] text-sm leading-7 text-white/75 md:text-base">Wenn die Waschmaschine streikt oder der Kaffee ausbleibt, zählt jemand, der genau hinsieht. Wir prüfen Ihr Gerät, erklären die Möglichkeiten und kümmern uns um die Reparatur.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3"><a href="#contact" className="primary-button">Reparatur anfragen<ArrowRight size={17} /></a><a href="#services" className="inline-flex items-center gap-4 rounded-lg border border-white/35 bg-white/5 px-5 py-4 text-sm font-semibold text-white hover:bg-white/10">Unsere Leistungen<ArrowRight size={16} /></a></div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/65">{['Waschmaschinen', 'Kaffeemaschinen', 'Lautsprecher'].map(service => <span key={service} className="flex items-center gap-2"><Check size={13} className="text-[#89e49d]" />{service}</span>)}</div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#071823]/75"><div className="mx-auto flex max-w-[1224px] flex-wrap items-center justify-between gap-5 px-6 py-6 md:px-10"><p className="text-sm font-medium text-white/85">Reparieren statt ersetzen. <span className="text-[#89e49d]">Weil jedes Detail zählt.</span></p><a href="tel:+963999999999" className="inline-flex items-center gap-2 text-xs text-white/65 hover:text-white"><Phone size={14} />Sprechen wir über Ihr Gerät<ArrowRight size={14} /></a></div></div>
    </section>
  )
}
