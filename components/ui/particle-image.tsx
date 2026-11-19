'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const vertexShader = `
uniform float uTime;
uniform float uReveal;
uniform float uDpr;
uniform vec2 uSize;
uniform vec3 uTrail[12];
attribute vec2 aUv;
attribute float aSeed;
varying vec2 vUv;
varying float vScatter;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vUv=aUv; vec2 pos=position.xy; float power=0.;
 for(int i=0;i<12;i++){vec2 d=(aUv-uTrail[i].xy)*uSize;power=max(power,exp(-dot(d,d)/2300.)*uTrail[i].z);}
 float grain=noise(aUv*35.+uTime*.25);
 float entrance=(1.-uReveal)*(0.4+grain);
 float strength=power*.48+entrance;
 float angle=aSeed*6.28318+noise(aUv*12.+uTime*.18)*3.;
 pos+=vec2(cos(angle),sin(angle))*strength*(5.+aSeed*24.);
 vScatter=clamp(strength,0.,1.);
 gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,0.,1.);
 gl_PointSize=(mix(2.3,1.25,vScatter))*uDpr;
}`
const fragmentShader = `
uniform sampler2D uImage;
uniform vec2 uCrop;
uniform float uReveal;
varying vec2 vUv;
varying float vScatter;
void main(){
 vec2 uv=(vUv-.5)*uCrop+.5;
 uv.x+=(1.-uCrop.x)*.35;
 vec4 color=texture2D(uImage,uv);
 float edge=mix(1.,1.-smoothstep(.3,.5,length(gl_PointCoord-.5)),smoothstep(0.,.15,vScatter));
 gl_FragColor=vec4(color.rgb,edge*mix(1.,.9,vScatter)*smoothstep(0.,.25,uReveal));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`

export default function ParticleImage({ src, alt }: { src: string; alt: string }) {
  const host = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const container = host.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    let cleanup = () => {}
    import('three').then(THREE => {
      if (cancelled) return
      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }) } catch { return }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.className = 'absolute inset-0 h-full w-full'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      container.appendChild(renderer.domElement)
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10)
      camera.position.z = 2
      const trail = Array.from({ length: 12 }, () => new THREE.Vector3(-10, -10, 0))
      const uniforms = { uTime: { value: 0 }, uReveal: { value: 0 }, uDpr: { value: renderer.getPixelRatio() }, uSize: { value: new THREE.Vector2() }, uCrop: { value: new THREE.Vector2(1, 1) }, uImage: { value: null as InstanceType<typeof THREE.Texture> | null }, uTrail: { value: trail } }
      const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false })
      let geometry = new THREE.BufferGeometry()
      const points = new THREE.Points(geometry, material)
      points.frustumCulled = false
      scene.add(points)
      let loaded = false, visible = false, frame = 0, last = 0, cursor = 0, reveal = 0
      let imageWidth = 1, imageHeight = 1
      const resize = () => {
        const w = container.clientWidth, h = container.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h)
        camera.left = -w / 2; camera.right = w / 2; camera.top = h / 2; camera.bottom = -h / 2; camera.updateProjectionMatrix()
        uniforms.uSize.value.set(w, h)
        const ratio = imageWidth / imageHeight, box = w / h
        uniforms.uCrop.value.set(box < ratio ? box / ratio : 1, box > ratio ? ratio / box : 1)
        const step = Math.max(1, Math.sqrt(w * h / 300000))
        const nx = Math.ceil(w / step), ny = Math.ceil(h / step)
        const positions = new Float32Array(nx * ny * 3), uv = new Float32Array(nx * ny * 2), seeds = new Float32Array(nx * ny)
        for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
          const i = y * nx + x, u = (x + .5) / nx, v = (y + .5) / ny
          positions[i * 3] = (u - .5) * w; positions[i * 3 + 1] = (v - .5) * h
          uv[i * 2] = u; uv[i * 2 + 1] = v; seeds[i] = Math.random()
        }
        geometry.dispose(); geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); geometry.setAttribute('aUv', new THREE.BufferAttribute(uv, 2)); geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1)); points.geometry = geometry
      }
      const texture = new THREE.TextureLoader().load(src, tex => {
        if (cancelled) { tex.dispose(); return }
        tex.colorSpace = THREE.SRGBColorSpace
        imageWidth = tex.image.width; imageHeight = tex.image.height
        uniforms.uImage.value = tex; loaded = true; resize()
      })
      const tick = (time: number) => {
        if (cancelled) return
        const dt = Math.min((time - last) / 1000, .05); last = time
        if (visible && loaded && !document.hidden) {
          reveal = Math.min(1, reveal + dt / 1.35)
          uniforms.uReveal.value = 1 - Math.pow(1 - reveal, 3)
          uniforms.uTime.value = time / 1000
          for (const point of trail) point.z *= Math.exp(-dt * 2.8)
          renderer.render(scene, camera)
          if (!container.dataset.particleReady) { container.dataset.particleReady = 'true' }
        }
        frame = requestAnimationFrame(tick)
      }
      const pointer = (event: PointerEvent) => {
        const r = container.getBoundingClientRect()
        trail[cursor].set((event.clientX - r.left) / r.width, 1 - (event.clientY - r.top) / r.height, 1)
        cursor = (cursor + 1) % trail.length
      }
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { reveal = 0; trail.forEach(p => p.z = 0) } }, { threshold: .15 })
      observer.observe(container)
      const ro = new ResizeObserver(resize); ro.observe(container)
      container.addEventListener('pointermove', pointer)
      container.addEventListener('pointerdown', pointer)
      resize(); frame = requestAnimationFrame(tick)
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); ro.disconnect(); container.removeEventListener('pointermove', pointer); container.removeEventListener('pointerdown', pointer); geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose(); renderer.domElement.remove(); delete container.dataset.particleReady }
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [src])
  return <div ref={host} className="absolute inset-0 overflow-hidden bg-[#e6ece6]" style={{ touchAction: 'pan-y' }}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover object-[85%_center]" /></div>
}
