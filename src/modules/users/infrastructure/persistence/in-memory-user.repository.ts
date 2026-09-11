import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

// класс User создан просто для минимальной типизации, для удобной работы.

export class InMemoryUserRepository implements UserRepository {
    private readonly users: User[] = [
        {
            id: 'user-1',
            email: 'free@example.com',
            name: 'Free User',
        },
        {
            id: 'user-2',
            email: 'pro@example.com',
            name: 'Pro User',
        },
        {
            id: 'user-3',
            email: 'business@example.com',
            name: 'Business User',
        },
    ];

    async findById(userId: string): Promise<User> {
        const user = this.users.find(
            (user) => user.id === userId,
        );

        if (!user) {
            throw new Error(`User ${userId} not found`);
        }

        return user;
    }

    async getEmailById(userId: string): Promise<string> {
        const user = this.users.find(
            (user) => user.id === userId,
        );

        if (!user) {
            throw new Error(`User ${userId} not found`);
        }

        return user.email;
    }
}