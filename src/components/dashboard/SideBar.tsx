'use client'

import { usePathname, useRouter } from 'next/navigation'

import Link from 'next/link'
import { Icons } from '../icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState } from 'react'

import CaptureModal from './capture/CaptureModal'
import { isSunday } from 'date-fns'
import { Skeleton } from '../ui/skeleton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '../ui/use-toast'
import { useReviewComplete } from '@/hooks/useReviewComplete'
import { useKindeBrowserClient, LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const { user } = useKindeBrowserClient()

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

  const router = useRouter()

  const { isReviewComplete } = useReviewComplete()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden w-20 flex-col justify-between border-r md:flex lg:w-64">
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
                    {link.endIcon &&
                      isNowSunday &&
                      !isReviewComplete &&
                      link.endIcon}
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
                        {user?.given_name &&
                          user?.family_name &&
                          user.given_name[0].toUpperCase() +
                            user.family_name[0].toUpperCase()}
                      </div>
                      <span className="hidden lg:block">{`${user.given_name} ${user.family_name}`}</span>
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
                  <LogoutLink
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'w-full justify-start',
                    )}
                  >
                    Sign Out
                  </LogoutLink>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-black px-1 shadow-lg md:hidden">
        <div className="flex justify-around py-2">
          <Link
            href={links[0].href}
            className={'w-full justify-center lg:justify-start'}
          >
            <Button
              variant={isActive(links[0].href) ? 'secondary' : 'ghost'}
              className="w-full justify-center lg:justify-between"
            >
              <div className="flex items-center">{links[0].icon}</div>
            </Button>
          </Link>
          <Link
            href={links[1].href}
            className={'w-full justify-center lg:justify-start'}
          >
            <Button
              variant={isActive(links[1].href) ? 'secondary' : 'ghost'}
              className="w-full justify-center lg:justify-between"
            >
              <div className="flex items-center">{links[1].icon}</div>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-center lg:justify-start"
            onClick={showModal}
          >
            <Icons.capture />
          </Button>
          <Link
            href={links[2].href}
            className={'w-full justify-center lg:justify-start'}
          >
            <Button
              variant={isActive(links[2].href) ? 'secondary' : 'ghost'}
              className="w-full justify-center lg:justify-between"
            >
              <div className="flex items-center">{links[2].icon}</div>
            </Button>
          </Link>
          <Link
            href={links[3].href}
            className={'w-full justify-center lg:justify-start'}
          >
            <Button
              variant={isActive(links[3].href) ? 'secondary' : 'ghost'}
              className="w-full justify-center lg:justify-between"
            >
              <div className="flex items-center">{links[3].icon}</div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
