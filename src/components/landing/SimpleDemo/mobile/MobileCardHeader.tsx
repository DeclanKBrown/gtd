import { RowProject } from '../../../dashboard/table/data-table-row-project'
import RowName from '../../../dashboard/table/data-table-row-name'
import React from 'react'

interface MobileCardHeaderProps {
  projects: any
  task: any
}

const DemoMobileCardHeader = ({ projects, task }: MobileCardHeaderProps) => {
  const handleProjectChange = (newProjectId: string) => {}

  /* Update Task */

  const handleNameChange = (newName: string) => {}

  return (
    <div className="flex w-full items-center space-x-2">
      <RowProject
        projects={projects}
        projectId={task.projectId}
        onProjectChange={handleProjectChange}
      />
      <RowName title={task.name} onSave={handleNameChange} />
    </div>
  )
}

export default DemoMobileCardHeader
