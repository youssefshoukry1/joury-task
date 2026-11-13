import { ArrowUpRight, Droplets, Gauge, Volume2, CircleHelp } from 'lucide-react'

const faults = [
  { icon: Droplets, title: 'Wasser bleibt stehen', text: 'Die Waschmaschine pumpt nicht ab oder verliert Wasser. Wir grenzen die Ursache ein.', device: 'Waschmaschinen' },
  { icon: Gauge, title: 'Druck oder Wärme fehlen', text: 'Der Kaffee läuft nur langsam oder bleibt kalt. Durchlauf und Heizung geben erste Hinweise.', device: 'Kaffeemaschinen' },
  { icon: Volume2, title: 'Der Klang setzt aus', text: 'Knacken, Verzerrungen oder kein Ton? Wir prüfen Signalweg und Stromversorgung.', device: 'Lautsprecher' },
  { icon: CircleHelp, title: 'Ein Fehler, den Sie nicht kennen', text: 'Ein Code, ein Geräusch oder ein ungewöhnlicher Geruch: Beschreiben Sie, was Ihnen auffällt.', device: 'Ihr Gerät' },
]

export default function CommonFaults() {
  return (
    <section id="fehlerbilder" className="section-space bg-[#f7f9f6]">
      <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Kommt Ihnen das bekannt vor?</p>
          <h2 className="section-title">Ein Fehler.<br />Viele mögliche<br /><span className="text-[#258454]">Ursachen.</span></h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-stone-500">Nicht jedes Problem bedeutet eine große Reparatur. Entscheidend ist, die richtige Ursache zu finden.</p>
          <a href="#anfrage" className="primary-button mt-7">Mein Problem beschreiben<ArrowUpRight size={17} /></a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {faults.map(({ icon: Icon, title, text, device }) => (
            <article key={title} className="group flex flex-col rounded-[24px] border border-[#e0e8e1] bg-white p-6 transition-[border-color,box-shadow] hover:border-[#a2cfb0] hover:shadow-[0_12px_28px_-20px_rgba(28,85,48,.3)]">
              <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf5ee] text-[#258454]"><Icon size={22} strokeWidth={1.5} /></span><span className="text-[9px] text-[#6f8a76]">{device}</span></div>
              <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-stone-500">{text}</p>
              <a href="#anfrage" className="mt-6 inline-flex items-center gap-2 self-start text-xs font-semibold text-[#258454]">Dazu eine Anfrage stellen<ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
