'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'

interface OAuthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function OAuthButton({ className, ...props }: OAuthButtonProps) {
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const handleOAuth = async () => {
    setIsOAuthLoading(true)
    try {
      // if (error) {
      //   console.error('OAuth sign-in error:', error)
      //   return toast({
      //     title: 'Error',
      //     description: error.message,
      //     variant: 'destructive',
      //   })
      // }
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
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
