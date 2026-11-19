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
        let index = 1
        const advance = () => {
          if (stopped) return
          if (document.hidden || !visible || pausedRef.current) { timer = setTimeout(advance, 100); return }
          if (!started) { started = true; timer = setTimeout(advance, 1000); return }
          paint(images[index]!, index)
          index += 1
          if (index === images.length) { setFinished(true); return }
          timer = setTimeout(advance, frameDuration)
        }
        advance()
        return
      }
      // Prepare the restored final frame before playback ends; leave the GIF's
      // last frame visible if the larger asset cannot be loaded.
      const sharpFrame = new Image()
      sharpFrame.src = finalSrc
      const sharpReady = sharpFrame.decode().then(() => sharpFrame).catch(() => null)
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
        element.width = image.displayWidth
        element.height = image.displayHeight
        context.drawImage(image, 0, 0)
        clearBackdrop(context, element.width, element.height)
        const duration = Math.max(20, (image.duration ?? 100000) / 1000)
        image.close()
        index += 1
        if (index >= decoder.tracks.selectedTrack.frameCount) {
          setFinished(true)
          const restored = await sharpReady
          if (!stopped && restored) {
            element.width = restored.naturalWidth
            element.height = restored.naturalHeight
            context.imageSmoothingEnabled = true
            context.imageSmoothingQuality = 'high'
            context.drawImage(restored, 0, 0)
          }
          return
        }
        if (!reduced) timer = setTimeout(() => void draw().catch(fail), index === 1 ? 0 : duration)
      }
      await draw()
    }
    function fail() { if (!stopped) setFallback(true) }
    void run().catch(fail)
    return () => { stopped = true; observer.disconnect(); controller.abort(); clearTimeout(timer); decoder?.close() }
  }, [src, finalSrc, frames, frameDuration, aspectRatio])

  return <div className="relative">
    {fallback ? <img src={posterSrc} alt={alt} style={{ aspectRatio }} className="w-full object-contain" /> : <canvas ref={canvas} role="img" aria-label={alt} data-finished={finished} style={{ aspectRatio }} className="w-full object-contain" />}
    {!fallback && <div className="mx-6 mb-5 min-h-9">{finished ? <span className="inline-block py-2 text-xs text-[#5c7c66]">Alle Bauteile im Blick</span> : <button type="button" onClick={() => { pausedRef.current = !paused; setPaused(!paused) }} aria-pressed={paused} className="rounded-full border border-[#c6d9ca] px-4 py-2 text-xs text-[#1b6842]">{paused ? 'Animation abspielen' : 'Animation pausieren'}</button>}</div>}
  </div>
}
