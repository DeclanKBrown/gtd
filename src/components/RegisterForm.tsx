'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { OAuthButton } from './OAuthButton'

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: SignUpFormProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <OAuthButton />
        </div>
      </div>
    </div>
  )
}
