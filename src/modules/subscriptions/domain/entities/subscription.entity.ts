import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionPlan, SubscriptionStatus } from '../types/subscription.types';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  workspaceId!: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
  })
  plan!: SubscriptionPlan;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
  })
  status!: SubscriptionStatus;

  @Column({ type: 'integer' })
  monthlyPriceUsd!: number;

  @Column({ nullable: true })
  activatedAt: Date | null = null;

  @Column({ nullable: true })
  cancelledAt: Date | null = null;

  @CreateDateColumn()
  createdAt!: Date;
}