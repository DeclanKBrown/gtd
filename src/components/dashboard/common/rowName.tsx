import React, { useState } from 'react'
import { Input } from '@/components/ui/input'

interface EditableTitleProps {
  title: string
  onSave: (newTitle: string) => void
}

const RowName = ({ title, onSave }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <div className="max-w-[500px] truncate" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <Input
          value={editValue}
          className="m-0 w-[500px] truncate rounded-none border-none bg-transparent p-0 text-sm leading-normal focus:outline-none focus:ring-0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditValue(e.target.value)
          }
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="max-w-500px truncate">{editValue}</span>
      )}
    </div>
  )
}

export default RowName
