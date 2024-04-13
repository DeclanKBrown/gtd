import { getServerSession } from 'next-auth'
import { Sidebar } from '@/components/dashboard/SideBar'
import { redirect } from 'next/navigation'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect('/login')
  }

  const subscriptionPlan = await getUserSubscriptionPlan()

  if (!subscriptionPlan.isSubscribed) {
    redirect('/pricing')
  }

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
