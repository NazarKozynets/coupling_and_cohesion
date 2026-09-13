import { Module } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from './domain/repositories/subscription.repository';
import { CreateSubscriptionService } from './application/use-cases/create-subscription.service';
import { ActivateSubscriptionService } from './application/use-cases/activate-subscription.service';
import { ImitateUserService } from './application/services/imitate-user.service';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { BillingModule } from '../billing/billing.module';
import { InMemorySubscriptionRepository } from './infrastructure/persistence/in-memory-subscription.repository';
import { WorkspaceQueryService } from '../workspaces/application/services/workspace-query.service';
import { WORKSPACE_REPOSITORY } from '../workspaces/domain/repositories/workspace.repository';
import { InMemoryWorkspaceRepository } from '../workspaces/infrastructure/persistence/in-memory-workspace.repository';
import { GetSubscriptionPort } from './application/ports/get-subscription.port';
import { SubscriptionNotificationMapper } from './presentation/notification.mapper';
import { PrepareSubscriptionsReportPort } from './application/ports/prepare-report.port';
import { GetSubscriptionEntitlementsPort } from './application/ports/get-subscription-entitlements.port';

@Module({
    imports: [
        WorkspacesModule,
        NotificationsModule,
        BillingModule,
    ],
    controllers: [],
    providers: [
        {
            provide: SUBSCRIPTION_REPOSITORY,
            useClass: InMemorySubscriptionRepository,
        },
        {
            provide: WORKSPACE_REPOSITORY,
            useClass: InMemoryWorkspaceRepository,
        },
        CreateSubscriptionService,
        ActivateSubscriptionService,
        ImitateUserService,
        WorkspaceQueryService,
        GetSubscriptionPort,
        SubscriptionNotificationMapper,
        PrepareSubscriptionsReportPort,
        GetSubscriptionEntitlementsPort
    ],
    exports: [
        GetSubscriptionPort,
        PrepareSubscriptionsReportPort,
        GetSubscriptionEntitlementsPort,
    ]
})
export class SubscriptionsModule { }
