'use client'

import { useEffect, useState } from 'react'
import { Progress } from './ui/progress'

export const Loader = () => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 20))
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex w-full items-center justify-center py-32">
      <Progress value={value} className="w-[60%] " />
    </div>
  )
}
