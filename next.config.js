/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: '/api/graphql'
  }
}

module.exports = nextConfig
