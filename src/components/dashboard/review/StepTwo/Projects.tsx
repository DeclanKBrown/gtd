import { trpc } from '@/app/_trpc/Client'
import { Loader } from '@/components/Loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const ReviewProjects = () => {
  const { data: projects, isLoading } =
    trpc.getProgressOnActiveProjects.useQuery()

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
    <main className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects &&
          projects.map((project) => (
            <Card key={project.name} className="hover:bg-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex w-full flex-col gap-3 overflow-hidden">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold">
                    +{project.tasksCompleted}
                  </h2>
                  <h3 className="text-xs text-white/70">
                    Tasks completed this week
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <Progress value={30} />
                  <h3 className="text-xs text-white/70">
                    30% of your focus on this project
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  )
}

export default ReviewProjects
