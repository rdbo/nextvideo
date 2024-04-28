/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
