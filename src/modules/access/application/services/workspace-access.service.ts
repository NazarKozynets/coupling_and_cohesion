import { Injectable } from "@nestjs/common";
import { GetMemberPort } from "src/modules/members/application/ports/get-member.port";
import { GetProjectPort } from "src/modules/projects/application/get-project.port";
import { GetSubscriptionPort } from "src/modules/subscriptions/application/ports/get-subscription.port";
import { SUBSCRIPTION_POLICIES } from "src/modules/subscriptions/domain/policies/subscription.policy";

// По итогу я решил использовать WorkspaceAccessService как некую конечную точку сбора разных портов.
// Сервис получает данные из портов и проверять access.
@Injectable()
export class WorkspaceAccessService {
    constructor(
        private readonly getSubscriptionPort: GetSubscriptionPort,
        private readonly getProjectPort: GetProjectPort,
        private readonly getMemberPort: GetMemberPort,
    ) { }

    async canCreateProject(workspaceId: string): Promise<boolean> {
        const plan = await this.getSubscriptionPort.getPlanByWorkspaceId(workspaceId);
        const currentProjectsAmount = await this.getProjectPort.countWorkspaceProjects(workspaceId);

        const maxAmount = SUBSCRIPTION_POLICIES[plan].maxProjects;

        if (maxAmount === 'unlimited' || currentProjectsAmount < maxAmount) {
            return true;
        }

        return false;
    };

    async canInviteMember(workspaceId: string): Promise<boolean> {
        const plan = await this.getSubscriptionPort.getPlanByWorkspaceId(workspaceId);
        const currentMembersAmount = await this.getMemberPort.countMembersInWorkspace(workspaceId);

        const maxAmount = SUBSCRIPTION_POLICIES[plan].maxMembers;

        if (maxAmount === 'unlimited' || currentMembersAmount < maxAmount) {
            return true;
        }

        return false;
    };

    async hasAnalytics(workspaceId: string): Promise<boolean> {
        const plan = await this.getSubscriptionPort.getPlanByWorkspaceId(workspaceId);
        return SUBSCRIPTION_POLICIES[plan].analyticsAvailable;
    };

    async hasPrioritySupport(workspaceId: string): Promise<boolean> {
        const plan = await this.getSubscriptionPort.getPlanByWorkspaceId(workspaceId);
        return SUBSCRIPTION_POLICIES[plan].prioritySupport;
    };
}