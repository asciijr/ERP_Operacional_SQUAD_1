import { Injectable } from '@nestjs/common';
import { FunnelStage } from '@prisma/client';
import { PrismaService } from '../../shared/database/prisma.service';

/**
 * Acesso ao banco do módulo leads. Interno: outros módulos usam o LeadsService.
 */
@Injectable()
export class LeadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findFunnelStagesOrderedByPosition(): Promise<FunnelStage[]> {
    return this.prisma.funnelStage.findMany({ orderBy: { position: 'asc' } });
  }
}
