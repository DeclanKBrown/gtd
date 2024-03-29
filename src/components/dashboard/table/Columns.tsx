'use client'

import { ColumnDef } from '@tanstack/react-table'

import { labels, priorities, statuses } from './data/data'
import { Task } from './data/schema'
import { RowPriority } from './data-table-row-priority'
import { RowStatus } from './data-table-row-status'
import { RowProject } from './data-table-row-project'
import RowName from './data-table-row-name'
import { DataTableColumnHeader } from './data-table-column-header'
import RowDate from './data-table-row-date'

export const Columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const project = labels.find((label) => label.value === row.original.label)

      const handleProjectChange = (newProject: string) => {
        console.log('New project:', newProject)
      }

      const handleSave = (newTitle: string) => {
        console.log('New title:', newTitle)
      }

      return (
        <div className="flex items-center space-x-2">
          <RowProject
            project={project?.label || 'Choose Project'}
            onProjectChange={handleProjectChange}
          />
          <RowName title={row.getValue('title')} onSave={handleSave} />
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
      const status = statuses.find(
        (status) => status.value === row.getValue('status'),
      )

      if (!status) {
        return null
      }

      const handleStatusChange = (newStatus: string) => {
        console.log('New status:', newStatus)
      }
      return <RowStatus status={status} onStatusChange={handleStatusChange} />
    },
  },
  {
    accessorKey: 'goal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Goal Completed" />
    ),
    cell: ({ row }) => {
      const handleSelect = (date: Date) => {
        console.log('Selected date:', date)
      }

      return <RowDate goalCompleted={null} onSelect={handleSelect} />
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority'),
      )

      if (!priority) {
        return null
      }

      const handlePriorityChange = (newPriority: string) => {
        console.log('New priority:', newPriority)
      }

      return (
        <RowPriority
          priority={priority}
          onPriorityChange={handlePriorityChange}
        />
      )
    },
  },
]
