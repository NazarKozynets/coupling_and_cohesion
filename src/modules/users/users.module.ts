import { Module } from "@nestjs/common";
import { USER_REPOSITORY } from "./domain/repositories/user.repository";
import { InMemoryUserRepository } from "./infrastructure/persistence/in-memory-user.repository";
import { GetUserEmailPort } from "./application/ports/get-user-email.port";

@Module({
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: InMemoryUserRepository,
        },
        GetUserEmailPort,
    ],
    exports: [
        GetUserEmailPort,
    ]
})
export class UsersModule { };