import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import Inbox from '@/components/dashboard/process/Inbox'
import { taskSchema } from '@/components/dashboard/table/data/schema'
1
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Process your tasks and projects',
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/components/dashboard/table/data/tasks.json'),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const ProcessPage = async () => {
  const tasks = await getTasks()

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8">
          <div className="flex flex-col justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Process</h2>
            <p className="text-muted-foreground">
              Determine the next action of your inbox tasks
            </p>
          </div>
        </div>
        <div className="flex-1 flex-col space-y-8 px-8 pb-8 md:flex">
          <Inbox data={tasks} />
        </div>
      </div>
    </>
  )
}

export default ProcessPage
