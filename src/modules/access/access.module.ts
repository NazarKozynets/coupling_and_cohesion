import { Module } from '@nestjs/common';
import { WorkspaceAccessService } from './application/services/workspace-access.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { ProjectsModule } from '../projects/projects.module';
import { MembersModule } from '../members/members.module';

@Module({
    imports: [
        SubscriptionsModule,
        ProjectsModule,
        MembersModule,
    ],
    providers: [
        WorkspaceAccessService,
    ],
    exports: [WorkspaceAccessService],
})
export class AccessModule {}
