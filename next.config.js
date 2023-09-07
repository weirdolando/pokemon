/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["play.pokemonshowdown.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
