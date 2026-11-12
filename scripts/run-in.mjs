// Executa um comando dentro de uma subpasta (usado pelo lint-staged).
// Uso: node scripts/run-in.mjs <pasta> <comando> [args...]
import { spawnSync } from 'node:child_process';

const [dir, cmd, ...args] = process.argv.slice(2);
const result = spawnSync(cmd, args, { cwd: dir, stdio: 'inherit', shell: process.platform === 'win32' });
process.exit(result.status ?? 1);
