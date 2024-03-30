import { db } from '@/lib/db'
import { Project } from '@prisma/client'

export const getProjects = async () => {
  return await db.project.findMany()
}

export const getProject = async (id: string) => {
  return await db.project.findUnique({
    where: { id },
  })
}

export const createProject = async (data: Project) => {
  return await db.project.create({
    data,
  })
}

export const updateProject = async (id: string, data: Project) => {
  return await db.project.update({
    where: { id },
    data,
  })
}

export const deleteProject = async (id: string) => {
  return await db.project.delete({
    where: { id },
  })
}
