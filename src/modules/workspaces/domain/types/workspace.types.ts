import { Workspace } from "../entities/workspace.entity";

export type WorkspaceSubscriptionContext = Omit<Workspace, 'id'>;