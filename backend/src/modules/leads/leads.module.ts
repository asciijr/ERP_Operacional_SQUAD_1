import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';

/**
 * Módulo leads: Cadastro, consulta, funil (Kanban) e histórico comercial.
 * Estrutura esperada (Guia 7.2): leads.controller.ts, leads.service.ts, leads.repository.ts,
 * dto/, entities/ e leads.service.spec.ts. Só o LeadsService é exportado.
 */
@Module({
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
