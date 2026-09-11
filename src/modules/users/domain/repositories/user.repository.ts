import { User } from "../entities/user.entity";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
    findById(userId: string): Promise<User>;
    getEmailById(userId: string): Promise<string>;
}