'use client'

import { ColumnDef } from '@tanstack/react-table'

import { labels, priorities, statuses } from '../table/data/data'
import { Task } from '../table/data/schema'
import { InboxColumnHeader } from './InboxColumnHeader'
import { InboxRowActions } from './InboxRowActions'
import { InboxRowPriority } from './InboxRowPriority'
import { InboxRowStatus } from './InboxRowStatus'
import { InboxRowProject } from './InboxRowProject'
import InboxRowName from './InboxRowName'

export const InboxColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <InboxColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const project = labels.find((label) => label.value === row.original.label)

      if (!project) {
        return null
      }

      const handleProjectChange = (newProject: string) => {
        console.log('New project:', newProject)
      }

      const handleSave = (newTitle: string) => {
        console.log('New title:', newTitle)
      }

      return (
        <div className="flex items-center space-x-2">
          <InboxRowProject
            project={project.label}
            onProjectChange={handleProjectChange}
          />
          <InboxRowName title={row.getValue('title')} onSave={handleSave} />
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <InboxColumnHeader column={column} title="Status" />
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
      return (
        <InboxRowStatus status={status} onStatusChange={handleStatusChange} />
      )
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <InboxColumnHeader column={column} title="Priority" />
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
        <InboxRowPriority
          priority={priority}
          onPriorityChange={handlePriorityChange}
        />
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <InboxRowActions row={row} />,
  },
]
