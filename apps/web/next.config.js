/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  serverExternalPackages: ["pino", "pino-pretty"],
};
