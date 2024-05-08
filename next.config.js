/** @type {import('next').NextConfig} */

const { version } = require("./package.json");
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  compiler: {},
};

module.exports = nextConfig;
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
