/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, webpack, dev }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  }
}

module.exports = nextConfig
