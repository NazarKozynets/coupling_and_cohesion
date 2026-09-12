import { SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { Subscription } from "../../domain/entities/subscription.entity";
import { SubscriptionPlan, SubscriptionStatus } from "../../domain/types/subscription.types";
import { CreateSubscriptionInput } from "./dto/create-subscription.dto";

export class PostgresSubscriptionRepository implements SubscriptionRepository {
    // Я так же создал маппер, но так как тут используются мокапы - маппер не понадобился.

    create(payload: CreateSubscriptionInput): Promise<Subscription> {
        // Допустим я создал persistence ряд в таблице бд и возвращаю данные после маппера.

        return Promise.resolve(
            new Subscription({
                id: 'mock-subscription-id',
                workspaceId: payload.workspaceId,
                plan: payload.subscriptionPlan as SubscriptionPlan,
                status: SubscriptionStatus.PENDING,
                monthlyPriceUsd: payload.price,
                activatedAt: null,
                cancelledAt: null,
                createdAt: new Date(),
            }),
        );
    }

    findOneById(subscriptionId: string): Promise<Subscription> {
        // сейчас не буду подключать бд поэтому оставляю mockup для плана PRO

        return Promise.resolve(
            new Subscription({
                id: subscriptionId,
                workspaceId: 'mock-workspace-id',
                plan: SubscriptionPlan.PRO as SubscriptionPlan,
                status: SubscriptionStatus.PENDING,
                monthlyPriceUsd: 29,
                activatedAt: new Date(),
                cancelledAt: null,
                createdAt: new Date(),
            }),
        );
    }

    findOneByWorkspaceId(workspaceId: string): Promise<Subscription> {
        // сейчас не буду подключать бд поэтому оставляю mockup

        return Promise.resolve(
            new Subscription({
                id: 'mock-subscription-id',
                workspaceId,
                plan: SubscriptionPlan.FREE,
                status: SubscriptionStatus.ACTIVE,
                monthlyPriceUsd: 0,
                activatedAt: new Date(),
                cancelledAt: null,
                createdAt: new Date(),
            }),
        );
    }

    updateOneById(subscriptionId: string): Promise<Subscription> {
        // сейчас не буду подключать бд поэтому оставляю mockup для плана PRO

        return Promise.resolve(
            new Subscription({
                id: subscriptionId,
                workspaceId: 'mock-workspace-id',
                plan: SubscriptionPlan.PRO as SubscriptionPlan,
                status: SubscriptionStatus.ACTIVE,
                monthlyPriceUsd: 29,
                activatedAt: new Date(),
                cancelledAt: null,
                createdAt: new Date(),
            }),
        );
    }

    activateSubscription(subscriptionId: string): Promise<SubscriptionStatus> {
        return Promise.resolve(SubscriptionStatus.ACTIVE);
    }

    async countAllByStatus(status: SubscriptionStatus): Promise<number> {
        return 0;
    }

    async findManyByPlanAndStatus(plan: SubscriptionPlan, status: SubscriptionStatus): Promise<Subscription[]> {
        return [];
    }
}