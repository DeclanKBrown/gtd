import { Task } from '../../table/data/schema'
import ReviewTable from '../ReviewTable'

const ReviewProjects = () => {
  const tasks = [] as Task[]

  return <ReviewTable data={tasks} />
}

export default ReviewProjects
