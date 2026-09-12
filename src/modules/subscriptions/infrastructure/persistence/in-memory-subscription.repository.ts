import { randomUUID } from 'crypto';

import { Subscription } from '../../domain/entities/subscription.entity';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from '../../domain/types/subscription.types';
import { CreateSubscriptionInput } from './dto/create-subscription.dto';

export class InMemorySubscriptionRepository implements SubscriptionRepository {

  private readonly subscriptions: Subscription[] = [
    new Subscription({
      id: 'subscription-free',
      workspaceId: 'workspace-free',
      plan: SubscriptionPlan.FREE,
      status: SubscriptionStatus.ACTIVE,
      monthlyPriceUsd: 0,
      activatedAt: new Date(),
      cancelledAt: null,
      createdAt: new Date(),
    }),

    new Subscription({
      id: 'subscription-pro',
      workspaceId: 'workspace-pro',
      plan: SubscriptionPlan.PRO,
      status: SubscriptionStatus.ACTIVE,
      monthlyPriceUsd: 29,
      activatedAt: new Date(),
      cancelledAt: null,
      createdAt: new Date(),
    }),

    new Subscription({
      id: 'subscription-business',
      workspaceId: 'workspace-business',
      plan: SubscriptionPlan.BUSINESS,
      status: SubscriptionStatus.ACTIVE,
      monthlyPriceUsd: 99,
      activatedAt: new Date(),
      cancelledAt: null,
      createdAt: new Date(),
    }),
  ];

  async create(
    input: CreateSubscriptionInput,
  ): Promise<Subscription> {
    const subscription = new Subscription({
      id: randomUUID(),
      workspaceId: input.workspaceId,
      plan: input.subscriptionPlan as SubscriptionPlan,
      status: SubscriptionStatus.PENDING,
      monthlyPriceUsd: input.price,
      activatedAt: null,
      cancelledAt: null,
      createdAt: new Date(),
    });

    this.subscriptions.push(subscription);

    return subscription;
  }

  async findOneById(
    subscriptionId: string,
  ): Promise<Subscription | null> {
    const subscription = this.subscriptions.find(
      (subscription) => subscription.id === subscriptionId,
    );

    return subscription ?? null;
  }

  async findOneByWorkspaceId(
    workspaceId: string,
  ): Promise<Subscription | null> {
    const subscription = this.subscriptions.find(
      (subscription) =>
        subscription.workspaceId === workspaceId,
    );

    return subscription ?? null;
  }

  async updateOneById(
    subscriptionId: string,
  ): Promise<Subscription | null> {
    return this.findOneById(subscriptionId);
  }

  async activateSubscription(
    subscriptionId: string,
  ): Promise<SubscriptionStatus | null> {
    const subscription =
      await this.findOneById(subscriptionId);

    if (!subscription) return null;

    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.activatedAt = new Date();

    return subscription.status;
  }

  async countAllByStatus(status: SubscriptionStatus): Promise<number> {
    return this.subscriptions.filter(s => s.status === status)?.length ?? 0;
  }

  async findManyByPlanAndStatus(plan: SubscriptionPlan, status: SubscriptionStatus): Promise<Subscription[]> {
    return this.subscriptions.filter(s => s.plan === plan && s.status === status);
  }
}