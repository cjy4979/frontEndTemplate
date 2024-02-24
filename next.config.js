/** @type {import('next').NextConfig} */
const path = require('path')
const withTM = require('next-transpile-modules')(['rc-util'])
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, webpack, dev }) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes('_app')
      )
    if (rule) {
      rule.issuer.include = [rule.issuer.include]
    }
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
module.exports = withTM(nextConfig)
