import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_MEMBER_REPOSITORY, type WorkspaceMemberRepository } from "../../domain/repositories/workspace-member.repository";

@Injectable()
export class GetMemberPort {
    constructor(
        @Inject(WORKSPACE_MEMBER_REPOSITORY)
        private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    ) { }

    countMembersInWorkspace(workspaceId: string): Promise<number> {
        return this.workspaceMemberRepository.countByWorkspaceId(workspaceId);
    }
}