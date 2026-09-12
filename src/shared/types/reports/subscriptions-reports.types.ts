import { SubscriptionPlan } from "src/modules/subscriptions/domain/types/subscription.types";

export type SubscriptionsReportPortData = {
    plansAmount: Record<SubscriptionPlan, number>;
    monthlyRevenueUsd: Record<SubscriptionPlan, number>;
}

export type ResultSubscriptionsReport = {
    activeSubscriptions: number;
    monthlyRevenueUsd: number;
    plans: Record<SubscriptionPlan, number>;
}