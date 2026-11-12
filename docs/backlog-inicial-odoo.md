# Backlog inicial (para cadastrar no Odoo)

> O **Odoo é a fonte oficial** de cards, Sprints e horas: não criar quadro no GitHub Projects/Trello.
> O número do card no Odoo vira o número da branch (`feat/<n>-...`). Os números abaixo são sugestão.
> Cada card de comportamento precisa de **critério de aceite** e **suíte de testes** (TL/QA) antes de "Em andamento".
> Lembrete institucional: nenhuma linha de feature antes da **dupla aprovação do Blueprint** (Projetos + Comercial).

## Sprint 1 · Base e pilotos (dias 1–15)

| # | Card | Tipo | Responsável | Suíte? |
|---|---|---|---|---|
| 1 | Setup inicial do repositório | chore | Ilton | não |
| 2 | Rodar setup GitHub (develop padrão, rulesets, membros) | chore | Ilton/Admin | não |
| 3 | Onboarding: todos rodam o projeto e abrem um PR `docs` com seu nome no README | docs | todos | não |
| 4 | Átomos `Input`, `Label`, molécula `FormField` | feat | Mateus | sim |
| 5 | Model `Client` + `ClientsService.create` | feat | Lethicia | sim |
| 6 | `POST /clients` + Swagger + e2e | feat | Kaike | sim |
| 7 | Model `FunnelStage` + seed das etapas padrão | feat | Marcelo | sim |
| 8 | Model `Contact` (N:1 Client) + repository | feat | Gabriel | sim |
| 9 | Template `DashboardLayout` (menu lateral + header) | feat | Mateus | não (visual) |
| 10 | ADR: matriz de permissões provisória até DP02/DP12 | docs | Ilton + Marcelo | não |

## Sprint 2 · Leads, Kanban e diagnóstico (dias 16–30)

| # | Card | Responsável · apoio |
|---|---|---|
| 11 | Model `Lead` + cadastro com validação (RF01–RF03) | Lethicia · Gabriel |
| 12 | `GET /leads` listagem/consulta | Kaike |
| 13 | Movimentação de etapa + `LeadStageHistory` (RF05, RF07, RN07) | Marcelo · Kaike |
| 14 | Restrição Marketing × Comercial na movimentação (RN01–RN03) | Marcelo |
| 15 | Organismo `KanbanBoard` consumindo API | Mateus · Kaike |
| 16 | Ficha de diagnóstico SPIN (RF08) | Lethicia · Mateus |
| 17 | Bloqueio de avanço sem diagnóstico completo (RF09, RN05, RN06) | Marcelo · Lethicia |
| 18 | Histórico de interações append-only (RF10, RN18) | Gabriel · Mateus |
| 19 | Orçamento estimado e teto (RF11) | Lethicia |

## Sprint 3 · Contratos, projetos e painel (dias 31–45)

| # | Card | Responsável · apoio |
|---|---|---|
| 20 | Model `Contract` + cadastro/link Drive (RF12, RF13) | Kaike · Lethicia |
| 21 | Fechamento com validação; contrato imutável (RF14, RN11, RN14) | Kaike · Marcelo |
| 22 | Conversão contrato→projeto idempotente em transação (RF15–RF17, RN10, RN12, RN13) | Marcelo · Lethicia · Ilton revisa desenho |
| 23 | Models `Squad`, `Sprint`, `ProjectAllocation` | Gabriel |
| 24 | `ProjectUpdate` + timeline | Gabriel · Mateus |
| 25 | Painel de projetos ativos (RF18–RF20) | Mateus · Gabriel |
| 26 | Endpoint de entrada de leads externos (RF22, aguarda DP11) | Kaike · Marcelo |
| 27 | Testes integrados e estabilização | todos |
| 28 | Release `v1.0.0` (PR develop→main + tag) | Ilton |

## Modelo de card (copiar na descrição do Odoo)

```text
Como <perfil>, quero <ação> para <benefício>.

Critérios de aceite:
- Dado ..., quando ..., então ...
- Erro: quando ..., retorna 400 com mensagem "..."

Regras relacionadas: RF.. / RN..
Módulo: leads | diagnostics | ...
Suíte de testes: <branch> (pronta? sim/não)
Dependências: card #.. / Squad 2 / decisão DP..
Estimativa: P | M | G   (G = quebrar em cards menores)
```
