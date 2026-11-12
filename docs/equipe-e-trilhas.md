# Equipe, conhecimentos e trilhas

> Fonte: Mapeamento de Capacidades (autodeclarado, **não** é avaliação) e Plano de Distribuição v1.0. Tecnologia não citada ≠ desconhecimento. Revisar ao fim da Sprint 1.

## Quem é quem

| Pessoa | Já conhece (declarado) | Precisa validar / aprender | Pacote que lidera |
|---|---|---|---|
| **Ilton Batista** | — | — | Tech Lead e Scrum Master: revisão, padrões, refinamento. **Não implementa features** |
| **Mateus** | Angular (avançado), Python, Git, dashboards/Kanban, HTTP com retry, Docker básico | React (Angular ≠ React), Vitest | Interface: layout, componentes-base, Kanban, painel |
| **Lethicia Almeida** | C#, Python, JS, PostgreSQL, APIs REST, Docker, modelagem relacional | NestJS, Prisma, Jest | Cadastros: leads, clientes, contatos, diagnóstico; testes unitários |
| **Kaike** | Spring Boot, FastAPI, JS/TS, PostgreSQL, Docker, Swagger | **Testes automatizados (nunca usou)**, NestJS | APIs: endpoints, contratos OpenAPI, integrações, Docker/setup, testes de integração |
| **Marcelo Gonçalves** | Python, PostgreSQL, Node.js, JS básico, auth/permissões, CRUD | TypeScript; **dificuldade com branches longas e conflitos** | Regras críticas: etapas do funil, validações, permissões, contrato→projeto |
| **Gabriel Amorim** | Python, Java, SQL, C, PostgreSQL, SQLite, Linux, modelagem | Git no dia a dia, Docker, testes, TypeScript | Dados: persistência, consultas, histórico, migrations, filtros |

## Trilha mínima antes do primeiro card (≈ 1 dia)

Todos:
1. [docs/guias/01-setup-ambiente.md](guias/01-setup-ambiente.md): projeto rodando + `npm test` no container.
2. [docs/guias/02-branches-e-git.md](guias/02-branches-e-git.md) e [CONTRIBUTING.md](../CONTRIBUTING.md).
3. Ler [docs/arquitetura.md](arquitetura.md) e o Guia de Engenharia seções 3, 4, 7, 8, 9 e 10.
4. Ler [docs/guias/05-uso-de-ia.md](guias/05-uso-de-ia.md) antes de usar qualquer IA no projeto.

Por pessoa (material oficial, gratuito):

| Pessoa | Estudar |
|---|---|
| Mateus | React docs "Learn" (componentes, props, state, effects) · Testing Library (queries) |
| Lethicia, Marcelo, Kaike | NestJS docs: Modules, Controllers, Providers, Pipes · Prisma: CRUD e `$transaction` |
| Kaike | Jest: `describe/it/expect`, mocks · Testes do NestJS (`Test.createTestingModule`) |
| Marcelo | TypeScript Handbook (tipos básicos) · seção "Resolvendo conflito" do guia de Git |
| Gabriel | Prisma: schema, relations, migrations · Git: rebase e conflitos · Docker Compose básico |

## Tarefas-piloto (Sprint 1, validam autonomia)

Pequenas, de ponta a ponta, uma por pessoa, todas com suíte de testes pronta antes:

| Pessoa | Piloto | Valida |
|---|---|---|
| Mateus | átomos `Input`, `Label` e molécula `FormField` com testes Vitest | React + Atomic Design + Vitest |
| Lethicia | model `Client` + migration + `ClientsService.create` com validação | NestJS + Prisma + Jest |
| Kaike | `POST /clients` (controller + DTO + Swagger) + teste e2e com supertest | endpoints + testes |
| Marcelo | model `FunnelStage` + seed das etapas + `list` ordenado | regra simples + seed, branch curta |
| Gabriel | model `Contact` (N:1 com Client) + `ContactsRepository` com consulta por cliente | Prisma relations + migrations |

## Pareamentos

| Dupla | Objetivo | Exemplo |
|---|---|---|
| Mateus + Kaike | tela consumindo endpoint documentado | Kanban lendo `GET /leads` |
| Lethicia + Gabriel | modelagem e consistência | cliente/contato com constraints |
| Marcelo + Lethicia | regras e transações | bloqueio de avanço por diagnóstico |
| Kaike + Gabriel | endpoint + persistência + docs | histórico de interações paginado |
| Mateus + Gabriel | dados → interface | painel de projetos com filtros |
| Ilton + responsável | desenho antes de codar | conversão contrato→projeto |

## Cuidados (do Plano de Distribuição)

- Mateus não recebe toda a interface: após os componentes-base, telas simples vão para outros.
- Lethicia não concentra toda modelagem: Gabriel assume persistência real.
- Marcelo recebe cards **bem refinados, pequenos, PR curto**.
- Kaike começa por endpoints delimitados enquanto pratica testes.
- Gabriel recebe entregas progressivas (banco → CRUD → testes).
- QA da squad: **a designar (DP14)**. Até lá, Ilton define as suítes; candidata natural para apoio: Lethicia.
