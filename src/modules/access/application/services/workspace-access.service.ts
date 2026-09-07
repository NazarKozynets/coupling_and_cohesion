import { Injectable } from "@nestjs/common";
import { SubscriptionPolicy } from "src/modules/subscriptions/domain/policies/subscription.policy";

@Injectable()
export class WorkspaceAccessService {
    constructor(
    ) { }

    // Чтобы не фетчить каждый раз данные подписки, можно хранить их вместе с контекстом юзера.
    // Но в задании этого не было указано, поэтому я не делаю так.
    //
    // UPDATE 1: Я попробовал создать какой-нибудь класс в Subscription module для получения policy, 
    // Но проблема в том, что такой вариант приведет к тому что в access module нужно будет импортировать все остальные модули
    // так как они импортированы в subscription module
    //
    // UPDATE 2: Я пришел к выводу, что проще импортировать в WorkspaceAccessService репозиторий subscription, 
    // вместо того, чтобы выдумывать громоздное приложение с кучей портов и мапперов только ради этого класса.
    private getSubscriptionPolicy(subscription): SubscriptionPolicy {

    }

    async canCreateProject(workspaceId: string): Promise<boolean> {
        
    };

    async canInviteMember(workspaceId: string): Promise<boolean> { return false };

    async hasAnalytics(workspaceId: string): Promise<boolean> { return false };

    async hasPrioritySupport(workspaceId: string): Promise<boolean> { return false };
}