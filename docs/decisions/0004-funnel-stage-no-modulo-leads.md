# 0004 · FunnelStage fica no módulo `leads`

- **Data:** 2026-11-24
- **Status:** Aceita
- **Responsável:** Ilton Batista (Tech Lead)

## Contexto
O `docs/arquitetura.md` deixa em aberto se `FunnelStage` (etapas do funil comercial) é módulo próprio
ou parte do módulo `leads`, e exige este registro antes de criar a tabela. O card de `FunnelStage` +
seed das etapas (card 7 do backlog inicial, com o Marcelo) depende desta decisão.

Quem usa as etapas:
- `Lead` aponta para a etapa atual (card 11).
- A movimentação de etapa e o `LeadStageHistory` (card 13, RF05, RF07, RN07) ficam em `leads`.
- O bloqueio de avanço sem diagnóstico (card 17, RF09, RN05, RN06) é aplicado na movimentação, também em `leads`.
- O Kanban (card 15) lê as etapas para montar as colunas.

Nenhum outro módulo precisa das etapas sem passar pelo lead.

## Decisão
1. `FunnelStage` é tabela do módulo `leads`. Não criamos um módulo `funnel-stages`.
2. No `schema.prisma`, o model entra no bloco `// ===== módulo: leads =====`, com tabela `funnel_stages`.
3. Campos mínimos:
   - `id` (uuid);
   - `key` (string única e estável, ex.: `diagnostico`): é usada pelas regras de negócio e pelo seed. O código nunca depende do `name` nem do `id`;
   - `name` (rótulo exibido);
   - `position` (inteiro único): define a ordem no Kanban e o sentido de "avançar";
   - `createdAt` / `updatedAt`, mapeados em `snake_case` como os demais models.
4. A listagem ordenada por `position` é exposta pelo `LeadsService`. Outros módulos e o frontend usam só
   esse serviço ou o endpoint de `leads`. Nada de importar o repository de etapas de fora do módulo.
5. As etapas padrão são **dados de referência**, não dados fictícios. O seed faz `upsert` por `key`
   (idempotente: rodar `db:seed` duas vezes não duplica nada) e não usa faker. Os nomes e a ordem
   seguem o Blueprint e são conferidos no critério de aceite do card.
6. Fica fora do escopo deste ADR: etapas configuráveis pela interface (CRUD de etapas) e a decisão
   sobre onde fica `Interaction`.

## Alternativas consideradas
- **Módulo próprio `funnel-stages`:** isola a tabela, mas cria um módulo só para uma lista quase fixa.
  `leads` dependeria dele em toda movimentação, o que traz mais um `Module` para importar e mais um
  ADR de módulo novo. Não há outro consumidor que justifique isso.
- **Enum do Prisma/PostgreSQL em vez de tabela:** é mais simples, mas mudar ou reordenar etapas
  exigiria migration de tipo, e não haveria lugar para `name`/`position`. Isso também dificultaria
  um CRUD de etapas no futuro.
- **Etapas fixas em constante no código:** o banco não garantiria integridade referencial em `Lead`
  nem em `LeadStageHistory`.

## Consequências
- O card de `FunnelStage` (Marcelo) pode começar a partir da `develop`, sem depender do PR #6 (`Client`).
  Se os dois PRs alterarem o `schema.prisma` ao mesmo tempo, quem fizer merge por último faz rebase e
  regenera a migration.
- `Lead.stageId` (card 11) e `LeadStageHistory` (card 13) terão FK para `funnel_stages`.
  O `LeadStageHistory` deve guardar a etapa de origem e a de destino.
- As regras (RN05 a RN07) se referem a etapas por `key`, nunca por `position` ou `id`. Assim, reordenar
  etapas não quebra a validação.
- **Ponto pendente para o deploy (DP13):** pela seção 9.6 do Guia de Engenharia, o seed só roda no
  ambiente local, mas as etapas são necessárias em todos os ambientes. Antes do primeiro deploy, as
  etapas padrão precisam entrar também por migration de dados (o mesmo `upsert` por `key`) ou por um
  passo de bootstrap aprovado pelo Tech Lead.
- Atualizar a nota em `docs/arquitetura.md` para apontar para este ADR.
