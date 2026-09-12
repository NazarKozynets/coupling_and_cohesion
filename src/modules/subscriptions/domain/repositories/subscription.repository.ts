import { CreateSubscriptionInput } from "../../infrastructure/persistence/dto/create-subscription.dto";
import { Subscription } from "../entities/subscription.entity";
import { SubscriptionPlan, SubscriptionStatus } from "../types/subscription.types";

export const SUBSCRIPTION_REPOSITORY = Symbol('SUBSCRIPTION_REPOSITORY');

export interface SubscriptionRepository {
    create(subscriptionInput: CreateSubscriptionInput): Promise<Subscription>;
    findOneById(subscriptionId: string): Promise<Subscription | null>;
    findOneByWorkspaceId(workspaceId: string): Promise<Subscription | null>;
    updateOneById(subscriptionId: string): Promise<Subscription | null>;

    // Возвращает обновленный статус подписки после активации.
    activateSubscription(subscriptionId: string): Promise<SubscriptionStatus | null>;

    countAllByStatus(status: SubscriptionStatus): Promise<number>;
    findManyByPlanAndStatus(plan: SubscriptionPlan, status: SubscriptionStatus): Promise<Subscription[]>;
}