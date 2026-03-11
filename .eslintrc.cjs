module.exports = {
  root: true,
  ignorePatterns: ['.next/', 'node_modules/', 'dist/', 'coverage/', 'next-env.d.ts'],
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
      extends: ['next/core-web-vitals', 'next/typescript', 'eslint-config-prettier'],
    },
    {
      files: ['packages/**/*.{ts,tsx}', 'apps/**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended', 'eslint-config-prettier'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
  ],
};
