import { Module } from '@nestjs/common';
import { WorkspaceQueryService } from './application/services/workspace-query.service';
import { WORKSPACE_REPOSITORY } from './domain/repositories/workspace.repository';
import { InMemoryWorkspaceRepository } from './infrastructure/persistence/in-memory-workspace.repository';

@Module({
    providers: [
        {
            provide: WORKSPACE_REPOSITORY,
            useClass: InMemoryWorkspaceRepository,
        },
        WorkspaceQueryService,
    ],
    exports: [
        WorkspaceQueryService,
    ],
})
export class WorkspacesModule { }
