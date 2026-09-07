import { Injectable } from "@nestjs/common";
import { BillingChargeService } from "src/modules/billing/application/services/billing-charge.service";
import { ActivateSubscriptionService } from "../use-cases/activate-subscription.service";

@Injectable()
export class ImitateUserService {
    // Это сервис для иммитации поведения юзера при оплате подписки. 
    // В реальном приложении его бы не было
    constructor(
        private readonly billingChargeService: BillingChargeService,
        private readonly activateSubscriptionService: ActivateSubscriptionService,
    ) {}

    async exec() {
        // Хоть это и сервис, которого не будет в реальном приложении, я всё равно не хочу сейчас делать
        // фетч запрос на получения subscription, workspace ради того, чтобы передать нужную инфу в BillingChargeService.
        // Потому что в таком случае получится, что в сервисе ImitateUserService уже минимум два запроса к бд, и в ActivateSubscriptionService ещё несколько.
        // При этом они будут получать одинаковые данные.
        // А передавать полученный тут subscription/workspace в ActivateSubscriptionService я не хочу, потому что в будущем при масштабировании это скорее всего вылезет боком
        // и как я уже сказал - в реальном проекте ImitateUserService не существовало бы. А в таком случае нам точно нужно делать запросы к бд в ActivateSubscriptionService.
        
        // В BillingChargeService я описал странные моменты в этом сервисе, поэтому просто представлю что он выполнил свою работу.
        // await this.billingChargeService.charge();

        // await this.activateSubscriptionService()
    }
}