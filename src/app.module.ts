import {Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {CatsController} from "./cats/cats.controller";
import {CronModule} from "./cron/cron.module";

@Module({
    imports: [CatsModule, CronModule],
    controllers: [AppController],
    providers: [
        AppService,
        ConfigService,
    ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude(
                {path: 'cats', method: RequestMethod.GET},
                // 'cats/(.*)',
            )
            .forRoutes(CatsController);
    }
}
