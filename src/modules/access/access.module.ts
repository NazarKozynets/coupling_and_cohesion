import { Module } from '@nestjs/common';
import { WorkspaceAccessService } from './application/services/workspace-access.service';

@Module({
    providers: [WorkspaceAccessService],
    exports: [WorkspaceAccessService],
})
export class AccessModule {}
