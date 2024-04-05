import { db } from '@/lib/db'
import { isSunday } from 'date-fns'

export const getReviews = async ({ userId }: { userId: string }) => {
  return await db.review.findMany({
    where: { userId },
  })
}

export const getReview = async ({
  reviewId,
  userId,
}: {
  reviewId: string
  userId: string
}) => {
  return await db.review.findUnique({
    where: { id: reviewId, userId },
  })
}

export const createReview = async ({
  date,
  userId,
}: {
  date: string
  userId: string
}) => {
  if (isSunday(date)) {
    return await db.review.create({
      data: {
        userId,
      },
    })
  } else {
    return new Error('Not Sunday')
  }
}

export const updateReview = async ({
  stepNumber,
  userId,
}: {
  stepNumber: number
  userId: string
}) => {
  // Find last review on user and update
  const currentReview = await db.review.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      id: true,
    },
  })

  if (!currentReview) {
    return new Error('Review not found')
  }

  if (stepNumber === 1) {
    return await db.review.update({
      where: { id: currentReview.id, userId },
      data: {
        stepOne: true,
      },
    })
  }
  if (stepNumber === 2) {
    return await db.review.update({
      where: { id: currentReview.id, userId },
      data: {
        stepTwo: true,
      },
    })
  }
  if (stepNumber === 3) {
    return await db.review.update({
      where: { id: currentReview.id, userId },
      data: {
        stepThree: true,
      },
    })
  }
}

export const deleteReview = async ({
  reviewId,
  userId,
}: {
  reviewId: string
  userId: string
}) => {
  return await db.review.delete({
    where: { id: reviewId, userId },
  })
}
