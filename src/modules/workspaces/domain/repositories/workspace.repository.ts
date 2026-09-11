export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');

export interface WorkspaceRepository {
    findOne(id: string) // finds one workspace by it's id
    findUserAll() // find all of user's workspaces
}``