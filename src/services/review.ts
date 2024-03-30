import { db } from '@/lib/db'
import { Review } from '@prisma/client'

export const getReviews = async () => {
  return await db.review.findMany()
}

export const getReview = async (id: string) => {
  return await db.review.findUnique({
    where: { id },
  })
}

export const createReview = async (data: Review) => {
  return await db.review.create({
    data,
  })
}

export const updateReview = async (id: string, data: Review) => {
  return await db.review.update({
    where: { id },
    data,
  })
}

export const deleteReview = async (id: string) => {
  return await db.review.delete({
    where: { id },
  })
}
