import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import TableSimple from '../../table/TableSimple'
import { trpc } from '@/app/_trpc/Client'
import { toast } from '@/components/ui/use-toast'

type Task = {
  name: string
  status: string
  goalCompletedAt: Date | null
  priority: string
}

const ReviewStepOne = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  const { mutate: createTask } = trpc.createTask.useMutation({
    onMutate: (task: { data: Task }) => {
      setTasks((currentTasks) => [...currentTasks, task.data])

      return { previousTasks: tasks }
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Task created',
        variant: 'default',
      })
    },
    onError: (error, task, context) => {
      console.error(error)

      if (context) {
        setTasks(context.previousTasks)
      }

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
      status: 'INBOX',
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

  return (
    <div className="my-4 flex flex-col items-center gap-6 px-4 text-primary">
      <Input
        placeholder="Gather and process all loose materials and thoughts to ensure everything is within your GTD system"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="w-full">
        <TableSimple data={tasks} />
      </div>
    </div>
  )
}

export default ReviewStepOne
