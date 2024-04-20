import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Pricing from '@/components/pricing/Pricing'
import InboxDemo from '@/components/landing/SimpleDemo/Demo'
import Features from '@/components/landing/Features/Features'
import { cn } from '@/lib/utils'

const Home = () => {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            SimpleGTD Is Now Available
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            <span className="relative whitespace-nowrap">
              <span className="absolute -bottom-1 -left-2 -right-2 -top-1 -rotate-1 bg-primary md:-bottom-0 md:-left-3 md:-right-3 md:-top-0"></span>
              <span className="relative text-secondary">Stress Less</span>
            </span>
          </h1>
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            <span className="whitespace-nowrap">Achieve More</span>
          </h1>
        </div>
        <span className="mt-5 max-w-prose px-12 text-zinc-400 sm:text-2xl">
          By taking an opinionated approach to productivity, turn your
          overwhelming todo lists into an organized productivity machine
        </span>

        <Link
          className={cn(
            buttonVariants({
              variant: 'secondary',
              size: 'lg',
              className: 'my-8 text-white',
            }),
            'bg-blue-500 hover:bg-blue-600',
          )}
          href={'/dashboard'}
        >
          Get Organized <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Demo Section */}
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
                  <div className="rounded-md bg-black p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5">
                    <InboxDemo />
                  </div>
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

      {/* Pain Points Section */}
      <section className="relative px-8 py-24">
        <div className="text-neutral-content relative mx-auto max-w-lg rounded-lg bg-red-500/20 p-8 text-center text-lg md:p-16">
          <div className="space-y-4 leading-relaxed md:space-y-6">
            <div className="text-neutral-content/80 space-y-2">
              <p>
                <span className="font-medium text-red-400">Stressed - </span>
                Task Overload Anxiety
              </p>
              <p>
                <span className="font-medium text-red-400">Overwhelmed - </span>
                Endless amount of things to do
              </p>
              <p>
                <span className="font-medium text-red-400">Sleepless - </span>
                Nighttime Task Worry
              </p>
              <p>
                <span className="font-medium text-red-400">Scattered - </span>
                Chaotic use of lists and tools
              </p>
              <p>
                <span className="font-medium text-red-400">
                  Fuzzy Progress -{' '}
                </span>
                Unsure if moving the needle
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-xl font-semibold md:flex-row">
              <p>= Constant Cycle of</p>
              <span className="font-medium text-red-400">Procrastination</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                >
                  <path d="M14.381 8.027a5.765 5.765 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a4.351 4.351 0 0 0-.83-.08C3.919 10.53 2 12.426 2 14.765c0 1.31.602 2.48 1.547 3.258m3.57-7.414a5.577 5.577 0 0 1-.355-1.962C6.762 5.528 9.32 3 12.476 3c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.29 4.29 0 0 1 1.55.634m9.49-3.228C20.392 8.78 22 10.881 22 13.353c0 1.94-.99 3.653-2.5 4.67M17 19l-2 2m0-5.5l-2 2m0 2.5l-2 2" />
                  <path
                    stroke-linejoin="round"
                    d="m6 22.385l4.286-3.692H6L10.286 15"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-1 fill-blue-500 text-center text-sm opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="text-blue-500">There&apos;s an easier way</p>
        </div>
      </section>

      {/* Features section */}
      <div className="mx-auto mb-8 mt-16 max-w-6xl sm:mt-20">
        <Features />
      </div>

      {/* Pricing */}
      <div className="mx-auto mb-12 mt-6 max-w-6xl sm:mt-20">
        <Pricing />
      </div>

      {/* Footer */}
      <div className="w-full border-t border-secondary">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
            <div className="mx-auto w-80 max-w-full flex-shrink-0 text-center md:mx-0 md:text-left">
              <a
                aria-current="page"
                className="flex items-center justify-center gap-2 md:justify-start"
                href="/#"
              >
                <strong className="text-base font-extrabold tracking-tight md:text-lg">
                  SimpleGTD
                </strong>
              </a>
              <p className="text-base-content/80 mt-3 text-sm leading-relaxed">
                Stress Less, Achieve More
                <br />
                Copyright © 2024 - All rights reserved
              </p>
            </div>
            <div className="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-24 md:text-left">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="footer-title text-base-content mb-3 text-sm font-semibold tracking-widest md:text-left">
                  LINKS
                </div>
                <div className="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
                  <a className="link link-hover" href="/">
                    Home
                  </a>
                  <a className="link link-hover" href="/pricing">
                    Pricing
                  </a>
                </div>
              </div>
            </div>
            <div className="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-24 md:text-left">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="footer-title text-base-content mb-3 text-sm font-semibold tracking-widest md:text-left">
                  LEGAL
                </div>
                <div className="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
                  <a className="link link-hover whitespace-nowrap" href="/tos">
                    Terms of services
                  </a>
                  <a className="link link-hover" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
