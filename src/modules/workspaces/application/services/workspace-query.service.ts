import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "../../domain/repositories/workspace.repository";
import { Workspace } from "../../domain/entities/workspace.entity";

@Injectable()
export class WorkspaceQueryService {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    private findWorkspace(workspaceId: string): Workspace {
        return this.workspaceRepository.findOne(workspaceId);
    }

    async getSubscriptionContext(workspaceId: string): Promise<{
        ownerId: string,
        workspaceName: string,
    } | null> {
        const workspace = await this.findWorkspace(workspaceId);
        if (!workspace) return null;

        return {
            ownerId: workspace.ownerUserId,
            workspaceName: workspace.name,
        }
    }
}