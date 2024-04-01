import { db } from '@/lib/db'
import { Task } from '@prisma/client'

export const getTasks = async ({ userId }: { userId: string }) => {
  return await db.task.findMany({
    where: { userId },
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
