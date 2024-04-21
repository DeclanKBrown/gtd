import { RowStatus } from '../../../dashboard/table/data-table-row-status'
import RowDate from '../../../dashboard/table/data-table-row-date'
import { RowPriority } from '../../../dashboard/table/data-table-row-priority'
import { priorityOptions, statusOptions } from '@/lib/constants'

interface MobileCardContentProps {
  task: any
}

const DemoMobileCardContent = ({ task }: MobileCardContentProps) => {
  const handleStatusChange = (newStatus: string) => {}

  const status = statusOptions.find((status) => status.value === task.status)

  const handleGoalCompletedChange = (newStatus: Date) => {}

  return (
    <div className="flex flex-row items-center justify-between gap-1">
      {/* @ts-ignore */}
      <RowStatus status={status} onStatusChange={handleStatusChange} />
      <RowDate
        goalCompleted={task.goalCompletedAt}
        onSelect={handleGoalCompletedChange}
      />
    </div>
  )
}

export default DemoMobileCardContent
