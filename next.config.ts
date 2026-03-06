import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/posters/print",
        destination: "/one-god-one-message.pdf",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // Force the PDF to download instead of opening in the browser
        source: "/one-god-one-message.pdf",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="One God · One Message.pdf"' },
        ],
      },
      {
        // Allow /posters to be embedded in Squarespace (or any site)
        source: "/posters/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
      {
        // Also allow the API image/data routes to be called cross-origin
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
