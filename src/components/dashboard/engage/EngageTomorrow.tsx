'use client'

import { endOfTomorrow, startOfTomorrow } from 'date-fns'
import TableNonConfig from '../table/TableNonConfig'
import { trpc } from '@/app/_trpc/Client'

const EngageTomorrow = () => {
  const startTomorrow = startOfTomorrow().toISOString()
  const endTomorrow = endOfTomorrow().toISOString()

  const { data: tasks, isLoading } = trpc.getEngageTasks.useQuery({
    startOfPeriod: startTomorrow,
    endOfPeriod: endTomorrow,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">Tomorrow&apos;s Next Actions List</p>
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageTomorrow
