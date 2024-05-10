import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import {HttpModule} from '@nestjs/axios';
import { TelegrafModule } from 'nestjs-telegraf';

import {TasksService} from "./cron.service";
import {M2bFetcherService} from "../common/provider/m2b.fetcher.provider";
import {TelegramService} from "./tg.service";

console.log('------TOKEN', process.env.TG_TOKEN)

@Module({
    imports: [
        HttpModule,
        TelegrafModule.forRoot({
            token: process.env.TG_TOKEN,
        }),
        ScheduleModule.forRoot()
    ],
    providers: [
        TasksService,
        M2bFetcherService,
        TelegramService,
    ]
})
export class CronModule {}
