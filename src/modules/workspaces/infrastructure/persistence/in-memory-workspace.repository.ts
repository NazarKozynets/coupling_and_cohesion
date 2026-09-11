import { Workspace } from '../../domain/entities/workspace.entity';

export class InMemoryWorkspaceRepository {
  private readonly workspaces: Workspace[] = [
    {
      id: 'workspace-free',
      ownerUserId: 'user-1',
      name: 'Free Workspace',
    },
    {
      id: 'workspace-pro',
      ownerUserId: 'user-2',
      name: 'Pro Workspace',
    },
    {
      id: 'workspace-business',
      ownerUserId: 'user-3',
      name: 'Business Workspace',
    },
  ];

  async findOneById(
    workspaceId: string,
  ): Promise<Workspace> {
    const workspace = this.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );

    if (!workspace) {
      throw new Error(
        `Workspace ${workspaceId} not found`,
      );
    }

    return workspace;
  }
}