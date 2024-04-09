'use client'

import { trpc } from '@/app/_trpc/Client'
import Project from './Project'
import { Loader } from '@/components/Loader'

const Projects = () => {
  const { data: projects, isLoading } = trpc.getProjects.useQuery()

  /* LOADING */
  if (isLoading) {
    return <Loader />
  }

  /* ERROR */
  if (!projects) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>Error</h1>
      </div>
    )
  }

  /* EMPTY */
  if (projects.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl">
        <h1>No projects found</h1>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* @ts-ignore */}
        {projects &&
          projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
      </div>
    </div>
  )
}

export default Projects
