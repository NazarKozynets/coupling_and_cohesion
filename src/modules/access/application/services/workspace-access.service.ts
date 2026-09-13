import { Injectable } from "@nestjs/common";
import { GetMemberPort } from "src/modules/members/application/ports/get-member.port";
import { GetProjectPort } from "src/modules/projects/application/get-project.port";
import { GetSubscriptionEntitlementsPort } from "src/modules/subscriptions/application/ports/get-subscription-entitlements.port";

// По итогу я решил использовать WorkspaceAccessService как некую конечную точку сбора разных портов.
// Сервис получает данные из портов и проверять access.
@Injectable()
export class WorkspaceAccessService {
    constructor(
        private readonly getSubscriptionEntitlements: GetSubscriptionEntitlementsPort,
        private readonly getProjectPort: GetProjectPort,
        private readonly getMemberPort: GetMemberPort,
    ) { }

    async canCreateProject(workspaceId: string): Promise<boolean> {
        const entitlements = await this.getSubscriptionEntitlements.getProjectEntitlements(workspaceId);
        const maxProjects = entitlements.maxProjectsAmount;
        const currentProjectsAmount = await this.getProjectPort.countWorkspaceProjects(workspaceId);

        if (maxProjects === 'unlimited' || currentProjectsAmount < maxProjects) {
            return true;
        }

        return false;
    };

    async canInviteMember(workspaceId: string): Promise<boolean> {
        const entitlements = await this.getSubscriptionEntitlements.getMembersEntitlements(workspaceId);
        const maxMembers = entitlements.maxMembersAmount;
        const currentMembersAmount = await this.getMemberPort.countMembersInWorkspace(workspaceId);

        if (maxMembers === 'unlimited' || currentMembersAmount < maxMembers) {
            return true;
        }

        return false;
    };

    async hasAnalytics(workspaceId: string): Promise<boolean> {
        const analyticsEntitlements = await this.getSubscriptionEntitlements.getAnalyticsEntitlements(workspaceId);
        return analyticsEntitlements.analyticsAvailable;
    };

    // async hasPrioritySupport(workspaceId: string): Promise<boolean> {
    //     const plan = await this.getSubscriptionPort.getPlanByWorkspaceId(workspaceId);
    //     return SUBSCRIPTION_POLICIES[plan].prioritySupport;
    // };
}