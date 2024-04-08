'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Step, StepItem, Stepper, useStepper } from '@/components/ui/stepper'
import ReviewStepOne from './StepOne/ReviewStepOne'
import ReviewStepTwo from './StepTwo/ReviewStepTwo'
import ReviewStepThree from './StepThree/ReviewStepThree'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'

const steps = [
  { label: 'Get Clear' },
  { label: 'Get Current' },
  { label: 'Get Creative' },
] satisfies StepItem[]

const ReviewStepper = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        <Step label="Get Clear" checkIcon={Icons.check}>
          <ReviewStepOne />
        </Step>
        <Step label="Get Current" checkIcon={Icons.check}>
          <ReviewStepTwo />
        </Step>
        <Step label="Get Creative" checkIcon={Icons.check}>
          <ReviewStepThree />
        </Step>
        <Footer />
      </Stepper>
    </div>
  )
}

export default ReviewStepper

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    activeStep,
  } = useStepper()

  const { mutate: updateReviewStep } = trpc.updateReview.useMutation({
    onSuccess: () => {
      nextStep()
      return toast({
        title: 'Success',
        description: `Step ${activeStep} Complete`,
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error(error)
      return toast({
        title: 'Error',
        description: 'Could not change step',
        variant: 'destructive',
      })
    },
  })

  const handleNextStep = () => {
    updateReviewStep({ stepNumber: activeStep + 1 })
  }

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-4 flex h-40 items-center justify-center rounded-md border text-primary">
          <h1 className="text-xl">Review Complete</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            {/* <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button> */}
            <Button size="sm" onClick={handleNextStep}>
              {isLastStep ? 'Finish' : isOptionalStep ? 'Skip' : 'Next'}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
