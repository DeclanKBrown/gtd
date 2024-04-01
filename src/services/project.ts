import { db } from '@/lib/db'
import { Project } from '@prisma/client'

export const getProjects = async ({ userId }: { userId: string }) => {
  return await db.project.findMany({
    where: { userId },
  })
}

export const getProject = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  return await db.project.findUnique({
    where: { id: projectId, userId },
  })
}

export const createProject = async ({
  data,
  userId,
}: {
  data: Project
  userId: string
}) => {
  return await db.project.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateProject = async ({
  projectId,
  data,
  userId,
}: {
  projectId: string
  data: Project
  userId: string
}) => {
  return await db.project.update({
    where: { id: projectId, userId },
    data,
  })
}

export const deleteProject = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  return await db.project.delete({
    where: { id: projectId, userId },
  })
}
