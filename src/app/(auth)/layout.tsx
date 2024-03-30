import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await getServerSession()
  if (session && session.user) {
    redirect('/dashboard')
  }

  return <div className="min-h-screen">{children}</div>
}

export default AuthLayout
