import { Inject, Injectable } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SUBSCRIPTION_POLICIES } from "../../domain/policies/subscription.policy";
import { SubscriptionPlan } from "../../domain/types/subscription.types";
import { AnalyticsEntitlements, MembersEntitlements, ProjectEntitlements } from "../../domain/types/subscription-entitlements.types";

@Injectable()
export class GetSubscriptionEntitlementsPort {
    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionRepository: SubscriptionRepository,
    ) { }

    // Отдает максимальное количество projects для этой подписки. 
    // Таким образом сервис GetSubscriptionPort использует либо знание из бд (maxProjectsOverride) либо берет значение из SUBSCRIPTION_POLICIES.
    // Знание SUBSCRIPTION_POLICIES вполне допустимо для этого порта, так как это его домен.
    async getProjectEntitlements(workspaceId: string): Promise<ProjectEntitlements> {
        const subscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);
        if (!subscription) {
            return { maxProjectsAmount: SUBSCRIPTION_POLICIES[SubscriptionPlan.FREE].maxProjects };
        }

        const maxProjectsOverride = subscription?.maxProjectsOverride;

        if (maxProjectsOverride !== null && maxProjectsOverride !== undefined) {
            return { maxProjectsAmount: maxProjectsOverride };
        }

        return { maxProjectsAmount: SUBSCRIPTION_POLICIES[subscription.plan].maxProjects };
    }

    async getMembersEntitlements(workspaceId: string): Promise<MembersEntitlements> {
        const subscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);
        if (!subscription) {
            return { maxMembersAmount: SUBSCRIPTION_POLICIES[SubscriptionPlan.FREE].maxMembers };
        }

        const maxMembersOverride = subscription?.maxMembersOverride;

        if (maxMembersOverride !== null && maxMembersOverride !== undefined) {
            return { maxMembersAmount: maxMembersOverride };
        }

        return { maxMembersAmount: SUBSCRIPTION_POLICIES[subscription.plan].maxMembers };
    }

    async getAnalyticsEntitlements(workspaceId: string): Promise<AnalyticsEntitlements> {
        const subscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);
        if (!subscription) {
            return { analyticsAvailable: SUBSCRIPTION_POLICIES[SubscriptionPlan.FREE].analyticsAvailable };
        }

        const analyticsAvailableOverride = subscription?.analyticsAvailableOverride;

        if (analyticsAvailableOverride !== null && analyticsAvailableOverride !== undefined) {
            return { analyticsAvailable: analyticsAvailableOverride };
        }

        return { analyticsAvailable: SUBSCRIPTION_POLICIES[subscription.plan].analyticsAvailable };
    }
}