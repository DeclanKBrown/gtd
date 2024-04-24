'use client'

import { trpc } from '@/app/_trpc/client'
import TableNonConfig from '../table/TableNonConfig'
import { endOfDay } from 'date-fns'
import { Loader } from '@/components/Loader'

const EngageToday = () => {
  const endOfToday = endOfDay(new Date()).toISOString()

  const {
    data: tasks,
    isLoading,
    error,
  } = trpc.getEngageTodayTasks.useQuery({
    endOfPeriod: endOfToday,
  })

  /* LOADING */
  if (isLoading) {
    return <Loader />
  }

  /* ERROR */
  if (error) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>Error</h1>
        <h1>{error.message}</h1>
      </div>
    )
  }

  /* EMPTY */
  if (!tasks || (Array.isArray(tasks) && tasks.length === 0)) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl">
        <h1>No tasks found</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">
        Todays Next Actions are displayed here. Once all are completed,
        tomorrow&apos;s Next Actions will be displayed.
      </p>
      {/* @ts-ignore */}
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageToday
