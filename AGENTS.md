# Diretrizes para Agentes de IA (ASCII Soluções em Tecnologia)

1. Ambiente: não sugira comandos globais. Execute tudo via Docker Compose.
2. Arquitetura: respeite a separação modular. Não importe arquivos internos
   de outros módulos sem passar pelo serviço público exportado.
3. Segurança: nunca insira senhas ou chaves de API literais no código.
4. Testes: toda implementação deve respeitar os testes unitários existentes,
   sem alterar suas assinaturas ou asserções.
5. Dependências: é proibido instalar pacotes externos sem confirmação prévia.

## Contexto deste repositório (ERP Operacional · Squad 1)

- Stack: React + TypeScript + Vite (frontend), NestJS + Prisma + PostgreSQL (backend).
- Backend em Monolito Modular: `backend/src/modules/<dominio>`; só o `<Dominio>Service` é público.
  `backend/src/shared` é infraestrutura e nunca importa de `modules`.
- Frontend em Atomic Design: `atoms` → `molecules` → `organisms` → `templates` → `pages`.
  Atoms e Molecules não chamam API; chamadas HTTP ficam em `frontend/src/services`.
- Banco: nunca altere manualmente; mudanças em `backend/prisma/schema.prisma` exigem migration.
- Nomes de código em inglês; comentários e commits em português (Conventional Commits).
- Dados reais de clientes nunca entram em código, testes, seed ou prompts.
- Antes de concluir: `docker compose exec backend npm test` e `docker compose exec frontend npm test`.
