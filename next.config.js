/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design',
    'rc-pagination',
    'rc-picker',
    'rc-util',
    'antd'
  ],
  webpack: (config, { isServer, webpack, dev }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    })

    return config
  }
}
module.exports = nextConfig
