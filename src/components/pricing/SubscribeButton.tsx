'use client'

import { ArrowRight } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { Button, buttonVariants } from '@/components/ui/button'

interface SubscribeButtonProps {
  annually: boolean
}

const SubscribeButton = ({ annually }: SubscribeButtonProps) => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    //@ts-ignore
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard'
    },
  })

  return (
    <Button
      className={buttonVariants({
        variant: 'secondary',
        size: 'lg',
        className: `my-8 w-full ${annually ? 'bg-[#3b82f6] dark:text-white' : 'dark:bg-white dark:text-gray-700'}`,
      })}
      onClick={() =>
        createStripeSession({ plan: annually ? 'annually' : 'monthly' })
      }
    >
      Get Organized
      <ArrowRight className="ml-1.5 h-5 w-5" />
    </Button>
  )
}

export default SubscribeButton
