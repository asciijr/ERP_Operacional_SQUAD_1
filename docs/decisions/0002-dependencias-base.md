# 0002 · Dependências base

- **Data:** 2026-11-12
- **Status:** Aceita (aval do Tech Lead)
- **Responsável:** Ilton Batista

## Contexto
O guia exige aval do Tech Lead para toda dependência e registro das bibliotecas relevantes.

## Decisão
Além das ferramentas citadas no guia (React, Vite, NestJS, Prisma, Jest, Vitest, ESLint, Prettier, Husky, lint-staged, commitlint, faker), foram aprovadas:

| Pacote | Onde | Motivo |
|---|---|---|
| `class-validator`, `class-transformer` | backend | validação de DTOs com o `ValidationPipe` padrão do NestJS (RF01, RF09) |
| `@nestjs/swagger` | backend | contratos de API documentados em `/docs` (Plano: contratos OpenAPI; integração com Squad 2 e Site) |
| `supertest` | backend (dev) | testes e2e de endpoints |
| `@testing-library/*`, `jsdom` | frontend (dev) | testes de componentes com Vitest |
| `globals`, `typescript-eslint`, `eslint-config-prettier`, `eslint-plugin-react-*` | dev | configuração do ESLint 9 |

**Ainda NÃO decididas** (abrir ADR antes de instalar): roteamento (ex.: react-router), gerenciador de estado/fetch (ex.: TanStack Query), biblioteca de UI, drag-and-drop do Kanban, autenticação (depende da DP12).

## Consequências
Qualquer pacote fora desta lista em `package.json` deve ser barrado na revisão (o CI sinaliza mudança em `package.json` no resumo).
