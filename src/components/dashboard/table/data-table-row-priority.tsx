'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { priorityOptions } from '@/lib/constants'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { useState } from 'react'

interface PriorityData {
  label: string
  value: string
  icon: (props: IconProps) => JSX.Element
}

interface InboxRowPriorityProps {
  priority: PriorityData
  onPriorityChange: (newPriority: string) => void
}

export function RowPriority({
  priority,
  onPriorityChange,
}: InboxRowPriorityProps) {
  const [selectedPriority, setSelectedPriority] = useState(priority)

  const handlePriorityChange = (newPriority: PriorityData) => {
    setSelectedPriority(newPriority)
    onPriorityChange(newPriority.value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 p-0 px-2 data-[state=open]:bg-muted"
        >
          {selectedPriority?.icon && (
            <selectedPriority.icon
              className={`mr-2 h-4 w-4 ${
                selectedPriority.value === 'CRITICAL'
                  ? 'text-red-800'
                  : selectedPriority.value === 'HIGH'
                    ? 'text-red-500'
                    : selectedPriority.value === 'MEDIUM'
                      ? 'text-yellow-300'
                      : 'text-blue-500'
              }`}
            />
          )}
          {selectedPriority.label}
          <span className="sr-only">Change Priority</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {priorityOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handlePriorityChange(option as PriorityData)}
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
