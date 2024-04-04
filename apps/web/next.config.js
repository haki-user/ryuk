const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@ryuk/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};
