import { Module } from "@nestjs/common";
import { WORKSPACE_MEMBER_REPOSITORY } from "./domain/repositories/workspace-member.repository";
import { InMemoryWorkspaceMemberRepository } from "./infrastructure/persistence/in-memory-workspace-member.repository";
import { GetMemberPort } from "./application/ports/get-member.port";

@Module({
    providers: [
        {
            provide: WORKSPACE_MEMBER_REPOSITORY,
            useClass: InMemoryWorkspaceMemberRepository,
        },
        GetMemberPort,
    ],
    exports: [GetMemberPort,]
})
export class MembersModule { };