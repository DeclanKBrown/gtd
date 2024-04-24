import { z } from 'zod'
import { router, privateProcedure, publicProcedure } from './trpc'

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
  getSomedayTasks,
  getEngageTodayTasks,
  dumpTasks,
  getNextActionTasks,
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
  reviewComplete,
} from '@/services/review'
import { absoluteUrl } from '@/lib/utils'
import { TRPCError } from '@trpc/server'
import { db } from '@/lib/db'
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe'
import { PLANS } from '@/config/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    try {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

      if (!user?.id || !user?.email)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      })

      if (!dbUser) {
        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
          },
        })
      }

      return { success: true }
    } catch (error) {
      console.error(error)
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
  }),
  getTasks: privateProcedure.query(async ({ ctx }) => {
    return await getTasks({ userId: ctx.userId })
  }),

  getInboxTasks: privateProcedure.query(async ({ ctx }) => {
    return await getInboxTasks({ userId: ctx.userId })
  }),

  getOrganizeTasks: privateProcedure.query(async ({ ctx }) => {
    return await getOrganizeTasks({ userId: ctx.userId })
  }),

  getEngageTodayTasks: privateProcedure
    .input(z.object({ endOfPeriod: z.string() }))
    .query(async ({ input, ctx }) => {
      return await getEngageTodayTasks({
        userId: ctx.userId,
        endOfPeriod: input.endOfPeriod,
      })
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

  getSomedayForTasks: privateProcedure.query(async ({ ctx }) => {
    return await getSomedayTasks({
      userId: ctx.userId,
    })
  }),

  getNextActionTasks: privateProcedure.query(async ({ ctx }) => {
    return await getNextActionTasks({
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

  dumpTasks: privateProcedure.mutation(async ({ ctx }) => {
    return await dumpTasks({ userId: ctx.userId })
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

  getProgressOnActiveProjects: privateProcedure
    .input(z.object({ startOfWeek: z.string(), endOfWeek: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        return await getProgressOnActiveProjects({
          userId: ctx.userId,
          startDate: input.startOfWeek,
          endDate: input.endOfWeek,
        })
      } catch (error) {
        console.error(error)
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

  reviewComplete: privateProcedure
    .input(z.object({ startDate: z.string(), endDate: z.string() }))
    .query(async ({ input, ctx }) => {
      return await reviewComplete({
        startDate: input.startDate,
        endDate: input.endDate,
        userId: ctx.userId,
      })
    }),

  createReview: privateProcedure
    .input(
      z.object({
        startOfDay: z.string(),
        endOfDay: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await createReview({
        startOfDay: input.startOfDay,
        endOfDay: input.endOfDay,
        date: input.date,
        userId: ctx.userId,
      })
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

  createStripeSession: privateProcedure.mutation(async ({ ctx }) => {
    try {
      const dashboardUrl = absoluteUrl('/dashboard')

      if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const dbUser = await db.user.findFirst({
        where: {
          id: ctx.userId,
        },
      })

      if (!dbUser) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const subscriptionPlan = await getUserSubscriptionPlan()

      if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: dashboardUrl,
        })

        return { url: stripeSession.url }
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: dashboardUrl,
        cancel_url: dashboardUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        line_items: [
          {
            price: PLANS.find((plan) => plan.name === 'Pro')?.price.priceIds
              .test,
            quantity: 1,
          },
        ],
        metadata: {
          userId: ctx.userId,
        },
      })

      return { url: stripeSession.url }
    } catch (error) {
      console.error(error)
    }
  }),
})

export type AppRouter = typeof appRouter
