import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Módulo users: Identidade, autenticação e autorização (integra com o Squad 2).
 * Estrutura esperada (Guia 7.2): users.controller.ts, users.service.ts, users.repository.ts,
 * dto/, entities/ e users.service.spec.ts. Só o UsersService é exportado.
 */
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
