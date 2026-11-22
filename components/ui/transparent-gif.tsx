'use client'

import { useEffect, useRef, useState } from 'react'

type DecodedFrame = CanvasImageSource & { displayWidth: number; displayHeight: number; duration: number | null; close(): void }
type GifDecoder = {
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number } }
  decode(options: { frameIndex: number }): Promise<{ image: DecodedFrame }>
  close(): void
}

/** Key the connected white backdrop while retaining highlights inside the appliance. */
function clearBackdrop(context: CanvasRenderingContext2D, width: number, height: number) {
  const frame = context.getImageData(0, 0, width, height)
  const pixels = frame.data
  const seen = new Uint8Array(width * height)
  const queue = new Int32Array(width * height)
  let start = 0
  let end = 0
  const visit = (index: number) => {
    if (seen[index]) return
    seen[index] = 1
    const offset = index * 4
    const low = Math.min(pixels[offset], pixels[offset + 1], pixels[offset + 2])
    const high = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2])
    if (low < 205 || high - low > 30) return
    pixels[offset + 3] = Math.min(pixels[offset + 3], Math.round(Math.max(0, 245 - low) / 40 * 255))
    queue[end++] = index
  }
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x) }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1) }
  while (start < end) {
    const index = queue[start++]
    if (index % width) visit(index - 1)
    if (index % width < width - 1) visit(index + 1)
    if (index >= width) visit(index - width)
    if (index < width * (height - 1)) visit(index + width)
  }
  context.putImageData(frame, 0, 0)
}

