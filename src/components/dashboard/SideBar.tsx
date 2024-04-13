'use client'

import { usePathname, useRouter } from 'next/navigation'

import Link from 'next/link'
import { Icons } from '../icons'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import CaptureModal from './capture/CaptureModal'
import { isSunday } from 'date-fns'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '../ui/use-toast'

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const links = [
    {
      name: 'Engage',
      href: '/dashboard/engage',
      icon: <Icons.engage />,
    },
    {
      name: 'Process',
      href: '/dashboard/process',
      icon: <Icons.process />,
    },
    {
      name: 'Organize',
      href: '/dashboard/organize',
      icon: <Icons.organize />,
    },
    {
      name: 'Review',
      href: '/dashboard/review',
      icon: <Icons.review />,
      endIcon: <Icons.active />,
    },
  ]

  const isNowSunday = isSunday(new Date())

  const user = useSession()?.data?.user

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
      return toast({
        title: 'Error',
        description: 'Error signing out',
        variant: 'destructive',
      })
    }
  }

  const router = useRouter()

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-center lg:justify-start"
              onClick={showModal}
            >
              <Icons.capture />
              <span className="hidden lg:block">Capture</span>
            </Button>
          </div>
        </div>
        {isModalOpen && <CaptureModal onClose={hideModal} />}
        {links.map((link) => (
          <div className="px-3 py-2" key={link.name}>
            <div className="space-y-1">
              <Link
                href={link.href}
                className={'w-full justify-center lg:justify-start'}
              >
                <Button
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  className="w-full justify-center lg:justify-between"
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="hidden lg:block">{link.name}</span>
                  </div>
                  {link.endIcon && isNowSunday && link.endIcon}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          {!user ? (
            <div className="flex items-center space-x-2 px-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-[140px]" />
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-center lg:justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-semibold">
                      {user?.name
                        ?.split(' ')
                        ?.map((name) => name[0])
                        ?.join('')}
                    </div>
                    <span className="hidden lg:block">{user.name}</span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[240px] p-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/subscription')}
                >
                  Subscription
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleSignOut()}
                >
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}
