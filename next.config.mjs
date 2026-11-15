/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets `pnpm dev` be opened from a phone on the local network (192.168.x.x).
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // Prefer AVIF (smallest), fall back to WebP. Applies to next/image output.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
