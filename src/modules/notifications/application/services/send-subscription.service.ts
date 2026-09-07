import { Injectable } from "@nestjs/common";
import { SubscriptionPlan } from "src/modules/subscriptions/domain/types/subscription.types";

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    // Проблема в задании: 
    // Не была дана схема юзера, поэтому я просто опишу как бы я делал
  ) {}
  
  async sendSubscriptionActivated(input: {
    // userId: string;
    // Заменяю на workspaceId, чтобы в ActivateSubscriptionService не приходилось импортировать репозиторий workspace
    workspaceId: string;
    //
    // workspaceName: string;
    // в таком случае это поле не нужно. Я получу его сразу из workspace и если в будущем название поля поменяется, 
    // то изменить его нужно будет только тут, а не тут и в ActivateSubscriptionService.
    //
    // planName: string;
    // Заменяю строковый planName на subscriptionPlan с енамом для нормальной масштабируемости
    subscriptionPlan: SubscriptionPlan,
  }): Promise<void> {
    // 1. Нашел бы workspace
    // 2. Нашел бы workspace owner и вытянул бы его почту
    // 2. Отправил бы на почту уведомление о активации его подписки


    // ПРИМЕТКА:
    // Если бы это было реальное приложение, я бы ещё добавил какую-то очередь для таких сообщений,
    // Чтобы юзер не ждал ответа. Но так как это задание на coupling & cohesion - внимания на это не обращаю.
  }
}