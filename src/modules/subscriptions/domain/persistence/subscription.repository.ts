export interface SubscriptionRepository {
    create(payload: any): Promise<any>;
}