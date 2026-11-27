import { Injectable } from '@nestjs/common';
import { FunnelStage } from '@prisma/client';
import { LeadsRepository } from './leads.repository';

/**
 * Interface PÚBLICA do módulo leads: Cadastro, consulta, funil (Kanban) e histórico comercial.
 * Outros módulos só conversam com leads por este service.
 * Implemente os métodos a partir da suíte de testes do card (leads.service.spec.ts).
 */
@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  /** Etapas do funil na ordem do Kanban (position crescente). */
  listFunnelStages(): Promise<FunnelStage[]> {
    return this.leadsRepository.findFunnelStagesOrderedByPosition();
  }
}
