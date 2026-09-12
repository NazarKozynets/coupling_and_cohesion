import { Injectable } from "@nestjs/common";
import { SubscriptionActivatedNotificationContext } from "src/modules/notifications/application/services/send-subscription.service";
import { Subscription } from "../domain/entities/subscription.entity";
import { WorkspaceSubscriptionContext } from "src/modules/workspaces/domain/types/workspace.types";

@Injectable()
export class SubscriptionNotificationMapper {
    // maps to subscription activated notification
    activated(
        subscription: Subscription,
        workspace: WorkspaceSubscriptionContext
    ): SubscriptionActivatedNotificationContext {
        return {
            workspaceName: workspace.name,
            userId: workspace.ownerUserId,
            subscriptionPlan: subscription.plan,
        }
    }
}