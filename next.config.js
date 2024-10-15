/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.fediv.me",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.myjumpdata.de",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
