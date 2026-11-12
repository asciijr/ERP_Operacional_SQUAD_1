# 03 · Revisão de PR (guia do Tech Lead)

> Objetivo: revisar em **até 3 dias úteis** gastando energia só com lógica e arquitetura. Estilo, formato, nomes de branch/commit, migrations e build já são cobrados pela máquina.

## O que a máquina já verificou por você

| Check do CI | Garante |
|---|---|
| `conventions` | título do PR em Conventional Commits e nome da branch no padrão |
| `frontend` | lint (inclui regras de Atomic Design), typecheck, testes, build |
| `backend-node` | lint (inclui regras de Monolito Modular), typecheck, **migrations aplicam e schema sem mudança pendente**, testes, build |
| `docker` | imagens de produção constroem |
| `branch-guard` | (só `main`) origem é `develop` ou `hotfix/*` |
| `review-summary` | resumo na aba **Summary**: tamanho do PR, **testes alterados**, schema sem migration, `package.json` alterado |

**CI vermelho → não revise.** Comente apenas: `CI vermelho, corrija e peça nova revisão.`

## Roteiro de 10 minutos

1. **Summary do CI** (aba *Checks › review-summary*): PR > 400 linhas? Testes alterados? `package.json` mexido?
2. **Template**: card do Odoo linkado, "Como testar" e evidências preenchidos, checklist marcado.
3. **Testes intocados**: se o resumo apontar arquivo de teste alterado:
   ```bash
   gh pr checkout <num>
   git log --format='%h %an %s' origin/develop..HEAD -- '*.spec.ts' '*.test.tsx'
   ```
   Commits de teste devem ser **seus ou do QA**, não do autor do card.
4. **Diff por camada**: `*.service.ts` (regra de negócio) → `*.repository.ts`/`schema.prisma` → controller/DTO → frontend.
5. **Rodar** (para fluxos críticos: contrato→projeto, permissões, bloqueio do diagnóstico):
   ```bash
   gh pr checkout <num>
   docker compose up --build
   ```
6. **Decidir**: Approve / Request changes. Com aprovação + CI verde + conversas resolvidas → **Squash and merge** (título do PR vira o commit).

## Formulário de revisão (copie no comentário final)

```markdown
### Revisão
- [ ] Resolve o card, sem escopo extra
- [ ] Lógica de negócio correta e casos de erro tratados
- [ ] Módulo de domínio certo (backend) / nível atômico certo (frontend)
- [ ] Sem import de arquivo interno de outro módulo
- [ ] Nomes claros, legível sem explicação externa
- [ ] Sem segredos ou dados reais
- [ ] Alteração de banco com migration
- [ ] Regras críticas com teste; suíte do card não alterada pelo autor
- [ ] Dependências novas verificadas e aprovadas
- [ ] Autor sabe explicar qualquer trecho (inclusive IA)
- [ ] Validei o "Como testar"

**Resultado:** ✅ aprovado · 🔁 ajustes (ver comentários `[bloqueante]`)
```

## Respostas prontas (salve em *GitHub › Settings › Saved replies*)

| Atalho | Texto |
|---|---|
| bloq-modulo | `[bloqueante] Este import acessa um arquivo interno de outro módulo. Use o Service público dele (Guia 7.1).` |
| bloq-teste | `[bloqueante] O arquivo de teste do card foi alterado. Reverta e, se achar que o teste está errado, sinalize no card do Odoo (Guia 9.2).` |
| bloq-migration | `[bloqueante] Alteração no schema sem migration. Rode \`docker compose exec backend npx prisma migrate dev --name ...\`.` |
| bloq-validacao | `[bloqueante] Esta validação está só no frontend. Regra de negócio precisa ser validada no backend (service).` |
| bloq-dep | `[bloqueante] Dependência nova sem aval. Verifique no npm (mantida? downloads?) e justifique aqui.` |
| duvida-ia | `[dúvida] Pode explicar o que este trecho faz e por que foi escolhido? (Guia 10.1)` |
| sug-quebrar | `[sugestão] Este PR passou de ~400 linhas. Nos próximos, quebre o card em partes menores.` |
| nit-nome | `[nit] Um nome mais descritivo deixaria isso mais claro, ex.: ...` |

## Comandos úteis (`gh`)

```bash
gh pr list --base develop --search "review:required"   # fila de revisão
gh pr view <num> --web                                  # abrir no navegador
gh pr checks <num>                                      # status do CI
gh pr diff <num> --name-only                            # arquivos alterados
gh pr review <num> --approve
gh pr review <num> --request-changes -b "Ver comentários [bloqueante]."
gh pr merge <num> --squash --delete-branch
```

## Criando a suíte de testes de um card (TL ou QA)

```bash
git checkout develop && git pull
git checkout -b feat/12-cadastro-de-leads
# escreva backend/src/modules/leads/leads.service.spec.ts com os critérios de aceite do card
git add backend/src/modules/leads/leads.service.spec.ts
git commit -m "test(leads): define casos de teste do cadastro de leads"
git push -u origin feat/12-cadastro-de-leads
```
No Odoo, anote no card: *"Suíte pronta na branch `feat/12-cadastro-de-leads`"*.
Delegue a suíte ao QA da squad quando ele for designado (DP14).
