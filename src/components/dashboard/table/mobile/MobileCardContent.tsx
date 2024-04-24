import { trpc } from '@/app/_trpc/temp'
import { toast } from '@/components/ui/use-toast'
import { RowStatus } from '../data-table-row-status'
import RowDate from '../data-table-row-date'
import { RowPriority } from '../data-table-row-priority'
import { priorityOptions, statusOptions } from '@/lib/constants'

interface MobileCardContentProps {
  task: any
}

const MobileCardContent = ({ task }: MobileCardContentProps) => {
  const utils = trpc.useUtils()

  /* STATUS */
  const { mutate: updateTaskStatus } = trpc.updateTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated',
        variant: 'default',
      })
      utils.getInboxTasks.reset()
      utils.getOrganizeTasks.reset()
      utils.getEngageTasks.reset()
      utils.getEngageTodayTasks.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating task',
        variant: 'destructive',
      })
    },
  })

  const handleStatusChange = (newStatus: string) => {
    updateTaskStatus({
      id: task.id,
      data: {
        status: newStatus,
      },
    })
  }

  const status = statusOptions.find((status) => status.value === task.status)

  /* GOAL COMPLETED */
  const { mutate: updateGoalCompleted } = trpc.updateTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated',
        variant: 'default',
      })
      utils.getOrganizeTasks.reset()
      utils.getInboxTasks.reset()
      utils.getEngageTasks.reset()
      utils.getEngageTodayTasks.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating task',
        variant: 'destructive',
      })
    },
  })

  const handleGoalCompletedChange = (newStatus: Date) => {
    updateGoalCompleted({
      id: task.id,
      data: {
        goalCompletedAt: newStatus,
      },
    })
  }

  /* PRIORITY */
  const { mutate: updateTaskPriority } = trpc.updateTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task updated',
        variant: 'default',
      })
      utils.getOrganizeTasks.reset()
      utils.getInboxTasks.reset()
      utils.getEngageTasks.reset()
      utils.getEngageTodayTasks.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating task',
        variant: 'destructive',
      })
    },
  })

  const handlePriorityChange = (newStatus: string) => {
    updateTaskPriority({
      id: task.id,
      data: {
        priority: newStatus,
      },
    })
  }

  const priority = priorityOptions.find(
    (priority) => priority.value === task.priority,
  )

  return (
    <div className="flex flex-row items-center justify-between">
      {/* @ts-ignore */}
      <RowStatus status={status} onStatusChange={handleStatusChange} />
      <RowDate
        goalCompleted={task.goalCompletedAt}
        onSelect={handleGoalCompletedChange}
      />
      <RowPriority
        // @ts-ignore
        priority={priority}
        onPriorityChange={handlePriorityChange}
      />
    </div>
  )
}

export default MobileCardContent
