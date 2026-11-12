# Itens além do Guia de Engenharia (para ciência da Diretoria)

> Orientação recebida: seguir o Guia de Engenharia e documentar qualquer extra, avisando a Diretoria de Projetos.
> Nenhum item abaixo contraria o guia; todos reforçam regras que ele já define. A **Proposta de Evolução de Stack** não foi adotada.

| # | Extra | Por quê | Regra do guia que reforça | Como desfazer |
|---|---|---|---|---|
| 1 | Hook `pre-commit` também bloqueia commit direto em `main`/`develop` e valida nome de branch | erro de iniciante pego antes do push | 1º princípio, 3.2 | remover trechos do `.husky/pre-commit` |
| 2 | Job `conventions` no CI (título do PR + nome da branch) | o título vira o commit do squash | 3.3, 3.4 | apagar o job |
| 3 | Job `review-summary` (tamanho, testes alterados, schema sem migration, `package.json`) | revisão mais rápida pelo Tech Lead | 4.4, 9.3, 10.1 | apagar o job |
| 4 | Checagem de migrations no CI com PostgreSQL de serviço | "nunca alterar o banco manualmente" | 2, DoD | remover o step |
| 5 | Job `docker` (build das imagens de produção) | "se não roda no Docker, não está pronto" | 1º e 6 | apagar o job |
| 6 | Regras de import no ESLint (Monolito Modular e Atomic Design) sem dependência nova (`no-restricted-imports`) | o guia **recomenda** automatizar (7.4) | 7.1, 8.2 | remover blocos no `eslint.config` |
| 7 | Workflow `release.yml`: imagens no GHCR + GitHub Release ao criar tag | CD sem depender da hospedagem (DP13) | 3.5 | apagar o arquivo |
| 8 | `scripts/setup-github.sh` (rulesets via `gh`) | aplica o checklist 5.4 sem erro manual | 5.4 | não usar |
| 9 | `.vscode/` com formatação ao salvar e extensões recomendadas | 1ª barreira do guia | 5 (Editor) | apagar a pasta |
| 10 | `@nestjs/swagger` e `class-validator` (ADR 0002) | contratos de API e validação de entrada | 2 (aval do TL) | ADR substituta |
| 11 | "Revisão de Code Owner obrigatória" **desligada** nos rulesets | com um só code owner, PRs do próprio TL travariam; 1 aprovação continua obrigatória | 4.3 | ligar no script |

Mensagem sugerida para a Diretoria:
> Guilherme, o repositório do ERP Operacional está montado seguindo o Guia de Engenharia. Coloquei alguns reforços automáticos (listados em `docs/extras-alem-do-guia.md`), sem dependências novas além das registradas na ADR 0002. A proposta de evolução de stack ficou fora. Preciso de um Admin para aplicar a proteção de branches (`scripts/setup-github.sh`).
