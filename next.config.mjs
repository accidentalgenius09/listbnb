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
    ],
  },
};

export default nextConfig;
