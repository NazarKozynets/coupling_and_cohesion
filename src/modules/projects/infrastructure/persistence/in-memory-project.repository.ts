import { ProjectRepository } from "../../domain/repositories/project.repository";

export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projectCounts = new Map<string, number>([
    ['workspace-free', 1],
    ['workspace-pro', 10],
    ['workspace-business', 150],
  ]);

  async countByWorkspaceId(
    workspaceId: string,
  ): Promise<number> {
    return this.projectCounts.get(workspaceId) ?? 0;
  }
}