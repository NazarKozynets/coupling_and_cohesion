import { Module } from '@nestjs/common';
import { WorkspaceAccessService } from './application/services/workspace-access.service';
import { GetMemberPort } from '../members/application/ports/get-member.port';
import { GetProjectPort } from '../projects/application/get-project.port';
import { GetSubscriptionPort } from '../subscriptions/application/ports/get-subscription.port';

@Module({
    providers: [
        WorkspaceAccessService,
        GetSubscriptionPort,
        GetProjectPort,
        GetMemberPort,
    ],
    exports: [WorkspaceAccessService],
})
export class AccessModule {}
