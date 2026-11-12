# Arquitetura

> Fonte: Project Blueprint v1.1 (seções 3 e 4) + Guia de Engenharia (seções 7 e 8).

## Visão geral

```text
React (Vite) ──HTTP/REST──▶ NestJS (Monolito Modular) ──Prisma──▶ PostgreSQL
  Atomic Design              controller → service → repository
```
Fluxo: Marketing cadastra lead → Comercial move no Kanban e preenche diagnóstico → contrato fechado → **projeto criado automaticamente (idempotente, em transação)** → painel de acompanhamento.

## Módulos do backend e responsáveis sugeridos

> Responsável = lidera e garante integração; não faz tudo sozinho. Fonte: Plano de Distribuição da Squad 1 (proposta, revisar após a Sprint 1).

| Módulo | Domínio | Tabelas (dono) | Responsável · apoio |
|---|---|---|---|
| `leads` | cadastro, Kanban, etapas e histórico de movimentação | Lead, FunnelStage, LeadStageHistory, Interaction | Lethicia (cadastro) · Marcelo (etapas/histórico) · Gabriel (interações) |
| `diagnostics` | ficha SPIN, bloqueio de avanço | Diagnosis | Lethicia · Marcelo (validações) |
| `clients` | clientes e contatos | Client, Contact | Lethicia · Gabriel |
| `contracts` | contratos e referência ao Drive | Contract | Kaike · Lethicia, Marcelo |
| `projects` | conversão contrato→projeto, status, atualizações | Project, ProjectUpdate | Marcelo (conversão) · Gabriel (atualizações) |
| `allocations` | integrantes/responsáveis em projetos | ProjectAllocation | Gabriel · Mateus |
| `squads` | equipes | Squad | Gabriel |
| `sprints` | ciclos por projeto | Sprint | Gabriel |
| `users` | identidade e permissões (integra com Squad 2) | User | Marcelo · Kaike |

> Onde fica `Interaction` (histórico de comunicação) e se `FunnelStage` é módulo próprio são decisões do Tech Lead: registre em `docs/decisions/` antes de criar as tabelas.

## Regras do Monolito Modular (o lint cobra)

1. Um módulo = um domínio. Nada de pasta `controllers/` global.
2. Só o `XxxService` é público (`exports` do módulo). Outro módulo importa o **Module** e injeta o **Service**.
3. ❌ Proibido importar `repository`/`entities` de outro módulo → **erro de lint**.
4. Cada módulo é dono das suas tabelas; nada de query na tabela do vizinho.
5. `shared/` é infraestrutura e nunca importa `modules/` → **erro de lint**.
6. Sem dependência circular. Novo módulo = aval do Tech Lead + ADR.

```typescript
// projects.module.ts
@Module({ imports: [ContractsModule], providers: [ProjectsService, ProjectsRepository] })
// projects.service.ts
constructor(private readonly contracts: ContractsService, private readonly repo: ProjectsRepository) {}
```

Estrutura de cada módulo:
```text
modules/leads/
├── leads.module.ts        # registra e exporta LeadsService
├── leads.controller.ts    # rotas HTTP + decorators Swagger
├── leads.service.ts       # regra de negócio (interface pública)
├── leads.repository.ts    # acesso ao Prisma (interno)
├── dto/                   # entrada/saída com class-validator
├── entities/              # tipos do domínio (interno)
└── leads.service.spec.ts  # testes (definidos ANTES do código)
```

## Pontos críticos (testar primeiro)

| Regra | Onde | Como garantir |
|---|---|---|
| RN05/RF09 lead não avança sem diagnóstico | `leads` + `diagnostics` | validação no **service** (não só na tela) |
| RN02/RN03 Marketing cadastra, só Comercial move | `leads` + `users` | guarda de permissão por perfil |
| RN07/RN18 histórico preservado (append-only) | `leads`, `projects` | sem update/delete nas tabelas de histórico |
| RN10/RN12 1 contrato → no máx. 1 projeto, idempotente | `projects` | `@unique` em `contractId` + `prisma.$transaction` |
| RN13 falha não perde dados | `projects` | transação; teste de rollback |
| RN14 contrato finalizado imutável | `contracts` | service rejeita alteração |

## Frontend (Atomic Design, o lint cobra)

```text
src/components/atoms      Button, Input, Label, Badge          (só props, sem API)
src/components/molecules  FormField, SearchBar, KanbanCard     (atoms)
src/components/organisms  KanbanBoard, LeadForm, ProjectTable  (pode ter estado)
src/components/templates  DashboardLayout                      (layout sem dados)
src/pages                 LeadsPage, ProjectsPage              (conecta com hooks/services)
src/services              chamadas HTTP (api.ts)
src/hooks                 useLeads, useProjects
```
Base visual compartilhada com o Squad 2: consumir os componentes/especificações deles quando compatíveis, sem depender de implementação interna.

## Dependências externas (Squad 2 / Site)

| Item | Decisão pendente | Impacto |
|---|---|---|
| Autenticação e usuários | DP12 | `users` e permissões ficam com mock/stub até o contrato chegar |
| Webhook do Site ASCII | DP11 | RF22: endpoint de entrada de leads preparado, sem integração real |
| Hospedagem e deploy | DP13 | CD publica imagens; deploy aguarda |
