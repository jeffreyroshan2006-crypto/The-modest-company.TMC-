/** @type {import('next').NextConfig} */
const nextConfig = {
  // We removed 'output: export' because Vercel handles the build automatically
  images: {
    unoptimized: true, // You can keep this or remove it. keeping it is safer for now.
  },
};

export default nextConfig;

