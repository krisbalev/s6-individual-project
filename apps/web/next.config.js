const path = require("path");
require("dotenv").config({ path: "../../.env" });

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: [
      's.gravatar.com',
      'lh3.googleusercontent.com',
      'individualbucket.s3.eu-north-1.amazonaws.com'
    ]
  },
};