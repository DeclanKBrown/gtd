import TableSimple from '../../table/TableSimple'
import { Task } from '../../table/data/schema'

const ReviewNextAction = () => {
  const tasks = [] as Task[]

  return <TableSimple data={tasks} />
}

export default ReviewNextAction
