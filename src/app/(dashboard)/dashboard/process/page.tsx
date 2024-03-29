import Process from '@/components/dashboard/process/Process'
import { Metadata } from 'next'
import { ScrollArea } from '@/components/ui/scroll-area'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Process your tasks and projects',
}

const ProcessPage = async () => {
  return (
    <>
      <ScrollArea className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-8">
            <div className="flex flex-col justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Process</h2>
              <p className="text-muted-foreground">
                Determine the next action of the tasks in your inbox
              </p>
            </div>
          </div>
          <div className="flex-1 flex-col space-y-8 px-8 pb-8 md:flex">
            <Process />
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default ProcessPage
