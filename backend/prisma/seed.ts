/**
 * Seed do banco LOCAL com dados fictícios (Guia de Engenharia 9.6).
 * Execução: docker compose exec backend npm run db:seed
 *
 * Regras:
 * - Somente dados gerados pelo faker. Dados reais de clientes NUNCA entram aqui.
 * - Cada card que cria uma tabela acrescenta aqui uma função seedXxx().
 */
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  faker.seed(42); // dados determinísticos: todo mundo tem o mesmo banco local

  // Exemplo (descomente quando o model Client existir):
  // await prisma.client.createMany({
  //   data: Array.from({ length: 10 }, () => ({
  //     name: faker.company.name(),
  //     document: faker.string.numeric(14),
  //   })),
  // });

  console.warn('[seed] nenhum model cadastrado ainda. Adicione as funções de seed por módulo.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
