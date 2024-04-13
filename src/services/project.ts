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
  percentageOfTotalCompleted: number
}

export const getProgressOnActiveProjects = async ({
  userId,
  startDate,
  endDate,
}: {
  userId: string
  startDate: string
  endDate: string
}): Promise<ProgressOnActiveProjects[] | Error> => {
  try {
    return await db.$queryRaw`
      WITH CompletedTasks AS (
        SELECT
          proj.id AS projectId
          ,COUNT(task.id) AS tasksCompleted
        FROM
          "Project" proj
        LEFT JOIN
          "Task" task
        ON
          task."projectId" = proj.id
          AND task."status" = 'DONE'
          AND task."completedAt" BETWEEN ${startDate}::TIMESTAMP AND ${endDate}::TIMESTAMP
        WHERE
          proj."userId" = ${userId}
          AND proj."status" = 'ACTIVE'
        GROUP BY
          proj.id
      ), TotalCompleted AS (
        SELECT
          SUM(tasksCompleted) AS totalCompleted
        FROM
          CompletedTasks
      )
      SELECT
        proj."name"
        ,COALESCE(ct.tasksCompleted, 0)::Int AS "tasksCompleted"
        ,((COALESCE(ct.tasksCompleted, 0)::FLOAT / NULLIF((SELECT totalCompleted FROM TotalCompleted), 0)) * 100)::Int AS "percentageOfTotalCompleted"
      FROM
        "Project" proj
      LEFT JOIN
        CompletedTasks ct
      ON
        ct.projectId = proj.id
      WHERE
        proj."userId" = ${userId}
        AND proj."status" = 'ACTIVE'
      ORDER BY
        proj."name"
      `
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return new Error(error.message)
    }

    return new Error(String(error))
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
