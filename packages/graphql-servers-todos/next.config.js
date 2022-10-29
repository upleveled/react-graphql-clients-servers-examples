/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = config;
