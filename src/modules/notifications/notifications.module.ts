import { Module } from '@nestjs/common';
import { NotificationSubscriptionService } from './application/services/send-subscription.service';

@Module({
    providers: [NotificationSubscriptionService],
    exports: [NotificationSubscriptionService],
})
export class NotificationsModule {}
