import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo leads: Cadastro, consulta, funil (Kanban) e histórico comercial.
 * Outros módulos só conversam com leads por este service.
 * Implemente os métodos a partir da suíte de testes do card (leads.service.spec.ts).
 */
@Injectable()
export class LeadsService {}
