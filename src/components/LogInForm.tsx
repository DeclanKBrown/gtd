'use client'

import * as React from 'react'

import { OAuthButton } from './OAuthButton'
import { cn } from '@/lib/utils'

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LogInForm({ className, ...props }: SignInFormProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1"></div>
        <OAuthButton />
      </div>
    </div>
  )
}
