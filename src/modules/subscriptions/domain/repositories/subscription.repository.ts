import { CreateSubscriptionInput } from "../../infrastructure/persistence/dto/create-subscription.dto";
import { Subscription } from "../entities/subscription.entity";
import { SubscriptionStatus } from "../types/subscription.types";

export const SUBSCRIPTION_REPOSITORY = Symbol('SUBSCRIPTION_REPOSITORY');

export interface SubscriptionRepository {
    create(subscriptionInput: CreateSubscriptionInput): Promise<Subscription>;
    findOneById(subscriptionId: string): Promise<Subscription>;
    findOneByWorkspaceId(workspaceId: string): Promise<Subscription>;
    updateOneById(subscriptionId: string): Promise<Subscription>;

    // Возвращает обновленный статус подписки после активации.
    activateSubscription(subscriptionId: string): Promise<SubscriptionStatus>;
}