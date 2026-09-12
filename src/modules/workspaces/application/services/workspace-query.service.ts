import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "../../domain/repositories/workspace.repository";
import { Workspace } from "../../domain/entities/workspace.entity";
import { WorkspaceSubscriptionContext } from "../../domain/types/workspace.types";

@Injectable()
export class WorkspaceQueryService {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    private findWorkspace(workspaceId: string): Workspace {
        return this.workspaceRepository.findOne(workspaceId);
    }

    async getSubscriptionContext(workspaceId: string): Promise<WorkspaceSubscriptionContext | null> {
        const workspace = await this.findWorkspace(workspaceId);
        if (!workspace) return null;

        return {
            ownerUserId: workspace.ownerUserId,
            name: workspace.name,
        }
    }
}