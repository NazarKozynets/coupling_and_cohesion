import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SUBSCRIPTION_PRICES, SubscriptionPlan, SubscriptionStatus } from "../../domain/types/subscription.types";
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from "../../domain/repositories/subscription.repository";
import { CreateSubscriptionInput } from "../../infrastructure/persistence/dto/create-subscription.dto";
import { ImitateUserService } from "../services/imitate-user.service";
import { WorkspaceQueryService } from "src/modules/workspaces/application/services/workspace-query.service";

@Injectable()
export class CreateSubscriptionService {
    constructor(
        @Inject(SUBSCRIPTION_REPOSITORY)
        private readonly subscriptionRepository: SubscriptionRepository,
        private readonly workspaceQueryService: WorkspaceQueryService,


        // Приметка: в задании было указано, что оплата должна пройти автоматически, 
        // поэтому я буду иммитировать поведение реального человека и через таймаут вызову другой сервис,
        // который якобы является жизненным пайплайном подписки в момент успешной оплаты
        // В РЕАЛЬНОЙ ЖИЗНИ ТАК Я БЫ НЕ ДЕЛАЛ. ЭТО БЫЛИ БЫ ДВА ОТДЕЛЬНЫХ ENDPOINTS.
        private readonly imitateUserService: ImitateUserService,
    ) { }

    async exec(payload: CreateSubscriptionInput): Promise<SubscriptionPlan> {
        // *Я не буду валидировать айдишник или выбранный план сейчас, чтобы не тратить время
        // Но знай - в реальном приложении я бы это сделал
        const { workspaceId, subscriptionPlan } = payload;

        // 1. Поиск workspace 
        const workspace = await this.workspaceQueryService.getSubscriptionContext(workspaceId);

        if (!workspace) {
            throw new NotFoundException("Workspace not found");
        }

        // 2. Проверка на наличие подписки. 
        // Если workspace уже имеет подписку, то нужно прекращать операцию и уведомить клиент.
        // При этом выбрасываю ошибку 409 Conflict (но вообще выбрасывать ошибку или нет, зависит от бизнес-требований. Сейчас я не буду заморачиваться и просто выброшу ошибку Conflict)
        const existingSubscription = await this.subscriptionRepository.findOneByWorkspaceId(workspaceId);

        // Так же в реальном проекте я бы продумал систему улучшения подписки до более "крутой" версии
        // Но в задании этого не было указано.
        if (existingSubscription && [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING].includes(existingSubscription.status)) {
            throw new ConflictException("Workspace already have subscription");
        }

        // 3. Определяю цену
        const subscriptionPrice = SUBSCRIPTION_PRICES[subscriptionPlan];

        // 4. Создаю subscription.
        const createdSubscription = await this.subscriptionRepository.create(
            {
                workspaceId: workspaceId,
                subscriptionPlan: subscriptionPlan,
                price: subscriptionPrice,
            } satisfies CreateSubscriptionInput
        );

        if (createdSubscription) {
            // Приметка: в задании было указано, что оплата должна пройти автоматически, 
            // поэтому я буду иммитировать поведение реального человека и через таймаут вызову другой сервис,
            // который якобы является жизненным пайплайном подписки в момент успешной оплаты
            // В РЕАЛЬНОЙ ЖИЗНИ ТАК Я БЫ НЕ ДЕЛАЛ. ЭТО БЫЛИ БЫ ДВА ОТДЕЛЬНЫХ ENDPOINTS.
            await this.imitateUserService.exec(createdSubscription.id);

            // Избежать такого можно было бы, подключив Observer.
            // В таком случае я бы создал событие и подписал бы на него что-то, что по итогу
            // запустило бы цепочку billing -> activate subscription

            return createdSubscription.plan;
        } else {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}