import {Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {CatsController} from "./cats/cats.controller";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [CatsModule, MongooseModule.forRoot('mongodb://username:password@localhost:27017/test')],
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
