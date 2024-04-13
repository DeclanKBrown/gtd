'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { trpc } from '@/app/_trpc/Client'

const Pricing = () => {
  const session = useSession()

  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard'
    },
  })

  const features = [
    {
      title: 'Engage your highest priorities',
      description: 'Intelligently sorted tasks based on priority',
    },
    {
      title: 'Stay on track',
      description: 'Weekly reviews to keep you focused on your goals',
    },
    {
      title: 'Unlimited tasks, projects & references',
      description: 'Capture everything that has your attention',
    },
  ]

  return (
    <>
      <div className="mb-8 mt-12 w-full text-center">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            For those who want to take their success to the next level, with
            minimal overhead.
          </p>
        </div>
      </div>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="mb-2 flex  items-center justify-center text-2xl">
            <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
              <p className="text-sm font-semibold text-gray-700">Pro</p>
            </div>
          </CardTitle>
          <CardTitle className="flex items-center justify-center text-4xl">
            $10
          </CardTitle>
          <CardDescription className="flex items-center justify-center text-lg">
            per month
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full flex-col">
          <ul className="my-2 mt-4 space-y-2 px-8">
            {features.map(({ title, description }) => (
              <li key={title} className="flex space-x-5">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-400">{title}</p>
                  <p className="text-gray-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <Separator />
        <CardFooter className="w-full">
          {session?.data?.user ? (
            <Button
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'my-8 w-full dark:bg-white dark:text-gray-700',
              })}
              onClick={() => createStripeSession()}
            >
              {session?.data?.user ? 'Buy Now' : 'Get Started'}
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Button>
          ) : (
            <Link
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'my-8 w-full dark:bg-white dark:text-gray-700',
              })}
              href={'/register'}
            >
              Get Started
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          )}
        </CardFooter>
      </Card>
    </>
  )
}

export default Pricing
