import { Inject, Injectable } from "@nestjs/common";
import { PROJECT_REPOSITORY, type ProjectRepository } from "../domain/repositories/project.repository";

@Injectable()
export class GetProjectPort {
    constructor(
        @Inject(PROJECT_REPOSITORY)
        private readonly projectRepository: ProjectRepository,
    ) { }

    countWorkspaceProjects(workspaceId: string): Promise<number> {
        return this.projectRepository.countByWorkspaceId(workspaceId);
    }
}