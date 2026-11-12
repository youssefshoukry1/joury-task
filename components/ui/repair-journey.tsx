'use client'

import { animate, motion, useInView, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

const scenes = [
  { number: '01', label: 'كل جهاز إله حل', title: 'مفتاح واحد.\nخبرة بتصلّح الكل.', description: 'من أول برغي لآخر تفصيلة، فريقنا جاهز يرجّع أجهزتك للحياة.', tag: 'FIXPRO / REPAIR SPECIALISTS' },
  { number: '02', label: 'صيانة الغسالات', title: 'نرجّع الدوران.\nونريح بالك.', description: 'فحص وصيانة الغسالات، من مشاكل التصريف والدوران إلى الأعطال الكهربائية.', tag: 'WASHING MACHINE / 01' },
  { number: '03', label: 'صيانة آلات القهوة', title: 'قهوتك المفضّلة.\nراجعة من جديد.', description: 'صيانة آلات القهوة وتنظيفها ومعالجة مشاكل الضغط والتسريب والتسخين.', tag: 'COFFEE MACHINE / 02' },
  { number: '04', label: 'صيانة السماعات', title: 'كل تفصيلة صوت.\nإلها اهتمام.', description: 'فحص السماعات ومعالجة مشاكل الصوت والتوصيلات لتستمتع بكل نغمة.', tag: 'SPEAKER / 03' },
]

const applianceImages = [
  { src: '/images/User_attachment1.png', label: 'غسالة' },
  { src: '/images/User_attachment2.png', label: 'آلة قهوة' },
  { src: '/images/User_attachment3.png', label: 'سماعة رأس' },
]

function Scene({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index - .65, index - .25, index + .3, index + .7], [0, 1, 1, 0])
  const y = useTransform(progress, [index - .7, index, index + .7], [70, 0, -55])
  const image = applianceImages[index - 1]
  return <motion.g style={{ opacity, y }}>
    <image href={image.src} x="365" y="130" width="480" height="480" preserveAspectRatio="xMidYMid meet" style={{ filter: 'drop-shadow(0 18px 20px rgb(0 0 0 / 0.35))' }}><title>{image.label}</title></image>
  </motion.g>
}
function SceneCopy({ index, progress, active }: { index: number; progress: MotionValue<number>; active: number }) {
  const opacity = useTransform(progress, [index - .6, index - .2, index + .25, index + .6], [0, 1, 1, 0])
  const y = useTransform(progress, [index - .6, index, index + .6], [25, 0, -25])
  const scene = scenes[index]
  return <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0" aria-hidden={active !== index}>
    <p className="mb-4 flex items-center gap-3 text-xs font-medium tracking-wide text-cyan-300 md:text-sm"><span className="h-px w-8 bg-cyan-400" />{scene.label}</p>
    <h2 className="whitespace-pre-line text-4xl font-extrabold leading-[1.3] tracking-tight text-white sm:text-5xl lg:text-6xl">{scene.title}</h2>
    <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 md:text-base">{scene.description}</p>
  </motion.div>
}

