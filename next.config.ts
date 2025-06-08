import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", "obs.line-scdn.net", "iconbu.com"],
  },
};

module.exports = nextConfig;

export default nextConfig;
