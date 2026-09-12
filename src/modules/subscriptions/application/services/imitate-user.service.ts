import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BillingChargeService } from "src/modules/billing/application/services/billing-charge.service";
import { ActivateSubscriptionService } from "../use-cases/activate-subscription.service";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { CreateSubscriptionService } from "../use-cases/create-subscription.service";
import { CreateSubscriptionInput } from "../../infrastructure/persistence/dto/create-subscription.dto";
import { SubscriptionPlan } from "../../domain/types/subscription.types";

@Injectable()
export class ImitateUserService {
    // Это сервис для иммитации поведения юзера при оплате подписки. 
    // В реальном приложении его бы не было
    constructor(
        private readonly createSubscriptionService: CreateSubscriptionService,
        private readonly billingChargeService: BillingChargeService,
        private readonly activateSubscriptionService: ActivateSubscriptionService,

        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionRepository: SubscriptionRepository,
    ) { }

    // subcsriptionId тут как заглушка
    async exec(payload: CreateSubscriptionInput, subscriptionId: string) {
        // Хоть это и сервис, которого не будет в реальном приложении, я всё равно не хочу сейчас делать
        // фетч запрос на получения subscription, workspace ради того, чтобы передать нужную инфу в BillingChargeService.
        // Потому что в таком случае получится, что в сервисе ImitateUserService уже минимум два запроса к бд, и в ActivateSubscriptionService ещё несколько.
        // При этом они будут получать одинаковые данные.
        // А передавать полученный тут subscription/workspace в ActivateSubscriptionService я не хочу, потому что в будущем при масштабировании это скорее всего вылезет боком
        // и как я уже сказал - в реальном проекте ImitateUserService не существовало бы. А в таком случае нам точно нужно делать запросы к бд в ActivateSubscriptionService.

        // В BillingChargeService я описал странные моменты в этом сервисе, поэтому просто представлю что он выполнил свою работу.

        // UPDATE: Я всё таки сделаю отдельный запрос для получения subscription, чтобы затестить happy-path.

        // UPDATE 2: Этот сервис теперь будет точкой входа для нашего happy-path. 
        const subscriptionPlan = await this.createSubscriptionService.exec(payload);

        const subscription = await this.subscriptionRepository.findOneById(subscriptionId);
        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        if (subscriptionPlan !== SubscriptionPlan.FREE) {
            await this.billingChargeService.charge({
                subscriptionId: subscriptionId,
                workspaceId: subscription.workspaceId,
                amountUsd: subscription.monthlyPriceUsd,
            });
            await this.activateSubscriptionService.exec(subscriptionId);
        }
    }
}