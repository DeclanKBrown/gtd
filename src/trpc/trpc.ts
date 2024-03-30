import { TRPCError, initTRPC } from '@trpc/server'
import { getSession } from 'next-auth/react'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const session = await getSession()

  if (!session || !session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: session.user.id,
      user: session.user,
    },
  })
})
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
