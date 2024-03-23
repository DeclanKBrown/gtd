'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { Icons } from './icons'
import { Button } from '@/components/ui/button'

export const Sidebar = () => {
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
    },
  ]

  return (
    <div className="pb-12">
      <div className="py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-center lg:justify-start"
            >
              <Icons.capture />
              <span className="hidden lg:block">Capture</span>
            </Button>
          </div>
        </div>
        {links.map((link) => (
          <div className="px-3 py-2" key={link.name}>
            <div className="space-y-1">
              <Link
                href={link.href}
                className={'lg:justify-start} w-full justify-center'}
              >
                <Button
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  className="w-full justify-center lg:justify-start"
                >
                  {link.icon}
                  <span className="hidden lg:block">{link.name}</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
