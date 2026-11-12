# 0001 · Stack e estrutura do repositório

- **Data:** 2026-11-12
- **Status:** Aceita
- **Responsável:** Ilton Batista (Tech Lead)

## Contexto
O Guia de Engenharia define a stack oficial e o Project Blueprint v1.1 (seção 3.2) escolhe a variante Node.js. DP01 (repositório-base oficial) seguia pendente.

## Decisão
- Frontend: React 18 + TypeScript + Vite, Atomic Design.
- Backend: Node.js LTS (imagem `node:24-alpine`) + NestJS 10 + Prisma 5 + PostgreSQL 16 (`postgres:16-alpine`).
- Testes: Vitest + Testing Library (front), Jest + ts-jest + supertest (back).
- Um repositório (`asciijr/ERP_Operacional_SQUAD_1`) com `frontend/` e `backend/`, estrutura da seção 11 do guia.
- Esqueleto dos 9 módulos candidatos do Blueprint (3.3) criado vazio; o conteúdo entra por card.
- Model `User` mínimo criado só porque o Prisma exige ao menos um model; campos definitivos dependem da DP12.

## Alternativas consideradas
- FastAPI (Python): o guia reserva para projetos de dados/IA; o Blueprint escolheu NestJS.
- Proposta de Evolução de Stack: tratada como ideia, **não adotada**; seguir apenas o guia (orientação da Diretoria).

## Consequências
Membros com base em Python/Java precisam de trilha em TypeScript/NestJS (ver `docs/equipe-e-trilhas.md`).
