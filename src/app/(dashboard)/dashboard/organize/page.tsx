import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Organize } from '@/components/dashboard/organize/tasks/Organize'
import { taskSchema } from '@/components/dashboard/table/data/schema'
import { ScrollArea } from '@/components/ui/scroll-area'
import Projects from '@/components/dashboard/organize/projects/Projects'

export const metadata: Metadata = {
  title: 'Organize',
  description: 'Organize your tasks and projects',
}

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/components/dashboard/table/data/tasks.json'),
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const OrganizePage = async () => {
  const tasks = await getTasks()

  return (
    <>
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Organize</h2>
            </div>
            <Tabs defaultValue="tasks" className="space-y-4">
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="references">References</TabsTrigger>
              </TabsList>
              <TabsContent value="tasks">
                <Organize data={tasks} />
              </TabsContent>
              <TabsContent value="projects">
                <Projects />
              </TabsContent>
              {/* <TabsContent value="tasks">
                <Organize data={tasks} columns={columns} />
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default OrganizePage
