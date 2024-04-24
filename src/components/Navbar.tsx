import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-white/5 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="z-40 flex font-semibold">
            SimpleGTD
          </Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Sign In
                </LoginLink>
                <RegisterLink
                  className={cn(
                    buttonVariants({
                      size: 'sm',
                      variant: 'default',
                      className: 'my-8 bg-[#3b82f6] text-white',
                    }),
                    'bg-blue-500 hover:bg-blue-600',
                  )}
                >
                  Get Organized <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
