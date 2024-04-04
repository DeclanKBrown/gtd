import { db } from '@/lib/db'
import { Reference } from '@prisma/client'

export const getReferences = async ({ userId }: { userId: string }) => {
  return await db.reference.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const getReference = async ({
  referenceId,
  userId,
}: {
  referenceId: string
  userId: string
}) => {
  return await db.reference.findUnique({
    where: { id: referenceId, userId },
  })
}

export const createReference = async ({
  data,
  userId,
}: {
  data: Reference
  userId: string
}) => {
  return await db.reference.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateReference = async ({
  referenceId,
  data,
  userId,
}: {
  referenceId: string
  data: Reference
  userId: string
}) => {
  return await db.reference.update({
    where: { id: referenceId, userId },
    data,
  })
}

export const deleteReference = async ({
  referenceId,
  userId,
}: {
  referenceId: string
  userId: string
}) => {
  return await db.reference.delete({
    where: { id: referenceId, userId },
  })
}
