'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'

import { signIn } from 'next-auth/react'

interface OAuthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const OAuthButton = ({ className, ...props }: OAuthButtonProps) => {
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const handleOAuth = async () => {
    setIsOAuthLoading(true)
    try {
      await signIn('google')

      router.refresh()
    } catch (error) {
      console.error('OAuth sign-in error:', error)
      return toast({
        title: 'Error',
        description: 'Error signing in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsOAuthLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      onClick={handleOAuth}
      disabled={isOAuthLoading}
      {...props}
    >
      {isOAuthLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{' '}
      Google
    </button>
  )
}