export default function RepairJourney() {
  const root = useRef<HTMLElement>(null)
  const tool = useRef<SVGGElement>(null)
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const progress = useMotionValue(0)
  const [active, setActive] = useState(0)
  const [target, setTarget] = useState(0)
  const direction = useRef(1)
  const visible = useInView(root, { amount: 0.15 })

  useEffect(() => {
    if (!visible) {
      progress.set(target)
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined
    const controls = animate(progress, target, {
      duration: reduced ? 0 : 1.2,
      ease: 'easeInOut',
      onComplete: () => {
        timer = setTimeout(() => {
          if (target === scenes.length - 1) direction.current = -1
          if (target === 0) direction.current = 1
          setTarget(target + direction.current)
        }, 5000)
      },
    })

    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [progress, reduced, target, visible])
  useMotionValueEvent(progress, 'change', value => setActive(Math.round(value)))
  const x = useTransform(progress, [0, .5, .82, 1.04, 1.18, 1.3, 1.5, 1.82, 2.04, 2.18, 2.3, 2.5, 2.82, 3], [610, 700, 725, 725, 725, 725, 620, 510, 510, 510, 510, 620, 710, 710])
  const y = useTransform(progress, [0, .5, .82, 1.3, 1.5, 1.82, 2.3, 2.5, 2.82, 3], [230, 190, 301, 301, 200, 289, 289, 220, 365, 365])
  const rotate = useTransform(progress, [0, .6, .82, 1, 1.12, 1.24, 1.4, 1.82, 2, 2.12, 2.24, 2.4, 2.82, 3], [-35, -60, -30, -30, -5, -30, 0, 35, 35, 55, 35, 0, -30, -5])
  const scale = useTransform(progress, [0, .8, 1, 2, 3], [1.2, .73, .73, .73, .73])
  const accessibleRotation = useTransform(rotate, value => reduced ? 0 : value)
  const toolTransform = useMotionTemplate`translate(${x} ${y}) rotate(${accessibleRotation}) scale(${scale})`
  useMotionValueEvent(toolTransform, 'change', value => tool.current?.setAttribute('transform', value))
  const introOpacity = useTransform(progress, [0, .55, .85], [1, .5, 0])

  return <section ref={root} className="relative bg-[#080f1b]" aria-label="خدمات الصيانة مع مفتاح متحرك">
    <div className="relative h-svh min-h-[640px] overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#16384c_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#a5f3fc_1px,transparent_1px),linear-gradient(90deg,#a5f3fc_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto h-full max-w-[1440px] px-6 pt-28 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute left-[50%] top-[38%] hidden w-24 xl:block" dir="rtl">
          <p className="mb-6 text-[10px] tracking-wide text-cyan-300/70">من العطل للحل</p>
          <ol className="space-y-7 border-r border-cyan-300/15 pr-4">
            {['نفهم المشكلة', 'نفحص الجهاز', 'نحدّد الإصلاح'].map(step => (
              <li key={step} className="relative">
                <span aria-hidden="true" className="absolute -right-[19px] top-1.5 h-1 w-1 rounded-full bg-cyan-300/60" />
                <span className="block text-[11px] leading-5 text-slate-400">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative z-10 w-full md:absolute md:right-12 md:top-[23%] md:w-[43%] lg:right-20">
          <div className="relative h-[255px] sm:h-[285px] md:h-[300px]">{scenes.map((_, index) => <SceneCopy key={index} index={index} progress={progress} active={active} />)}</div>
          <a href="#contact" className="group relative inline-flex min-h-16 items-center gap-8 rounded-full px-6 py-4 text-base font-bold text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#ffe5dc]">
            <span aria-hidden="true" className="absolute inset-y-0 right-0 w-16 rounded-full bg-[#ffe5dc]/20 transition-[width,background-color] duration-500 ease-out group-hover:w-full group-hover:bg-[#ffe5dc] group-focus-visible:w-full group-focus-visible:bg-[#ffe5dc] motion-reduce:transition-none" />
            <span className="relative transition-colors duration-300 group-hover:text-slate-900 group-focus-visible:text-slate-900 motion-reduce:transition-none">احجز صيانة جهازك</span>
            <ArrowLeft aria-hidden="true" size={22} className="relative transition-[transform,color] duration-300 group-hover:-translate-x-1 group-hover:text-slate-900 group-focus-visible:-translate-x-1 group-focus-visible:text-slate-900 motion-reduce:transition-none" />
          </a>
          <div className="mt-7 hidden max-w-md md:block">
            <p className="text-sm leading-7 text-slate-300">أجهزتك جزء من يومك، وكل عطل بيغيّر روتينك. احكيلنا شو المشكلة، وخلّينا نساعدك تعرف الخطوة المناسبة لصيانة جهازك.</p>
            <p className="mt-3 text-xs leading-6 text-slate-500">غسالات <span className="mx-2 text-cyan-300/60">·</span> آلات قهوة <span className="mx-2 text-cyan-300/60">·</span> سماعات</p>
          </div>
        </div>
        <div className="absolute -left-[16%] bottom-[8%] h-[48%] w-[130%] sm:bottom-[4%] sm:h-[55%] md:-left-[16%] md:bottom-[7%] md:h-[85%] md:w-[86%]" dir="ltr">
          <svg viewBox="260 90 650 570" className="h-full w-full overflow-visible" role="img" aria-label="مفتاح شق معدني ينتقل بين غسالة وآلة قهوة وسماعة">
            <defs>
              <filter id={`${uid}-cutout`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  .333 .333 .333 0 0" /></filter>
              <radialGradient id={`${uid}-halo`}><stop stopColor="#22d3ee" stopOpacity=".14" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
            </defs>
            <ellipse cx="605" cy="595" rx="220" ry="24" fill="#000" opacity=".3" />
            <circle cx="605" cy="350" r="280" fill={`url(#${uid}-halo)`} />
            <motion.g style={{ opacity: introOpacity }}><circle cx="605" cy="345" r="192" fill="none" stroke="#8ed6e8" strokeOpacity=".15" strokeDasharray="3 9" /><circle cx="605" cy="345" r="240" fill="none" stroke="#8ed6e8" strokeOpacity=".08" /><text x="605" y="615" textAnchor="middle" fill="#7096aa" fontSize="11" letterSpacing="5" fontFamily="monospace">PRECISION IN EVERY TURN</text></motion.g>
            {[1, 2, 3].map(index => <Scene key={index} index={index} progress={progress} />)}
            <g ref={tool} transform="translate(610 230) rotate(-35) scale(1.2)">
              <g transform="rotate(90)"><image href="/images/User%20attachment.png" x="-24" y="-43" width="400" height="92" preserveAspectRatio="xMidYMid meet" filter={`url(#${uid}-cutout)`}><title>مفتاح شق معدني حقيقي</title></image></g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </section>
}
