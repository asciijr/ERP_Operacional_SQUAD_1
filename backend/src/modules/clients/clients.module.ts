import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';

/**
 * Módulo clients: Cadastro centralizado de clientes e contatos.
 * Estrutura esperada (Guia 7.2): clients.controller.ts, clients.service.ts, clients.repository.ts,
 * dto/, entities/ e clients.service.spec.ts. Só o ClientsService é exportado.
 */
@Module({
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
