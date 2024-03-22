import Navbar from '@/components/Navbar'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}
