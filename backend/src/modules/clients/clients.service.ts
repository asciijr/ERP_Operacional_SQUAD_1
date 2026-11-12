import { Injectable } from '@nestjs/common';

/**
 * Interface PÚBLICA do módulo clients: Cadastro centralizado de clientes e contatos.
 * Outros módulos só conversam com clients por este service.
 * Implemente os métodos a partir da suíte de testes do card (clients.service.spec.ts).
 */
@Injectable()
export class ClientsService {}
