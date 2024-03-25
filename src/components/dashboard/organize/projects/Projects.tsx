import Project from './Project'

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'Project 1',
      status: 'ACTIVE',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Project 2',
      status: 'NOT_STARTED',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      name: 'Project 3',
      status: 'ARCHIVED',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ',
    },
  ]

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
