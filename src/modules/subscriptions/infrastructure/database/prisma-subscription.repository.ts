import { InternalServerErrorException } from "@nestjs/common";
import { SubscriptionRepository } from "../../domain/persistence/subscription.repository";

export class PrismaSubscriptionRepository implements SubscriptionRepository {
    create(payload: any): Promise<any> {
        throw new InternalServerErrorException("Not implemented");
    }
}