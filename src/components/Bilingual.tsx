interface BilingualProps {
  reo: string
  english: string
  align?: 'center' | 'start'
}

const letters = (text: string) =>
  Array.from(text.normalize('NFC')).map((char, i) => (
    <span key={i} className="bilingual-char" style={{ '--i': i } as React.CSSProperties}>
      {char === ' ' ? ' ' : char}
    </span>
  ))

// A te reo label with its English meaning stacked directly beneath it. When the
// parent link or button is hovered or focused, the te reo rolls up out of view
// and the English rises into its place, letter by letter from left to right.
// Both labels share one grid cell, so the element is always as wide as the
// longer label and nothing around it shifts.
function Bilingual({ reo, english, align = 'center' }: BilingualProps) {
  return (
    <span className={`bilingual bilingual-${align}`}>
      <span className="bilingual-label bilingual-reo" aria-hidden="true">{letters(reo)}</span>
      <span className="bilingual-label bilingual-en" aria-hidden="true">{letters(english)}</span>
      <span className="visually-hidden">
        <span lang="mi">{reo}</span> ({english})
      </span>
    </span>
  )
}

export default Bilingual
