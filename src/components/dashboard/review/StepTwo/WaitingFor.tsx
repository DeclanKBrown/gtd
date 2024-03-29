import { Task } from '../../table/data/schema'
import ReviewTable from '../ReviewTable'

const ReviewWaitingFor = () => {
  const tasks = [] as Task[]

  return <ReviewTable data={tasks} />
}

export default ReviewWaitingFor
