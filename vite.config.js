import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    port: 1812,
    server: {
        proxy: {
            '/api': {
                target: 'http://172.27.111.252:3000',
                changeOrigin: true,
            },
        },
    },
});
