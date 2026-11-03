// `tone` adjusts logos that don't sit well on the light background:
// light = white logo, faint = pale logo, boxed = coloured text on a white box
const partners = [
  { name: 'Auckland Council', logo: '/logos/partner-1.png' },
  { name: 'Tokona Te Raki', logo: '/logos/partner-2.png', tone: 'light' },
  { name: 'Great South', logo: '/logos/partner-3.png', tone: 'boxed' },
  { name: 'Foundation North', logo: '/logos/partner-4.png' },
  { name: 'J R McKenzie Trust', logo: '/logos/partner-5.png', tone: 'faint' },
  { name: 'Antarctica New Zealand', logo: '/logos/partner-6.png' },
  { name: 'Milford Opportunities', logo: '/logos/partner-8.png', tone: 'light' },
  { name: 'Rio Tinto NZAS', logo: '/logos/partner-9.png' },
  { name: 'Te Rūnanga o Ngāi Tahu', logo: '/logos/partner-10.png' },
]

function Collabs() {
  return (
    <section className="collabs section">
      <div className="container collabs-layout">
        <div className="collabs-intro" data-reveal>
          <span className="eyebrow">Who we work with</span>
          <p>We collaborate with iwi, industry, research institutes and regional organisations.</p>
        </div>

        <ul className="partner-grid">
          {partners.map((partner) => (
            <li key={partner.name} className="partner-cell" data-reveal>
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className={partner.tone ? `partner-logo partner-logo-${partner.tone}` : 'partner-logo'}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Collabs
