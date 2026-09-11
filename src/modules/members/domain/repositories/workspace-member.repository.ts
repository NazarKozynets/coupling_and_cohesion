export const WORKSPACE_MEMBER_REPOSITORY = Symbol('WORKSPACE_MEMBER_REPOSITORY');

export interface WorkspaceMemberRepository {
    countByWorkspaceId(
        workspaceId: string,
    ): Promise<number>
}