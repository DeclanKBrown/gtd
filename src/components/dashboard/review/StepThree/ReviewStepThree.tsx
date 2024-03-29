import { useState } from 'react'
import { Input } from '@/components/ui/input'
import TableSimple from '../../table/TableSimple'

type Task = {
  title: string
  status: string
  goalCompleted: Date | null
  priority: string
}

const ReviewStepThree = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskInput, setTaskInput] = useState('')

  const handleAddTask = () => {
    if (!taskInput.trim()) return
    const task = {
      title: taskInput,
      status: 'INBOX',
      goalCompleted: null,
      priority: 'low',
    }
    setTasks([...tasks, task])
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
        placeholder="Review your Someday Maybe list, activate relevant projects, delete uninteresting ones, and add bold new ideas"
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

export default ReviewStepThree
