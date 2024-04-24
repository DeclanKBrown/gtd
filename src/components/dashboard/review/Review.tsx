'use client'

import { Button } from '@/components/ui/button'
import ReviewStepper from './ReviewStepper'
import { useState } from 'react'
import { trpc } from '@/app/_trpc/client'
import { toast } from '@/components/ui/use-toast'
import { isSunday, startOfDay, endOfDay } from 'date-fns'
import { useReviewComplete } from '@/hooks/useReviewComplete'

const Review = () => {
  const [reviewStarted, setReviewStarted] = useState(false)

  const { mutate: startReview } = trpc.createReview.useMutation({
    onSuccess: () => {
      setReviewStarted(true)
      return toast({
        title: 'Success',
        description: 'Review started',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error(error)
      return toast({
        title: 'Error',
        description: 'Error starting review',
        variant: 'destructive',
      })
    },
  })

  const startOfToday = startOfDay(new Date()).toISOString()
  const endOfToday = endOfDay(new Date()).toISOString()

  const handleStartReview = () => {
    startReview({
      startOfDay: startOfToday,
      endOfDay: endOfToday,
      date: new Date().toString(),
    })
  }

  const isNowSunday = isSunday(new Date())

  const { isReviewComplete } = useReviewComplete()

  return (
    <>
      {!reviewStarted ? (
        <div className="mt-0 flex h-full flex-col items-center justify-center gap-4">
          {isNowSunday ? (
            <p className="text-lg text-muted-foreground">
              Start your weekly review
            </p>
          ) : (
            <p className="text-lg text-muted-foreground">
              Weekly review will be available on Sunday
            </p>
          )}
          <Button
            className="px-6 py-4 text-lg"
            onClick={handleStartReview}
            disabled={!isNowSunday || isReviewComplete}
          >
            Start
          </Button>
        </div>
      ) : (
        <ReviewStepper />
      )}
    </>
  )
}

export default Review
