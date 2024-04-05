'use client'

import { endOfTomorrow, startOfTomorrow } from 'date-fns'
import TableNonConfig from '../table/TableNonConfig'
import { trpc } from '@/app/_trpc/Client'
import { Loader } from '@/components/Loader'

const EngageTomorrow = () => {
  const startTomorrow = startOfTomorrow().toISOString()
  const endTomorrow = endOfTomorrow().toISOString()

  const { data: tasks, isLoading } = trpc.getEngageTasks.useQuery({
    startOfPeriod: startTomorrow,
    endOfPeriod: endTomorrow,
  })

  /* LOADING */
  if (isLoading) {
    return <Loader />
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
        <h1>No tasks found</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">Tomorrow&apos;s Next Actions List</p>
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageTomorrow
