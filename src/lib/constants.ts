import { Icons } from '@/components/icons'

export const priorityOptions = [
  { label: 'Low', value: 'low', icon: Icons.lowPriority },
  { label: 'Medium', value: 'medium', icon: Icons.mediumPriority },
  { label: 'High', value: 'high', icon: Icons.highPriority },
  { label: 'Critical', value: 'critical', icon: Icons.criticalPriority },
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
