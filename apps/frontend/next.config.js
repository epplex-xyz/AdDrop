/** @type {import('next').NextConfig} */
const plugin = require("@prisma/nextjs-monorepo-workaround-plugin");
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        emotion: true,
    },
    sassOptions: {
        // To use .scss
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "arweave.net",
                port: "*",
                pathname: "/**/*",
            },
        ],
        domains: ["arweave.net", "shdw-drive.genesysgo.net"]
    },
    publicRuntimeConfig: {
        NODE_ENV: process.env.NODE_ENV,
    },
    // You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file
    transpilePackages: ["@addrop/database"],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        if (isServer) {
            config.plugins = [...config.plugins, new plugin.PrismaPlugin()];
        }
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        config.externals.push("pino-pretty", "lokijs", "encoding");

        config.resolve.extensions.push('.ts', '.tsx');

        return config;
    },
};

module.exports = nextConfig;