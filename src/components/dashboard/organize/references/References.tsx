'use client'

import { formatDistance } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { trpc } from '@/app/_trpc/Client'

const References = () => {
  const { data: references, isLoading } = trpc.getReferences.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-2 pt-0">
      {references &&
        references.map((item) => (
          <button
            key={item.id}
            className={
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div className={'ml-auto text-xs text-muted-foreground'}>
                  {formatDistance(new Date(item.createdAt), Date.now(), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.url}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item?.note?.substring(0, 300)}
            </div>
            {/* {item.areas.length ? (
              <div className="flex items-center gap-2">
                {item.areas.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
    </div>
  )
}

export default References
