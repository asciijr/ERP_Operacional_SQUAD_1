# Como contribuir (fluxo do card)

> Resumo prático do Guia de Engenharia (seções 4 e 9). Na dúvida, o Guia vale.

## Regras de ouro

1. **Nada entra na `main` ou na `develop` sem PR.** O hook bloqueia commit direto e o GitHub também.
2. **Um card do Odoo = uma branch = um PR.** Só **1 card "Em andamento"** por pessoa.
3. **O teste vem antes do código.** Se o card tem suíte, ela já está na branch. **Nunca altere os testes** para passar: avise no card.
4. **Card parado 72h** ou **PR sem revisão em 3 dias úteis** = impedimento → avise na Daily (WhatsApp).
5. **Dependência nova só com aval do Tech Lead** (verifique no npm antes de pedir).

## Passo a passo

```text
Odoo: card "A fazer" → "Em andamento"
  ↓
branch (criada por você OU já criada pelo Tech Lead/QA com os testes)
  ↓
commits pequenos (Conventional Commits) → testes ficando verdes
  ↓
atualiza com a develop → docker compose up → testes dentro do container
  ↓
PR para develop (template preenchido) → Odoo: "Em revisão"
  ↓
CI verde → revisão do Tech Lead → ajustes → Squash and merge
  ↓
Odoo: "Concluído" → atualiza a develop local
```

### 1. Começar o card

**Card SEM suíte de testes** (docs, chore, ci, ajuste visual):
```bash
git checkout develop
git pull origin develop
git checkout -b feat/12-cadastro-de-leads
```

**Card COM suíte de testes** (regra de negócio, rota, serviço, validação): a branch já existe.
```bash
git fetch origin
git checkout feat/12-cadastro-de-leads
docker compose exec backend npm test    # os testes FALHAM: é esperado, seu trabalho é deixá-los verdes
```

### 2. Desenvolver

```bash
git add <arquivos>
git commit -m "feat(leads): adiciona validação de telefone"
```
O hook roda lint/format nos arquivos alterados e valida a mensagem. Se falhar, leia o erro, corrija e commite de novo.

### 3. Antes do PR

```bash
git fetch origin
git rebase origin/develop          # ou: git merge origin/develop
docker compose up --build
docker compose exec backend npm test
docker compose exec frontend npm test
git push -u origin feat/12-cadastro-de-leads    # após rebase: git push --force-with-lease
```

### 4. Abrir o PR

- Base: **`develop`**. Título em Conventional Commits (vira o commit final): `feat(leads): adiciona cadastro de leads`
- Preencha o template inteiro, link do card do Odoo e evidências (prints se mudou tela).
- Ainda não terminou mas quer feedback? Abra como **Draft**.
- CI vermelho não é revisado: corrija primeiro.

Pela linha de comando:
```bash
gh pr create --base develop --fill --draft
```

### 5. Revisão

| Prefixo no comentário | Significa | Bloqueia? |
|---|---|---|
| `[bloqueante]` | erro de lógica, segurança ou arquitetura | Sim |
| `[sugestão]` | melhoria opcional | Não |
| `[dúvida]` | o revisor quer entender | Depende |
| `[nit]` | detalhe pequeno | Não |

Responda **todos** os comentários, ajuste e clique em **Re-request review**. Novo commit após aprovação descarta a aprovação.

## Commits (Conventional Commits)

```text
tipo(escopo): descrição no imperativo, minúscula, sem ponto final
```
Tipos: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`
Escopo = módulo: `leads`, `diagnostics`, `clients`, `contracts`, `projects`, `allocations`, `squads`, `sprints`, `users`, `ui`.

✅ `feat(contracts): impede contrato duplicado para o mesmo cliente`
❌ `ajustes` · `fix bug` · `Feat: Adicionei a tela.`

## Usando IA

Guia completo com modelos de prompt e checklist: [docs/guias/05-uso-de-ia.md](docs/guias/05-uso-de-ia.md).

- Nunca cole `.env`, senhas ou dados reais de clientes em ferramentas de IA.
- Ancore o prompt no teste: *"Considere o teste em `leads.service.spec.ts`. Implemente apenas o método `create` em `LeadsService` para fazer os casos passarem, sem alterar o teste."*
- Você responde por cada linha: o Tech Lead pode pedir que explique qualquer trecho no PR.

## Definition of Done

- [ ] Atende aos critérios do card (MoSCoW)
- [ ] PR aprovado pelo Tech Lead e integrado na `develop`
- [ ] CI verde (lint, typecheck, testes, build, docker)
- [ ] Suíte do card definida antes e passando sem alteração do autor
- [ ] Roda com `docker compose up` sem passos manuais
- [ ] Respeita Monolito Modular e Atomic Design
- [ ] Regras de negócio críticas com teste
- [ ] Sem dependência nova sem aval
- [ ] README e `.env.example` atualizados, se necessário
