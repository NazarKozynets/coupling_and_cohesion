import { Module } from '@nestjs/common';
import { NotificationSubscriptionService } from './application/services/send-subscription.service';
import { GetEmailForNotificationPort } from './infrastructure/orchestrators/get-email.port';
import { GetUserEmailPort } from '../users/application/ports/get-user-email.port';
import { USER_REPOSITORY } from '../users/domain/repositories/user.repository';
import { InMemoryUserRepository } from '../users/infrastructure/persistence/in-memory-user.repository';

@Module({
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: InMemoryUserRepository,
        },
        NotificationSubscriptionService,
        GetUserEmailPort,
        GetEmailForNotificationPort,
    ],
    exports: [NotificationSubscriptionService],
})
export class NotificationsModule { }
