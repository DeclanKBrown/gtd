import { addWeeks, endOfWeek, startOfWeek } from 'date-fns'
import TableSimple from '../../table/TableSimple'
import { Loader } from '@/components/Loader'
import { trpc } from '@/app/_trpc/Client'

const ReviewUpcomingCalender = () => {
  const startOfNextWeek = startOfWeek(addWeeks(new Date(), 1)).toISOString()

  const endOfNextWeek = endOfWeek(addWeeks(new Date(), 1), {
    weekStartsOn: 1,
  }).toISOString()

  const { data: tasks, isLoading } = trpc.getPastCalenderTasks.useQuery({
    startOfWeek: startOfNextWeek,
    endOfWeek: endOfNextWeek,
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

  return <TableSimple data={tasks} />
}

export default ReviewUpcomingCalender
