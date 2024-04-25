'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowRight } from 'lucide-react'

const RegisterButton = () => {
  return (
    <RegisterLink
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'lg',
          className: 'my-8 text-white',
        }),
        'bg-blue-500 hover:bg-blue-600',
      )}
    >
      Get Organized <ArrowRight className="ml-2 h-5 w-5" />
    </RegisterLink>
  )
}

export default RegisterButton
