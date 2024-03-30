import { z } from 'zod'
import { router, publicProcedure } from './trpc'

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '@/services/task'

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '@/services/project'

import {
  getReferences,
  getReference,
  createReference,
  updateReference,
  deleteReference,
} from '@/services/reference'

import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from '@/services/review'

export const appRouter = router({
  getTasks: publicProcedure.query(async () => {
    return await getTasks()
  }),

  getTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getTask(input.id)
    }),

  createTask: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      return await createTask(input.data)
    }),

  updateTask: publicProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input }) => {
      return await updateTask(input.id, input.data)
    }),

  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteTask(input.id)
    }),

  getProjects: publicProcedure.query(async () => {
    return await getProjects()
  }),

  getProject: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getProject(input.id)
    }),

  createProject: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      return await createProject(input.data)
    }),

  updateProject: publicProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input }) => {
      return await updateProject(input.id, input.data)
    }),

  deleteProject: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteProject(input.id)
    }),

  getReferences: publicProcedure.query(async () => {
    return await getReferences()
  }),

  getReference: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getReference(input.id)
    }),

  createReference: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      return await createReference(input.data)
    }),

  updateReference: publicProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input }) => {
      return await updateReference(input.id, input.data)
    }),

  deleteReference: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteReference(input.id)
    }),

  getReviews: publicProcedure.query(async () => {
    return await getReviews()
  }),

  getReview: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getReview(input.id)
    }),

  createReview: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      return await createReview(input.data)
    }),

  updateReview: publicProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input }) => {
      return await updateReview(input.id, input.data)
    }),

  deleteReview: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteReview(input.id)
    }),
})

export type AppRouter = typeof appRouter
