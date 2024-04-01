'use client'

import { ColumnDef } from '@tanstack/react-table'

import { statusOptions } from '@/lib/constants'
import { Task } from './data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { RowStatus } from './data-table-row-status'
import { RowProject } from './data-table-row-project'
import InboxRowName from './data-table-row-name'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'

export const MinimalColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      let project
      // TODO: Query all active projects and find
      // const project = projects.find((proj) => proj.value === row.original.label)

      if (!project) {
        project = {
          label: 'choose',
        }
      }

      const handleProjectChange = (newProject: string) => {
        console.log('New project:', newProject)
      }

      const utils = trpc.useUtils()

      const { mutate: updateTaskName } = trpc.updateTask.useMutation({
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Task updated',
            variant: 'default',
          })
          utils.getInboxTasks.reset()
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

      const handleSave = (newTitle: string) => {
        updateTaskName({
          id: row.original.id,
          data: {
            name: newTitle,
          },
        })
      }

      return (
        <div className="flex items-center space-x-2">
          <RowProject
            project={project.label}
            onProjectChange={handleProjectChange}
          />
          <InboxRowName title={row.getValue('name')} onSave={handleSave} />
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statusOptions.find(
        (status) => status.value === row.getValue('status'),
      )

      if (!status) {
        return null
      }

      const utils = trpc.useUtils()

      const { mutate: updateTaskStatus } = trpc.updateTask.useMutation({
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Task updated',
            variant: 'default',
          })
          utils.getInboxTasks.reset()
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

      const handleStatusChange = (newStatus: string) => {
        updateTaskStatus({
          id: row.original.id,
          data: {
            status: newStatus,
          },
        })
      }
      return <RowStatus status={status} onStatusChange={handleStatusChange} />
    },
  },
]
