/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: 'https://datastory-cloud-v2.stellate.sh/'
  }
}

module.exports = nextConfig
