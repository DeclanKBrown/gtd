import * as z from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})
