import { db } from '@/lib/db'
import { Task } from '@prisma/client'
import { addDays } from 'date-fns'

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

export const getEngageTodayTasks = async ({
  userId,
  endOfPeriod,
}: {
  userId: string
  endOfPeriod: string
}) => {
  try {
    const tasks: Task[] = await db.$queryRaw`
      SELECT
        *
      FROM "Task" task
      WHERE
        task."userId" = ${userId}
        AND task.status = 'NEXT_ACTION'
        AND task."goalCompletedAt" <= ${endOfPeriod}::TIMESTAMP
      ORDER BY
        CASE task."priority"
          WHEN 'LOW' THEN 4
          WHEN 'MEDIUM' THEN 3
          WHEN 'HIGH' THEN 2
          WHEN 'CRITICAL' THEN 1
        END
    `

    // If today has no tasks - already completed show tomorrows next actions
    if (tasks && tasks.length === 0) {
      const tomorrowEnd = addDays(endOfPeriod, 1).toISOString()

      return await db.$queryRaw`
      SELECT
        *
      FROM "Task" task
      WHERE
        task."userId" = ${userId}
        AND task.status = 'NEXT_ACTION'
        AND task."goalCompletedAt" <= ${tomorrowEnd}::TIMESTAMP
      ORDER BY
        CASE task."priority"
          WHEN 'LOW' THEN 4
          WHEN 'MEDIUM' THEN 3
          WHEN 'HIGH' THEN 2
          WHEN 'CRITICAL' THEN 1
        END
    `
    }

    return tasks
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return new Error(error.message)
    }

    return new Error(String(error))
  }
}

export const getEngageTasks = async ({
  userId,
  startOfPeriod,
  endOfPeriod,
}: {
  userId: string
  startOfPeriod: string
  endOfPeriod: string
}): Promise<Task[] | null | Error> => {
  try {
    const tasks: Task[] = await db.$queryRaw`
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

    return tasks
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return new Error(error.message)
    }

    return new Error(String(error))
  }
}

export const getProjectTasks = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  try {
    return await db.$queryRaw`
    SELECT
      *
    FROM "Task" task
    WHERE
      task."projectId" = ${projectId}
      AND task."userId" = ${userId}
    ORDER BY
      task."goalCompletedAt" ASC,
      CASE task."priority"
          WHEN 'LOW' THEN 4
          WHEN 'MEDIUM' THEN 3
          WHEN 'HIGH' THEN 2
          WHEN 'CRITICAL' THEN 1
        END
    `
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return new Error(error.message)
    }

    return new Error(String(error))
  }
}

export const getPastWeekEngageTasks = async ({
  userId,
  startOfWeek,
  endOfWeek,
}: {
  userId: string
  startOfWeek: string
  endOfWeek: string
}) => {
  return await db.task.findMany({
    where: {
      userId,
      status: 'NEXT_ACTION',
      goalCompletedAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: {
      goalCompletedAt: 'desc',
    },
  })
}

export const getUpcomingWeekTasks = async ({
  userId,
  startOfWeek,
  endOfWeek,
}: {
  userId: string
  startOfWeek: string
  endOfWeek: string
}) => {
  return await db.task.findMany({
    where: {
      userId,
      goalCompletedAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: {
      goalCompletedAt: 'asc',
    },
  })
}

export const getPastCalendarTasks = async ({
  userId,
  startOfWeek,
  endOfWeek,
}: {
  userId: string
  startOfWeek: string
  endOfWeek: string
}) => {
  return await db.task.findMany({
    where: {
      userId,
      goalCompletedAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  })
}

export const getWaitingForTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: {
      userId,
      status: 'WAITING',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const getSomedayTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: {
      userId,
      status: 'SOMEDAY',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
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
