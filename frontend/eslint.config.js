// Configuração de lint do frontend. NÃO altere sem aval do Tech Lead (Guia de Engenharia 5.1).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Atomic Design (Guia 8.2): um nível só importa níveis ABAIXO dele.
// Atoms e Molecules não conhecem regra de negócio nem chamam a API (services/hooks).
const forbid = (levels, extra = []) => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        ...levels.map((l) => ({
          group: [`**/${l}/**`, `**/${l}`],
          message: `Atomic Design: este nível não pode importar de "${l}" (só de níveis abaixo).`,
        })),
        ...extra,
      ],
    },
  ],
});
const noApi = [
  {
    group: ['**/services/**', '**/services', '**/hooks/**', '**/hooks'],
    message: 'Atoms/Molecules não chamam API nem usam hooks de dados. Receba tudo via props.',
  },
];

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['src/components/atoms/**'],
    rules: forbid(['molecules', 'organisms', 'templates', 'pages'], noApi),
  },
  {
    files: ['src/components/molecules/**'],
    rules: forbid(['organisms', 'templates', 'pages'], noApi),
  },
  { files: ['src/components/organisms/**'], rules: forbid(['templates', 'pages']) },
  { files: ['src/components/templates/**'], rules: forbid(['pages'], noApi) },
);
