import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionStatus } from "../../domain/types/subscription.types";
import { NotificationSubscriptionService } from "src/modules/notifications/application/services/send-subscription.service";

@Injectable()
export class ActivateSubscriptionService {
    // ВСЁ ЭТО Я БЫ ДЕЛАЛ В ОДНОЙ ТРАНЗАКЦИИ ДЛЯ ИДЕМПОТЕНТНОСТИ. 
    // НО ДЛЯ ВЫПОЛНЕНИЯ ЭТОГО ЗАДАНИЯ Я НЕ ХОЧУ ЕЩЁ ПОЛ ЧАСА НАСТРАИВАТЬ РЕПОЗИТОРИИ И ПОДКЛЮЧАТЬ БД

    constructor(
        private readonly subscriptionRepository: SubscriptionRepository,

        // Подключаю SendSubscriptionService из модуля notifications.
        // Можно ещё сделать через паттерн Observer и подключить очереди, но так как приложение не большое и в нём нет сложных переплетений,
        // то я позволю себе не тратить время.
        private readonly notificationSubscriptionService: NotificationSubscriptionService,
    ) { }

    // Возвращает true, если подписка успешно активирована
    async exec(subscriptionId: string): Promise<SubscriptionStatus> {
        // 1. Поиск подписки
        const subscription = await this.subscriptionRepository.findOneById(subscriptionId);

        if (!subscription) {
            throw new NotFoundException("Subscription not found");
        }

        // Поиск workspace на случай если пользователь пытается оплатить подписку для workspace, которого уже нет я не делал
        // Рассчет на то, что в схеме будет указано что нельзя удалять родительские ряды в бд, у которых есть дети.

        // 2. Проверка статуса подписки. Хотя странно, что это делается после оплаты, а во время. Но ладно.
        this.check(subscription.status);

        // 3. Обновление статуса
        const updatedStatus = await this.setActive(subscriptionId);

        // 4. Если статус был успешно обновлён, то отправляю уведомление
        if (updatedStatus === SubscriptionStatus.ACTIVE) {
            // Тут появилась первая проблема:
            // В subscription entity, который ты предложил нет userId, который нужен для отправки имейла.
            //
            // Я решу эту проблему следующим образом:
            // sendSubscriptionActivated будет принимать workspaceId вместо userId.
            // В таком случае, мне не придется импортировать в ActivateSubscriptionService репозиторий workspace для того,
            // чтобы получить ownerId - это уже минус один запрос и меньше coupling. 
            this.notificationSubscriptionService.sendSubscriptionActivated({
                workspaceId: subscription.workspaceId,
                subscriptionPlan: subscription.plan,
            });
        }

        return updatedStatus;
    }

    // Допускает подписку к активации
    private check(subStatus: SubscriptionStatus): void {
        if (subStatus !== SubscriptionStatus.PENDING) {
            throw new ForbiddenException("This subscription can't be activated");
        }
    }

    // Обновляет статус подписки на ACTIVE.
    // Только на ACTIVE, потому что это сервис для активации, а не глобального изменения статуса.
    //
    // Возвращает обновленный статус. На случай если на стороне бд что-то пошло не так и можно было перепроверить точно ли изменился статус. 
    private setActive(subscriptionId: string): Promise<SubscriptionStatus> {
        return this.subscriptionRepository.activateSubscription(subscriptionId);
    }
}