import * as z from 'zod'

export const captureSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.optional(z.string().max(100)),
  type: z.enum(['TASK', 'PROJECT', 'REFERENCE']),
  status: z.enum([
    'INBOX',
    'SOMEDAY',
    'WAITING',
    'NEXT_ACTION',
    'DONE',
    'DELEGATED',
    'ELIMINATED',
  ]),
})
