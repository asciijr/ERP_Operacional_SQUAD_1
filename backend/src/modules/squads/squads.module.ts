import { Module } from '@nestjs/common';
import { SquadsService } from './squads.service';

/**
 * Módulo squads: Cadastro e identificação das equipes.
 * Estrutura esperada (Guia 7.2): squads.controller.ts, squads.service.ts, squads.repository.ts,
 * dto/, entities/ e squads.service.spec.ts. Só o SquadsService é exportado.
 */
@Module({
  providers: [SquadsService],
  exports: [SquadsService],
})
export class SquadsModule {}
