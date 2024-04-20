'use client'

import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Icons } from '@/components/icons'

const Features = () => {
  return (
    <>
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold text-zinc-200 sm:text-5xl">
            Start making progress toward your goals
          </h2>
          <p className="mt-4 text-xl text-zinc-300">
            A tried and tested method to turn you into a productivity machine
          </p>
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="capture" className="bg-none">
        <TabsList className="my-8 flex items-center justify-center space-x-6 bg-black/0 pt-8 lg:space-x-12">
          <TabsTrigger
            className="flex flex-col items-center justify-center data-[state=active]:fill-[#3b82f6] data-[state=active]:text-[#3b82f6]"
            value="capture"
          >
            <Icons.capture className="h-4 w-4 text-inherit lg:h-10 lg:w-10" />
            <h3 className="mt-4 font-bold text-inherit lg:text-2xl">Capture</h3>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col items-center justify-center data-[state=active]:fill-[#3b82f6] data-[state=active]:text-[#3b82f6]"
            value="process"
          >
            <Icons.process className="h-4 w-4 text-inherit lg:h-10 lg:w-10" />
            <h3 className="mt-4 font-bold text-inherit lg:text-2xl">Process</h3>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col items-center justify-center data-[state=active]:fill-[#3b82f6] data-[state=active]:text-[#3b82f6]"
            value="organize"
          >
            <Icons.organize className="h-4 w-4 text-inherit lg:h-10 lg:w-10" />
            <h3 className="mt-4 font-bold text-inherit lg:text-2xl">
              Organize
            </h3>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col items-center justify-center data-[state=active]:fill-[#3b82f6] data-[state=active]:text-[#3b82f6]"
            value="engage"
          >
            <Icons.engage className="h-4 w-4 text-inherit lg:h-10 lg:w-10" />
            <h3 className="mt-4 font-bold text-inherit lg:text-2xl">Engage</h3>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col items-center justify-center data-[state=active]:fill-[#3b82f6] data-[state=active]:text-[#3b82f6] "
            value="review"
          >
            <Icons.review className="h-4 w-4 text-inherit lg:h-10 lg:w-10" />
            <h3 className="mt-4 font-bold text-inherit lg:text-2xl">Review</h3>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="capture">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                <Image
                  src="/capture.webp"
                  alt="Dashboard Preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="process">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                <Image
                  src="/process.webp"
                  alt="Dashboard Preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="organize">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                <Image
                  src="/organize.webp"
                  alt="Dashboard Preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="engage">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                <Image
                  src="/engage.webp"
                  alt="Dashboard Preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="review">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="lg:rounded-2-xl -mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:p-4">
                <Image
                  src="/review.webp"
                  alt="Dashboard Preview"
                  width={1364}
                  height={866}
                  className="rounded-md bg-white/5 p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-4 md:p-5"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Features
