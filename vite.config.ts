import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: [
        'mystudyzone.in',
        'www.mystudyzone.in',
        '.netlify.app',
        'ais-dev-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app',
        'ais-pre-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app',
        '.run.app',
        'localhost',
        '127.0.0.1',
      ],
      // Disable HMR WebSocket in preview/container environment so payment checkout is never affected by WebSocket disconnects
      hmr: false,
      ws: false as const,
      watch: null,
    },
    build: {
      chunkSizeWarningLimit: 900,
      rolldownOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('react') || id.includes('lucide-react')) return 'vendor-ui';
              return 'vendor-misc';
            }
            if (id.includes('src/data/scholarshipData')) return 'data-scholarship';
            if (id.includes('src/data/stories') || id.includes('src/data/shivajiStoriesData')) return 'data-stories';
            if (id.includes('src/data/drawingsData')) return 'data-drawings';
            if (id.includes('src/data/boards/') || id.includes('src/data/questionBank')) return 'data-questions';
            return undefined;
          },
        },
      },
    },
  };
});
