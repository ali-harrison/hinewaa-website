import { useEffect } from 'react'

function CustomCursor() {
  useEffect(() => {
    // Your custom poutama triangle SVG cursor
    const cursorSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1000 1000">
        <polygon fill="none" stroke="#2C5F4F" stroke-width="9" stroke-miterlimit="10" points="500,200 153.59,800 846.41,800"/>
        <polygon fill="none" stroke="#2C5F4F" stroke-width="5" stroke-miterlimit="10" points="500,301.17 240.19,751.17 759.81,751.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="330.93,601.17 244.32,751.17 417.53,751.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="413.4,451.17 326.79,601.17 500,601.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="500,301.17 413.4,451.17 586.6,451.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="586.6,451.17 500,601.17 673.21,601.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="673.21,601.17 586.6,751.17 759.81,751.17"/>
        <polygon fill="#C85A3E" stroke="#C85A3E" stroke-width="5" stroke-miterlimit="10" points="500,601.17 413.4,751.17 586.6,751.17"/>
        <polygon fill="none" stroke="#2C5F4F" stroke-width="5" stroke-miterlimit="10" points="500,248.26 196.89,773.26 803.11,773.26"/>
      </svg>
    `

    // Convert SVG to data URL
    const encodedSVG = encodeURIComponent(cursorSVG)
    const cursorDataURL = `data:image/svg+xml,${encodedSVG}`

    // Apply cursor to body (hotspot at tip of triangle: 500,200 scaled to 48px = 24,10)
    document.body.style.cursor = `url("${cursorDataURL}") 24 10, auto`

    // Apply cursor to all elements
    const style = document.createElement('style')
    style.textContent = `
      *, *::before, *::after {
        cursor: url("${cursorDataURL}") 24 10, auto !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.body.style.cursor = ''
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return null
}

export default CustomCursor
