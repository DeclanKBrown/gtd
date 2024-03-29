import { Metadata } from 'next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Organize from '@/components/dashboard/organize/tasks/Organize'
import { ScrollArea } from '@/components/ui/scroll-area'
import Projects from '@/components/dashboard/organize/projects/Projects'
import References from '@/components/dashboard/organize/references/References'

export const metadata: Metadata = {
  title: 'Organize',
  description: 'Organize your tasks and projects',
}

const OrganizePage = async () => {
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
                <Organize />
              </TabsContent>
              <TabsContent value="projects">
                <Projects />
              </TabsContent>
              <TabsContent value="references">
                <References />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default OrganizePage
