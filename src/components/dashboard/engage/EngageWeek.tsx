import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'
import { taskSchema } from '@/components/dashboard/table/data/schema'
import TableNonConfig from '../table/TableNonConfig'

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/components/dashboard/table/data/tasks.json'),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const EngageWeek = async () => {
  const tasks = await getTasks()

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
