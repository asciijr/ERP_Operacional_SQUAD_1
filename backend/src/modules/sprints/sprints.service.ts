import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo sprints: Ciclos, associação aos projetos e status.
 * Outros módulos só conversam com sprints por este service.
 * Implemente os métodos a partir da suíte de testes do card (sprints.service.spec.ts).
 */
@Injectable()
export class SprintsService {}
