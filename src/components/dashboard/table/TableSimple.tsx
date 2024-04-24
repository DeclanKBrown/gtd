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
import { MinimalColumns } from './MinimalColumns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Task } from '@prisma/client'
import { trpc } from '@/app/_trpc/client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import MobileCardHeader from './mobile/MobileCardHeader'
import MobileCardContent from './mobile/MobileCardContent'

interface InboxProps {
  data: Task[]
}
const TableSimple = <TData, TValue>({ data }: InboxProps) => {
  const columns = MinimalColumns as ColumnDef<Task>[]

  const { data: projects } = trpc.getProjects.useQuery()

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
                <MobileCardHeader projects={projects} task={item} />
              </CardHeader>
              <CardContent>
                <MobileCardContent task={item} />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default TableSimple
