import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionPlan, SubscriptionStatus } from '../types/subscription.types';

export type SubscriptionProps = {
  id: string;
  workspaceId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  monthlyPriceUsd: number;
  activatedAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
};

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

  constructor(props: SubscriptionProps) {
    this.id = props.id;
    this.workspaceId = props.workspaceId;
    this.plan = props.plan;
    this.status = props.status;
    this.monthlyPriceUsd = props.monthlyPriceUsd;
    this.activatedAt = props.activatedAt;
    this.cancelledAt = props.cancelledAt;
    this.createdAt = props.createdAt;
  }
}