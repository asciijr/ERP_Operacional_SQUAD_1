import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';

/**
 * Módulo projects: Criação, status, escopo e acompanhamento de projetos.
 * Estrutura esperada (Guia 7.2): projects.controller.ts, projects.service.ts, projects.repository.ts,
 * dto/, entities/ e projects.service.spec.ts. Só o ProjectsService é exportado.
 */
@Module({
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
