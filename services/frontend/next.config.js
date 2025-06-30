const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        googleTag: process.env.NEXT_PUBLIC_GOOGLE_TAG,
        testingToken: process.env.NEXT_PUBLIC_TESTING_TOKEN,
    },
    experimental: {
        optimizePackageImports: [
            '@mantine/core',
            '@mantine/hooks',
        ],
    },
};

module.exports = withVanillaExtract(nextConfig);
