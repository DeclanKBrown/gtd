'use client'

import { trpc } from '@/app/_trpc/Client'
import Project from './Project'

const Projects = () => {
  const { data: projects, isLoading } = trpc.getProjects.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects &&
          projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
      </div>
    </div>
  )
}

export default Projects
