import { Controller, Get } from '@nestjs/common';

/** Verificação simples de que a API está no ar: GET /health */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
