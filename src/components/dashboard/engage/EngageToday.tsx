'use client'

import { trpc } from '@/app/_trpc/Client'
import TableNonConfig from '../table/TableNonConfig'
import { endOfDay, startOfDay } from 'date-fns'

// Simulate a database read for tasks.

const EngageToday = () => {
  const startOfToday = startOfDay(new Date()).toISOString()
  const endOfToday = endOfDay(new Date()).toISOString()

  const { data: tasks, isLoading } = trpc.getEngageTasks.useQuery({
    startOfPeriod: startOfToday,
    endOfPeriod: endOfToday,
  })

  /* LOADING */
  if (isLoading) {
    return <div>Loading...</div>
  }

  /* ERROR */
  if (!tasks) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>Error</h1>
      </div>
    )
  }

  /* EMPTY */
  if (tasks.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl">
        <h1>No tasks Found</h1>
      </div>
    )
  }

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
