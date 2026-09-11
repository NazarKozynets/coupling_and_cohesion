import { Injectable } from "@nestjs/common";
import { GetEmailForNotificationPort } from "../../infrastructure/orchestrators/get-email.port";

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    private readonly getUserEmailPort: GetEmailForNotificationPort,
  ) { }

  async sendSubscriptionActivated(input: {
    userId: string;
    workspaceName: string;
    // Update: убрал subscriptionPlan чтобы notification module не знал ненужной ему информации. 
    // Валидацию плана лучше проводить в точке вызова функции. 
    subscriptionPlan: string,
  }): Promise<void> {
    const { workspaceName, subscriptionPlan, userId } = input;
    const email = await this.getUserEmailPort.exec(userId);
    console.log(`reciever email: ${email}, workspace name: "${workspaceName}", plan: ${subscriptionPlan}`);
  }
}