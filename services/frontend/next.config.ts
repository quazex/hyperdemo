import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
    devIndicators: false,
    logging: {
        incomingRequests: true,
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
        }],
    },
    experimental: {
        cpus: 8,
        workerThreads: false,
        optimizePackageImports: [
            '@mantine/core',
            '@mantine/hooks',
        ],
    },
});
