import { Injectable } from "@nestjs/common";

@Injectable()
export class BillingChargeService {
  async charge(input: {
    workspaceId: string;
    subscriptionId: string;
    amountUsd: number;
  }): Promise<void> {
    // считаем, что payment provider уже реализован
  }
}