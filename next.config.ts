import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'join-looms.valureach.com',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: 'join-looms.valureach.com',
                pathname: '/defaults/**',
            },
        ],
    },
};

export default nextConfig;
