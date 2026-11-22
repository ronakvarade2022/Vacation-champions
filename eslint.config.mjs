import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      '.aistudio/**/*',
      'src/**/*',
      'server.ts',
      'server.js',
      'vite.config.ts',
    ],
  },
  firebaseRulesPlugin.configs['flat/recommended'],
];
