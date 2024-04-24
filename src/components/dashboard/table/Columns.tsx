'use client'

import { ColumnDef } from '@tanstack/react-table'

import { RowPriority } from './data-table-row-priority'
import { RowStatus } from './data-table-row-status'
import { RowProject } from './data-table-row-project'
import RowName from './data-table-row-name'
import { DataTableColumnHeader } from './data-table-column-header'
import RowDate from './data-table-row-date'
import { Task } from '@prisma/client'
import { trpc } from '@/app/_trpc/client'
import { toast } from '@/components/ui/use-toast'
import { priorityOptions, statusOptions } from '@/lib/constants'

export const Columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, table }) => {
      const projectId = row.original.projectId

      /* @ts-ignore */
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

      const handleSave = (newName: string) => {
        updateTaskName({
          id: row.original.id,
          data: {
            name: newName,
          },
        })
      }

      return (
        <div className="flex w-[425px] items-center space-x-2">
          <RowProject
            projects={projects}
            /* @ts-ignore */
            projectId={projectId}
            onProjectChange={handleProjectChange}
          />
          <RowName title={row.original.name} onSave={handleSave} />
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row, table }) => {
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'goal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Goal Completed" />
    ),
    cell: ({ row }) => {
      const utils = trpc.useUtils()

      const { mutate: updateGoalCompleted } = trpc.updateTask.useMutation({
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Task updated',
            variant: 'default',
          })
          utils.getOrganizeTasks.reset()
          utils.getInboxTasks.reset()
          utils.getEngageTasks.reset()
          utils.getEngageTodayTasks.reset()
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

      const handleGoalCompletedChange = (newStatus: Date) => {
        updateGoalCompleted({
          id: row.original.id,
          data: {
            goalCompletedAt: newStatus,
          },
        })
      }

      return (
        <RowDate
          goalCompleted={row.original.goalCompletedAt}
          onSelect={handleGoalCompletedChange}
        />
      )
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorityOptions.find(
        (priority) => priority.value === row.original.priority,
      )

      if (!priority) {
        return null
      }

      const utils = trpc.useUtils()

      const { mutate: updateTaskPriority } = trpc.updateTask.useMutation({
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Task updated',
            variant: 'default',
          })
          utils.getOrganizeTasks.reset()
          utils.getInboxTasks.reset()
          utils.getEngageTasks.reset()
          utils.getEngageTodayTasks.reset()
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

      const handlePriorityChange = (newStatus: string) => {
        updateTaskPriority({
          id: row.original.id,
          data: {
            priority: newStatus,
          },
        })
      }

      return (
        <RowPriority
          priority={priority}
          onPriorityChange={handlePriorityChange}
        />
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
