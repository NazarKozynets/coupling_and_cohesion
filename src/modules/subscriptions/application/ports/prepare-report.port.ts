import { Inject, Injectable } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionsReportPortData } from "src/shared/types/reports/subscriptions-reports.types";
import { SubscriptionPlan, SubscriptionStatus } from "../../domain/types/subscription.types";

@Injectable()
export class PrepareSubscriptionsReportPort {
    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionsRepository: SubscriptionRepository,
    ) { }

    async prepareData(): Promise<SubscriptionsReportPortData> {
        const plansAmount: Partial<Record<SubscriptionPlan, number>> = {};
        // UPDATE: plansPrices теперь будет содержать сумму цен активных подписок, а не просто цены.
        // Я всё равно хотел бы передавать это именно таким образом, поскольку в будущем в сервисе GetSubscriptionsReportService может понадобится разделение.
        // Это сейчас мы отображаем сумму всех типов подписок.
        // А в будущем может понадобиться разделить это.
        const monthlyRevenueUsd: Partial<Record<SubscriptionPlan, number>> = {};

        for (const plan of Object.values(SubscriptionPlan)) {
            const activeSubscriptions = await this.subscriptionsRepository.findManyByPlanAndStatus(plan, SubscriptionStatus.ACTIVE);

            plansAmount[plan] = activeSubscriptions?.length ?? 0;
            monthlyRevenueUsd[plan] = activeSubscriptions.reduce((sum, currentSubscription) => sum + currentSubscription.monthlyPriceUsd, 0);
        }

        return {
            plansAmount: plansAmount as Record<SubscriptionPlan, number>,
            monthlyRevenueUsd: monthlyRevenueUsd as Record<SubscriptionPlan, number>,
        };
    }
}