import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "../../domain/repositories/workspace.repository";
import { Workspace } from "../../domain/entities/workspace.entity";

@Injectable()
export class GetWorkspacePort {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    async exec(workspaceId: string): Promise<Workspace | null> {
        const workspace = await this.workspaceRepository.findOne(workspaceId);
        return workspace ?? null;
    }
}