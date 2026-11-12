import { Module } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';

/**
 * Módulo diagnostics: Ficha de diagnóstico (SPIN) e validações de avanço.
 * Estrutura esperada (Guia 7.2): diagnostics.controller.ts, diagnostics.service.ts, diagnostics.repository.ts,
 * dto/, entities/ e diagnostics.service.spec.ts. Só o DiagnosticsService é exportado.
 */
@Module({
  providers: [DiagnosticsService],
  exports: [DiagnosticsService],
})
export class DiagnosticsModule {}
