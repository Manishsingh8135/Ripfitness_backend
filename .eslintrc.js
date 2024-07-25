module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      // You can add custom rules here
    },
  };