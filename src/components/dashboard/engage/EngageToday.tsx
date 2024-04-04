'use client'

import { trpc } from '@/app/_trpc/Client'
import TableNonConfig from '../table/TableNonConfig'
import { endOfDay, startOfDay } from 'date-fns'

// Simulate a database read for tasks.

const EngageToday = () => {
  const start = startOfDay(new Date()).toISOString()
  const end = endOfDay(new Date()).toISOString()

  const { data: tasks, isLoading } = trpc.getEngageTasks.useQuery({
    startOfPeriod: start,
    endOfPeriod: end,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(tasks)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">
        Todays Next Actions are displayed here. Once all are completed,
        tomorrow&apos;s Next Actions will be displayed.
      </p>
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageToday
