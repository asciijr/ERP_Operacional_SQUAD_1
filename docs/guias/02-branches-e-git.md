# 02 · Branches e Git no dia a dia

## Modelo (GitHub Flow simplificado)

```text
feat/12-cadastro-de-leads ──PR (squash)──▶ develop ──PR de release (merge commit)──▶ main ──▶ tag v1.0.0
                                              ▲                                        │
hotfix/57-login-fora-do-ar ──PR (squash)──────┼────────────────────────────────────────▶ main
                                              └────────── PR de sincronização (merge commit) ◀┘
```

| Branch | Para quê | Quem mexe |
|---|---|---|
| `main` | versão validada (produção) | só PR de release (`develop`) ou `hotfix/*` |
| `develop` | integração do dia a dia, **branch padrão** | só via PR |
| `feat/` `fix/` `refactor/` `docs/` `test/` `chore/` | trabalho de um card | o dev do card |
| `hotfix/` | urgência na `main` (nasce da `main`) | Tech Lead decide |

## Nome da branch

`tipo/numero-do-card-descricao-curta` · minúsculas, hífens, sem acento. O número é o **ID do card no Odoo**.

| ✅ | ❌ |
|---|---|
| `feat/12-cadastro-de-leads` | `feature/cadastro` |
| `fix/41-erro-ao-salvar-diagnostico` | `fix/Erro_Diagnóstico` |
| `chore/8-configurar-seed` | `marcelo-branch` |

O hook `pre-commit` e o CI recusam nomes fora do padrão.

## Por que branches curtas (até 3 dias)

Branch longa = conflito grande = merge doloroso. Se o card é grande, **quebre em cards menores** (ex.: "endpoint de criação" e "tela de cadastro" separados). PR ideal: até **~400 linhas**.

## Cola de comandos

```bash
# começar
git checkout develop && git pull origin develop
git checkout -b feat/12-cadastro-de-leads

# ver o que mudou
git status
git diff

# commitar
git add caminho/do/arquivo.ts
git commit -m "feat(leads): adiciona dto de criação"

# trazer o que entrou na develop (faça TODO DIA)
git fetch origin
git rebase origin/develop
git push --force-with-lease      # só na SUA branch, nunca em main/develop

# enviar
git push -u origin feat/12-cadastro-de-leads
```

## Resolvendo conflito (passo a passo)

```bash
git fetch origin
git rebase origin/develop
# CONFLICT in backend/src/modules/leads/leads.service.ts
```
1. Abra o arquivo no VS Code. Ele mostra **Accept Current / Incoming / Both**.
   - Durante **rebase**: *Current* = o que está na develop · *Incoming* = o seu commit.
2. Mantenha o que faz sentido (geralmente as duas mudanças), apague os marcadores `<<<<<<<` `=======` `>>>>>>>`.
3. Rode os testes.
4. Continue:
```bash
git add backend/src/modules/leads/leads.service.ts
git rebase --continue
```
Perdeu-se? `git rebase --abort` volta tudo como estava. Peça ajuda no grupo **antes** de forçar qualquer coisa.

## Desfazendo erros comuns

| Situação | Comando |
|---|---|
| Errei a mensagem do último commit (não enviei) | `git commit --amend -m "fix(leads): ..."` |
| Adicionei arquivo errado ao stage | `git reset HEAD <arquivo>` |
| Quero descartar mudanças de um arquivo | `git restore <arquivo>` |
| Commitei na develop por engano (hook deveria barrar) | `git branch feat/12-x && git reset --hard origin/develop && git checkout feat/12-x` |
| Guardar mudanças para trocar de branch | `git stash` · depois `git stash pop` |

## Releases e hotfix (Tech Lead)

- **Release:** PR `develop → main` com título `chore(release): v1.0.0`, **Create a merge commit**. Depois: `git tag v1.0.0 && git push origin v1.0.0` (dispara o workflow de Release).
- **Hotfix:** `git checkout main && git pull && git checkout -b hotfix/57-descricao` → PR para `main` (squash) → tag de PATCH (`v1.0.1`) → PR `main → develop` (merge commit).
- **Nunca** use squash em release/sincronização: a `main` e a `develop` divergiriam.
