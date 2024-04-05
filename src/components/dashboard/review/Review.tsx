'use client'

import { Button } from '@/components/ui/button'
import ReviewStepper from './ReviewStepper'
import { useState } from 'react'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'

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

  const handleStartReview = () => {
    startReview({
      date: new Date().toString(),
    })
  }

  return (
    <>
      {!reviewStarted ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground">
            Start your weekly review
          </p>
          <Button className="px-6 py-4 text-lg" onClick={handleStartReview}>
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
