import { trpc } from '@/app/_trpc/temp'
import { toast } from '@/components/ui/use-toast'
import { RowProject } from '../data-table-row-project'
import RowName from '../data-table-row-name'
import React from 'react'

interface MobileCardHeaderProps {
  projects: any
  task: any
}

const MobileCardHeader = ({ projects, task }: MobileCardHeaderProps) => {
  const utils = trpc.useUtils()

  const { mutate: updateProject } = trpc.updateTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated',
        variant: 'default',
      })
      utils.getProjectTasks.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating task',
        variant: 'destructive',
      })
    },
  })

  const handleProjectChange = (newProjectId: string) => {
    updateProject({
      id: task.id,
      data: { projectId: newProjectId },
    })
  }

  /* Update Task */
  const { mutate: updateTaskName } = trpc.updateTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating task',
        variant: 'destructive',
      })
    },
  })

  const handleNameChange = (newName: string) => {
    updateTaskName({
      id: task.id,
      data: {
        name: newName,
      },
    })
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <RowProject
        projects={projects}
        projectId={task.projectId}
        onProjectChange={handleProjectChange}
      />
      <RowName title={task.name} onSave={handleNameChange} />
    </div>
  )
}

export default MobileCardHeader
