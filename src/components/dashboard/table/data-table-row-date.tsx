import * as React from 'react'
import { format, differenceInCalendarDays, startOfDay } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface RowDateProps {
  goalCompleted: Date | null
  onSelect: (date: Date) => void
}

const RowDate = ({ goalCompleted, onSelect }: RowDateProps) => {
  console.log(goalCompleted)
  const [date, setDate] = React.useState<Date>(goalCompleted || new Date())
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      onSelect(selectedDate)
      setIsPopoverOpen(false)
    }
  }

  const getDisplayText = () => {
    const today = new Date()
    const difference = differenceInCalendarDays(date, today)
    if (difference === 0) {
      return 'Today'
    } else if (difference === 1) {
      return 'Tomorrow'
    } else {
      return format(date, 'PPP')
    }
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[180px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{getDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default RowDate
