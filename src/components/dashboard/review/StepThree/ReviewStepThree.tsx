import { useState } from 'react'
import { Input } from '@/components/ui/input'
import TableSimple from '../../table/TableSimple'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'
import { Task } from '@prisma/client'
import { Loader } from '@/components/Loader'

const ReviewStepThree = () => {
  const [taskInput, setTaskInput] = useState('')

  const { data: tasks, isLoading } = trpc.getSomedayForTasks.useQuery()

  const utils = trpc.useUtils()

  const { mutate: createTask } = trpc.createTask.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task created',
        variant: 'default',
      })
      utils.getSomedayForTasks.reset()
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error creating task',
        variant: 'destructive',
      })
    },
  })

  const handleAddTask = () => {
    if (!taskInput.trim()) return
    const task = {
      name: taskInput,
      status: 'SOMEDAY',
      goalCompletedAt: new Date(),
    }
    createTask({
      data: {
        ...task,
      },
    })
    setTaskInput('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask()
    }
  }

  /* LOADING */
  if (isLoading) {
    return <Loader />
  }

  /* ERROR */
  if (!tasks) {
    return (
      <div className="flex w-full items-center justify-center py-12 text-xl text-red-500">
        <h1>Error</h1>
      </div>
    )
  }

  return (
    <div className="my-4 flex flex-col items-center gap-6 px-4 text-primary">
      <Input
        placeholder="Review your Someday Maybe list, delete uninteresting ones, and add bold new ideas"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="w-full">
        {/* {tasks.length === 0 ? (
          <div className="flex w-full items-center justify-center py-12 text-xl">
            <h1>No tasks found</h1>
          </div>
        ) : ( */}
        <>
          {/* @ts-ignore */}
          <TableSimple data={tasks} />
        </>
        {/* )} */}
      </div>
    </div>
  )
}

export default ReviewStepThree
