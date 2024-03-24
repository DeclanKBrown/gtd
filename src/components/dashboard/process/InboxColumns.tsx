'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'

import { labels, priorities, statuses } from '../table/data/data'
import { Task } from '../table/data/schema'
import { InboxColumnHeader } from './InboxColumnHeader'
import { InboxRowActions } from './InboxRowActions'
import { InboxRowPriority } from './InboxRowPriority'
import { InboxRowStatus } from './InboxRowStatus'

export const InboxColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <InboxColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
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
