/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/engage',
        permanent: true, // Set to false if this redirect is temporary
      },
    ]
  },
}

export default nextConfig
