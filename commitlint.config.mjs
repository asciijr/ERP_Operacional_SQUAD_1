export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Descrição em minúsculas e cabeçalho até 100 caracteres (Guia de Engenharia 3.3)
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'header-max-length': [2, 'always', 100],
  },
};
