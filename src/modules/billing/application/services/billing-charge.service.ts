import { Injectable } from "@nestjs/common";

@Injectable()
export class BillingChargeService {

  // ПРИМЕТКА 1: 
  // Вообще странно, что BillingChargeService, который, судя по названию, должен отвечать за все оплаты в приложении,
  // принимает subscriptionId, workspaceId.
  // Я бы сделал оркестратор, который принимал бы amountUsd, тип оплаты (за что юзер платит).
  // И выстраивал бы всю бизнес логику вокруг него.
  // Но в задании указано это, поэтому я не буду менять.
  //
  // ПРИМЕТКА 2:
  // В задании нет entity для payment и нет детальной информации, нужно мне делать что-то с этим сервисом или нет.
  // Поэтому я просто буду представлять, что сервис успешно выполнил свою работу. 
  async charge(input: {
    workspaceId: string;
    subscriptionId: string;
    amountUsd: number;
  }): Promise<void> {
    // считаем, что payment provider уже реализован

    
  }
}