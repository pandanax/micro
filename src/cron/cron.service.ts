import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {M2bFetcherService} from "../common/provider/m2b.fetcher.provider";
import {TelegramService} from "./tg.service";

const OK = 'OK';
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private m2bFetcher: M2bFetcherService,
        private tg: TelegramService,
) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        let res;
        try {
            const {data} = await this.m2bFetcher.fetchPing();
            res = data === 'rs_weight=1' ? OK : data;
        } catch (e) {
            res = e.toString();
        }
        this.logger.debug(res);
        if (res !== OK) {
            await this.tg.sendText(res);
        }
    }
}
