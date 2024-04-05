'use client'

import { trpc } from '@/app/_trpc/Client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface InboxRowProjectProps {
  projectId: string
  onProjectChange: (newProject: string) => void
}

export function RowProject({
  projectId,
  onProjectChange,
}: InboxRowProjectProps) {
  const { data: projects } = trpc.getProjects.useQuery()
  console.log(projects)

  const project = projects?.find((proj) => proj.id === projectId)

  const handleProjectChange = (projectId: string) => {
    onProjectChange(projectId)
  }

  if (!projects) {
    return <span>Loading</span>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0">
          <Badge variant="outline">
            {project ? project.name : 'Choose Project'}
            <span className="sr-only">Change Project</span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {projects &&
          projects?.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => handleProjectChange(option.id)}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
