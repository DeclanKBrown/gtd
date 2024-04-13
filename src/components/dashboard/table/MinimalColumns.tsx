'use client'

import { ColumnDef } from '@tanstack/react-table'

import { statusOptions } from '@/lib/constants'
import { DataTableColumnHeader } from './data-table-column-header'
import { RowStatus } from './data-table-row-status'
import { RowProject } from './data-table-row-project'
import InboxRowName from './data-table-row-name'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'
import { Task } from '@prisma/client'

export const MinimalColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, table }) => {
      const projectId = row.original.projectId

      // @ts-ignore
      const projects = table.options.meta.projects

      const utils = trpc.useUtils()

      /* Update Project */
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
          id: row.original.id,
          data: { projectId: newProjectId },
        })
      }

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

      const handleSave = (newName: string) => {
        updateTaskName({
          id: row.original.id,
          data: {
            name: newName,
          },
        })
      }

      return (
        <div className="flex items-center space-x-2">
          <RowProject
            projects={projects}
            // @ts-ignore
            projectId={projectId}
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
          utils.getOrganizeTasks.reset()
          utils.getEngageTasks.reset()
          utils.getEngageTodayTasks.reset()
          utils.getPastWeekEngageTask.reset()
          utils.getSomedayForTasks.reset()
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
