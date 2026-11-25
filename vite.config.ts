import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifestFilename: 'manifest.json',
        includeAssets: [
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
          'apple-touch-icon.png',
          'file_00000000b7dc8211912b865fa7acee86.webp',
          'assets/aistudio/mystudyzone_hero_promo_clean.jpg',
          'icon.svg',
        ],
        manifest: {
          id: '/',
          name: 'MyStudyZone',
          short_name: 'MyStudyZone',
          description:
            'MyStudyZone – Complete Online Learning Platform for Classes 1 to 10 (Maharashtra State Board, CBSE & ICSE), Scholarship & TET/CTET Exam Prep.',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#fffbeb',
          theme_color: '#d97706',
          orientation: 'portrait-primary',
          categories: ['education', 'books'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: [
            '**/*.{css,html,ico,woff,woff2}',
            'assets/index-*.js',
            'assets/vendor-*.js',
          ],
          globIgnores: [
            '**/assets/aistudio/*.png',
            '**/data-tet-*',
            '**/data-scholarship-*',
            '**/data-questions-*',
            '**/data-worksheets*',
            '**/data-stories-*',
            '**/data-drawings-*',
            '**/admin-*',
          ],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//, /^\/functions\//, /^\/\.netlify\//],
          runtimeCaching: [
            {
              urlPattern: /^\/api\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^\/functions\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^\/\.netlify\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/(checkout|api)\.razorpay\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern:
                /^https:\/\/(firestore|identitytoolkit|securetoken)\.googleapis\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/.*\.firebaseapp\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'mystudyzone-pages-cache',
                networkTimeoutSeconds: 4,
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
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
      target: ['es2020', 'chrome80'],
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 25000,
      rolldownOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (
                id.includes('node_modules/react/') ||
                id.includes('node_modules/react-dom/') ||
                id.includes('node_modules/scheduler/') ||
                id.includes('lucide-react')
              ) {
                return 'vendor-ui';
              }
              return undefined;
            }
            if (id.includes('AdminQuestionErrorReportsSection')) {
              return 'admin-question-reports';
            }
            // Keep lightweight curriculum, utils & TET syllabus metadata out of heavy bank chunks
            if (
              id.includes('src/utils/') ||
              id.includes('src/data/tetCtetSyllabi') ||
              id.includes('src/data/boards/boardMeta') ||
              id.includes('src/data/boards/cbseCurriculumConfig') ||
              id.includes('src/data/boards/icseCurriculumConfig') ||
              id.includes('src/data/classCurriculumConfig')
            ) {
              return 'data-curriculum-meta';
            }
            if (id.includes('src/data/tetCtetVerifiedBatchManifest') || id.includes('src/data/tetCtetCentralAuditEngine')) {
              return 'data-tet-manifest';
            }
            if (
              id.includes('src/data/tetCtetAuditBatches') ||
              id.includes('src/data/tetCtetLanguageBanks') ||
              id.includes('src/data/tetCtetSubjectBanks') ||
              id.includes('src/data/tetCtetUnifiedSyllabusBanks') ||
              id.includes('src/data/tetCtetAutoReplacementBank') ||
              id.includes('src/data/tetCtetQuestionEngine')
            ) {
              return 'data-tet-banks';
            }
            if (
              id.includes('src/data/scholarship') ||
              id.includes('src/data/msceMock')
            ) {
              return 'data-scholarship';
            }
            if (id.includes('src/data/stories') || id.includes('src/data/shivajiStoriesData')) {
              return 'data-stories';
            }
            if (id.includes('src/data/drawingsData') || id.includes('src/data/readyMadeDrawings')) {
              return 'data-drawings';
            }
            if (id.includes('src/data/worksheets/')) {
              return 'data-worksheets-new';
            }
            if (
              id.includes('src/data/worksheetsData') ||
              id.includes('src/data/classDemoWorksheetsData')
            ) {
              return 'data-worksheets';
            }
            if (
              id.includes('src/data/boards/cbseDemoData') ||
              id.includes('src/data/boards/icseDemoData') ||
              id.includes('src/data/questions/') ||
              id.includes('src/services/questionBankService') ||
              id.includes('src/services/curriculumQuestionBank')
            ) {
              return 'data-questions';
            }
            return undefined;
          },
        },
      },
    },
  };
});
