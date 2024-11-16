/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        // Dla każdej strony aplikacji
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline' 'unsafe-eval';", // Pozwala iframe z localhost oraz skryptom inline
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM http://localhost:3000', // Pozwala na osadzanie iframe z localhost
          },
        ],
      },
    ];
  },
};

export default nextConfig;
