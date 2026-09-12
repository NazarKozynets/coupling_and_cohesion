import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { SubscriptionStatus } from "../../domain/types/subscription.types";
import { NotificationSubscriptionService } from "src/modules/notifications/application/services/send-subscription.service";
import { WorkspaceQueryService } from "src/modules/workspaces/application/services/workspace-query.service";
import { SubscriptionNotificationMapper } from "../../presentation/notification.mapper";

@Injectable()
export class ActivateSubscriptionService {
    // ВСЁ ЭТО Я БЫ ДЕЛАЛ В ОДНОЙ ТРАНЗАКЦИИ ДЛЯ АТОМАРНОСТИ. 

    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionRepository: SubscriptionRepository,
        private readonly notificationSubscriptionService: NotificationSubscriptionService,
        private readonly getWorkspaceInfoService: WorkspaceQueryService,
        private readonly subscriptionNotificationMapper: SubscriptionNotificationMapper,
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
        if (!updatedStatus) {
            throw new InternalServerErrorException("Something went wrong");
        }

        // 4. Если статус был успешно обновлён, то отправляю уведомление
        if (updatedStatus === SubscriptionStatus.ACTIVE) {
            // Тут появилась первая проблема:
            // В subscription entity, который ты предложил нет userId, который нужен для отправки имейла.
            //
            // Я решу эту проблему следующим образом:
            // sendSubscriptionActivated будет принимать workspaceId вместо userId.
            // В таком случае, мне не придется импортировать в ActivateSubscriptionService репозиторий workspace для того,
            // чтобы получить ownerId - это уже минус один запрос и меньше coupling. 


            // UPDATE: Решил всё таки получать данные в этом сервисе, чтобы модуль нотификаций работал с уже готовой информацией и не знал о приложении в принципе ничего.
            // Его задача - отправлять нотификации, а не ходить в бд за информацией других модулей. 
            // Хотя в теории можно было бы оставить для него возможность ходить в бд за данными модели юзера. Потому что так или иначе ему нужно будет получать почту. 
            // Наверное так и сделаю. Будет порт для получения имейла и модуль нотификаций будет использовать его. В таком случае в subcsription module и остальных модулях,
            // которые должны вызывать notification services, не будут знать о модуле юзера (если конечно он никак иначе не будет с ними переплетаться). 
            const workspaceInfo = await this.getWorkspaceInfoService.getSubscriptionContext(subscription.workspaceId);
            if (!workspaceInfo) {
                throw new NotFoundException("Workspace not found");
            }

            const notificationContext = this.subscriptionNotificationMapper.activated(subscription, workspaceInfo);

            // На текущий момент тут нет очередей и тд. На проде я бы добавил.
            await this.notificationSubscriptionService.sendSubscriptionActivated(notificationContext);
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
    private setActive(subscriptionId: string): Promise<SubscriptionStatus | null> {
        return this.subscriptionRepository.activateSubscription(subscriptionId);
    }
}