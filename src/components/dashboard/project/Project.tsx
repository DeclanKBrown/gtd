'use client'

import { trpc } from '@/app/_trpc/Client'
import { Loader } from '@/components/Loader'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import TableNonConfig from '../table/TableNonConfig'

const Project = () => {
  const { id }: { id: string } = useParams()

  const { data: project, isLoading } = trpc.getProject.useQuery({
    id,
  })

  const { data: tasks } = trpc.getProjectTasks.useQuery({
    projectId: id,
  })

  const [isEditingName, setIsEditingName] = useState(false)
  const [editNameValue, setEditNameValue] = useState(project?.name)

  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editDescriptionValue, setEditDescriptionValue] = useState(
    project?.description,
  )

  useEffect(() => {
    setEditNameValue(project?.name)
    setEditDescriptionValue(project?.description)
  }, [project])

  const { mutate: updateProject } = trpc.updateProject.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Project updated',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error updating project',
        variant: 'destructive',
      })
    },
  })

  /* LOADING */
  if (isLoading) {
    return <Loader />
  }

  /* ERROR */
  if (!project) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>Error</h1>
      </div>
    )
  }

  const handleSave = () => {
    updateProject({
      id: project.id,
      data: {
        name: editNameValue,
        description: editDescriptionValue,
      },
    })
    setIsEditingName(false)
    setIsEditingDescription(false)
  }

  // @ts-ignore
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <>
      <div className="flex h-full flex-col gap-6">
        <div className="flex w-full flex-col gap-2 lg:w-[50%]">
          <div onClick={() => setIsEditingName(true)} className="mb-2">
            {isEditingName ? (
              <Input
                value={editNameValue}
                className="m-0 w-full rounded-none border-none bg-transparent p-0 text-2xl font-semibold leading-normal focus:outline-none focus:ring-0 focus-visible:ring-0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditNameValue(e.target.value)
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
                placeholder="Enter Name..."
              />
            ) : (
              <span className="text-2xl font-semibold leading-normal">
                {editNameValue}
              </span>
            )}
          </div>
          <div onClick={() => setIsEditingDescription(true)}>
            {isEditingDescription ? (
              <Textarea
                value={editDescriptionValue}
                className="m-0 w-full truncate rounded-none border-none bg-transparent p-0 text-sm leading-normal focus:outline-none focus:ring-0 focus-visible:ring-0"
                onChange={(e) => setEditDescriptionValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <>
                {editDescriptionValue ? (
                  <span className="text-sm leading-normal">
                    {editDescriptionValue}
                  </span>
                ) : (
                  <span className="text-sm leading-normal text-white/60">
                    Edit Description
                  </span>
                )}
              </>
            )}
          </div>
          <span className="text-sm text-white/60">
            {format(project.createdAt, 'dd/MM/yyyy HH:MM')}
          </span>
        </div>
        {/* @ts-ignore */}
        <TableNonConfig data={tasks} />
      </div>
    </>
  )
}

export default Project
