import { trpc } from '@/app/_trpc/temp'
import { startOfDay, endOfDay } from 'date-fns'

export const useReviewComplete = () => {
  const startOfToday = startOfDay(new Date()).toISOString()
  const endOfToday = endOfDay(new Date()).toISOString()

  const { data: reviewComplete } = trpc.reviewComplete.useQuery({
    startDate: startOfToday,
    endDate: endOfToday,
  })

  const isReviewComplete = !!reviewComplete

  return { isReviewComplete }
}
