import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  eslint.configs.recommended, // eslint의 권장 config 사용
  ...typescriptEslint.configs.recommended, // ts-eslint의 권장 config spread
  {
    files: ['**/*.@(js|ts|jsx|tsx)'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.react.rules,
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      "@typescript-eslint/no-explicit-any": 0, // any 허용
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
