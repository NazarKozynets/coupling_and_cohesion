import { Module } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from './domain/repositories/subscription.repository';
import { PostgresSubscriptionRepository } from './infrastructure/persistence/postgres-subscription.repository';
import { CreateSubscriptionService } from './application/use-cases/create-subscription.service';
import { ActivateSubscriptionService } from './application/use-cases/activate-subscription.service';
import { ImitateUserService } from './application/services/imitate-user.service';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { BillingModule } from '../billing/billing.module';

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
            useClass: PostgresSubscriptionRepository
        },
        CreateSubscriptionService,
        ActivateSubscriptionService,
        ImitateUserService,
    ],
    exports: [
        GetSubscriptionPort,
    ]
})
export class SubscriptionsModule { }
