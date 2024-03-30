import { db } from '@/lib/db'
import { Reference } from '@prisma/client'

export const getReferences = async () => {
  return await db.reference.findMany()
}

export const getReference = async (id: string) => {
  return await db.reference.findUnique({
    where: { id },
  })
}

export const createReference = async (data: Reference) => {
  return await db.reference.create({
    data,
  })
}

export const updateReference = async (id: string, data: Reference) => {
  return await db.reference.update({
    where: { id },
    data,
  })
}

export const deleteReference = async (id: string) => {
  return await db.reference.delete({
    where: { id },
  })
}
