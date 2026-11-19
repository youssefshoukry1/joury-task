import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Wrench, Search, ClipboardCheck, Phone } from 'lucide-react'
import { repairServices, findService } from '@/lib/services'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionReveal from '@/components/SectionReveal'
import { ServiceArea } from '@/components/RepairSections'
import { RepairRequestProvider } from '@/components/RepairRequestProvider'
import ServiceInteractions, { ServiceAction } from '@/components/ServiceInteractions'
import { RepairDecision } from '@/components/ServiceExtras'

export function generateStaticParams() {
  return repairServices.map(service => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = findService(slug)
  return service ? { title: `${service.device} reparieren | FixPro`, description: service.introduction } : { title: 'Service nicht gefunden | FixPro' }
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <main className="service-page min-h-screen bg-[#faf9f6]">
        <Navbar />
        <section role="status" aria-label="Service wird geladen" className="bg-[#071e26] px-6 pb-16 pt-36 text-white md:px-12">
          <div className="mx-auto max-w-[1200px] rounded-[32px] border border-white/10 bg-[#103329] p-8 md:p-14">
            <p className="text-sm text-[#bdd0c3]">Servicedetails werden geladen …</p>
            <div aria-hidden="true" className="mt-8 space-y-5"><div className="h-12 w-3/4 rounded-xl bg-white/10" /><div className="h-12 w-1/2 rounded-xl bg-white/10" /><div className="h-5 w-2/3 rounded-lg bg-white/5" /></div>
          </div>
        </section>
      </main>
    }>
      <ServiceDetails params={params} />
    </Suspense>
  )
}

