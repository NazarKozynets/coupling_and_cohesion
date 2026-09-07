import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationSubscriptionService {
  async sendSubscriptionActivated(input: {
    userId: string;
    workspaceName: string;
    planName: string;
  }): Promise<void> {}
}