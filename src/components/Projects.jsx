function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project-card">
        <div className="project-header">
          <h3>Personal Portfolio Website</h3>
          <a href="https://github.com/mertefe-dev" target="_blank" rel="noreferrer" className="project-link">
            View on GitHub ↗
          </a>
        </div>
        <p>
          My first web development project built from scratch to showcase my academic
          background and learning journey in software development.
        </p>
        <div className="tech-tags">
          <span>React</span>
          <span>JSX</span>
          <span>Vite</span>
          <span>CSS3</span>
        </div>
      </div>
    </section>
  )
}

export default Projects