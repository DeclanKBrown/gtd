import Review from '@/components/dashboard/review/Review'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Review',
  description: 'Review your week',
}

const ReviewPage = () => {
  return (
    <>
      <ScrollArea className="h-screen">
        <div className="flex h-screen flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Review</h2>
            </div>
            <Review />
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default ReviewPage
