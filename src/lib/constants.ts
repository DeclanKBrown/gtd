import { Icons } from '@/components/icons'

export const priorityOptions = [
  { label: 'Critical', value: 'CRITICAL', icon: Icons.criticalPriority },
  { label: 'High', value: 'HIGH', icon: Icons.highPriority },
  { label: 'Medium', value: 'MEDIUM', icon: Icons.mediumPriority },
  { label: 'Low', value: 'LOW', icon: Icons.lowPriority },
]

export const statusOptions = [
  { label: 'Inbox', value: 'INBOX', icon: Icons.inbox },
  { label: 'Someday', value: 'SOMEDAY', icon: Icons.someday },
  { label: 'Waiting', value: 'WAITING', icon: Icons.waiting },
  { label: 'Next Action', value: 'NEXT_ACTION', icon: Icons.nextAction },
  { label: 'Done', value: 'DONE', icon: Icons.done },
  { label: 'Delegated', value: 'DELEGATED', icon: Icons.delegated },
  { label: 'Eliminated', value: 'ELIMINATED', icon: Icons.eliminated },
]
