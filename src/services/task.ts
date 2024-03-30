import { db } from '@/lib/db'
import { Task } from '@prisma/client'

export const getTasks = async () => {
  return await db.task.findMany()
}

export const getTask = async (id: string) => {
  return await db.task.findUnique({
    where: { id },
  })
}

export const createTask = async (data: Task) => {
  return await db.task.create({
    data,
  })
}

export const updateTask = async (id: string, data: Task) => {
  return await db.task.update({
    where: { id },
    data,
  })
}

export const deleteTask = async (id: string) => {
  return await db.task.delete({
    where: { id },
  })
}
