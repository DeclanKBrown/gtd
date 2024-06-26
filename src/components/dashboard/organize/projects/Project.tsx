'use client'

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { ProjectStatus } from '@prisma/client'
import Link from 'next/link'

interface ProjectProps {
  project: {
    id: string
    name: string
    description: string
    status: ProjectStatus
    userId: string
    createdAt: string
    updatedAt: string
  }
}

const Project = ({ project }: ProjectProps) => {
  const utils = trpc.useUtils()
  const { mutate: updateProjectStatus } = trpc.updateProject.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Project updated',
        variant: 'default',
      })
      utils.getProjects.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating project',
        variant: 'destructive',
      })
    },
  })

  const handleUpdateProjectStatus = async (status: ProjectStatus) => {
    await updateProjectStatus({ id: project.id, data: { status: status } })
  }

  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="h-[110px] max-h-[110px] overflow-hidden hover:bg-accent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                    fill={
                      project.status === 'COMPLETED'
                        ? '#16a34a'
                        : project.status === 'NOT_STARTED'
                          ? '#525252'
                          : '#60a5fa'
                    }
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1">
                <Button
                  variant={project.status === 'ACTIVE' ? 'secondary' : 'ghost'}
                  onClick={(event) => {
                    event.preventDefault()
                    handleUpdateProjectStatus('ACTIVE')
                  }}
                >
                  Active
                </Button>
                <Button
                  variant={
                    project.status === 'NOT_STARTED' ? 'secondary' : 'ghost'
                  }
                  onClick={(event) => {
                    event.preventDefault()
                    handleUpdateProjectStatus('NOT_STARTED')
                  }}
                >
                  Not Started
                </Button>
                <Button
                  variant={
                    project.status === 'COMPLETED' ? 'secondary' : 'ghost'
                  }
                  onClick={(event) => {
                    event.preventDefault()
                    handleUpdateProjectStatus('COMPLETED')
                  }}
                >
                  Completed
                </Button>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="w-full overflow-hidden">
          <p className="text-xs text-muted-foreground">
            {project.description.length > 100
              ? project.description.substring(0, 60) + '...'
              : project.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default Project
