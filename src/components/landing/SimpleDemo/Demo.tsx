'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Columns } from './Columns'
import { trpc } from '@/app/_trpc/Client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import DemoMobileCardContent from './mobile/MobileCardContent'
import DemoMobileCardHeader from './mobile/MobileCardHeader'

export type Task = {
  id: number
  name: string
  status: string
  projectId: number
}

const InboxDemo = () => {
  const data = [
    {
      id: 1,
      name: 'Do homework',
      status: 'NEXT_ACTION',
      projectId: 1,
      priority: 'MEDIUM',
    },
    {
      id: 2,
      name: 'Figure out $1,000,000,000 idea',
      status: 'INBOX',
      projectId: 2,
      priority: 'MEDIUM',
    },
    {
      id: 3,
      name: 'Push Day',
      status: 'DONE',
      projectId: 3,
      priority: 'MEDIUM',
    },
  ]

  const projects = [
    { id: 1, name: 'Study' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Fitness' },
  ]

  const columns = Columns as ColumnDef<Task>[]

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      projects,
    },
  })

  return (
    <>
      <div className="flex-1 space-y-4 p-8">
        <div className="flex flex-col justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Demo</h2>
          <p className="text-muted-foreground">
            Change the tasks project, name & status
          </p>
        </div>
      </div>
      <div className="flex-1 flex-col space-y-8 px-8 pb-8 md:flex">
        <div className="space-y-4">
          <div className="hidden rounded-md border md:flex">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Mobile Table */}
          <div className="flex flex-col gap-3 md:hidden">
            {data &&
              data.length &&
              data.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <DemoMobileCardHeader projects={projects} task={item} />
                  </CardHeader>
                  <CardContent>
                    <DemoMobileCardContent task={item} />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InboxDemo