async function ServiceDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = findService(slug)
  if (!service) notFound()
  const related = repairServices.filter(item => item.slug !== slug)
  const questions = [
    [`Welche Angaben brauchen Sie zu ${service.device === 'Waschmaschine' ? 'meiner Waschmaschine' : service.device === 'Kaffeemaschine' ? 'meiner Kaffeemaschine' : 'meinem Lautsprecher'}?`, service.preparation],
    ['Wie wird der Preis für die Reparatur geklärt?', 'Die Kosten hängen von der Ursache, dem Arbeitsaufwand und möglichen Ersatzteilen ab. Fragen Sie vorab nach Diagnose- oder Anfahrtskosten. Weitere Arbeiten stimmen wir mit Ihnen ab.'],
    ['Lohnt sich die Reparatur eines älteren Geräts?', 'Wir betrachten Zustand, Fehlerbild und Teileverfügbarkeit. Erst danach lässt sich einschätzen, welcher Reparaturweg sinnvoll ist.'],
    ['Wie lange dauert die Reparatur?', 'Das hängt von der Diagnose, der Terminabstimmung und der Verfügbarkeit benötigter Teile ab. Wir besprechen den voraussichtlichen Ablauf mit Ihnen.'],
  ]

  return (
    <RepairRequestProvider key={service.slug} initialDevice={service.device}>
      <main className="service-page min-h-screen bg-[#faf9f6]">
        <Navbar />
        <section className="overflow-hidden bg-[#071e26] px-4 pb-8 pt-28 text-white md:px-8 md:pt-32">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Brotkrumennavigation" className="mb-6 flex flex-wrap items-center gap-2 px-2 text-[11px] text-[#a5b9ad]">
              <Link href="/" className="hover:text-white">Startseite</Link><ChevronRight size={12} aria-hidden="true" /><Link href="/#services" className="hover:text-white">Leistungen</Link><ChevronRight size={12} aria-hidden="true" /><span aria-current="page" className="text-[#8be7a2]">{service.title}</span>
            </nav>
            <div className="grid items-center gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-[#103329] p-7 md:grid-cols-[1.15fr_1fr] md:p-12 lg:p-14">
              <div>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#88b89a]/25 px-3 py-2 text-[10px] font-medium uppercase tracking-widest text-[#a9dcb9]"><Wrench size={13} />{service.category}</p>
                <h1 className="break-words text-[clamp(2.1rem,4.4vw,4rem)] font-semibold leading-[1.08] tracking-[-.05em]">{service.title}<span className="mt-2 block text-[#8be7a2]">Reparatur mit Sorgfalt.</span></h1>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#bdd0c3] md:text-base">{service.introduction}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4"><ServiceAction /><a href="tel:+963999999999" className="inline-flex items-center gap-2 text-sm text-[#d6e8dc]"><Phone size={15} />Jetzt anrufen</a></div>
                <div className="mt-7 flex flex-wrap gap-2">{service.tags.map(tag => <span key={tag} className="rounded-full bg-white/[.06] px-3 py-1.5 text-[10px] text-[#a8cbb4]">{tag}</span>)}</div>
              </div>
              <div className="relative flex h-72 items-center justify-center rounded-[24px] bg-[#e7f0e8] md:h-[390px] lg:h-[430px]"><div aria-hidden="true" className="absolute h-56 w-56 rounded-full border border-[#c9dfce]" /><Image src={service.image} alt={service.alt} fill priority sizes="(max-width: 768px) 85vw, 45vw" className="object-contain p-5 md:p-7" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[9px] text-[#3a6849]">Erst verstehen. Dann reparieren.</span></div>
            </div>
          </div>
        </section>

        <SectionReveal>
          <section className="section-space bg-[#faf9f6]">
            <div className="site-container grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <div><p className="eyebrow">Typische Fehlerbilder</p><h2 className="section-title">Kommt Ihnen<br />das bekannt vor?</h2><p className="mt-6 max-w-sm text-sm leading-7 text-stone-500">Ein Defekt kann verschiedene Ursachen haben. Wir grenzen das Problem ein, bevor über die nächsten Schritte entschieden wird.</p><a href="#anfrage" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#258454]">Mein Fehler ist anders<ArrowUpRight size={16} /></a></div>
              <div className="grid gap-3 sm:grid-cols-2">{service.problems.map((problem, index) => <article key={problem} className="gentle-card rounded-[22px] border border-[#dce8df] bg-white p-6"><span className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5ee] text-xs font-semibold text-[#258454]">0{index + 1}</span><h3 className="text-base font-semibold leading-7 text-[#2d4835]">{problem}</h3><p className="mt-3 flex items-center gap-2 text-[11px] text-stone-500"><Search size={13} />Ursache gezielt prüfen</p></article>)}</div>
            </div>
          </section>
        </SectionReveal>

        <ServiceInteractions device={service.device} />
        <SectionReveal>
          <section id="service-ablauf" className="px-4 pb-12 md:px-8">
            <div className="mx-auto max-w-[1280px] rounded-[32px] border border-[#dce8df] bg-[#eaf3ec] p-7 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-16"><div><p className="eyebrow">Diagnose & Abstimmung</p><h2 className="section-title">Sie wissen,<br />was als Nächstes passiert.</h2></div><div><p className="text-sm leading-7 text-[#687f6f]">{service.checks}</p><div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/80 bg-white/70 p-4"><ClipboardCheck size={19} className="mt-1 shrink-0 text-[#258454]" /><p className="text-xs leading-6 text-[#687f6f]">{service.preparation}</p></div></div></div>
            </div>
          </section>
        </SectionReveal>

        <RepairDecision device={service.device} />

        <SectionReveal>
          <section id="service-fragen" className="section-space"><div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Gut zu wissen</p><h2 className="section-title">Ihre Fragen.<br />Unsere Antworten.</h2><p className="mt-5 max-w-xs text-sm leading-7 text-stone-500">Noch etwas unklar? Wir besprechen Ihr Gerät gerne persönlich mit Ihnen.</p></div><div className="space-y-3">{questions.map(([question, answer], index) => <details key={question} className="group rounded-2xl border border-[#e1e9e3] bg-white p-5 open:bg-[#f1f7f1]" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">{question}<ChevronDown size={17} className="shrink-0 text-[#698a73] transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-sm leading-7 text-stone-500">{answer}</p></details>)}</div></div></section>
        </SectionReveal>

        <SectionReveal><ServiceArea /></SectionReveal>

        <SectionReveal>
          <section id="weitere-leistungen" className="section-space bg-white"><div className="site-container"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Auch dafür sind wir da</p><h2 className="section-title">Weitere Leistungen.</h2></div><Link href="/#services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#258454]">Alle Leistungen<ArrowUpRight size={16} /></Link></div><div className="mt-9 grid gap-5 md:grid-cols-2">{related.map(item => <Link key={item.slug} href={`/leistungen/${item.slug}`} className="gentle-card group flex items-center gap-5 rounded-[24px] border border-[#dce8df] bg-[#f3f7f2] p-5 hover:border-[#a2cdb0]"><Image src={item.image} alt={item.alt} width={120} height={140} className="h-32 w-24 shrink-0 object-contain md:w-32" /><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-stone-500">{item.category}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#258454]">Service entdecken<ArrowRight size={15} /></span></div></Link>)}</div></div></section>
        </SectionReveal>
        <Footer />
      </main>
    </RepairRequestProvider>
  )
}
