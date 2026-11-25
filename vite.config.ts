import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function findMatchingBraceEnd(str: string, openBraceIdx: number): number {
  let depth = 0;
  for (let i = openBraceIdx; i < str.length; i++) {
    const ch = str[i];
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Smart TV & Legacy Chromium (Chromium 74–108) CSS Compatibility Plugin.
 *
 * Tailwind CSS v4 wraps its theme (`--spacing`, colors, fonts), base reset, and utility classes
 * inside `@layer theme`, `@layer base`, and `@layer utilities`, and uses modern logical properties
 * (`padding-inline`, `margin-block`) and `:where()` selectors.
 *
 * On ViewSonic Smart TV / ViewBoard Android WebViews running Chromium < 99 (where CSS `@layer`
 * is unsupported), the browser discards the entire `@layer` blocks — causing all layout, icon sizing,
 * flex/grid, and button styles to disappear completely.
 *
 * This plugin unwraps `@layer` blocks in the emitted CSS bundle while preserving declaration order
 * (theme -> base -> components -> utilities), expands logical shorthands, and normalizes `:where()`
 * selectors so the website renders identically on Chromium 74–108 Smart TVs, mobile, and desktop.
 */
export function transformCssForSmartTvCompatibility(inputCss: string): string {
  let out = inputCss;

  // 1. Remove standalone @layer declaration statements (e.g. `@layer components;`)
  out = out.replace(/@layer\s+[a-zA-Z0-9_.,\s-]+;/g, '');

  // 2. Unwrap all `@layer <name> { ... }` blocks in cascade order
  while (true) {
    const match = /@layer(\s+[a-zA-Z0-9_.-]+)?\s*\{/.exec(out);
    if (!match) break;
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findMatchingBraceEnd(out, openIdx);
    if (closeIdx === -1) break;
    const inner = out.slice(openIdx + 1, closeIdx);
    out = out.slice(0, match.index) + inner + out.slice(closeIdx + 1);
  }

  // 3. Unwrap Tailwind v4's `@supports (((-webkit-hyphens:none)) ...)` wrapper around `--tw-*` initializers
  while (true) {
    const match = /@supports\s*\(\(\(-webkit-hyphens:none\)\)[^\{]+\{/.exec(out);
    if (!match) break;
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findMatchingBraceEnd(out, openIdx);
    if (closeIdx === -1) break;
    const inner = out.slice(openIdx + 1, closeIdx);
    out = out.slice(0, match.index) + inner + out.slice(closeIdx + 1);
  }

  // 4. Normalize `:is(:where(.group):hover ...)` and `:where(.space-y-...>:not(:last-child))` for Chromium < 88
  out = out.replace(/:is\(:where\(\.group\):hover\s+([^)]+)\)/g, '.group:hover $1');
  out = out.replace(/:where\((\.[^()>]+>:not\(:last-child\))\)/g, '$1');
  out = out.replace(/abbr:where\(\[title\]\)/g, 'abbr[title]');
  out = out.replace(
    /\[hidden\]:where\(:not\(\[hidden=until-found\]\)\)/g,
    '[hidden]:not([hidden=until-found])'
  );
  out = out.replace(
    /input:where\(\[type=button\],\[type=reset\],\[type=submit\]\)/g,
    'input[type=button],input[type=reset],input[type=submit]'
  );

  // 5. Expand logical shorthands (`padding-inline`, `padding-block`, `margin-inline`, `margin-block`, `inset-inline`, `inset-block`) for Chromium < 87
  out = out.replace(/padding-inline:([^;\}]+)/g, 'padding-left:$1;padding-right:$1');
  out = out.replace(/padding-block:([^;\}]+)/g, 'padding-top:$1;padding-bottom:$1');
  out = out.replace(/margin-inline:([^;\}]+)/g, 'margin-left:$1;margin-right:$1');
  out = out.replace(/margin-block:([^;\}]+)/g, 'margin-top:$1;margin-bottom:$1');
  out = out.replace(/inset-inline:([^;\}]+)/g, 'left:$1;right:$1');
  out = out.replace(/inset-block:([^;\}]+)/g, 'top:$1;bottom:$1');
  out = out.replace(/margin-inline-start:([^;\}]+)/g, 'margin-left:$1');
  out = out.replace(/margin-inline-end:([^;\}]+)/g, 'margin-right:$1');
  out = out.replace(/margin-block-start:([^;\}]+)/g, 'margin-top:$1');
  out = out.replace(/margin-block-end:([^;\}]+)/g, 'margin-bottom:$1');
  out = out.replace(/padding-inline-start:([^;\}]+)/g, 'padding-left:$1');
  out = out.replace(/padding-inline-end:([^;\}]+)/g, 'padding-right:$1');
  out = out.replace(/padding-block-start:([^;\}]+)/g, 'padding-top:$1');
  out = out.replace(/padding-block-end:([^;\}]+)/g, 'padding-bottom:$1');

  // 6. Add standard `transform:` fallbacks before individual CSS `translate`, `scale`, `rotate` properties (Chromium < 104)
  out = out.replace(
    /([\{;])translate:var\(--tw-translate-x\)\s+var\(--tw-translate-y\)/g,
    '$1transform:translate(var(--tw-translate-x),var(--tw-translate-y));translate:var(--tw-translate-x) var(--tw-translate-y)'
  );
  out = out.replace(
    /([\{;])scale:var\(--tw-scale-x\)\s+var\(--tw-scale-y\)/g,
    '$1transform:scale(var(--tw-scale-x),var(--tw-scale-y));scale:var(--tw-scale-x) var(--tw-scale-y)'
  );
  out = out.replace(/([\{;])scale:([0-9.]+)/g, '$1transform:scale($2);scale:$2');
  out = out.replace(/([\{;])rotate:(-?[0-9.]+deg)/g, '$1transform:rotate($2);rotate:$2');

  // 7. Remove `@supports (background-image:linear-gradient(in lab, red, red)){...}` and `@supports (color:lab(0% 0 0)){...}`
  // so `:root` colors remain standard `#hex` and gradients never get overridden with `in oklab` on Smart TV browsers (Chromium < 111)
  while (true) {
    const match =
      /@supports\s*\((?:background-image:linear-gradient\(in\s+lab|color:lab\(0%\s+0\s+0\))[^\{]*\{/.exec(
        out
      );
    if (!match) break;
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findMatchingBraceEnd(out, openIdx);
    if (closeIdx === -1) break;
    out = out.slice(0, match.index) + out.slice(closeIdx + 1);
  }

  // 8. Strip CSS Color 4 ` in oklab` / ` in oklch` / ` in lab` / ` in lch` from gradient directions
  // (`--tw-gradient-position:to right in oklab` -> `--tw-gradient-position:to right`)
  // In Chromium < 111 (ViewSonic Smart TV browsers), `linear-gradient(to right in oklab, ...)` is invalid CSS
  // and causes all `.bg-gradient-to-*` buttons (Share App, Install App, Login, shortcut cards) to lose their background!
  out = out.replace(
    /(--tw-gradient-position\s*:\s*[^;\}]+?)\s+in\s+(?:oklab|oklch|lab|lch|srgb|hsl)\b/gi,
    '$1'
  );
  out = out.replace(
    /(linear-gradient\(\s*to\s+[a-z\s]+?)\s+in\s+(?:oklab|oklch|lab|lch|srgb|hsl)\b/gi,
    '$1'
  );

  // 9. Ensure 2-stop gradients (`from-* to-*` without `via-*`) resolve directly without relying on multi-comma `var()` fallback or `@property`
  out = out.replace(
    /--tw-gradient-via-stops:initial/g,
    '--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from) var(--tw-gradient-from-position),var(--tw-gradient-to) var(--tw-gradient-to-position)'
  );

  return out;
}

function smartTvCssCompatibilityPlugin(): Plugin {
  return {
    name: 'mystudyzone-smart-tv-css-compat',
    enforce: 'post',
    transform(code, id) {
      if (id.endsWith('.css') || id.includes('.css?')) {
        return {
          code: transformCssForSmartTvCompatibility(code),
          map: null,
        };
      }
      return null;
    },
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && fileName.endsWith('.css')) {
          const rawSource =
            typeof chunk.source === 'string'
              ? chunk.source
              : Buffer.from(chunk.source).toString('utf-8');
          chunk.source = transformCssForSmartTvCompatibility(rawSource);
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      smartTvCssCompatibilityPlugin(),
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
            '**/data-study-library-*',
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
      target: ['es2019', 'chrome80'],
      cssTarget: 'chrome80',
      modulePreload: {
        polyfill: false,
        resolveDependencies: (_filename, deps) => {
          // Only preload core runtime/UI dependencies; never eagerly preload multi-megabyte exam/question banks
          return deps.filter(
            (d) =>
              !d.includes('data-tet-') &&
              !d.includes('data-scholarship-') &&
              !d.includes('data-worksheets') &&
              !d.includes('data-questions-') &&
              !d.includes('data-study-library-')
          );
        },
      },
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
            if (
              id.includes('src/data/notes/') ||
              id.includes('src/data/studyLibrary/')
            ) {
              return 'data-study-library';
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
