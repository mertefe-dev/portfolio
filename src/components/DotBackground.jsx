import { useEffect, useRef } from 'react'

function DotBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const spacing = 28 // Noktalar arası mesafe
    const baseRadius = 1.35 // Normal nokta boyutu
    const maxRadius = 2.9 // İmleç tam üzerindeyken ulaşacağı maksimum boyut (abartısız)
    const influenceRadius = 95 // İmlecin etki alanı çapı

    const mouse = { x: -1000, y: -1000 }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const cols = Math.ceil(window.innerWidth / spacing) + 1
      const rows = Math.ceil(window.innerHeight / spacing) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + 14
          const y = j * spacing + 14

          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.hypot(dx, dy)

          // 0 (uzak) ile 1 (tam imleç altı) arasında yumuşak geçiş faktörü
          let t = 0
          if (dist < influenceRadius) {
            const normalized = 1 - dist / influenceRadius
            t = normalized * normalized * (3 - 2 * normalized) // Smoothstep eğrisi
          }

          const radius = baseRadius + (maxRadius - baseRadius) * t

          // Renk geçişi: Pasif gri (#94a3b8) -> Aktif siber mavi (#38bdf8)
          const r = Math.round(148 + (56 - 148) * t)
          const g = Math.round(163 + (189 - 163) * t)
          const b = Math.round(184 + (248 - 184) * t)
          const alpha = 0.24 + (0.95 - 0.24) * t

          // Yakındaki noktalara çok hafif mavi ışıma
          if (t > 0.05) {
            ctx.beginPath()
            ctx.arc(x, y, radius + 2.2 * t, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(56, 189, 248, ${0.22 * t})`
            ctx.fill()
          }

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="dot-canvas" aria-hidden="true" />
}

export default DotBackground