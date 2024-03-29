'use client'

import { ColumnDef } from '@tanstack/react-table'

import { labels, statuses } from '../table/data/data'
import { Task } from '../table/data/schema'
import { DataTableColumnHeader } from '../table/data-table-column-header'
import { RowStatus } from '../table/data-table-row-status'
import { RowProject } from '../table/data-table-row-project'
import InboxRowName from '../table/data-table-row-name'

export const InboxColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
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
          <RowProject
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
]
