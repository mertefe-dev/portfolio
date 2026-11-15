import { useState } from 'react'
import ProjectCard from './ProjectCard'

const projectsData = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    category: 'Web Development',
    description:
      'My first web development project built from scratch to showcase my academic background and learning journey in software development.',
    githubUrl: 'https://github.com/mertefe-dev',
    tags: ['React', 'JSX', 'Vite', 'CSS3']
  },
  {
    id: 2,
    title: 'C Programming & Algorithms Lab',
    category: 'Systems & C',
    description:
      'A collection of structured C programs, algorithmic problem solutions, and memory management exercises developed during my first-year coursework.',
    githubUrl: 'https://github.com/mertefe-dev',
    tags: ['C', 'Algorithms', 'Data Structures', 'GCC']
  }
]

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Web Development', 'Systems & C']

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Projects</h2>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                border: selectedCategory === category ? '1px solid #38bdf8' : '1px solid rgba(148, 163, 184, 0.2)',
                background: selectedCategory === category ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                color: selectedCategory === category ? '#38bdf8' : '#cbd5e1',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            githubUrl={project.githubUrl}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects