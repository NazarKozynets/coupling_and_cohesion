import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkspaceAccessService {
    async canCreateProject(workspaceId: string): Promise<boolean> { return false };

    async canInviteMember(workspaceId: string): Promise<boolean> { return false };

    async hasAnalytics(workspaceId: string): Promise<boolean> { return false };

    async hasPrioritySupport(workspaceId: string): Promise<boolean> { return false };
}