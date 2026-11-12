import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';

/**
 * Módulo sprints: Ciclos, associação aos projetos e status.
 * Estrutura esperada (Guia 7.2): sprints.controller.ts, sprints.service.ts, sprints.repository.ts,
 * dto/, entities/ e sprints.service.spec.ts. Só o SprintsService é exportado.
 */
@Module({
  providers: [SprintsService],
  exports: [SprintsService],
})
export class SprintsModule {}
