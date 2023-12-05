/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "prismic-io.s3.amazonaws.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/people/:slug",
        destination: "/contributors/:slug",
        permanent: true,
      },
      {
        source: "/playbooks/(.*)",
        has: [{ type: "query", key: "b", value: "(?<slug>.*)" }],
        destination: "/travel-playbooks/:slug?b=",
        permanent: true,
      },
      {
        source: "/playbooks/:slug",
        destination: "/destinations/:slug",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
