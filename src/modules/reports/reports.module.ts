import { Module } from '@nestjs/common';
import { GetSubscriptionsReportService } from './application/use-cases/get-subscriptions-report.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
    imports: [SubscriptionsModule],
    providers: [
        GetSubscriptionsReportService,
    ],
})
export class ReportsModule { }
