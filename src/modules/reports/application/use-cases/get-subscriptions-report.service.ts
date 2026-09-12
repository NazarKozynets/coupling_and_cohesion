import { Injectable } from "@nestjs/common";
import { PrepareSubscriptionsReportPort } from "src/modules/subscriptions/application/ports/prepare-report.port";
import { ResultSubscriptionsReport, SubscriptionsReportPortData } from "src/shared/types/reports/subscriptions-reports.types";

@Injectable()
export class GetSubscriptionsReportService {
    constructor(
        private readonly prepareSubscriptionsReportPort: PrepareSubscriptionsReportPort,
    ) { }

    async exec(): Promise<ResultSubscriptionsReport> {
        // Такой порт позволяет нам получать данные через него, инкапсулируя работу с репозиторием модуля подписок.
        const data: SubscriptionsReportPortData = await this.prepareSubscriptionsReportPort.prepareData();

        // После получения данных (которые доступны этому модулю через shared type ResultSubscriptionsReport (сейчас используется один тип для порта и для финального дто, 
        // но если понадобится, то можно разделить их)),
        // мы можем манипулировать данными как угодно. К примеру тут я буду считать сумму.

        // UPDATE: Я разделил типы для результата порта и для сервиса GetSubscriptionsReportService.
        // Теперь GetSubscriptionsReportService будет получать минимальную нужную информацию. 
        let activeSubscriptions = 0;
        let monthlyRevenueUsd = 0;

        for (const [plan, amount] of Object.entries(data.plansAmount)) {
            activeSubscriptions += amount;
            monthlyRevenueUsd += data.plansPrices[plan] * amount;
        }

        return {
            activeSubscriptions,
            monthlyRevenueUsd,
            plans: data.plansAmount,
        }
    }
}