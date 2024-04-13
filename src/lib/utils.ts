import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const absoluteUrl = (path: string) => {
  if (typeof window !== 'undefined') return path

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`

  return `http://localhost:3000${path}`
}
