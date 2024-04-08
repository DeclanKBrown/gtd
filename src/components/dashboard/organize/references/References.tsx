'use client'

import { Badge } from '@/components/ui/badge'
import { trpc } from '@/app/_trpc/Client'
import { Loader } from '@/components/Loader'
import Reference from './Reference'

const References = () => {
  const { data: references, isLoading } = trpc.getReferences.useQuery()

  if (isLoading) {
    return <Loader />
  }

  /* ERROR */
  if (!references) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>References</h1>
      </div>
    )
  }

  /* EMPTY */
  if (references.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl">
        <h1>No references found</h1>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2 pt-0">
        {references &&
          references.map((item) => (
            <Reference key={item.id} reference={item} />
          ))}
      </div>
    </>
  )
}

export default References
