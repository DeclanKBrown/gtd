import '@/styles/globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/providers/Providers'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GTD',
  description: 'Get Things Done',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            'grainy min-h-screen font-sans antialiased',
            inter.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  )
}

export default RootLayout
