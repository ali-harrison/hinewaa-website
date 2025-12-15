function Services() {
  const services = [
    {
      number: '01',
      title: 'Strategic Design & Systems Thinking',
      description:
        'We design coherent, intergenerational strategies grounded in Kāi Tahu values - aligning iwi, regional, and national priorities to deliver enduring impact.',
    },
    {
      number: '02',
      title: 'Climate Innovation & Adaptation',
      description:
        'We bridge the gap between Indigenous knowledge and climate science - ensuring climate adaptation reflects Indigenous leadership and worldview.',
    },
    {
      number: '03',
      title: 'Regional Economic Development',
      description:
        'We help iwi and regions transition toward food and ocean economies that restore balance, resilience, and mana motuhake.',
    },
    {
      number: '04',
      title: 'Antarctic & Southern Ocean Governance',
      description:
        'We lead research on Indigenous voice in the Antarctic Treaty System and Southern Ocean governance - bringing Kāi Tahu perspectives to global environmental decision-making.',
    },
  ]

  return (
    <section className="services section" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            Our <em>Mahi</em>
          </h2>
          <p className="services-intro">
            We solve disconnection across strategy, climate, and economy -
            bringing Indigenous insight to global challenges.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
