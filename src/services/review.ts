import { db } from '@/lib/db'
import { Review } from '@prisma/client'

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
  data,
  userId,
}: {
  data: Review
  userId: string
}) => {
  return await db.review.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateReview = async ({
  reviewId,
  data,
  userId,
}: {
  reviewId: string
  data: Review
  userId: string
}) => {
  return await db.review.update({
    where: { id: reviewId, userId },
    data,
  })
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
