'use client'

import { trpc } from '@/app/_trpc/Client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Reference } from '@prisma/client'
import { useState } from 'react'

interface ReferenceSheetProps {
  reference: Reference
}

const ReferenceSheet = ({ reference }: ReferenceSheetProps) => {
  const [nameValue, setNameValue] = useState(reference.name)
  const [urlValue, setURLValue] = useState(reference.url)
  const [noteValue, setNoteValue] = useState(reference.note)

  const utils = trpc.useUtils()

  const { mutate: updateReference } = trpc.updateReference.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Reference updated',
        variant: 'default',
      })
      utils.getReferences.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating reference',
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = () => {
    updateReference({
      id: reference.id,
      data: {
        name: nameValue,
        url: urlValue,
        note: noteValue,
      },
    })
  }

  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{nameValue}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              value={urlValue || ''}
              onChange={(e) => setURLValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Note" className="text-right">
              Note
            </Label>
            <Textarea
              id="note"
              rows={4}
              value={noteValue || ''}
              onChange={(e) => setNoteValue(e.target.value)}
              className="col-span-3 max-h-[400px]"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSubmit}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  )
}

export default ReferenceSheet
