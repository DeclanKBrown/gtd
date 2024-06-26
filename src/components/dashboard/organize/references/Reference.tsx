import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { ReferenceStatus } from '@prisma/client'
import { formatDistance } from 'date-fns'
import ReferenceSheet from './ReferenceSheet'

interface ReferenceProps {
  reference: {
    id: string
    name: string
    note: string | null
    url: string | null
    status: ReferenceStatus
    userId: string
    createdAt: string
    updatedAt: string
  }
}

const Reference = ({ reference }: ReferenceProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div
            key={reference.id}
            className={
              'flex h-[80px] max-h-[80px] cursor-pointer flex-col items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
            }
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{reference.name}</div>
                </div>
                <div className={'ml-auto text-xs text-muted-foreground'}>
                  {formatDistance(new Date(reference.createdAt), Date.now(), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium text-opacity-80">
                {reference.url}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {reference?.note?.substring(0, 300)}
            </div>
          </div>
        </SheetTrigger>
        {/* @ts-ignore */}
        <ReferenceSheet reference={reference} />
      </Sheet>
    </>
  )
}

export default Reference
