import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const Home = () => {
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
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            GTD Is Now Available
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Unlock 🔓 Your{' '}
          <span className="whitespace-nowrap underline">Full Potential</span>{' '}
          with Our Get-Things-Done App
        </h1>
        <p className="mt-5 max-w-prose text-zinc-500 sm:text-lg">
          GTD Allows you to organise your life with a simple{' '}
          <span className="font-bold">
            Capture, Process, Organise, Review, Engage
          </span>
          . It&#39;s a simple, yet powerful tool that helps you to stay on top
          of your tasks and projects.
        </p>

        <Link
          className={buttonVariants({
            variant: 'secondary',
            size: 'lg',
            className: 'my-8 dark:bg-white dark:text-gray-700',
          })}
          href={'/dashboard'}
          target="_blank"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                  <Image
                    src="/dashboard-image-engage.png"
                    alt="Dashboard Preview"
                    width={1364}
                    height={866}
                    className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875]"
            />
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto mb-32 mt-32 max-w-6xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-zinc-200 sm:text-5xl">
              Get Organized with GTD
            </h2>
            <p className="mt-4 text-lg italic text-zinc-500">
              &quot;Your mind is for having ideas, not holding them. - David
              Allen&quot;
            </p>
          </div>
        </div>
        {/* steps  */}
        <ol className="my-8 space-y-4 pt-8 lg:flex lg:space-x-12 lg:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-500/20 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="font-semibold> text-xl">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-500">
                Either start out with a free plan or choose our{' '}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
              </span>
            </div>
          </li>
          <li className="lg:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-500/20 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="font-semibold> text-xl">
                Start capturing your tasks, projects & references
              </span>
              <span className="mt-2 text-zinc-500">
                Use the inbox to capture everything that has your attention
              </span>
            </div>
          </li>
          <li className="lg:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-500/20 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="font-semibold> text-xl">
                Enjoy the peace of mind that comes with a clear head
              </span>
              <span className="mt-2 text-zinc-500">
                Process your inbox and organise your tasks and projects
              </span>
            </div>
          </li>
          <li className="lg:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-500/20 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 4</span>
              <span className="font-semibold> text-xl">
                3x your productivity
              </span>
              <span className="mt-2 text-zinc-500">
                Determine the next action and engage with your tasks
              </span>
            </div>
          </li>
          <li className="lg:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-500/20 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 5</span>
              <span className="font-semibold> text-xl">Think Big</span>
              <span className="mt-2 text-zinc-500">
                Review you projects & goals weekly
              </span>
            </div>
          </li>
        </ol>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
              <Image
                src="/dashboard-image-review.png"
                alt="Dashboard Preview"
                width={1364}
                height={866}
                className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
              />
            </div>
          </div>
        </div>
        {/* Pricing */}
        <div className="mb-8 mt-24 w-full text-center">
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
            <ul className="my-2  mt-4 space-y-2 px-8">
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
            <Link
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'my-8 w-full dark:bg-white dark:text-gray-700',
              })}
              href={'/register'}
            >
              Sign Up
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Home
