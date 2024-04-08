import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Reference } from '@prisma/client'
import { formatDistance } from 'date-fns'
import ReferenceSheet from './ReferenceSheet'

interface ReferenceProps {
  reference: Reference
}

const Reference = ({ reference }: ReferenceProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div
            key={reference.id}
            className={
              'flex cursor-pointer flex-col items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
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
            {/* {item.areas.length ? (
        <div className="flex items-center gap-2">
          {item.areas.map((label) => (
            <Badge key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </div>
      ) : null} */}
          </div>
        </SheetTrigger>
        <ReferenceSheet reference={reference} />
      </Sheet>
    </>
  )
}

export default Reference
