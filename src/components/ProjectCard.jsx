function ProjectCard({ title, description, githubUrl, tags, category }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <div>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {category}
          </span>
          <h3 style={{ marginTop: '0.25rem' }}>{title}</h3>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="project-link"
        >
          View on GitHub ↗
        </a>
      </div>
      <p>{description}</p>
      <div className="tech-tags">
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard