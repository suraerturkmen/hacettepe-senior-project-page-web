/** @type {import('next').NextConfig} */

const { version } = require("./package.json");
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  compiler: {},
};

module.exports = nextConfig;
