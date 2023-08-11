/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ktn-image-bucket.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "//uploads/**",
      },
      {
        protocol: "https",
        hostname: "dos94juusp51f.cloudfront.net",
        port: "",
        pathname: "//uploads/**",
      },
      {
        protocol: "http",
        hostname: "a4411998e830c463d8c9710488954316-1078269471.us-east-1.elb.amazonaws.com",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    return config;
  },
};

module.exports = nextConfig;
