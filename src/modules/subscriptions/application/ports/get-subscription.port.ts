import { Inject, Injectable } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionPlan } from "../../domain/types/subscription.types";

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
}