import { Metadata } from 'next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EngageToday from '@/components/dashboard/engage/EngageToday'
import EngageTomorrow from '@/components/dashboard/engage/EngageTomorrow'
import EngageWeek from '@/components/dashboard/engage/EngageWeek'
import { ScrollArea } from '@/components/ui/scroll-area'

export const metadata: Metadata = {
  title: 'Engage',
  description: 'Engage in your next action tasks',
}

const EngagePage = () => {
  return (
    <>
      <ScrollArea className="h-screen pb-10 md:pb-0">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Engage</h2>
            </div>
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
              </TabsList>
              <TabsContent value="today">
                <EngageToday />
              </TabsContent>
              <TabsContent value="tomorrow">
                <EngageTomorrow />
              </TabsContent>
              <TabsContent value="week">
                <EngageWeek />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default EngagePage
