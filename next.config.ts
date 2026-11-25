import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  // Let other devices on the local network (e.g. an iPad at 192.168.0.104:3000) load the dev server's scripts.
  // Without this, Next blocks them, the page never becomes interactive and the animations don't run.
  allowedDevOrigins: ["192.168.0.104", "192.168.0.*"],
};

export default config;
