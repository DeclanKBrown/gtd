import { trpc } from '@/app/_trpc/Client'
import TableSimple from '../../table/TableSimple'
import { endOfWeek, startOfWeek } from 'date-fns'
import { Loader } from '@/components/Loader'

const ReviewNextAction = () => {
  const startOfCurrentWeek = startOfWeek(new Date()).toISOString()

  const endOfCurrentWeek = endOfWeek(new Date(), {
    weekStartsOn: 1,
  }).toISOString()

  const { data: tasks, isLoading } = trpc.getPastWeekEngageTask.useQuery({
    startOfWeek: startOfCurrentWeek,
    endOfWeek: endOfCurrentWeek,
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

  /* @ts-ignore */
  return <TableSimple data={tasks} />
}

export default ReviewNextAction
