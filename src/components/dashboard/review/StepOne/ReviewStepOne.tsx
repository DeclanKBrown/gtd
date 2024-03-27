import { useState } from 'react'
import ReviewStepOneTable from './ReviewStepOneTable'
import { Input } from '@/components/ui/input'

type Task = {
  title: string
  status: string
  goalCompleted: Date | null
  priority: string
}

const ReviewStepOne = () => {
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
        placeholder="Gather and process all loose materials and thoughts to ensure everything is within your GTD system"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ReviewStepOneTable data={tasks} />
    </div>
  )
}

export default ReviewStepOne
