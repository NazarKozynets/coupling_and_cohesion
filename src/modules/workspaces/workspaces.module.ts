import { Module } from '@nestjs/common';
import { GetWorkspacePort } from './application/ports/get-workspace.port';
import { WORKSPACE_REPOSITORY } from './domain/repositories/workspace.repository';
import { PostgresWorkspaceRepository } from './infrastructure/persistence/postgres-workspace.repository';

@Module({
    providers: [
        {
            provide: WORKSPACE_REPOSITORY,
            useClass: PostgresWorkspaceRepository,
        },
        GetWorkspacePort,
    ],
    exports: [GetWorkspacePort],
})
export class WorkspacesModule { }
