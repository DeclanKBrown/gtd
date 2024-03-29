import TableSimple from '../../table/TableSimple'
import { Task } from '../../table/data/schema'

const ReviewPastCalendar = () => {
  const tasks = [] as Task[]

  return <TableSimple data={tasks} />
}

export default ReviewPastCalendar
