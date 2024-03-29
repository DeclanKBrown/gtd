import TableSimple from '../../table/TableSimple'
import { Task } from '../../table/data/schema'

const ReviewWaitingFor = () => {
  const tasks = [] as Task[]

  return <TableSimple data={tasks} />
}

export default ReviewWaitingFor
