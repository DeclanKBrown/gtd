'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useState } from 'react'

interface ProjectType {
  id: number
  name: string
  status: string
  description: string
}

interface ProjectProps {
  project: ProjectType
}

const Project = ({ project }: ProjectProps) => {
  const [status, setStatus] = useState(project.status)

  return (
    <Card className="hover:bg-accent">
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
                    status === 'ACTIVE'
                      ? '#16a34a'
                      : status === 'NOT_STARTED'
                        ? '#525252'
                        : '#d97706'
                  }
                />
              </svg>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-1">
              <Button
                variant={status === 'ACTIVE' ? 'secondary' : 'ghost'}
                onClick={() => setStatus('ACTIVE')}
              >
                Active
              </Button>
              <Button
                variant={status === 'NOT_STARTED' ? 'secondary' : 'ghost'}
                onClick={() => setStatus('NOT_STARTED')}
              >
                Not Started
              </Button>
              <Button
                variant={status === 'ARCHIVED' ? 'secondary' : 'ghost'}
                onClick={() => setStatus('ARCHIVED')}
              >
                Archived
              </Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {project.description.length > 100
            ? project.description.substring(0, 100) + '...'
            : project.description}
        </p>
      </CardContent>
    </Card>
  )
}

export default Project
