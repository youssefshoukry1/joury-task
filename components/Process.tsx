import { ArrowUpRight, MessagesSquare, Search, Wrench, Check } from 'lucide-react'

const steps = [
  { icon: MessagesSquare, number: '01', title: 'Erzählen Sie uns davon.', description: 'Welches Gerät? Welcher Fehler? Ein paar Angaben genügen für den ersten Kontakt.', detail: 'Marke, Modell und Fehlerbild' },
  { icon: Search, number: '02', title: 'Wir finden den nächsten Schritt.', description: 'Wir prüfen die Möglichkeiten und besprechen das weitere Vorgehen mit Ihnen.', detail: 'Diagnose und klare Abstimmung' },
  { icon: Wrench, number: '03', title: 'Zurück zu Ihrem Alltag.', description: 'Nach Ihrer Zustimmung folgen die vereinbarten Arbeiten und die Funktionsprüfung.', detail: 'Reparatur und abschließender Test' },
]

export default function Process() {
  return (
    <section id="process" className="bg-[#faf9f6] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px] rounded-[32px] border border-[#dce8df] bg-[#eaf3ec] p-6 md:rounded-[40px] md:p-12 lg:p-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">So einfach geht’s</p><h2 className="section-title">Drei Schritte.<br /><span className="text-[#258454]">Ein gutes Gefühl.</span></h2></div>
          <a href="#anfrage" className="inline-flex items-center gap-3 rounded-full border border-[#bdd7c5] px-5 py-3 text-xs font-semibold text-[#21673e] transition-colors hover:bg-white">Mit dem ersten Schritt starten<ArrowUpRight size={16} /></a>
        </div>
        <ol className="mt-11 grid gap-7 md:grid-cols-3 md:gap-6">
          {steps.map(({ icon: Icon, number, title, description, detail }, index) => (
            <li key={number} className="relative">
              <div className="mb-6 flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1b6842] text-sm font-semibold text-white">{number}</span><span aria-hidden="true" className={`h-px flex-1 ${index === steps.length - 1 ? 'bg-[#c8ddce]' : 'bg-gradient-to-r from-[#81b491] to-[#c8ddce]'}`} /><Icon size={22} strokeWidth={1.5} className="shrink-0 text-[#427955]" /></div>
              <div className="h-[calc(100%-72px)] rounded-[22px] border border-white bg-white/75 p-6"><h3 className="text-xl font-semibold leading-snug tracking-tight text-[#17372a]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#718176]">{description}</p><p className="mt-6 flex items-start gap-2 text-[11px] leading-5 text-[#258454]"><Check size={14} className="mt-0.5 shrink-0" />{detail}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
