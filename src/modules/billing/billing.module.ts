import { Module } from '@nestjs/common';
import { BillingChargeService } from './application/services/billing-charge.service';

@Module({
    providers: [BillingChargeService],
    exports: [BillingChargeService]
})
export class BillingModule {}
