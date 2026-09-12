import { Injectable } from "@nestjs/common";
import { GetEmailForNotificationPort } from "../../infrastructure/orchestrators/get-email.port";

export type SubscriptionActivatedNotificationContext = {
  userId: string,
  workspaceName: string,
  subscriptionPlan: string,
}

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    private readonly getUserEmailPort: GetEmailForNotificationPort,
  ) { }

  async sendSubscriptionActivated(input: SubscriptionActivatedNotificationContext): Promise<void> {
    const { workspaceName, subscriptionPlan, userId } = input;
    const email = await this.getUserEmailPort.exec(userId);
    console.log(`reciever email: ${email}, workspace name: "${workspaceName}", plan: ${subscriptionPlan}`);
  }
}