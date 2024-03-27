'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Step, StepItem, Stepper, useStepper } from '@/components/ui/stepper'
import ReviewStepOne from './StepOne/ReviewStepOne'

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
          <div className="my-4 flex h-40 items-center justify-center rounded-md border text-primary">
            <h1 className="text-xl">Get Current</h1>
          </div>
        </Step>
        <Step label="Get Creative" checkIcon={Icons.check}>
          <div className="my-4 flex h-40 items-center justify-center rounded-md border text-primary">
            <h1 className="text-xl">Get Creative</h1>
          </div>
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
  } = useStepper()
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-4 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? 'Finish' : isOptionalStep ? 'Skip' : 'Next'}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
