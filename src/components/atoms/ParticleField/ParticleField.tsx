import { useEffect, useRef } from 'react'

const COUNT = 120
const MOUSE_RADIUS = 130
const REPEL = 0.45

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(0)
  const starsRef = useRef<Star[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const spawn = () => {
      starsRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      spawn()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    const getColor = () =>
      document.documentElement.classList.contains('light') ? '15,23,42' : '255,255,255'

    const tick = () => {
      frameRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const color = getColor()

      for (const s of starsRef.current) {
        const t = Math.sin(frameRef.current * s.twinkleSpeed + s.twinklePhase)
        const opacity = s.baseOpacity * (0.5 + 0.5 * t)

        const dx = s.x - mouse.current.x
        const dy = s.y - mouse.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL
          s.vx += (dx / dist) * force
          s.vy += (dy / dist) * force
        }

        s.vx *= 0.95
        s.vy *= 0.95
        s.x = (s.x + s.vx + canvas.width) % canvas.width
        s.y = (s.y + s.vy + canvas.height) % canvas.height

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${opacity.toFixed(3)})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    if (reducedMotion) {
      const color = getColor()
      for (const s of starsRef.current) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${(s.baseOpacity * 0.5).toFixed(3)})`
        ctx.fill()
      }
    } else {
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
