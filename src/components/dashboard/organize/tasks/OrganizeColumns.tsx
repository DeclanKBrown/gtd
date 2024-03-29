'use client'

import { ColumnDef } from '@tanstack/react-table'

import { labels, priorities, statuses } from '../../table/data/data'
import { Task } from '../../table/data/schema'
import { RowPriority } from '../../common/rowPriority'
import { RowStatus } from '../../common/rowStatus'
import { RowProject } from '../../common/rowProject'
import RowName from '../../common/rowName'
import { OrganizeColumnHeader } from './OrganizeColumnHeader'
import RowDate from '../../common/rowDate'

export const OrganizeColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <OrganizeColumnHeader column={column} title="Title" />
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
      <OrganizeColumnHeader column={column} title="Status" />
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
      <OrganizeColumnHeader column={column} title="Goal Completed" />
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
      <OrganizeColumnHeader column={column} title="Priority" />
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
