const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@ryuk/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
