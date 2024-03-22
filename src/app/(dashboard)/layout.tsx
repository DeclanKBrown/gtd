import { Sidebar } from '@/components/SideBar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-20 flex-shrink-0 lg:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow border-l">{children}</div>
    </div>
  )
}

export default DashboardLayout
