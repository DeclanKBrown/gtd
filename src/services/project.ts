import { db } from '@/lib/db'
import { Project } from '@prisma/client'

export const getProjects = async ({ userId }: { userId: string }) => {
  return await db.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const getActiveProjects = async ({ userId }: { userId: string }) => {
  return await db.project.findMany({
    where: {
      userId,
      status: 'ACTIVE',
    },
    orderBy: { createdAt: 'desc' },
  })
}

type ProgressOnActiveProjects = {
  name: string
  tasksCompleted: number
}

export const getProgressOnActiveProjects = async ({
  userId,
}: {
  userId: string
}): Promise<ProgressOnActiveProjects[]> => {
  try {
    return await db.$queryRaw`
      SELECT
        proj."name"
        ,COUNT(task.id)::Int AS "tasksCompleted"
      FROM
        "Project" proj
      LEFT JOIN
        "Task" task
      ON
        task."projectId" = proj.id
      WHERE
        proj."userId" = ${userId}
        AND proj."status" = 'ACTIVE'
        AND task."status" = 'DONE'
      GROUP BY
        proj.id
      `
  } catch (error) {
    console.error(error)
  }
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
