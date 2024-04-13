'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/Client'
import { httpBatchLink } from '@trpc/client'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://gtd-three.vercel.app/api/trpc'
      : 'http://localhost:3000/api/trpc'

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: apiUrl,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
