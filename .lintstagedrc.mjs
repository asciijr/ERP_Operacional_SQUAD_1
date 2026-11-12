// lint-staged na raiz: roda ESLint/Prettier de cada pasta apenas nos arquivos alterados.
import path from 'node:path';

const run = (dir, tool, files) =>
  `node scripts/run-in.mjs ${dir} npx ${tool} ${files.map((f) => path.relative(dir, f).replaceAll('\\', '/')).join(' ')}`;

export default {
  'frontend/**/*.{ts,tsx}': (files) => [
    run('frontend', 'eslint --fix', files),
    run('frontend', 'prettier --write', files),
  ],
  'backend/**/*.ts': (files) => [
    run('backend', 'eslint --fix', files),
    run('backend', 'prettier --write', files),
  ],
};
