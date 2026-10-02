/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // Cloudflare Pages に静的サイトとして出力（out/）
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
