/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Prefer AVIF (smallest), fall back to WebP. Applies to next/image output.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
