import * as z from 'zod'

const taskStatusEnum = z.enum([
  'INBOX',
  'SOMEDAY',
  'WAITING',
  'NEXT_ACTION',
  'DONE',
  'DELEGATED',
  'ELIMINATED',
])

const projectStatusEnum = z.enum(['ACTIVE', 'NOT_STARTED', 'ARCHIVED'])

const refStatusEnum = z.enum(['ACTIVE', 'ARCHIVED'])

export const captureSchema = z
  .object({
    name: z.string().min(1).max(80),
    description: z.optional(z.string().max(100)),
    type: z.enum(['TASK', 'PROJECT', 'REFERENCE']),
    status: z.string(),
  })
  .superRefine((data, ctx) => {
    let isValidStatus = false

    switch (data.type) {
      case 'TASK':
        isValidStatus = taskStatusEnum.safeParse(data.status).success
        break
      case 'PROJECT':
        isValidStatus = projectStatusEnum.safeParse(data.status).success
        break
      case 'REFERENCE':
        isValidStatus = refStatusEnum.safeParse(data.status).success
        break
    }

    if (!isValidStatus) {
      ctx.addIssue({
        path: ['status'],
        message: 'Invalid status for the given type',
        code: 'custom',
      })
    }
  })
