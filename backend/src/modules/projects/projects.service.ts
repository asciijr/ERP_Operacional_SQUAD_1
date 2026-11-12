import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo projects: Criação, status, escopo e acompanhamento de projetos.
 * Outros módulos só conversam com projects por este service.
 * Implemente os métodos a partir da suíte de testes do card (projects.service.spec.ts).
 */
@Injectable()
export class ProjectsService {}
