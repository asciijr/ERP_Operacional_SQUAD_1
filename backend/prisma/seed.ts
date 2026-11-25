/**
 * Seed do banco LOCAL com dados fictícios (Guia de Engenharia 9.6).
 * Execução: docker compose exec backend npm run db:seed
 *
 * Regras:
 * - Somente dados gerados pelo faker. Dados reais de clientes NUNCA entram aqui.
 * - Cada card que cria uma tabela acrescenta aqui uma função seedXxx().
 * - Exceção: dados de referência (ex.: etapas do funil) não usam faker e fazem upsert por `key` (ADR 0004).
 */
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Etapas padrão do funil, na ordem do Blueprint. A `key` é estável e usada pelas regras de negócio.
const FUNNEL_STAGES = [
  { key: 'prospeccao', name: 'Prospecção' },
  { key: 'diagnostico', name: 'Reunião/Diagnóstico' },
  { key: 'negociacao', name: 'Negociação' },
  { key: 'aguardando_retorno', name: 'Aguardando retorno' },
  { key: 'contrato_fechado', name: 'Contrato fechado' },
  { key: 'perdido', name: 'Perdido' },
];

// Idempotente: rodar o seed de novo atualiza nome e posição, sem duplicar etapas.
async function seedFunnelStages() {
  for (const [index, stage] of FUNNEL_STAGES.entries()) {
    const position = index + 1;
    await prisma.funnelStage.upsert({
      where: { key: stage.key },
      update: { name: stage.name, position },
      create: { key: stage.key, name: stage.name, position },
    });
  }
}

async function main() {
  await seedFunnelStages();

  faker.seed(42); // dados determinísticos: todo mundo tem o mesmo banco local

  // Exemplo (descomente quando o model Client existir):
  // await prisma.client.createMany({
  //   data: Array.from({ length: 10 }, () => ({
  //     name: faker.company.name(),
  //     document: faker.string.numeric(14),
  //   })),
  // });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
