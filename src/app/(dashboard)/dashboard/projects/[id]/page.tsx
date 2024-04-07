import { Metadata } from 'next'
import { ScrollArea } from '@/components/ui/scroll-area'
import Project from '@/components/dashboard/project/Project'

export const metadata: Metadata = {
  title: 'Project',
  description: 'Project',
}

const ProjectsPage = async () => {
  return (
    <>
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8">
            <div className="flex flex-col justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Project</h2>
            </div>
          </div>
          <div className="flex-1 flex-col space-y-8 px-8 pb-8 md:flex">
            <Project />
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default ProjectsPage
