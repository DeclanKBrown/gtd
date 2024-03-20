'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    if (searchParams.has('signIn')) {
      await handleSignIn(data)
    } else if (searchParams.has('signUp')) {
      await handleSignUp(data)
    } else {
      await handleOAuth()
    }

    setIsLoading(false)
  }

  // Sign in function
  const handleSignIn = async (data: FormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) {
        // Handle sign-in error
        console.error('Sign-in error:', error)
        return toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
      router.refresh()
    } catch (error) {
      // Handle other errors
      console.error('Error:', error)
    }
  }

  // Sign up function
  const handleSignUp = async (data: FormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
      if (error) {
        // Handle sign-up error
        console.error('Sign-up error:', error)
        return toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
      return toast({
        title: 'Check your email',
        description:
          'We sent you a login link. Be sure to check your spam too.',
      })
    } catch (error) {
      // Handle other errors
      console.error('Error:', error)
    }
  }

  // OAuth authentication function
  const handleOAuth = async () => {
    setIsOAuthLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google', // Change 'google' to the desired provider
      })
      if (error) {
        // Handle OAuth sign-in error
        console.error('OAuth sign-in error:', error)
        return toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
      router.refresh()
    } catch (error) {
      // Handle other errors
      console.error('Error:', error)
    } finally {
      setIsOAuthLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isOAuthLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading || isOAuthLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsOAuthLoading(true)
        }}
        disabled={isLoading || isOAuthLoading}
      >
        {isOAuthLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  )
}
