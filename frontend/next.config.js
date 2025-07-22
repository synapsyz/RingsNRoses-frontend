/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'blog.venuelook.com',
      'encrypted-tbn0.gstatic.com',
      'cf-img-a-in.tosshub.com',
      'www.mconventions.com',
      'images.unsplash.com',
      'cdn.pixabay.com', // Added this line
    ],
  },
  // other config...
};

module.exports = nextConfig;