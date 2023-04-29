/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
