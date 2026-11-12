# 05 · Uso responsável de IA

> Resumo prático da seção 10 do Guia de Engenharia. Vale para qualquer ferramenta (ChatGPT, Gemini, Copilot, Cursor etc.) e para todos, de trainee a diretor.
> **Regra de ouro:** a IA escreve rascunho; **você** é o autor. O Tech Lead pode pedir que explique qualquer linha no PR.

## 🚫 Proibido

| Nunca faça | Por quê |
|---|---|
| Colar `.env`, senhas, tokens, `DATABASE_URL` real | vazamento de credenciais |
| Colar dados reais de clientes (nomes, telefones, contratos, diagnósticos) | dado sigiloso da ASCII e do cliente |
| Instalar pacote sugerido pela IA sem checar no npm e sem aval do TL | a IA **inventa pacotes** (e existem pacotes maliciosos com esses nomes) |
| Alterar, simplificar ou comentar teste para "passar" | a suíte é a especificação do card |
| Copiar e colar sem ler linha por linha | "código cego" é vetado |
| Pedir para a IA "fazer o card inteiro" | gera PR gigante, fora do padrão e que você não sabe explicar |

Precisa de exemplo com dados? Use dados fictícios: `Cliente Exemplo LTDA`, `(34) 90000-0000`, `cliente@exemplo.com`.

## ✅ Como pedir (prompt ancorado no teste)

❌ **Frágil:** "Crie uma rota em NestJS que cadastra um lead e valida os dados."
→ a IA inventa regras, ignora o padrão do repositório e esconde erros.

✅ **Ancorado:**
```text
Contexto: projeto NestJS + Prisma em Monolito Modular. Regras em AGENTS.md (colado abaixo).
Considere o teste em backend/src/modules/leads/leads.service.spec.ts (colado abaixo).
Implemente APENAS o método create em LeadsService para todos os casos passarem.
Restrições:
- não altere o arquivo de teste
- não adicione dependências
- acesso ao banco só via LeadsRepository (Prisma)
- não importe repository/entities de outro módulo; use o Service público
- erros: BadRequestException (400) e NotFoundException (404), como o teste espera
Explique cada decisão em 3-5 linhas.

[AGENTS.md]
[leads.service.spec.ts]
[leads.repository.ts]
```

Sempre envie junto: **`AGENTS.md`** + **o teste do card** + **os arquivos que a IA vai tocar**. Peça um pedaço por vez (um método, um componente).

### Modelos rápidos

**Componente (frontend):**
```text
Crie o átomo Input em frontend/src/components/atoms/Input/ (Input.tsx, index.ts).
Siga o padrão do átomo Button (colado). Props tipadas, sem any, sem chamada de API,
sem regra de negócio. O teste Input.test.tsx (colado) precisa passar sem alteração.
```

**Entender código / erro:**
```text
Explique o que este trecho faz, linha a linha, e quais erros ele pode lançar. [trecho]
```
```text
Este teste falha com a mensagem abaixo. Explique a causa provável. Não sugira mudar o teste.
[saída do npm test] [código]
```

**Migration:**
```text
Tenho este schema.prisma (colado). Preciso adicionar o model Contact (N:1 com Client)
com os campos X, Y. Mostre só o trecho do schema. Eu rodo a migration.
```

## 🔍 Checklist antes de commitar código de IA

- [ ] Li e entendo **cada linha**; sei explicar no PR
- [ ] Nenhum import de pacote que não esteja no `package.json` (se tiver: verificar no npmjs.com + pedir aval)
- [ ] Não inventou validação/regra que o card não pede (ex.: CPF obrigatório, tamanho máximo arbitrário)
- [ ] Tratamento de erro real (nada de `catch (e) {}` ou `console.log(e)` engolindo erro)
- [ ] Sem `any`, sem código comentado, sem `console.log` de debug
- [ ] Arquivo no módulo/nível atômico correto (o lint avisa)
- [ ] Testes do card **intactos** e passando no container
- [ ] Nada de segredo ou dado real no código

## ⚠️ Vícios comuns de código gerado por IA (o revisor procura)

| Vício | Exemplo | Correção |
|---|---|---|
| Dependência desnecessária | `lodash` para um `map` | usar JS/TS nativo |
| Pacote inexistente/obsoleto | `nestjs-prisma-helper` | conferir no npm; usar Prisma direto |
| Validação inventada | regex de telefone que o card não pede | fazer só o que o critério de aceite diz |
| Erro superficial | `catch { return null }` | lançar exceção HTTP adequada |
| Fugir da arquitetura | service chamando `prisma.client` de outro domínio | usar o Service do outro módulo |
| Código "esperto" demais | genéricos/abstrações para um caso só | simples e legível |
| API antiga | sintaxe de NestJS 8/Prisma 3/React class components | conferir a documentação oficial atual |

## Ferramentas no editor (Copilot, Cursor, Aider, Codex…)

- Elas leem o **`AGENTS.md`** da raiz: é o contexto oficial do projeto. Não crie arquivos de regras paralelos; se a ferramenta exigir um arquivo próprio, ele só deve **apontar** para o `AGENTS.md`.
- Não deixe o agente rodar comandos globais (`npm i -g`, instalar PostgreSQL etc.). Tudo via `docker compose exec`.
- Não aceite mudanças em lote sem revisar o diff (`git diff`) antes do `git add`.
- Agente quer mexer em `eslint.config`, `ci.yml`, `.husky/` ou testes? **Recuse**: isso exige aval do Tech Lead.

## Se o Tech Lead questionar no PR

`[dúvida] Pode explicar este trecho?` → responda com suas palavras: **o que** faz, **por que** assim e **o que acontece em caso de erro**. "Foi a IA que gerou" não é resposta válida.
