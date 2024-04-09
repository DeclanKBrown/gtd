import { z } from 'zod'
import { router, privateProcedure } from './trpc'

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getInboxTasks,
  getOrganizeTasks,
  getEngageTasks,
  getProjectTasks,
  getPastWeekEngageTasks,
  getPastCalendarTasks,
  getUpcomingWeekTasks,
  getWaitingForTasks,
} from '@/services/task'

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getActiveProjects,
  getProgressOnActiveProjects,
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
  getTasks: privateProcedure.query(async ({ ctx }) => {
    return await getTasks({ userId: ctx.userId })
  }),

  getInboxTasks: privateProcedure.query(async ({ ctx }) => {
    return await getInboxTasks({ userId: ctx.userId })
  }),

  getOrganizeTasks: privateProcedure.query(async ({ ctx }) => {
    return await getOrganizeTasks({ userId: ctx.userId })
  }),

  getEngageTasks: privateProcedure
    .input(z.object({ startOfPeriod: z.string(), endOfPeriod: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getEngageTasks({
        userId: ctx.userId,
        startOfPeriod: input.startOfPeriod,
        endOfPeriod: input.endOfPeriod,
      })
    }),

  getProjectTasks: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getProjectTasks({
        projectId: input.projectId,
        userId: ctx.userId,
      })
    }),

  getPastWeekEngageTask: privateProcedure
    .input(z.object({ startOfWeek: z.string(), endOfWeek: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getPastWeekEngageTasks({
        userId: ctx.userId,
        startOfWeek: input.startOfWeek,
        endOfWeek: input.endOfWeek,
      })
    }),

  getPastCalenderTasks: privateProcedure
    .input(z.object({ startOfWeek: z.string(), endOfWeek: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getPastCalendarTasks({
        userId: ctx.userId,
        startOfWeek: input.startOfWeek,
        endOfWeek: input.endOfWeek,
      })
    }),

  getUpcomingWeekTasks: privateProcedure
    .input(z.object({ startOfWeek: z.string(), endOfWeek: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getUpcomingWeekTasks({
        userId: ctx.userId,
        startOfWeek: input.startOfWeek,
        endOfWeek: input.endOfWeek,
      })
    }),

  getWaitingForTasks: privateProcedure.query(async ({ ctx }) => {
    return await getWaitingForTasks({
      userId: ctx.userId,
    })
  }),

  getTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getTask({ taskId: input.id, userId: ctx.userId })
    }),

  createTask: privateProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await createTask({ data: input.data, userId: ctx.userId })
    }),

  updateTask: privateProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await updateTask({
        taskId: input.id,
        data: input.data,
        userId: ctx.userId,
      })
    }),

  deleteTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await deleteTask({ taskId: input.id, userId: ctx.userId })
    }),

  getProject: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getProject({ projectId: input.id, userId: ctx.userId })
    }),

  getProjects: privateProcedure.query(async ({ ctx }) => {
    return await getProjects({ userId: ctx.userId })
  }),

  getActiveProjects: privateProcedure.query(async ({ ctx }) => {
    return await getActiveProjects({ userId: ctx.userId })
  }),

  getProgressOnActiveProjects: privateProcedure.query(async ({ ctx }) => {
    try {
      return await getProgressOnActiveProjects({ userId: ctx.userId })
    } catch (error) {
      console.log(error)
    }
  }),

  createProject: privateProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await createProject({ data: input.data, userId: ctx.userId })
    }),

  updateProject: privateProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await updateProject({
        projectId: input.id,
        data: input.data,
        userId: ctx.userId,
      })
    }),

  deleteProject: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await deleteProject({ projectId: input.id, userId: ctx.userId })
    }),

  getReferences: privateProcedure.query(async ({ ctx }) => {
    return await getReferences({ userId: ctx.userId })
  }),

  getReference: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getReference({ referenceId: input.id, userId: ctx.userId })
    }),

  createReference: privateProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await createReference({ data: input.data, userId: ctx.userId })
    }),

  updateReference: privateProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return await updateReference({
        referenceId: input.id,
        data: input.data,
        userId: ctx.userId,
      })
    }),

  deleteReference: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await deleteReference({
        referenceId: input.id,
        userId: ctx.userId,
      })
    }),

  getReviews: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx }) => {
      return await getReviews({ userId: ctx.userId })
    }),

  getReview: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getReview({ reviewId: input.id, userId: ctx.userId })
    }),

  createReview: privateProcedure
    .input(z.object({ date: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await createReview({ date: input.date, userId: ctx.userId })
    }),

  updateReview: privateProcedure
    .input(z.object({ stepNumber: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await updateReview({
        stepNumber: input.stepNumber,
        userId: ctx.userId,
      })
    }),

  deleteReview: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await deleteReview({ reviewId: input.id, userId: ctx.userId })
    }),
})

export type AppRouter = typeof appRouter
