import { TableConfigurable } from '../../table/TableConfigurable'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'
import { taskSchema } from '@/components/dashboard/table/data/schema'

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/components/dashboard/table/data/tasks.json'),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const Organize = async () => {
  const tasks = await getTasks()

  return <TableConfigurable data={tasks} />
}

export default Organize