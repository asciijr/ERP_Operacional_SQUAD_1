// Valida o padrão de branch do Guia de Engenharia (3.2): tipo/numero-do-card-descricao-curta
// Uso: node scripts/check-branch-name.mjs [nome-da-branch]
import { execSync } from 'node:child_process';

const branch = process.argv[2] ?? execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const permanent = ['main', 'develop', 'HEAD'];
const pattern = /^(feat|fix|hotfix|refactor|docs|test|chore)\/\d+-[a-z0-9]+(-[a-z0-9]+)*$/;

if (permanent.includes(branch) || pattern.test(branch)) process.exit(0);

console.error(`[ERRO] Nome de branch inválido: "${branch}"`);
console.error('Formato: tipo/numero-do-card-descricao-curta (minúsculas, sem acentos, hífens)');
console.error('Exemplo: feat/12-cadastro-de-leads');
console.error('Tipos: feat, fix, hotfix, refactor, docs, test, chore');
console.error('Renomear: git branch -m <novo-nome>');
process.exit(1);
