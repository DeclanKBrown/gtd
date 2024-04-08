'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { Icons } from '../icons'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import CaptureModal from './capture/CaptureModal'
import { isSunday } from 'date-fns'

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

  return (
    <div className="pb-12">
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
    </div>
  )
}
