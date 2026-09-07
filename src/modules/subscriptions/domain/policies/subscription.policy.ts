import { SubscriptionPlan } from "../types/subscription.types";

export interface SubscriptionPolicy {
    readonly maxMembers: number | 'unlimited';
    readonly maxProjects: number | 'unlimited';
    readonly analyticsAvailable: boolean;
    readonly prioritySupport: boolean;
}

export const SUBSCRIPTION_POLICIES: Record<SubscriptionPlan, SubscriptionPolicy> = {
    [SubscriptionPlan.FREE]: {
        maxMembers: 3,
        maxProjects: 2,
        analyticsAvailable: false,
        prioritySupport: false,
    },

    [SubscriptionPlan.PRO]: {
        maxMembers: 20,
        maxProjects: 50,
        analyticsAvailable: true,
        prioritySupport: false,
    },

    [SubscriptionPlan.BUSINESS]: {
        maxMembers: 'unlimited',
        maxProjects: 'unlimited',
        analyticsAvailable: true,
        prioritySupport: true,
    },
};