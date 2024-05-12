import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";

import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";
import {RestInterceptor} from "./common/interceptors/rest.interceptor";

import {CatsModule} from "./cats/cats.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsController} from "./cats/cats.controller";
import {AuthController} from "./auth/auth.controller";


@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_URI),
        UsersModule,
        AuthModule,
        CatsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: RestInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                CatsController,
                AuthController,
            )
    }
}
