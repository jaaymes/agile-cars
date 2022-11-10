/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache.js')

const path = require('path')

const headers = async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        }
      ],
    },
  ]


const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  swcMinify: true,
  images: {
    domains: ['localhost', 'image.shutterstock.com'],
  },
  pwa: {
    dest: 'public',
    swSrc: './service-worker.js',
    register: true,
    runtimeCaching,
    mode: 'production',
    reloadOnOnline: true,
    cacheOnFrontEndNav: true,
    disable: process.env.NODE_ENV === 'development',
  }
}

module.exports = buildConfig = _phase => {
  const plugins = [withPWA]
  const config = plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig, headers
  })
  return config
}