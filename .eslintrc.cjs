module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.husky', '.next'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'no-redeclare': 'off',
    'no-undef': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
