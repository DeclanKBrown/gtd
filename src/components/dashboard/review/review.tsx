'use client'

import { Button } from '@/components/ui/button'
import ReviewStepper from './ReviewStepper'
import { useState } from 'react'

const Review = () => {
  const [reviewStarted, setReviewStarted] = useState(false)

  return (
    <>
      {!reviewStarted ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground">
            Start your weekly review
          </p>
          <Button
            className="px-6 py-4 text-lg"
            onClick={() => setReviewStarted(true)}
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
