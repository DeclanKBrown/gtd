'use client'

import TableSimple from '../table/TableSimple'
import { trpc } from '@/app/_trpc/Client'

const Process = () => {
  const { data: tasks, isLoading } = trpc.getInboxTasks.useQuery()

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

  return <TableSimple data={tasks} />
}

export default Process
