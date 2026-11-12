# 01 · Setup do ambiente

> Complementa o **Guia do Membro** (seção 2). Meta: em ~1h você roda o projeto inteiro com um comando.

## 1. Instalar (uma vez)

| Ferramenta | Por quê | Conferir |
|---|---|---|
| Git | versionamento | `git --version` |
| Node.js **LTS** (24) | Git Hooks rodam fora do container | `node -v` |
| Docker Desktop + **WSL 2** (Windows) | todo o projeto roda em container | `docker compose version` |
| VS Code | editor padrão | `code -v` |
| GitHub CLI (opcional, recomendado) | abrir PRs e revisar pelo terminal | `gh --version` |

Windows: `wsl --install` (PowerShell como Admin) → reinicie → instale o Docker Desktop → em *Settings › General*, marque **Use the WSL 2 based engine**.
Pouca RAM? Crie `%UserProfile%\.wslconfig` com:
```ini
[wsl2]
memory=6GB
```

**Extensões do VS Code:** ao abrir o projeto, o VS Code sugere as recomendadas (`.vscode/extensions.json`). Clique em *Install All*. Formatação ao salvar já vem configurada.

## 2. Git e GitHub

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@dominio"
git config --global pull.rebase true
git config --global init.defaultBranch main
```
Chave SSH: siga o Guia do Membro e teste com `ssh -T git@github.com`.

## 3. Primeira execução

```bash
git clone https://github.com/asciijr/ERP_Operacional_SQUAD_1.git
cd ERP_Operacional_SQUAD_1
npm install               # ativa Husky (hooks). Sem isso, seus commits não são validados
cp .env.example .env
docker compose up --build
```

Pronto quando:
- http://localhost:5173 mostra **"API: ok"**
- http://localhost:3000/docs abre o Swagger

Teste os comandos do dia a dia:
```bash
docker compose exec backend npm test
docker compose exec frontend npm test
docker compose exec backend npm run db:seed
```

> 💡 Para o VS Code entender os tipos (autocomplete/ESLint), rode também `npm install` dentro de `backend/` e `frontend/` na sua máquina. Mas **comandos do projeto rodam no container**.

## 4. Comandos do dia a dia

```bash
docker compose up -d                      # sobe em segundo plano
docker compose logs -f backend            # logs
docker compose exec backend sh            # terminal dentro do container
docker compose exec backend npx prisma migrate dev --name add-leads-table
docker compose exec backend npm run db:studio   # visualizar o banco: http://localhost:5555
docker compose down                       # derruba
docker compose down -v                    # derruba e APAGA o banco local
```

Mudou `package.json` (alguém adicionou dependência)? `docker compose up --build`.

## 5. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| `port is already allocated` / 5432 em uso | PostgreSQL instalado na máquina | no `.env`, troque `DB_HOST_PORT=5433` (ou pare o serviço local em *Serviços › postgresql*). O banco do projeto roda só no container |
| `open //./pipe/dockerDesktopLinuxEngine` | Docker Desktop fechado | abra o Docker Desktop e espere "Engine running" |
| Hot reload não atualiza | projeto em pasta do Windows com WSL | já usamos polling; se persistir, clone dentro do WSL (`~/projetos`) |
| `Cannot find module` no container | volume de `node_modules` antigo | `docker compose down` e `docker compose up --build` |
| Commit recusado: `subject-case` / `type-empty` | mensagem fora do padrão | `tipo(escopo): descrição minúscula` |
| Commit recusado: nome de branch | branch fora do padrão | `git branch -m feat/12-descricao` |
| Commit recusado: `.env` | tentou commitar segredo | `git reset HEAD .env` |
| Hooks não rodam | não rodou `npm install` na raiz | `npm install` na raiz |
| Erro de banco após trocar de branch | migrations diferentes | `docker compose exec backend npx prisma migrate reset` (apaga dados locais) |
