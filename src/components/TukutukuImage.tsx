import { useEffect, useRef } from 'react'

interface Water {
  /** Top and bottom of the water, as fractions of the photo's height */
  from: number
  to: number
  /** Only move blue stitches, so birds and buildings in the water stay still */
  blueOnly?: boolean
}

interface TukutukuImageProps {
  src: string
  alt: string
  /** Size of one stitch cell in CSS pixels */
  cell?: number
  /** Where the water is, so it can ripple */
  water?: Water
  className?: string
}

const BACKGROUND = '#15130f'
const WEAVE_DURATION = 1400
const IDLE_FRAME_MS = 40 // ripple-only redraws are capped at ~25fps

// Draws a photo as a tukutuku panel: vertical reeds (kākaho) and horizontal
// laths (kaho), with cross-stitches whose weight follows the photo's brightness.
//  - Rows are woven in from the bottom the first time the panel scrolls into view.
//  - Water ripples and glints while the panel is on screen.
//  - With a mouse, a soft lens follows the cursor and lifts the stitches to show
//    the photo underneath.
function TukutukuImage({ src, alt, cell = 10, water, className }: TukutukuImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waterFrom = water?.from
  const waterTo = water?.to
  const blueOnly = water?.blueOnly ?? false

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const photo = document.createElement('canvas') // the photo, cropped to the panel
    const lens = document.createElement('canvas') // soft-edged window onto the photo
    const photoCtx = photo.getContext('2d')
    const lensCtx = lens.getContext('2d')
    if (!canvas || !ctx || !photoCtx || !lensCtx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = new Image()
    let small: HTMLCanvasElement | null = null // the photo shrunk smoothly, for sampling stitches

    // Halve the photo step by step so each stitch averages its area instead of
    // picking up single stray pixels
    const shrink = () => {
      let source: CanvasImageSource = img
      let w = img.width
      let h = img.height
      do {
        w = Math.max(1, Math.round(w / 2))
        h = Math.max(1, Math.round(h / 2))
        const step = document.createElement('canvas')
        step.width = w
        step.height = h
        const sctx = step.getContext('2d')
        if (!sctx) break
        sctx.imageSmoothingQuality = 'high'
        sctx.drawImage(source, 0, 0, w, h)
        source = step
        small = step
      } while (w > 480)
    }

    let width = 0
    let height = 0
    let dpr = 1
    let size = cell
    let cols = 0
    let rows = 0
    let pixels: Uint8ClampedArray | null = null
    let low = 0
    let range = 1
    let ripple = new Float32Array(0) // per row: 0 for dry rows, otherwise ripple strength
    let blue = new Uint8Array(0) // per stitch: 1 if it's water-coloured

    let loaded = false
    let inView = false
    let visible = false
    let weaveStart: number | null = reduceMotion ? -Infinity : null
    let frame = 0
    let running = false
    let lastDraw = 0
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, radius: 0, targetRadius: 0 }

    const sample = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = window.devicePixelRatio || 1
      for (const c of [canvas, photo, lens]) {
        c.width = Math.round(width * dpr)
        c.height = Math.round(height * dpr)
      }

      // Keep at least ~60 stitches across so small panels still read as an image
      size = Math.max(5, Math.min(cell, width / 60))
      cols = Math.max(1, Math.floor(width / size))
      rows = Math.max(1, Math.floor(height / size))

      // Shrink the photo to one pixel per stitch, cropped like object-fit: cover
      const grid = document.createElement('canvas')
      grid.width = cols
      grid.height = rows
      const gctx = grid.getContext('2d', { willReadFrequently: true })
      if (!gctx) return
      const source = small ?? img
      const scale = Math.max(cols / source.width, rows / source.height)
      const w = source.width * scale
      const h = source.height * scale
      const top = (rows - h) / 2
      gctx.imageSmoothingQuality = 'high'
      gctx.drawImage(source, (cols - w) / 2, top, w, h)
      pixels = gctx.getImageData(0, 0, cols, rows).data

      // Auto-levels: stretch the 2nd–98th percentile of brightness to the full range
      const lums: number[] = []
      for (let i = 0; i < pixels.length; i += 4) {
        lums.push(0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2])
      }
      lums.sort((a, b) => a - b)
      low = lums[Math.floor(lums.length * 0.02)]
      range = Math.max(1, lums[Math.floor(lums.length * 0.98)] - low)

      // Which rows are water, rippling a little more the further they are from the shore
      ripple = new Float32Array(rows)
      blue = new Uint8Array(rows * cols)
      if (waterFrom !== undefined && waterTo !== undefined) {
        for (let r = 0; r < rows; r++) {
          const y = (r + 0.5 - top) / h
          if (y >= waterFrom && y <= waterTo) {
            ripple[r] = 0.5 + 0.5 * ((y - waterFrom) / (waterTo - waterFrom))
          }
        }
        for (let i = 0; i < rows * cols; i++) {
          const red = pixels[i * 4]
          const green = pixels[i * 4 + 1]
          const b = pixels[i * 4 + 2]
          blue[i] = b > red + 12 && b >= green - 10 ? 1 : 0
        }
      }

      // The full photo, cropped to the panel, for the lens
      const pscale = Math.max(photo.width / img.width, photo.height / img.height)
      const pw = img.width * pscale
      const ph = img.height * pscale
      photoCtx.drawImage(img, (photo.width - pw) / 2, (photo.height - ph) / 2, pw, ph)
    }

    const level = (v: number) => Math.min(1, Math.max(0, (v - low) / range))
    // Levelled colour, lifted slightly so it reads on the dark ground
    const tone = (v: number) => Math.round(255 * (0.15 + 0.85 * level(v)))

    const draw = (now: number) => {
      if (!pixels) return
      const ox = (width - cols * size) / 2
      const oy = (height - rows * size) / 2
      const progress = weaveStart === null ? 0 : Math.min(1, (now - weaveStart) / WEAVE_DURATION)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = BACKGROUND
      ctx.fillRect(0, 0, width, height)

      // Lattice: reeds between columns, laths through each row
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(242, 238, 230, 0.05)'
      ctx.beginPath()
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(ox + c * size) + 0.5
        ctx.moveTo(x, oy)
        ctx.lineTo(x, oy + rows * size)
      }
      for (let r = 0; r < rows; r++) {
        const y = Math.round(oy + r * size + size / 2) + 0.5
        ctx.moveTo(ox, y)
        ctx.lineTo(ox + cols * size, y)
      }
      ctx.stroke()

      // Stitches, woven upwards from the bottom row
      const firstRow = Math.floor(rows * (1 - progress))
      const arm = size * 0.34
      ctx.lineCap = 'round'

      for (let r = rows - 1; r >= firstRow; r--) {
        // Water rows sample slightly to the side, swaying back and forth
        const strength = reduceMotion ? 0 : ripple[r]
        const shift = strength * 0.9 * Math.sin(now / 700 + r * 0.55)

        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4
          let red = pixels[i]
          let green = pixels[i + 1]
          let blueValue = pixels[i + 2]
          let glint = 1

          if (strength && (!blueOnly || blue[r * cols + c])) {
            const x = Math.min(cols - 1, Math.max(0, c + shift))
            const c0 = Math.floor(x)
            const c1 = Math.min(cols - 1, c0 + 1)
            const f = x - c0
            const a = (r * cols + c0) * 4
            const b = (r * cols + c1) * 4
            red = pixels[a] + (pixels[b] - pixels[a]) * f
            green = pixels[a + 1] + (pixels[b + 1] - pixels[a + 1]) * f
            blueValue = pixels[a + 2] + (pixels[b + 2] - pixels[a + 2]) * f
            glint = 1 + 0.14 * strength * Math.sin(now / 450 + c * 0.9 + r * 1.7)
          }

          const t = Math.min(1, level(0.2126 * red + 0.7152 * green + 0.0722 * blueValue) * glint)
          if (t < 0.2) continue

          ctx.strokeStyle = `rgba(${tone(red)}, ${tone(green)}, ${tone(blueValue)}, ${0.4 + 0.6 * t})`
          ctx.lineWidth = 0.8 + 1.6 * t

          const cx = ox + c * size + size / 2
          const cy = oy + r * size + size / 2
          ctx.beginPath()
          ctx.moveTo(cx - arm, cy + arm)
          ctx.lineTo(cx + arm, cy - arm)
          if (t > 0.42) {
            ctx.moveTo(cx - arm, cy - arm)
            ctx.lineTo(cx + arm, cy + arm)
          }
          ctx.stroke()
        }
      }

      // Lens: a soft-edged circle of the real photo under the cursor
      if (pointer.radius > 0.5) {
        const r = pointer.radius * dpr
        const cx = pointer.x * dpr
        const cy = pointer.y * dpr
        const x0 = Math.max(0, Math.floor(cx - r))
        const y0 = Math.max(0, Math.floor(cy - r))
        const x1 = Math.min(lens.width, Math.ceil(cx + r))
        const y1 = Math.min(lens.height, Math.ceil(cy + r))
        if (x1 > x0 && y1 > y0) {
          const gradient = lensCtx.createRadialGradient(cx, cy, 0, cx, cy, r)
          gradient.addColorStop(0, '#000')
          gradient.addColorStop(0.55, '#000')
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          lensCtx.globalCompositeOperation = 'source-over'
          lensCtx.clearRect(x0, y0, x1 - x0, y1 - y0)
          lensCtx.fillStyle = gradient
          lensCtx.fillRect(x0, y0, x1 - x0, y1 - y0)
          lensCtx.globalCompositeOperation = 'source-in'
          lensCtx.drawImage(photo, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0)

          ctx.setTransform(1, 0, 0, 1, 0, 0)
          ctx.drawImage(lens, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0)
        }
      }
    }

    const loop = (now: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.25
      pointer.y += (pointer.targetY - pointer.y) * 0.25
      pointer.radius += (pointer.targetRadius - pointer.radius) * 0.18

      const weaving = weaveStart !== null && now - weaveStart < WEAVE_DURATION
      const lensActive = pointer.targetRadius > 0 || pointer.radius > 0.5
      const rippling = visible && waterFrom !== undefined && !reduceMotion

      if (weaving || lensActive || now - lastDraw >= IDLE_FRAME_MS) {
        draw(now)
        lastDraw = now
      }

      if (weaving || lensActive || rippling) {
        frame = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }

    const start = () => {
      if (!loaded || running) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    const beginWeave = () => {
      if (loaded && inView && weaveStart === null) weaveStart = performance.now()
      start()
    }

    // Load the photo when the panel gets close to the viewport
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        nearby.disconnect()
        img.src = src
      },
      { rootMargin: '400px' },
    )

    // Weave once 20% is showing; only keep animating while on screen
    const onScreen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        inView = entry.intersectionRatio >= 0.2
        if (inView) beginWeave()
        else if (visible) start()
      },
      { threshold: [0, 0.2] },
    )

    const resize = new ResizeObserver(() => {
      if (!loaded) return
      sample()
      draw(performance.now())
    })

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = e.clientX - rect.left
      pointer.targetY = e.clientY - rect.top
      if (pointer.radius < 1) {
        pointer.x = pointer.targetX
        pointer.y = pointer.targetY
      }
      pointer.targetRadius = Math.min(130, Math.max(70, width * 0.16))
      start()
    }

    const onPointerLeave = () => {
      pointer.targetRadius = 0
      start()
    }

    img.onload = () => {
      loaded = true
      shrink()
      sample()
      draw(performance.now())
      beginWeave()
    }

    nearby.observe(canvas)
    onScreen.observe(canvas)
    resize.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(frame)
      nearby.disconnect()
      onScreen.disconnect()
      resize.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      img.onload = null
    }
  }, [src, cell, waterFrom, waterTo, blueOnly])

  return <canvas ref={canvasRef} className={`tukutuku ${className ?? ''}`} role="img" aria-label={alt} />
}

export default TukutukuImage
