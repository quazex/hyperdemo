import { preact } from '@preact/preset-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        preact(),
        vanillaExtractPlugin(),
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                content: 'source/index.tsx',
            },
            output: {
                assetFileNames: '[name].[ext]',
                entryFileNames: '[name].js',
            },
        },
    },
});
