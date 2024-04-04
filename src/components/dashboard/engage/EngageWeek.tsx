'use client'
import { trpc } from '@/app/_trpc/Client'
import TableNonConfig from '../table/TableNonConfig'
import { endOfWeek, startOfWeek } from 'date-fns'

const EngageWeek = () => {
  const startWeek = startOfWeek(new Date()).toISOString()
  const endWeek = endOfWeek(new Date()).toISOString()

  const { data: tasks, isLoading } = trpc.getEngageTasks.useQuery({
    startOfPeriod: startWeek,
    endOfPeriod: endWeek,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">
        This week&apos;s Next Actions List
      </p>
      <TableNonConfig data={tasks} />
    </div>
  )
}

export default EngageWeek
