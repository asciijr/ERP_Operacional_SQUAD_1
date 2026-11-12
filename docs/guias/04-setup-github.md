# 04 · Setup do GitHub (Tech Lead / Admin)

Checklist da seção 11.2 do Guia de Engenharia e o que já está pronto neste repositório.

## Status

| Item | Status |
|---|---|
| Repositório na organização `asciijr` | ✅ (público: proteção de branch funciona no plano gratuito) |
| Estrutura de pastas conforme o guia | ✅ |
| `docker compose up --build` sobe front, back e banco | ✅ |
| `.env.example` completo e `.env` no `.gitignore` | ✅ |
| ESLint + Prettier (com regras de Monolito Modular e Atomic Design) | ✅ |
| Husky + lint-staged + commitlint + bloqueio de `.env` | ✅ |
| Testes rodando no CI (Jest e Vitest) | ✅ |
| Script `db:seed` com faker | ✅ (esqueleto; cada card acrescenta seu seed) |
| `AGENTS.md` | ✅ |
| `ci.yml` em PRs | ✅ |
| Template de PR e `CODEOWNERS` | ✅ |
| `develop` criada e padrão | ⏳ rodar o script abaixo |
| Proteção da `main` e `develop` | ⏳ rodar o script abaixo (**exige Admin**) |
| README mínimo | ✅ |
| Membros com permissão Write (sem Admin) | ⏳ manual |

## Passo a passo

1. Fazer merge do PR de setup inicial (`chore/1-setup-inicial-repositorio`) na `develop` e depois release para a `main`, ou conforme orientado abaixo.
2. Rodar com uma conta **Admin** do repositório:
   ```bash
   gh auth login
   bash scripts/setup-github.sh asciijr/ERP_Operacional_SQUAD_1
   ```
   O script: cria a `develop` (se não existir), define-a como padrão, liga **Squash** + **Merge commit**, desliga **Rebase**, ativa a exclusão automática de branches e cria os rulesets:
   - PR obrigatório, 1 aprovação, aprovações descartadas em novo push, conversas resolvidas
   - checks obrigatórios: `conventions`, `frontend`, `backend-node`, `docker` (+ `branch-guard` na `main`)
   - branch atualizada com o destino, sem force push, sem exclusão, **sem bypass para admins**
3. *Settings › Collaborators and teams*: adicionar Mateus, Lethicia, Kaike, Marcelo e Gabriel com **Write**.
4. *Settings › Actions › General › Workflow permissions*: **Read and write** (necessário para o workflow de Release publicar imagens).

> ⚠️ Sua conta hoje tem permissão **Maintain**, que **não** permite criar rulesets. Peça a um Admin da organização (Diretoria) para rodar o script ou elevar sua permissão.

> ℹ️ "Exigir revisão de Code Owner" ficou **desligado** de propósito: com um único code owner (Tech Lead), PRs abertos por ele (suítes de teste, release) ficariam travados. O `CODEOWNERS` continua pedindo a revisão do Tech Lead automaticamente.

## Teste de fumaça da proteção

```bash
git checkout develop && git commit --allow-empty -m "chore: teste" --no-verify && git push
# esperado: rejeitado pelo GitHub (GH013 / protected branch)
git reset --hard origin/develop
```
