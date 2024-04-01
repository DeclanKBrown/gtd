'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { statusOptions } from '@/lib/constants'

interface StatusData {
  label: string
  value: string
  icon: (props: IconProps) => JSX.Element
}

interface InboxRowStatusProps {
  status: StatusData
  onStatusChange: (newStatus: string) => void
}

export function RowStatus({ status, onStatusChange }: InboxRowStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState(status)

  const handleStatusChange = (status: StatusData) => {
    setSelectedStatus(status)
    onStatusChange(status.value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={selectedStatus.value === 'INBOX' ? 'ghost' : 'secondary'}
          className={`flex h-8 p-0 px-2 data-[state=open]:bg-muted ${
            selectedStatus.value === 'SOMEDAY'
              ? 'bg-neutral-800 hover:bg-neutral-700'
              : selectedStatus.value === 'WAITING'
                ? 'bg-yellow-500 hover:bg-yellow-400'
                : selectedStatus.value === 'NEXT_ACTION'
                  ? 'bg-blue-500 hover:bg-blue-400'
                  : selectedStatus.value === 'DONE'
                    ? 'bg-green-500 hover:bg-green-400'
                    : selectedStatus.value === 'DELEGATED'
                      ? 'bg-purple-500 hover:bg-purple-400'
                      : selectedStatus.value === 'ELIMINATED'
                        ? 'bg-red-500 hover:bg-red-400'
                        : 'bg-none'
          }`}
        >
          {selectedStatus?.icon && (
            <selectedStatus.icon className={`mr-2 h-4 w-4`} />
          )}
          {selectedStatus.label}
          <span className="sr-only">Change Status</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option as StatusData)}
          >
            {option.icon && (
              <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
