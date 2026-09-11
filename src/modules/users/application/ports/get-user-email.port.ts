import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class GetUserEmailPort {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    exec(userId: string): Promise<string> {
        return this.userRepository.getEmailById(userId);
    }
}