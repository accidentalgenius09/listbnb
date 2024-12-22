/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    rest_api_endpoint: "https://ads.planetmedia.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.imagineonline.store",
      },
      {
        protocol: "https",
        hostname: "letsenhance.io",
      },
    ],
  },
};

export default nextConfig;
