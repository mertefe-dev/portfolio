function About() {
  const highlights = [
    {
      tag: 'Education',
      title: 'B.Sc. Computer Engineering',
      subtitle: 'Izmir Katip Celebi University',
      description:
        '1st-year student (%100 English program) building a solid foundation in programming logic, algorithms, and calculus.'
    },
    {
      tag: 'Community & Tech',
      title: 'TechOps Trainee (Backend)',
      subtitle: 'IEEE IKCU Student Branch',
      description:
        'Developing backend fundamentals and building modern web projects within the Technical Operations team.'
    },
    {
      tag: 'Work Experience',
      title: 'Part-Time IT Student Staff',
      subtitle: 'IKCU IT Department',
      description:
        'Authored institutional user manuals and technical documentation for university information system (UBYS) software modules.'
    },
    {
      tag: 'Technical Focus',
      title: 'C & Backend Development',
      subtitle: 'Core Engineering Interests',
      description:
        'Focusing on low-level C programming, system fundamentals, and interactive web applications.'
    }
  ]

  const skills = [
    'C Programming',
    'JavaScript',
    'React & Vite',
    'HTML5 & CSS3',
    'Git & GitHub',
    'Technical Documentation'
  ]

  return (
    <section id="about">
      <h2>About Me</h2>

      <p className="about-intro">
        I am a 1st-year Computer Engineering student at Izmir Katip Celebi University, passionate about
        understanding how software works from the ground up and applying it through hands-on projects.
      </p>

      <div className="about-grid">
        {highlights.map((item, index) => (
          <div className="about-card" key={index}>
            <span className="about-card-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p className="about-card-sub">{item.subtitle}</p>
            <p className="about-card-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="skills-wrapper">
        <h3>Skills &amp; Tools</h3>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span className="skill-badge" key={index}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About