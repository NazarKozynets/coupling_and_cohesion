import { Module } from "@nestjs/common";
import { PROJECT_REPOSITORY } from "./domain/repositories/project.repository";
import { InMemoryProjectRepository } from "./infrastructure/persistence/in-memory-project.repository";
import { GetProjectPort } from "./application/get-project.port";

@Module({
    providers: [
        {
            provide: PROJECT_REPOSITORY,
            useClass: InMemoryProjectRepository,
        },
        GetProjectPort,
    ],
    exports: [
        GetProjectPort,
    ]
})
export class ProjectsModule { };