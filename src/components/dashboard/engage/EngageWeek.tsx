'use client'
import { trpc } from '@/app/_trpc/temp'
import TableNonConfig from '../table/TableNonConfig'
import { endOfWeek, startOfWeek } from 'date-fns'
import { Loader } from '@/components/Loader'

const EngageWeek = () => {
  const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString()
  // Week Starts Monday
  const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString()

  const {
    data: tasks,
    isLoading,
    error,
  } = trpc.getEngageTasks.useQuery({
    startOfPeriod: startWeek,
    endOfPeriod: endWeek,
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
        This week&apos;s Next Actions List
      </p>
      {/* @ts-ignore */}
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageWeek
