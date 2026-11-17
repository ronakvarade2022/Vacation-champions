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
