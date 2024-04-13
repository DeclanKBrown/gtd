'use client'

import { trpc } from '@/app/_trpc/Client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { referenceStatusOptions } from '@/lib/constants'
import { Reference } from '@prisma/client'
import { useState } from 'react'

interface ReferenceSheetProps {
  reference: Reference
}

const ReferenceSheet = ({ reference }: ReferenceSheetProps) => {
  const [nameValue, setNameValue] = useState(reference.name)
  const [statusValue, setStatusValue] = useState(reference.status)
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

  const { mutate: deleteReference } = trpc.deleteReference.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Reference deleted',
        variant: 'default',
      })
      utils.getReferences.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error deleting reference',
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = () => {
    //Don't submit if name is empty
    if (!nameValue) {
      toast({
        title: 'Error',
        description: 'Name is required',
        variant: 'destructive',
      })
      return
    }
    updateReference({
      id: reference.id,
      data: {
        name: nameValue,
        status: statusValue,
        url: urlValue,
        note: noteValue,
      },
    })
  }

  const handleDelete = () => {
    deleteReference({ id: reference.id })
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
              autoComplete="off"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={statusValue}
              onValueChange={(value) => setStatusValue(value)}
            >
              <SelectTrigger className="w-[247.25px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {referenceStatusOptions.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              autoComplete="off"
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
              autoComplete="off"
              rows={4}
              value={noteValue || ''}
              onChange={(e) => setNoteValue(e.target.value)}
              className="col-span-3 max-h-[400px]"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="text-red-500">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this reference
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-red-500"
                      onClick={handleDelete}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSubmit}>Save changes</Button>
            </>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  )
}

export default ReferenceSheet
