import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Process from '@/components/Process'
import Footer from '@/components/Footer'
import { WhyChoose, ServicePreparation, FAQ, ServiceArea } from '@/components/RepairSections'
import SectionReveal from '@/components/SectionReveal'
import CommonFaults from '@/components/CommonFaults'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <Hero />
      <Stats />
      <SectionReveal><Services /></SectionReveal>
      <SectionReveal><WhyChoose /></SectionReveal>
      <SectionReveal><About /></SectionReveal>
      <SectionReveal><Process /></SectionReveal>
      <SectionReveal><ServicePreparation /></SectionReveal>
      <SectionReveal><CommonFaults /></SectionReveal>
      <SectionReveal><FAQ /></SectionReveal>
      <SectionReveal><ServiceArea /></SectionReveal>
      <SectionReveal><Footer /></SectionReveal>
    </main>
  )
}
