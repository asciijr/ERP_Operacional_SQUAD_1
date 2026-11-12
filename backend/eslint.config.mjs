// Configuração de lint do backend. NÃO altere sem aval do Tech Lead (Guia de Engenharia 5.1).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules', 'eslint.config.mjs'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Monolito Modular (Guia 7.1): proibido importar arquivos INTERNOS de outro módulo.
      // Converse com outro módulo apenas pelo service exportado.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*/*.repository', '../*/entities', '../*/entities/*'],
              message:
                'Monolito Modular: não importe repository/entities de outro módulo. Use o Service público dele.',
            },
          ],
        },
      ],
    },
  },
  {
    // shared/ é só infraestrutura transversal e nunca importa nada de modules/ (Guia 7.1, regra 5)
    files: ['src/shared/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/modules/**'], message: 'shared/ não pode importar nada de modules/.' },
          ],
        },
      ],
    },
  },
);
