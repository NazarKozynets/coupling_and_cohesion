export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface ProjectRepository {
    countByWorkspaceId(workspaceId: string): Promise<number>;
}