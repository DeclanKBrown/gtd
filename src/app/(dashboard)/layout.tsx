import { getServerSession } from 'next-auth'
import { Sidebar } from '@/components/dashboard/SideBar'
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  // TODO: Add back in
  // const session = await getServerSession()
  // if (!session || !session.user) {
  //   redirect('/login')
  // }

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
