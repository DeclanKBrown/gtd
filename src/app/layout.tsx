import '@/styles/globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/providers/Providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SimpleGTD',
  description: 'Stress Less, Achieve More',
  openGraph: {
    url: 'https://www.simplegtd.com',
    title: 'SimpleGTD',
    description: 'Stress Less, Achieve More',
    type: 'website',
    images: [
      {
        url: 'https://www.simplegtd.com/icon.svg',
        width: 800,
        height: 600,
        alt: 'SimpleGTD Logo',
      },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <Providers>
        <body
          className={cn(
            'grainy max-h-screen min-h-screen font-sans antialiased',
            inter.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function (c, l, a, r, i, t, y) {
                c[a] =
                  c[a] ||
                  function () {
                    ;(c[a].q = c[a].q || []).push(arguments)
                  }
                t = l.createElement(r)
                t.async = 1
                t.src = 'https://www.clarity.ms/tag/' + i
                y = l.getElementsByTagName(r)[0]
                y.parentNode.insertBefore(t, y)
              })(window, document, 'clarity', 'script', '${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}')
            `}
          </Script>
        </body>
      </Providers>
    </html>
  )
}

export default RootLayout
