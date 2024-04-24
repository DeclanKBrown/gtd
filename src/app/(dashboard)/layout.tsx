import { Sidebar } from '@/components/dashboard/SideBar'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/lib/db'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const user = await getUser()

  if (!(await isAuthenticated())) {
    redirect('/')
  }

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) redirect('/auth-callback?origin=dashboard')

  const subscriptionPlan = await getUserSubscriptionPlan()

  if (!subscriptionPlan.isSubscribed) {
    redirect('/pricing')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  )
}

export default DashboardLayout
