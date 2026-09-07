import { SubscriptionPlan, SubscriptionStatus } from "src/modules/subscriptions/domain/types/subscription.types";

export type SubscriptionPersistenceDto = {
    id: string;
    workspaceId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    monthlyPriceUsd: number;
    activatedAt: Date | null;
    cancelledAt: Date | null;
    createdAt: Date;
}   