import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo contracts: Formalização e associação de contratos.
 * Outros módulos só conversam com contracts por este service.
 * Implemente os métodos a partir da suíte de testes do card (contracts.service.spec.ts).
 */
@Injectable()
export class ContractsService {}
