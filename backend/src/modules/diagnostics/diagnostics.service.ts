import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo diagnostics: Ficha de diagnóstico (SPIN) e validações de avanço.
 * Outros módulos só conversam com diagnostics por este service.
 * Implemente os métodos a partir da suíte de testes do card (diagnostics.service.spec.ts).
 */
@Injectable()
export class DiagnosticsService {}
