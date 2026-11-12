import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { HealthController } from './shared/health/health.controller';
import { LeadsModule } from './modules/leads/leads.module';
import { DiagnosticsModule } from './modules/diagnostics/diagnostics.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AllocationsModule } from './modules/allocations/allocations.module';
import { SquadsModule } from './modules/squads/squads.module';
import { SprintsModule } from './modules/sprints/sprints.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    LeadsModule,
    DiagnosticsModule,
    ClientsModule,
    ContractsModule,
    ProjectsModule,
    AllocationsModule,
    SquadsModule,
    SprintsModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
