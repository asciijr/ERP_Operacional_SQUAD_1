import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo allocations: Associação de integrantes e responsáveis aos projetos.
 * Outros módulos só conversam com allocations por este service.
 * Implemente os métodos a partir da suíte de testes do card (allocations.service.spec.ts).
 */
@Injectable()
export class AllocationsService {}
