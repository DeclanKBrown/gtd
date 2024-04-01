'use client'

import TableSimple from '../table/TableSimple'
import { trpc } from '@/app/_trpc/Client'

const Process = () => {
  const { data: tasks, isLoading } = trpc.getInboxTasks.useQuery()
  console.log(tasks)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <TableSimple data={tasks} />
}

export default Process
