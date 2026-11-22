'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight, Check,
  ChevronDown, Headphones, Leaf, MapPin, MessageCircle,
  Settings2, ShieldCheck,
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
  const tasks = [
    { label: 'Marke und Modell notiert', hint: 'Modellbezeichnung und Hersteller helfen bei der Einordnung.' },
    { label: 'Fehler kurz beschrieben', hint: 'Was passiert und seit wann? Auch ein Fehlercode ist hilfreich.' },
    { label: 'Foto vom Typenschild bereit', hint: 'Ein Foto ergänzt Ihre Beschreibung, wenn Sie es zur Hand haben.' },
  ]
  const [checked, setChecked] = useState([false, false, false])
  const complete = checked.filter(Boolean).length

  return (
    <section id="vorbereitung" className="section-space bg-white">
      <div className="site-container">
        <div className="rounded-[32px] bg-[#103329] px-5 py-8 text-white sm:px-8 lg:p-12">
          <p className="text-sm font-semibold text-[#a9dcb9]">Gut vorbereitet</p>
          <h2 className="section-title">Weniger Rückfragen. Mehr Klarheit.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#d0e2d6]">Mit ein paar Angaben können wir Ihre Anfrage besser einschätzen.</p>

          <fieldset className="mt-8 min-w-0">
            <legend className="text-base font-semibold">Checkliste für Ihre Anfrage</legend>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {tasks.map(({ label, hint }, index) => (
                <label key={label} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/20 bg-white/5 p-4 has-[:checked]:border-[#a9dcb9] has-[:checked]:bg-white/10">
                  <input type="checkbox" checked={checked[index]} onChange={() => setChecked(current => current.map((value, i) => i === index ? !value : value))} className="mt-1 h-5 w-5 shrink-0 accent-[#a9dcb9]" />
                  <span>
                    <span className="block font-semibold">{label}</span>
                    <span className="mt-2 block text-sm leading-6 text-[#d0e2d6]">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#d0e2d6]" aria-live="polite">{complete} von {tasks.length} erledigt{complete === tasks.length && ' · Alles bereit.'}</p>
            <a href="#contact" className="rounded-lg bg-[#a9dcb9] px-5 py-3 text-sm font-semibold text-[#103329] transition-colors hover:bg-white">Anfrage vorbereiten</a>
          </div>
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

const faqBrandStrips = [
  ['Bosch', 'Miele', 'De’Longhi', 'Jura', 'JBL', 'Bose'],
  ['Siemens', 'AEG', 'Saeco', 'Krups', 'Sony', 'Marshall'],
]

function FAQBrandStrip({ brands, descending, paused }: { brands: string[]; descending: boolean; paused: boolean }) {
  return (
    <div className="faq-brand-window">
      <div className="faq-brand-track" style={{ animationDirection: descending ? 'reverse' : 'normal', animationPlayState: paused ? 'paused' : 'running' }}>
        {[false, true].map(duplicate => (
          <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className="grid gap-3 pb-3">
            {brands.map(brand => (
              <li key={brand} className="flex min-h-[3.75rem] items-center justify-center rounded-xl border border-[#69877a]/60 bg-[#2b493d] px-2 text-center text-sm font-semibold tracking-wide text-[#dceee3] sm:text-base">
                {brand}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function FAQ() {
  const [brandsPaused, setBrandsPaused] = useState(false)

  return (
    <section id="faq" className="section-space scroll-mt-20 bg-white text-[#17251d]" aria-labelledby="home-faq-title">
      <div className="site-container">
        <header className="mb-9 text-center">
          <h2 id="home-faq-title" className="section-title">Noch Fragen?</h2>
          <p className="mt-4 text-base leading-7 text-stone-600">Antworten auf die wichtigsten Fragen vor Ihrer ersten Anfrage.</p>
        </header>
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
          <aside aria-label="Markenbeispiele" className="col-span-2 row-start-2 grid grid-cols-2 gap-x-4 gap-y-2 lg:contents">
            <div className="lg:col-start-1 lg:row-start-1">
              <FAQBrandStrip brands={faqBrandStrips[0]} descending={false} paused={brandsPaused} />
            </div>
            <div className="lg:col-start-3 lg:row-start-1">
              <FAQBrandStrip brands={faqBrandStrips[1]} descending paused={brandsPaused} />
            </div>
          </aside>
          <div className="col-span-2 row-start-1 min-w-0 lg:col-span-1 lg:col-start-2">
            <div className="overflow-hidden rounded-2xl border border-[#dce8df] bg-white">
              {questions.map(([question, answer], index) => (
                <details key={question} name="homepage-faq" className="group border-b border-[#dce8df] last:border-b-0 open:bg-[#f4f9f5]" open={index === 0 ? true : undefined}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-semibold leading-6 focus-visible:outline-[#16804a] focus-visible:-outline-offset-2 sm:px-5 [&::-webkit-details-marker]:hidden">
                    {question}
                    <ChevronDown aria-hidden="true" size={20} className="shrink-0 text-[#16804a] transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                  </summary>
                  <p className="px-4 pb-5 text-base leading-7 text-stone-600 sm:px-5">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 text-center">
              <a href="#contact" className="text-sm font-semibold text-[#16804a] underline decoration-[#a9cbb5] underline-offset-4">Persönlich nachfragen</a>
            </div>
          </div>
          <button type="button" onClick={() => setBrandsPaused(paused => !paused)} className="col-span-2 row-start-3 min-h-11 justify-self-center text-sm text-stone-600 underline underline-offset-4 hover:text-[#16804a] motion-reduce:hidden lg:col-start-2 lg:col-span-1 lg:row-start-2">
            {brandsPaused ? 'Markenanimation fortsetzen' : 'Markenanimation pausieren'}
          </button>
        </div>
      </div>
    </section>
  )
}

export { default as ServiceArea } from "@/components/ui/contact-with-globe"
