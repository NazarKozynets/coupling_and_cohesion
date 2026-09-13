import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionPlan } from "../../domain/types/subscription.types";
import { SUBSCRIPTION_POLICIES } from "../../domain/policies/subscription.policy";

@Injectable()
export class GetSubscriptionPort {
    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionRepository: SubscriptionRepository,
    ) { }

    async getPlan(subscriptionId: string): Promise<SubscriptionPlan> {
        const subscription = await this.subscriptionRepository.findOneById(subscriptionId);
        if (!subscription) {
            return SubscriptionPlan.FREE;
        }

        return subscription.plan;
    }

    async getPlanByWorkspaceId(workspaceId: string): Promise<SubscriptionPlan> {
        const subscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);
        if (!subscription) {
            return SubscriptionPlan.FREE;
        }

        return subscription.plan;
    }

    // Отдает максимальное количество projects для этой подписки. 
    // Таким образом сервис GetSubscriptionPort использует либо знание из бд (maxProjectsOverride) либо берет значение из SUBSCRIPTION_POLICIES.
    // Знание SUBSCRIPTION_POLICIES вполне допустимо для этого порта, так как это его домен.
    async getMaxProjects(workspaceId: string): Promise<number | 'unlimited'> {
        const subscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);
        if (!subscription) {
            throw new NotFoundException("Subscription not found");
        }

        const maxProjectsOverride = subscription?.maxProjectsOverride;

        if (maxProjectsOverride) {
            return maxProjectsOverride;
        }

        return SUBSCRIPTION_POLICIES[subscription.plan].maxProjects;
    }
}