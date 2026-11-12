import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';

/**
 * Módulo contracts: Formalização e associação de contratos.
 * Estrutura esperada (Guia 7.2): contracts.controller.ts, contracts.service.ts, contracts.repository.ts,
 * dto/, entities/ e contracts.service.spec.ts. Só o ContractsService é exportado.
 */
@Module({
  providers: [ContractsService],
  exports: [ContractsService],
})
export class ContractsModule {}
