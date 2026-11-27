import { PrismaService } from '../../shared/database/prisma.service';
import { LeadsRepository } from './leads.repository';

describe('LeadsRepository', () => {
  it('busca as etapas do funil ordenadas por position crescente', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const prisma = { funnelStage: { findMany } } as unknown as PrismaService;

    await new LeadsRepository(prisma).findFunnelStagesOrderedByPosition();

    expect(findMany).toHaveBeenCalledWith({ orderBy: { position: 'asc' } });
  });
});
