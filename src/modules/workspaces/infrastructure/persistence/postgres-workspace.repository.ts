import { Injectable } from "@nestjs/common";
import { WorkspaceRepository } from "../../domain/repositories/workspace.repository";

@Injectable()
export class PostgresWorkspaceRepository implements WorkspaceRepository {
    findOne(id: string) {
        throw new Error("Method not implemented.");
    }
    findUserAll() {
        throw new Error("Method not implemented.");
    }
}