import Navbar from '@/components/Navbar'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}

export default AuthLayout