export default function TransparentGif({ src, alt, finalSrc, posterSrc, frames, frameDuration = 170, aspectRatio = '347 / 267' }: {
  src: string
  alt: string
  finalSrc: string
  posterSrc: string
  frames?: string[]
  frameDuration?: number
  aspectRatio?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = useState(false)
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)
  const pausedRef = useRef(false)
  useEffect(() => {
    const Decoder = (window as unknown as { ImageDecoder?: new (options: { data: ArrayBuffer; type: string }) => GifDecoder }).ImageDecoder
    if (!Decoder && !frames?.length) { setFallback(true); return }
    let stopped = false
    let visible = false
    let started = false
    let animationFrame = 0
    let decoder: GifDecoder | undefined
    let timer: ReturnType<typeof setTimeout>
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controller = new AbortController()
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: .35 })
    if (canvas.current) observer.observe(canvas.current)
    async function run() {
      if (frames?.length) {
        const loadFrame = async (url: string) => {
          const image = new Image()
          image.src = url
          await image.decode()
          return image
        }
        const pending = frames.map(url => loadFrame(url).catch(() => null))
        const first = await pending[0]
        if (!first) throw new Error('HD poster unavailable')
        const element = canvas.current
        const context = element?.getContext('2d')
        if (stopped || !element || !context) return
        element.width = 1430
        const [aspectWidth, aspectHeight] = aspectRatio.split('/').map(Number)
        element.height = Math.round(1430 * aspectHeight / aspectWidth)
        context.imageSmoothingQuality = 'high'
        const paint = (image: HTMLImageElement, index: number) => {
          context.clearRect(0, 0, element.width, element.height)
          context.drawImage(image, 0, 0, element.width, element.height)
          element.dataset.frame = String(index)
        }
        paint(first, 0)
        const images = await Promise.all(pending)
        if (images.some(image => image === null)) throw new Error('HD sequence unavailable')
        if (stopped || reduced) return
        // A time-based timeline avoids accumulated timer drift. Pause time and
        // offscreen time do not advance the sequence.
        let elapsed = 0
        let previousTime = 0
        const hold = 1000
        const duration = Math.max(3200, (images.length - 1) * frameDuration)
        const composite = document.createElement('canvas')
        composite.width = element.width
        composite.height = element.height
        const blend = composite.getContext('2d')!
        blend.imageSmoothingQuality = 'high'
        const advance = (time: number) => {
          if (stopped) return
          const delta = previousTime ? Math.min(time - previousTime, 50) : 0
          previousTime = time
          if (!document.hidden && visible && !pausedRef.current) elapsed += delta
          if (elapsed > hold) {
            const t = Math.min((elapsed - hold) / duration, 1)
            // Gentle acceleration and deceleration, without bouncing.
            const eased = t * t * (3 - 2 * t)
            const position = eased * (images.length - 1)
            const index = Math.min(Math.floor(position), images.length - 1)
            const next = Math.min(index + 1, images.length - 1)
            const fraction = position - index
            // Briefly soften each cut rather than dissolve for the whole frame.
            const mix = Math.max(0, (fraction - .62) / .38)
            if (mix > 0 && next !== index) {
              blend.clearRect(0, 0, composite.width, composite.height)
              blend.globalCompositeOperation = 'source-over'
              blend.globalAlpha = 1 - mix
              blend.drawImage(images[index]!, 0, 0, composite.width, composite.height)
              blend.globalCompositeOperation = 'lighter'
              blend.globalAlpha = mix
              blend.drawImage(images[next]!, 0, 0, composite.width, composite.height)
              blend.globalAlpha = 1
              blend.globalCompositeOperation = 'source-over'
              context.clearRect(0, 0, element.width, element.height)
              context.drawImage(composite, 0, 0)
              element.dataset.frame = String(index)
            } else paint(images[index]!, index)
            if (t === 1) { paint(images[images.length - 1]!, images.length - 1); setFinished(true); return }
          }
          animationFrame = requestAnimationFrame(advance)
        }
        animationFrame = requestAnimationFrame(advance)
        return
      }
      const response = await fetch(src, { signal: controller.signal })
      if (!response.ok) throw new Error('GIF unavailable')
      decoder = new Decoder!({ data: await response.arrayBuffer(), type: 'image/gif' })
      await decoder.tracks.ready
      let index = 0
      async function draw() {
        if (stopped || !decoder) return
        if (index > 0 && (document.hidden || !visible || pausedRef.current)) { timer = setTimeout(() => void draw().catch(fail), 100); return }
        if (index === 1 && !started) {
          started = true
          timer = setTimeout(() => void draw().catch(fail), 1000)
          return
        }
        const { image } = await decoder.decode({ frameIndex: index })
        if (stopped) { image.close(); return }
        const element = canvas.current
        const context = element?.getContext('2d', { willReadFrequently: true })
        if (!element || !context) { image.close(); return }
        if (element.width !== image.displayWidth || element.height !== image.displayHeight) {
          element.width = image.displayWidth
          element.height = image.displayHeight
        }
        context.drawImage(image, 0, 0)
        clearBackdrop(context, element.width, element.height)
        const duration = Math.max(20, (image.duration ?? 100000) / 1000)
        image.close()
        index += 1
        if (index >= decoder.tracks.selectedTrack.frameCount) {
          setFinished(true)
          return
        }
        if (!reduced) timer = setTimeout(() => void draw().catch(fail), index === 1 ? 0 : duration)
      }
      await draw()
    }
    function fail() { if (!stopped) setFallback(true) }
    void run().catch(fail)
    return () => { stopped = true; observer.disconnect(); controller.abort(); clearTimeout(timer); cancelAnimationFrame(animationFrame); decoder?.close() }
  }, [src, finalSrc, frames, frameDuration, aspectRatio])

  return <div className="relative">
    {fallback ? <img src={posterSrc} alt={alt} style={{ aspectRatio }} className="w-full object-contain" /> : <canvas ref={canvas} role="img" aria-label={alt} data-finished={finished} style={{ aspectRatio }} className="w-full object-contain" />}
    {!fallback && <div className="mx-6 mb-5 min-h-9">{finished ? <span className="inline-block py-2 text-xs text-[#5c7c66]">Alle Bauteile im Blick</span> : <button type="button" onClick={() => { pausedRef.current = !paused; setPaused(!paused) }} aria-pressed={paused} className="rounded-full border border-[#c6d9ca] px-4 py-2 text-xs text-[#1b6842]">{paused ? 'Animation abspielen' : 'Animation pausieren'}</button>}</div>}
  </div>
}
