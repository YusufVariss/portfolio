/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Turbopack dev overlay'i devre dışı bırak
      resolveAlias: {},
    },
  },
  // Dev overlay'i tamamen kapat
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Dev indicator'ı kapat
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig