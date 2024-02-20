import { defineConfig } from 'vite';
import path from 'path';

const HOST = process.env.MONACA_SERVER_HOST || '0.0.0.0';

export default defineConfig({
  root: './src',
  base: '',
  build: {
    outDir: '../www',
    minify: false,
    emptyOutDir: false,
  },
  server: {
    host: HOST,
    port: 8080,
  },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ],
    }
});
