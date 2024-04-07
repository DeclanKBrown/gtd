'use client'

import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Project } from '@prisma/client'

import { useState } from 'react'

interface InboxRowProjectProps {
  projects: Project[]
  projectId: string
  onProjectChange: (newProjectId: string) => void
}

export function RowProject({
  projects,
  projectId,
  onProjectChange,
}: InboxRowProjectProps) {
  const [selectedProjectId, setSelectedProjectId] = useState(projectId)

  const selectedProject = projects?.find(
    (proj) => proj.id === selectedProjectId,
  )

  const handleProjectChange = (newProjectId: string) => {
    setSelectedProjectId(newProjectId)
    onProjectChange(newProjectId)
  }

  if (!projects) {
    return <span>Loading</span>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0">
          <Badge variant="outline">
            {selectedProject ? selectedProject.name : 'Choose Project'}
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
