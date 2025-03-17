/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['grcbucket.s3.amazonaws.com'], // Add your external image domain here
  },
};

export default nextConfig;
