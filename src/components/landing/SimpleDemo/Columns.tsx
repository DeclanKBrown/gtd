'use client'

import { ColumnDef } from '@tanstack/react-table'

import { statusOptions } from '@/lib/constants'
import { DataTableColumnHeader } from '../../dashboard/table/data-table-column-header'
import { RowStatus } from '../../dashboard/table/data-table-row-status'
import { RowProject } from '../../dashboard/table/data-table-row-project'
import InboxRowName from '../../dashboard/table/data-table-row-name'
import { Task } from './Demo'

export const Columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, table }) => {
      const projectId = row.original.projectId

      // @ts-ignore
      const projects = table.options.meta.projects

      const handleSave = (newName: string) => {}

      const handleProjectChange = (projectId: string) => {}

      return (
        <div className="flex w-[425px] items-center space-x-2">
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

      const handleStatusChange = (newStatus: string) => {}

      return <RowStatus status={status} onStatusChange={handleStatusChange} />
    },
  },
]
