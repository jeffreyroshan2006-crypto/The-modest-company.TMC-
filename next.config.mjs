/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This tells Next.js to create static HTML files
  images: {
    unoptimized: true, // Required for static export
  },
  // If your repo is NOT at the root domain, you might need basePath:
  // basePath: '/The-modest-company.TMC-',
}

module.exports = nextConfig
