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
      <div className="mb-8 w-full pt-12 text-center">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-5xl">
            Save your self the all nighters
          </h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Get your self out of the vicious cycle of procrastination then all
            nighter by getting your goals organized today!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="mb-2 flex items-center justify-center text-2xl">
              <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                <p className="text-sm font-semibold text-gray-700">Monthly</p>
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
                Get Organized
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
                Get Organized
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            )}
          </CardFooter>
        </Card>
        <Card className="mx-auto max-w-md border-blue-500">
          <CardHeader>
            <CardTitle className="mb-2 flex  items-center justify-center text-2xl">
              <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-blue-500 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                <p className="text-sm font-semibold text-gray-700">Yearly</p>
              </div>
            </CardTitle>
            <CardTitle className="flex items-center justify-center gap-6 text-4xl">
              <span className="relative whitespace-nowrap">
                <span className="absolute -left-2 -right-2 -top-1 bottom-3 -rotate-3 border-b-4 border-b-primary md:-left-3 md:-right-3 md:-top-0 md:bottom-3"></span>
                <span className="relative">$120</span>
              </span>
              <span>$99</span>
            </CardTitle>
            <CardDescription className="flex items-center justify-center text-lg">
              annually
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
                  className: 'my-8 w-full bg-[#3b82f6] dark:text-white',
                })}
                onClick={() => createStripeSession()}
              >
                Get Organized
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            ) : (
              <Link
                className={buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                  className: 'my-8 w-full bg-[#3b82f6] text-white',
                })}
                href={'/register'}
              >
                Get Organized
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Pricing
