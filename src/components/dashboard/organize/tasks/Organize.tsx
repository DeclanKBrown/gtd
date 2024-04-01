'use client'

import { trpc } from '@/app/_trpc/Client'
import { TableConfigurable } from '../../table/TableConfigurable'

const Organize = () => {
  const { data: tasks, isLoading } = trpc.getOrganizeTasks.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <TableConfigurable data={tasks} />
}

export default Organize
