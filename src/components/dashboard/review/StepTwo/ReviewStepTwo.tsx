'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import ReviewedNextAction from './NextAction'
import ReviewedPastCalendar from './PastCalender'
import ReviewedUpcomingCalender from './UpcomingCalender'
import ReviewedWaitingFor from './WaitingFor'
import ReviewedProjects from './Projects'

const ReviewedStepTwo = () => {
  const [reviewedNextAction, setReviewedNextAction] = useState(false)
  const [reviewedPastCalendar, setReviewedPastCalendar] = useState(false)
  const [reviewedUpcomingCalendar, setReviewedUpcomingCalendar] =
    useState(false)
  const [reviewedWaitingFor, setReviewedWaitingFor] = useState(false)
  const [reviewedProject, setReviewedProject] = useState(false)

  return (
    <div className="my-4 flex flex-col gap-6 px-4 text-primary">
      <div className="flex items-center space-x-2">
        {!reviewedNextAction && (
          <>
            <Checkbox
              id="nextAction"
              onClick={() => setReviewedNextAction(true)}
            />
            <Label htmlFor="nextAction" className="text-lg">
              Reviewed Next Action
            </Label>
          </>
        )}
        {reviewedNextAction && !reviewedPastCalendar && (
          <>
            <Checkbox
              id="pastCalendar"
              onClick={() => setReviewedPastCalendar(true)}
            />
            <Label htmlFor="pastCalendar" className="text-lg">
              Reviewed Past Calendar
            </Label>
          </>
        )}
        {reviewedPastCalendar && !reviewedUpcomingCalendar && (
          <>
            <Checkbox
              id="upcomingCalendar"
              onClick={() => setReviewedUpcomingCalendar(true)}
            />
            <Label htmlFor="upcomingCalendar" className="text-lg">
              Reviewed Upcoming Calendar
            </Label>
          </>
        )}
        {reviewedUpcomingCalendar && !reviewedWaitingFor && (
          <>
            <Checkbox
              id="waitingFor"
              onClick={() => setReviewedWaitingFor(true)}
            />
            <Label htmlFor="waitingFor" className="text-lg">
              Reviewed Waiting For
            </Label>
          </>
        )}
        {reviewedWaitingFor && !reviewedProject && (
          <>
            <Checkbox id="project" onClick={() => setReviewedProject(true)} />
            <Label htmlFor="project" className="text-lg">
              Reviewed Projects
            </Label>
          </>
        )}
      </div>
      {!reviewedNextAction && <ReviewedNextAction />}
      {reviewedNextAction && !reviewedPastCalendar && <ReviewedPastCalendar />}
      {reviewedPastCalendar && !reviewedUpcomingCalendar && (
        <ReviewedUpcomingCalender />
      )}
      {reviewedUpcomingCalendar && !reviewedWaitingFor && (
        <ReviewedWaitingFor />
      )}
      {reviewedWaitingFor && !reviewedProject && <ReviewedProjects />}
      {reviewedNextAction &&
        reviewedPastCalendar &&
        reviewedUpcomingCalendar &&
        reviewedWaitingFor &&
        reviewedProject && (
          <div className="flex items-center justify-center">
            <h2 className="text-lg text-muted-foreground">
              You are now up to date!
            </h2>
          </div>
        )}
    </div>
  )
}

export default ReviewedStepTwo
