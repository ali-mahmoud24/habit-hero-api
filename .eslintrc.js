module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Prettier
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // fixes ␍ CRLF/LF issue
      },
    ],

    // TypeScript strictness (but practical)
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // allow "any" for now
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // General
    'no-console': 'off', // allow console.log for debugging
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
};
