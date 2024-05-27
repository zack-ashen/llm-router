/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  experimental: {
    serverMinification: false,
    serverActions: {
      allowedOrigins: [
        "tryparakeet.com",
        "*.tryparakeet.com",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
