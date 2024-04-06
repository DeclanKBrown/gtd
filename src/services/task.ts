import { format } from 'date-fns' // Import the format function from date-fns library
import { db } from '@/lib/db'
import { Task } from '@prisma/client'

export const getTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: { userId },
  })
}

export const getInboxTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: { userId, status: 'INBOX' },
    orderBy: [
      {
        priority: 'asc',
      },
      {
        id: 'asc',
      },
    ],
  })
}
export const getOrganizeTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: { userId, status: { not: 'INBOX' } },
    orderBy: { createdAt: 'asc' },
  })
}

export const getEngageTasks = async ({
  userId,
  startOfPeriod,
  endOfPeriod,
}: {
  userId: string
  startOfPeriod: string
  endOfPeriod: string
}) => {
  try {
    return db.$queryRaw`
      SELECT
        *
      FROM "Task" task
      WHERE
        task."userId" = ${userId}
        AND task.status = 'NEXT_ACTION'
        AND task."goalCompletedAt" BETWEEN ${startOfPeriod}::TIMESTAMP AND ${endOfPeriod}::TIMESTAMP
      ORDER BY
        CASE task."priority"
          WHEN 'LOW' THEN 4
          WHEN 'MEDIUM' THEN 3
          WHEN 'HIGH' THEN 2
          WHEN 'CRITICAL' THEN 1
        END
    `
  } catch (error) {
    console.log(error)
  }
}

export const getTask = async ({
  taskId,
  userId,
}: {
  taskId: string
  userId: string
}) => {
  return await db.task.findUnique({
    where: { id: taskId, userId },
  })
}

export const createTask = async ({
  data,
  userId,
}: {
  data: Task
  userId: string
}) => {
  return await db.task.create({
    data: {
      ...data,
      userId,
      goalCompletedAt: new Date(),
      priority: 'MEDIUM',
    },
  })
}

export const updateTask = async ({
  taskId,
  data,
  userId,
}: {
  taskId: string
  data: Task
  userId: string
}) => {
  return await db.task.update({
    where: { id: taskId, userId },
    data,
  })
}

export const deleteTask = async ({
  taskId,
  userId,
}: {
  taskId: string
  userId: string
}) => {
  return await db.task.delete({
    where: { id: taskId, userId },
  })
}
