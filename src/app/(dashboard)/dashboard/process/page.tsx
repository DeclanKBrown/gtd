import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Process your tasks and projects',
}

const ProcessPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Process</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProcessPage
