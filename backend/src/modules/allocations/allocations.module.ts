import { Module } from '@nestjs/common';
import { AllocationsService } from './allocations.service';

/**
 * Módulo allocations: Associação de integrantes e responsáveis aos projetos.
 * Estrutura esperada (Guia 7.2): allocations.controller.ts, allocations.service.ts, allocations.repository.ts,
 * dto/, entities/ e allocations.service.spec.ts. Só o AllocationsService é exportado.
 */
@Module({
  providers: [AllocationsService],
  exports: [AllocationsService],
})
export class AllocationsModule {}
