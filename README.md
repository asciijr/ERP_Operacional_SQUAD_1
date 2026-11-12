# ERP Operacional · Squad 1

Sistema web interno da **ASCII Empresa Júnior (FACOM/UFU)** que centraliza o fluxo **Marketing → Comercial → Diagnóstico → Contrato → Projetos → Acompanhamento**: cadastro de leads, funil Kanban, ficha de diagnóstico, contratos, criação automática (idempotente) de projetos e painel de acompanhamento. Usuários: Marketing, Comercial, Projetos/Engenharia, Tech Lead e Diretoria.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite (Atomic Design) |
| Backend | Node.js LTS + TypeScript + NestJS (Monolito Modular) |
| Banco | PostgreSQL 16 + Prisma (migrations versionadas) |
| Testes | Vitest (frontend) · Jest (backend) |
| Qualidade | ESLint + Prettier · Husky + lint-staged + commitlint |
| Infra / CI | Docker + Docker Compose · GitHub Actions |

## Como rodar

**Pré-requisitos:** Git, Node.js LTS, Docker Desktop (WSL 2 no Windows) e VS Code com as extensões recomendadas. Passo a passo em [docs/guias/01-setup-ambiente.md](docs/guias/01-setup-ambiente.md).

```bash
git clone https://github.com/asciijr/ERP_Operacional_SQUAD_1.git
cd ERP_Operacional_SQUAD_1
npm install                 # uma vez: ativa os Git Hooks
cp .env.example .env
docker compose up --build
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:3000 (health: `/health`) |
| Contratos da API (Swagger) | http://localhost:3000/docs |
| Banco | `localhost:5432` (credenciais no `.env`) |

## Testes, lint e seed

Tudo **dentro do container**:

```bash
docker compose exec backend npm test          # Jest
docker compose exec frontend npm test         # Vitest
docker compose exec backend npm run lint
docker compose exec backend npm run typecheck
docker compose exec backend npm run db:seed   # dados fictícios (faker)
docker compose exec backend npx prisma migrate dev --name descricao   # nova migration
```

## Estrutura

```text
.github/            CI, Release, template de PR, CODEOWNERS
.husky/             Git Hooks (bloqueio de .env, lint, Conventional Commits)
backend/
  src/modules/      um módulo por domínio de negócio
  src/shared/       infraestrutura transversal (db, health)
  prisma/           schema, migrations e seed
frontend/
  src/components/   atoms · molecules · organisms · templates
  src/pages/        telas conectadas à API
  src/services/     chamadas HTTP
docs/               guias, arquitetura, equipe, backlog e decisões (ADR)
```

**Módulos de negócio:** `leads`, `diagnostics`, `clients`, `contracts`, `projects`, `allocations`, `squads`, `sprints`, `users`. Detalhes em [docs/arquitetura.md](docs/arquitetura.md).

## Documentação

| Para quê | Onde |
|---|---|
| Configurar a máquina | [docs/guias/01-setup-ambiente.md](docs/guias/01-setup-ambiente.md) |
| Branches, commits e Git no dia a dia | [docs/guias/02-branches-e-git.md](docs/guias/02-branches-e-git.md) |
| Fluxo do card (Odoo → branch → TDD → PR) | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Como o Tech Lead revisa PRs | [docs/guias/03-revisao-de-pr.md](docs/guias/03-revisao-de-pr.md) |
| Setup do GitHub (admin) | [docs/guias/04-setup-github.md](docs/guias/04-setup-github.md) |
| Arquitetura e donos dos módulos | [docs/arquitetura.md](docs/arquitetura.md) |
| Equipe, trilhas e tarefas-piloto | [docs/equipe-e-trilhas.md](docs/equipe-e-trilhas.md) |
| Backlog inicial para o Odoo | [docs/backlog-inicial-odoo.md](docs/backlog-inicial-odoo.md) |
| Decisões de arquitetura | [docs/decisions/](docs/decisions/) |
| Regras para assistentes de IA | [AGENTS.md](AGENTS.md) |

## Squad responsável

**Squad 1 – ERP Operacional** · Tech Lead e Scrum Master: **Ilton Batista**
Integrantes: Mateus, Lethicia Almeida, Kaike, Marcelo Gonçalves e Gabriel Amorim.
Gestão de tarefas e horas: **Odoo** (fonte oficial). Padrões: **Guia de Engenharia – ASCII Playbook**.
