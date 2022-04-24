module.exports = /** @type {import("next").NextConfig} */ ({
  webpack: (config, options) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
});
