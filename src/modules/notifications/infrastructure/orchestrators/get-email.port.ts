import { Injectable } from "@nestjs/common";
import { GetUserEmailPort } from "src/modules/users/application/ports/get-user-email.port";

// внутренний оркестратор только для этого модуля, чтобы каждый сервис модуля не импортировал внешний GetUserEmailPort, а использовал этот.
@Injectable()
export class GetEmailForNotificationPort {
    constructor(
        private readonly externalService: GetUserEmailPort,
    ) {}

    exec(userId: string) {
        return this.externalService.exec(userId);
    }
}