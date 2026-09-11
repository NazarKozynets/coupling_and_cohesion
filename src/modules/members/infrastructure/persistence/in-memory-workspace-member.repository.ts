import { WorkspaceMemberRepository } from "../../domain/repositories/workspace-member.repository";

export class InMemoryWorkspaceMemberRepository implements WorkspaceMemberRepository {
    private readonly memberCounts = new Map<string, number>([
        ['workspace-free', 2],
        ['workspace-pro', 12],
        ['workspace-business', 80],
    ]);

    async countByWorkspaceId(
        workspaceId: string,
    ): Promise<number> {
        return this.memberCounts.get(workspaceId) ?? 0;
    }
}