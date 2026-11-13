'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import {
  ArrowRight, ArrowUpRight, Check, CheckCheck,
  ChevronDown, Headphones, Leaf, MapPin, MessageCircle,
  Settings2, ShieldCheck, Wrench,
} from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'Sorgfalt bis ins Detail', text: 'Wir betrachten das ganze Gerät, nicht nur die Fehlermeldung.' },
  { icon: MessageCircle, title: 'Verständliche Antworten', text: 'Was ist defekt? Was ist sinnvoll? Wir sprechen Ihre Sprache.' },
  { icon: Settings2, title: 'Lösungen statt Umwege', text: 'Diagnose und Vorgehen richten sich nach Ihrem Gerät und seinem Zustand.' },
  { icon: Headphones, title: 'Ein offenes Ohr', text: 'Ihre Beobachtungen helfen uns, den Fehler genauer einzugrenzen.' },
]

export function WhyChoose() {
  return (
    <section id="vorteile" className="section-space mx-4 my-6 overflow-hidden rounded-[32px] bg-[#081e29] text-white md:mx-8 md:rounded-[40px]">
      <div className="site-container">
        <div className="section-heading"><p className="eyebrow">Warum FixPro</p><h2 className="section-title">Gute Arbeit beginnt<br />mit Vertrauen.</h2><p className="section-description">Wir wollen, dass Sie verstehen, was mit Ihrem Gerät passiert – und sich bei jedem Schritt gut aufgehoben fühlen.</p></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="relative overflow-hidden rounded-2xl border border-[#356448]/60 bg-[#123a2c] p-8 lg:row-span-2">
            <Leaf size={38} strokeWidth={1.4} className="text-[#8be7a2]" />
            <span className="mt-9 inline-block rounded-full border border-[#73b689]/30 px-3 py-1 text-[10px] uppercase tracking-widest text-[#a1dfb3]">Bewusster Umgang</span>
            <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight">Mehr Lebenszeit.<br />Weniger Wegwerfen.</h3>
            <p className="mt-5 text-sm leading-7 text-[#c0d6c8]">Nicht jeder Defekt bedeutet das Ende. Wenn eine Reparatur sinnvoll ist, kann Ihr Gerät noch lange Teil Ihres Alltags bleiben.</p>
            <ul className="mt-7 space-y-4 text-sm text-[#d0e1d6]">{['Zustand sorgfältig beurteilen', 'Reparaturmöglichkeiten abwägen', 'Eine bewusste Entscheidung treffen'].map(text => <li key={text} className="flex gap-3"><Check size={16} className="shrink-0 text-[#8be7a2]" />{text}</li>)}</ul>
            <a href="#contact" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[#8be7a2]">Gemeinsam die Lösung finden<ArrowRight size={17} /></a>
          </article>
          {reasons.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-7"><Icon size={25} strokeWidth={1.5} className="text-[#8be7a2]" /><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#a9bbc5]">{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

export function ServicePreparation() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false])
  const tasks = ['Marke und Modell notiert', 'Fehler kurz beschrieben', 'Foto vom Typenschild bereit']
  const complete = checked.filter(Boolean).length
  return (
    <section id="vorbereitung" className="section-space bg-white">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div><p className="eyebrow">Gut vorbereitet</p><h2 className="section-title">Weniger Rückfragen.<br />Mehr Klarheit.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-stone-600">Mit ein paar Angaben können wir Ihre Anfrage besser einschätzen. Nutzen Sie die kleine Checkliste, bevor Sie uns schreiben.</p><ul className="mt-8 space-y-5">{[['Das richtige Gerät','Modellbezeichnung und Hersteller helfen bei der Einordnung.'],['Der genaue Fehler','Was passiert – und seit wann? Auch ein Fehlercode ist hilfreich.'],['Ein erster Eindruck','Ein Foto ergänzt Ihre Beschreibung, wenn Sie es zur Hand haben.']].map(([title, text]) => <li key={title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ee]"><CheckCheck size={19} className="text-[#16804a]" /></span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-6 text-stone-500">{text}</p></div></li>)}</ul><a href="#contact" className="primary-button mt-8">Anfrage vorbereiten<ArrowRight size={17} /></a></div>
        <div className="rounded-[32px] border border-[#dce8df] bg-[#eaf3ec] p-4 md:p-8">
          <div className="rounded-2xl border border-[#dfe8e2] bg-white shadow-[0_20px_60px_-30px_rgba(8,30,41,.25)]">
            <div className="flex items-center justify-between border-b border-stone-100 p-6"><span className="flex items-center gap-2 text-sm font-bold"><Wrench size={20} className="text-[#16804a]" />FixPro · Mein Gerät</span><span className="rounded-full bg-[#edf6ef] px-3 py-1 text-[10px] text-[#16804a]">Checkliste</span></div>
            <div className="p-6"><div className="grid grid-cols-3 gap-3">{[[String(complete),'Erledigt'],[String(3-complete),'Noch offen'],['3','Schritte']].map(([value,label]) => <div key={label} className="rounded-xl bg-[#f6f8f6] px-3 py-4"><p className="text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-[10px] text-stone-500">{label}</p></div>)}</div><div className="mt-6 flex items-center justify-between"><h3 className="text-sm font-semibold">Bereit für Ihre Anfrage?</h3><span className="text-xs text-stone-400">{complete}/3</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-100"><div className="h-full rounded-full bg-[#19a55d] transition-[width] motion-reduce:transition-none" style={{ width: `${complete / 3 * 100}%` }} /></div><div className="mt-5 space-y-3">{tasks.map((task,index) => <label key={task} className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-100 p-4 text-xs text-stone-700"><input type="checkbox" checked={checked[index]} onChange={() => setChecked(current => current.map((value,i) => i === index ? !value : value))} className="h-4 w-4 accent-[#16804a]" />{task}</label>)}</div><p className="mt-5 text-[10px] leading-5 text-stone-400" aria-live="polite">{complete === 3 ? 'Alles bereit. Beschreiben Sie uns jetzt Ihr Gerät.' : 'Ihre Checkliste bleibt nur in dieser geöffneten Seite.'}</p></div>
          </div>
          <p className="mt-4 text-center text-[10px] text-stone-500">Eine praktische Vorbereitungshilfe – kein Kundenkonto nötig.</p>
        </div>
      </div>
    </section>
  )
}

export function RepairExamples() {
  const examples = [
    { image: '/images/User_attachment1.png', type: 'Waschmaschine', title: 'Wenn die Trommel stillsteht.', text: 'Antrieb, Beladung oder Steuerung: Eine genaue Prüfung zeigt, wo die Ursache liegen könnte.', tags: 'Drehbewegung · Elektronik' },
    { image: '/images/User_attachment2.png', type: 'Kaffeemaschine', title: 'Wenn der Druck nachlässt.', text: 'Der Weg des Wassers liefert Hinweise. Wir prüfen Durchlauf, Pumpe und mögliche Ablagerungen.', tags: 'Wasserdurchlauf · Pumpe' },
    { image: '/images/pa-speaker.png', type: 'Lautsprecher', title: 'Wenn die Verbindung abbricht.', text: 'Stromversorgung, Kontakte und Verbindung werden Schritt für Schritt eingegrenzt.', tags: 'Verbindung · Stromversorgung' },
  ]
  return <section className="section-space bg-[#f1f5f2]"><div className="site-container"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Aus dem Gerätealltag</p><h2 className="section-title">Kleine Fehler.<br />Viele mögliche Ursachen.</h2></div><p className="max-w-sm text-sm leading-7 text-stone-600">Typische Beispiele zeigen, warum eine gute Diagnose der erste Schritt ist.</p></div><div className="mt-10 grid gap-6 md:grid-cols-3">{examples.map(example => <article key={example.type} className="overflow-hidden rounded-2xl border border-[#dfe7e1] bg-white"><div className="relative flex h-48 items-center justify-center bg-[#e2ebe5]"><Image src={example.image} alt={example.type} width={220} height={220} className="h-40 w-auto object-contain" /><span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[9px] font-medium text-[#36533e]">Typisches Fehlerbild</span></div><div className="p-6"><p className="text-[10px] uppercase tracking-widest text-[#16804a]">{example.type}</p><h3 className="mt-3 text-xl font-semibold tracking-tight">{example.title}</h3><p className="mt-4 text-sm leading-7 text-stone-600">{example.text}</p><p className="mt-6 border-t border-stone-100 pt-4 text-[10px] text-stone-500">{example.tags}</p></div></article>)}</div><p className="mt-7 text-center text-xs text-stone-500">Jeder Fall ist anders. Diese Beispiele ersetzen keine Diagnose Ihres Geräts.</p></div></section>
}

const questions = [
  ['Wie frage ich eine Reparatur an?', 'Schreiben Sie uns, um welches Gerät es geht und was nicht mehr funktioniert. Marke, Modell und ein möglicher Fehlercode helfen bei der ersten Einschätzung. Anschließend besprechen wir das weitere Vorgehen.'],
  ['Welche Geräte repariert FixPro?', 'Unser Schwerpunkt liegt auf Waschmaschinen, Kaffeemaschinen und Lautsprechern. Beschreiben Sie uns Ihr Modell, damit wir prüfen können, ob wir Ihnen weiterhelfen können.'],
  ['Lohnt sich die Reparatur eines älteren Geräts?', 'Das hängt vom Zustand, vom Fehler und von der Verfügbarkeit passender Teile ab. Wir besprechen mit Ihnen, welche Möglichkeiten sinnvoll sind, bevor Sie eine Entscheidung treffen.'],
  ['Was kostet eine Reparatur?', 'Die Kosten hängen vom Gerät, dem notwendigen Aufwand und möglichen Ersatzteilen ab. Fragen Sie vorab nach Diagnose- oder Anfahrtskosten und lassen Sie die weiteren Arbeiten mit uns abstimmen.'],
  ['Muss ich mein Gerät vorher vorbereiten?', 'Halten Sie Modellbezeichnung und Fehlerbeschreibung bereit. Öffnen Sie keine Abdeckungen und lösen Sie keine elektrischen Anschlüsse. Melden Sie auffällige Geräusche, Gerüche oder undichte Stellen.'],
  ['Kommt jemand zu mir nach Hause?', 'Teilen Sie uns Ihren Ort und das Gerät mit. Wir klären mit Ihnen, ob ein Vor-Ort-Termin oder eine andere Form der Übergabe möglich ist.'],
]

export function FAQ() {
  return <section id="faq" className="section-space bg-[#faf9f6]"><div className="site-container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20"><div><p className="eyebrow">Gut zu wissen</p><h2 className="section-title">Noch Fragen?<br />Ganz verständlich.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-stone-600">Hier finden Sie Antworten auf die wichtigsten Fragen vor Ihrer ersten Anfrage.</p><a href="#contact" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#16804a]">Persönlich nachfragen<ArrowUpRight size={17} /></a></div><div className="space-y-3">{questions.map(([question, answer], index) => <details key={question} className="group rounded-2xl border border-[#e1e9e3] bg-white p-5 open:border-[#b9d8c3] open:bg-[#f4f9f5]" open={index === 0 ? true : undefined}><summary className="flex cursor-pointer list-none items-start gap-4 text-sm font-semibold leading-6 [&::-webkit-details-marker]:hidden"><span className="mt-0.5 font-mono text-[10px] text-[#16804a]">0{index + 1}</span><span className="flex-1">{question}</span><ChevronDown size={17} className="mt-1 shrink-0 text-stone-400 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="mt-4 pl-8 text-sm leading-7 text-stone-600">{answer}</p></details>)}</div></div></section>
}

export function ServiceArea() {
  const [area, setArea] = useState('')
  const [device, setDevice] = useState('Waschmaschine')
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = `Reparaturanfrage: ${device}`
    const body = `Guten Tag FixPro,\n\nich möchte eine Reparatur anfragen.\n\nGerät: ${device}\nOrt / PLZ: ${area.trim()}\nMarke / Modell: \nFehlerbeschreibung: \n\nBitte teilen Sie mir mit, ob ein Termin bei mir möglich ist.\n\nVielen Dank!`
    window.location.href = `mailto:contact@fixpro.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return <section id="anfrage" className="section-space bg-[#e8f1eb]"><div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow">In Ihrer Nähe?</p><h2 className="section-title">Der erste Schritt<br />beginnt bei Ihnen.</h2><p className="mt-6 max-w-md text-sm leading-7 text-stone-600">Sagen Sie uns, wo sich Ihr Gerät befindet. Gemeinsam klären wir das Einsatzgebiet, den passenden Termin und die nächsten Schritte.</p><div className="mt-7 flex gap-4"><MapPin size={24} className="mt-1 shrink-0 text-[#16804a]"/><div><h3 className="text-sm font-semibold">Ort und Gerät angeben</h3><p className="mt-1 max-w-sm text-xs leading-6 text-stone-500">Ihre Angaben werden in eine E-Mail-Vorlage übernommen. Den Versand bestätigen Sie in Ihrem E-Mail-Programm.</p></div></div></div><form onSubmit={prepare} className="rounded-2xl border border-[#d8e6dc] bg-white p-7 md:p-9"><h3 className="text-xl font-semibold">Wie können wir helfen?</h3><label htmlFor="repair-device" className="mb-2 mt-6 block text-xs font-semibold text-stone-600">Welches Gerät?</label><select id="repair-device" value={device} onChange={event => setDevice(event.target.value)} className="w-full rounded-lg border border-stone-200 bg-[#fafcfb] px-4 py-3 text-sm">{['Waschmaschine','Kaffeemaschine','Lautsprecher','Anderes Gerät'].map(option => <option key={option}>{option}</option>)}</select><label htmlFor="repair-area" className="mb-2 mt-5 block text-xs font-semibold text-stone-600">Ihr Ort oder Ihre Postleitzahl</label><input id="repair-area" value={area} onChange={event => setArea(event.target.value)} required maxLength={100} autoComplete="postal-code" placeholder="z. B. Ort oder PLZ" className="w-full rounded-lg border border-stone-200 bg-[#fafcfb] px-4 py-3 text-sm" /><button type="submit" className="primary-button mt-6 w-full">E-Mail-Anfrage vorbereiten<ArrowRight size={17} /></button><p className="mt-4 text-center text-[10px] leading-5 text-stone-400">Noch keine Buchung. Kein automatischer Versand.</p></form></div></section>
}
