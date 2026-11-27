import { Test } from '@nestjs/testing';
import { FunnelStage } from '@prisma/client';
import { LeadsRepository } from './leads.repository';
import { LeadsService } from './leads.service';

const stage = (key: string, name: string, position: number): FunnelStage => ({
  id: `id-${key}`,
  key,
  name,
  position,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
});

describe('LeadsService', () => {
  describe('listFunnelStages', () => {
    it('retorna as etapas na ordem entregue pelo repository', async () => {
      const stages = [
        stage('prospeccao', 'Prospecção', 1),
        stage('diagnostico', 'Reunião/Diagnóstico', 2),
      ];
      const repository = { findFunnelStagesOrderedByPosition: jest.fn().mockResolvedValue(stages) };

      const moduleRef = await Test.createTestingModule({
        providers: [LeadsService, { provide: LeadsRepository, useValue: repository }],
      }).compile();

      await expect(moduleRef.get(LeadsService).listFunnelStages()).resolves.toEqual(stages);
      expect(repository.findFunnelStagesOrderedByPosition).toHaveBeenCalledTimes(1);
    });
  });
});
