import { Inject, Injectable } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionsReportPortData } from "src/shared/types/reports/subscriptions-reports.types";
import { SUBSCRIPTION_PRICES, SubscriptionPlan, SubscriptionStatus } from "../../domain/types/subscription.types";

@Injectable()
export class PrepareSubscriptionsReportPort {
    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionsRepository: SubscriptionRepository,
    ) { }

    async prepareData(): Promise<SubscriptionsReportPortData> {
        const plansAmount: Partial<Record<SubscriptionPlan, number>> = {};
        const plansPrices: Partial<Record<SubscriptionPlan, number>> = {};

        for (const plan of Object.values(SubscriptionPlan)) {
            const activeSubscriptions =
                await this.subscriptionsRepository.countPlanByStatus(
                    plan,
                    SubscriptionStatus.ACTIVE,
                );

            plansAmount[plan] = activeSubscriptions;
            plansPrices[plan] = SUBSCRIPTION_PRICES[plan];
        }

        return {
            plansAmount: plansAmount as Record<SubscriptionPlan, number>,
            plansPrices: plansPrices as Record<SubscriptionPlan, number>,
        };
    }
}