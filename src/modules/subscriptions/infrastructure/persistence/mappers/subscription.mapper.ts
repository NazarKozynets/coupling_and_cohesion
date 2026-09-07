import { Subscription } from 'src/modules/subscriptions/domain/entities/subscription.entity';
import { SubscriptionPersistenceDto } from '../dto/subscription-persistence.dto';

export class SubscriptionMapper {
    static toDomain(
        persistence: SubscriptionPersistenceDto,
    ): Subscription {
        return new Subscription({
            id: persistence.id,
            workspaceId: persistence.workspaceId,
            plan: persistence.plan,
            status: persistence.status,
            monthlyPriceUsd: persistence.monthlyPriceUsd,
            activatedAt: persistence.activatedAt,
            cancelledAt: persistence.cancelledAt,
            createdAt: persistence.createdAt,
        });
    }

    static toPersistence(
        subscription: Subscription,
    ): SubscriptionPersistenceDto {
        return {
            id: subscription.id,
            workspaceId: subscription.workspaceId,
            plan: subscription.plan,
            status: subscription.status,
            monthlyPriceUsd: subscription.monthlyPriceUsd,
            activatedAt: subscription.activatedAt,
            cancelledAt: subscription.cancelledAt,
            createdAt: subscription.createdAt,
        };
    }
}