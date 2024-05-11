import {Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {CatsController} from "./cats/cats.controller";
import { MongooseModule } from '@nestjs/mongoose';
import * as process from "process";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_URI),
        CatsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
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
