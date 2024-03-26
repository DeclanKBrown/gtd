'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

interface InboxRowProjectProps {
  project: string
  onProjectChange: (newProject: string) => void
}

export function RowProject({ project, onProjectChange }: InboxRowProjectProps) {
  const [selectedProject, setSelectedProject] = useState(project)

  const handleProjectChange = (project: string) => {
    setSelectedProject(project)
    console.log(project)
    onProjectChange(project)
  }

  const projects = [
    'Personal',
    'Work',
    'Home',
    'Family',
    'Health',
    'Finance',
    'Social',
    'Learning',
    'Spiritual',
    'Other',
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0">
          <Badge variant="outline">
            {selectedProject}
            <span className="sr-only">Change Project</span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {projects.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleProjectChange(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
